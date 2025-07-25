// File: src/pages/ShopList.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import ShopListSection from '../components/organisms/ShopListSection';
import NearbyShopCard from '../components/molecules/NearbyShopCard';
import EmptyState from '../components/organisms/EmptyState';
import { Spinner } from '../components/atoms/Loader';
import { get } from '../utils/api';

export default function ShopList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterType = new URLSearchParams(location.search).get('type');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchShops(token);
  }, [filterType]);

  async function fetchShops(token) {
    setLoading(true);
    try {
      const url = filterType
        ? `/shops?type=${filterType}`
        : '/shops';
      const { status, shops: data } = await get(url, { token });
      setShops(status === 'success' ? data : []);
    } catch {
      setShops([]);
    } finally {
      setLoading(false);
    }
  }

  const title = filterType
    ? `${filterType.charAt(0).toUpperCase() + filterType.slice(1)} Shops`
    : 'All Shops';

  return (
    <MobileLayout>
      <PageHeader back={() => navigate(-1)} title={title} />
      <ScreenContainer>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner size={40} className="text-primary mb-4" />
            <p className="text-sm text-text-secondary">Loading shops...</p>
          </div>
        ) : shops.length === 0 ? (
          <EmptyState
            icon={<Spinner size={48} />}
            title="No Shops Found"
            description="Try a different category or check back later."
            actionLabel="View All"
            onAction={() => navigate('/shops')}
          />
        ) : (
          <ShopListSection layout="vertical" empty={null}>
            {shops.map(shop => (
              <NearbyShopCard
                key={shop.id}
                image={shop.logo_url}
                name={shop.shop_name}
                category={shop.shop_type}
                address={shop.description}
                status={shop.is_open ? 'open' : 'closed'}
                delivers={shop.delivers}
                onClick={() => navigate(`/shop/${shop.id}`)}
              />
            ))}
          </ShopListSection>
        )}
      </ScreenContainer>
    </MobileLayout>
  );
}
