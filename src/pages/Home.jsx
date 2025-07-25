// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import HeroSection from '../components/organisms/HeroSection';
import ShopListSection from '../components/organisms/ShopListSection';
import WalletCard from '../components/molecules/WalletCard';
import SearchBar from '../components/molecules/SearchBar';
import CategoryCard from '../components/molecules/CategoryCard';
import FeaturedShopCard from '../components/molecules/FeaturedShopCard';
import NearbyShopCard from '../components/molecules/NearbyShopCard';
import EmptyState from '../components/organisms/EmptyState';
import { get } from '../utils/api';
import {
  HiShoppingCart,
  HiAnnotation,
  HiCollection,
  HiDeviceMobile,
  HiCog,
  HiSparkles,
  HiUser,
} from 'react-icons/hi';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [featuredShops, setFeaturedShops] = useState([]);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);

  const shopCategories = [
    { name: 'Grocery', icon: <HiShoppingCart />, type: 'grocery' },
    { name: 'Pharmacy', icon: <HiAnnotation />, type: 'pharmacy' },
    { name: 'Restaurant', icon: <HiCollection />, type: 'restaurant' },
    { name: 'Electronics', icon: <HiDeviceMobile />, type: 'electronics' },
    { name: 'Fashion', icon: <HiSparkles />, type: 'fashion' },
    { name: 'Services', icon: <HiCog />, type: 'services' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    Promise.all([fetchProfile(), fetchWallet(), fetchShops()]).finally(() =>
      setLoading(false)
    );
  }, []);

  async function fetchProfile() {
    try {
      const { status, data } = await get('/profile/me');
      if (status === 'success') setUser(data);
    } catch {}
  }

  async function fetchWallet() {
    try {
      const { status, balance } = await get('/wallet');
      if (status === 'success') setWalletBalance(balance);
    } catch {}
  }

  async function fetchShops() {
    try {
      const { status, shops } = await get('/shops?status=open');
      if (status === 'success') {
        setFeaturedShops(shops.filter((s) => s.featured).slice(0, 3));
        setNearbyShops(shops.slice(0, 6));
      }
    } catch {}
  }

  function handleSearchSubmit(value) {
    if (value.trim()) {
      navigate(`/shops/search?q=${encodeURIComponent(value)}`);
    }
  }

  if (loading) {
    return (
      <MobileLayout showNav activeTab="home">
        <ScreenContainer>
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
          </div>
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showNav activeTab="home">
      <ScreenContainer className="px-4 py-6 space-y-6">
        {/* Hero Section */}
        <HeroSection
          greeting={`Hello, ${user?.name || 'User'}! 👋`}
          subtext={`${user?.society}, ${user?.city}`}
          avatar={<HiUser className="text-2xl text-primary" />}
          action={
            <SearchBar
              value={search}
              onChange={(v) => setSearch(v)}
              onSearch={handleSearchSubmit}
              loading={searching}
              placeholder="Search shops or items…"
            />
          }
        />

        {/* Wallet Balance */}
        <WalletCard
          amount={`₹${walletBalance.toFixed(2)}`}
          label="Wallet Balance"
          icon={<HiShoppingCart className="text-white text-xl" />}
          color="gradient"
          cta="Add Money"
          onCta={() => navigate('/wallet/add')}
        />

        {/* Categories */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <div className="grid grid-cols-3 gap-4">
            {shopCategories.map((cat) => (
              <CategoryCard
                key={cat.type}
                icon={cat.icon}
                label={cat.name}
                active={false}
                onClick={() => navigate(`/shops?type=${cat.type}`)}
              />
            ))}
          </div>
        </section>

        {/* Featured Shops */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Featured Shops</h2>
            <button
              className="text-primary text-sm font-medium"
              onClick={() => navigate('/shops')}
            >
              See All
            </button>
          </div>
          {featuredShops.length ? (
            <div className="flex overflow-x-auto gap-4">
              {featuredShops.map((shop) => (
                <FeaturedShopCard
                  key={shop.id}
                  image={shop.logo_url}
                  name={shop.shop_name}
                  category={shop.shop_type}
                  status={shop.is_open ? 'open' : 'closed'}
                  badge={shop.verified ? 'Verified' : undefined}
                  onClick={() => navigate(`/shop/${shop.id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="No Featured Shops" />
          )}
        </section>

        {/* Nearby Shops */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Nearby Shops</h2>
            <button
              className="text-primary text-sm font-medium"
              onClick={() => navigate('/shops')}
            >
              View All
            </button>
          </div>
          {nearbyShops.length ? (
            <div className="space-y-4">
              {nearbyShops.map((shop) => (
                <NearbyShopCard
                  key={shop.id}
                  image={shop.logo_url}
                  name={shop.shop_name}
                  category={shop.shop_type}
                  address={shop.society}
                  status={shop.is_open ? 'open' : 'closed'}
                  delivers={shop.delivers}
                  onClick={() => navigate(`/shop/${shop.id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="No Nearby Shops" />
          )}
        </section>
      </ScreenContainer>
    </MobileLayout>
  );
}
