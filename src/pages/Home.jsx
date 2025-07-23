import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import MobileLayout from '../components/MobileLayout';

function Home() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [featuredShops, setFeaturedShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserData();
    fetchNearbyShops();
    fetchWalletBalance();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${backendUrl}/profile/me`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setUserProfile(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchNearbyShops = async () => {
    try {
      const res = await fetch(`${backendUrl}/shops?status=open`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setNearbyShops(data.shops.slice(0, 6));
        setFeaturedShops(data.shops.filter(shop => shop.featured).slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
    setLoading(false);
  };

  const fetchWalletBalance = async () => {
    try {
      const res = await fetch(`${backendUrl}/wallet`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setWalletBalance(data.balance);
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const shopCategories = [
    { name: 'Grocery', icon: '🛒', type: 'grocery' },
    { name: 'Pharmacy', icon: '💊', type: 'pharmacy' },
    { name: 'Restaurant', icon: '🍽️', type: 'restaurant' },
    { name: 'Electronics', icon: '📱', type: 'electronics' },
    { name: 'Fashion', icon: '👕', type: 'fashion' },
    { name: 'Services', icon: '🔧', type: 'services' }
  ];

  if (loading) {
    return (
      <div>
        <div className="screen-content">
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--divider)',
              borderTop: '3px solid var(--primary-color)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="screen-content">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
              Hello, {userProfile?.name || 'User'}! 👋
            </h2>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {userProfile?.society}, {userProfile?.city}
            </p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '20px',
              background: 'var(--primary-gradient)',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            👤
          </button>
        </div>

        {/* Wallet Card */}
        <div
          onClick={() => navigate('/wallet')}
          style={{
            background: 'var(--primary-gradient)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Wallet Balance</p>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: '600' }}>
                ₹{walletBalance.toFixed(2)}
              </h3>
            </div>
            <div style={{ fontSize: '24px' }}>💳</div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          onClick={() => navigate('/shops/search')}
          style={{
            background: 'var(--background-soft)',
            border: '1px solid var(--divider)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '16px' }}>🔍</span>
          <span style={{ color: 'var(--text-secondary)' }}>Search for shops, items...</span>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Categories</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            {shopCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => navigate(`/shops?type=${category.type}`)}
                style={{
                  background: 'var(--background-soft)',
                  border: '1px solid var(--divider)',
                  borderRadius: '8px',
                  padding: '16px 8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{category.icon}</div>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: '500' }}>{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Shops */}
        {featuredShops.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Featured Shops</h3>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
              {featuredShops.map((shop) => (
                <div
                  key={shop.id}
                  onClick={() => navigate(`/shop/${shop.id}`)}
                  style={{
                    background: 'var(--background-soft)',
                    border: '1px solid var(--divider)',
                    borderRadius: '8px',
                    padding: '12px',
                    minWidth: '140px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--primary-gradient)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                    fontSize: '18px'
                  }}>
                    🏪
                  </div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
                    {shop.shop_name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {shop.shop_type}
                  </p>
                  <div style={{
                    marginTop: '8px',
                    fontSize: '10px',
                    color: 'var(--success-color)',
                    fontWeight: '500'
                  }}>
                    {shop.is_open ? '• Open' : '• Closed'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Shops */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Nearby Shops</h3>
            <button
              onClick={() => navigate('/shops')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-color)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {nearbyShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => navigate(`/shop/${shop.id}`)}
                style={{
                  background: 'var(--background-soft)',
                  border: '1px solid var(--divider)',
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--primary-gradient)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  🏪
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                    {shop.shop_name}
                  </h4>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {shop.shop_type} • {shop.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '12px',
                      color: shop.is_open ? 'var(--success-color)' : 'var(--error-color)',
                      fontWeight: '500'
                    }}>
                      {shop.is_open ? '• Open' : '• Closed'}
                    </span>
                    {shop.delivers && (
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--primary-color)',
                        fontWeight: '500'
                      }}>
                        • Delivers
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
