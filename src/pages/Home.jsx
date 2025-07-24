// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  WalletCard,
  SearchCard,
  CategoryCard,
  FeaturedShopCard,
  NearbyShopCard
} from '../components/molecules/Cards';
import { HiShoppingCart, HiAnnotation, HiCollection, HiDeviceMobile, HiCog, HiSparkles, HiUser } from 'react-icons/hi';
import { get } from '../utils/api';
import '../styles/common.css';
import '../styles/App.css';
import '../styles/design-system.css';

function Home() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [featuredShops, setFeaturedShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);

  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) return navigate('/login');
    Promise.all([
      fetchUserData(),
      fetchNearbyShops(),
      fetchWalletBalance()
    ]).finally(() => setLoading(false));
  }, []);

  const fetchUserData = async () => {
    try {
      const { status, data } = await get('/profile/me');
      if (status === 'success') setUserProfile(data);
    } catch (e) {
      console.error('Fetch profile error:', e);
    }
  };

  const fetchNearbyShops = async () => {
    try {
      const { status, shops } = await get('/shops?status=open');
      if (status === 'success') {
        setNearbyShops(shops.slice(0, 6));
        setFeaturedShops(shops.filter(s => s.featured).slice(0, 3));
      }
    } catch (e) {
      console.error('Fetch shops error:', e);
    }
  };

  const fetchWalletBalance = async () => {
    try {
      const { status, balance } = await get('/wallet');
      if (status === 'success') setWalletBalance(balance);
    } catch (e) {
      console.error('Fetch wallet error:', e);
    }
  };

  const shopCategories = [
    { name: 'Grocery', icon: HiShoppingCart, type: 'grocery' },
    { name: 'Pharmacy', icon: HiAnnotation, type: 'pharmacy' },
    { name: 'Restaurant', icon: HiCollection, type: 'restaurant' },
    { name: 'Electronics', icon: HiDeviceMobile, type: 'electronics' },
    { name: 'Fashion', icon: HiSparkles, type: 'fashion' },
    { name: 'Services', icon: HiCog, type: 'services' }
  ];

  if (loading) {
    return (
      <div className="screen-content px-4">
        <div className="loader-center">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-primary/5 p-4 rounded-lg">
        <div>
          <h2 className="text-xl font-semibold">Hello, {userProfile?.name || 'User'}! 👋</h2>
          <p className="text-sm text-gray-500 mt-1">
            {userProfile?.society}, {userProfile?.city}
          </p>
        </div>
        <button
          className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-lg"
          onClick={() => navigate('/profile')}
        >
          <HiUser />
        </button>
      </div>

      {/* Wallet & Search */}
      <div className="flex space-x-4 mb-6">
        <WalletCard balance={walletBalance} />
        <SearchCard to="/shops/search" placeholder="Search for shops, items…" />
      </div>

      {/* Categories (Horizontal Scroll) */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {shopCategories.map((cat) => (
            <CategoryCard
              key={cat.type}
              icon={cat.icon}
              name={cat.name}
              to={`/shops?type=${cat.type}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Shops */}
      {featuredShops.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Featured Shops</h3>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {featuredShops.map((shop) => (
              <FeaturedShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </section>
      )}

      {/* Nearby Shops */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Nearby Shops</h3>
          <button
            className="text-sm font-medium text-green-600"
            onClick={() => navigate('/shops')}
          >View All</button>
        </div>
        <div className="space-y-3">
          {nearbyShops.map((shop) => (
            <NearbyShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
