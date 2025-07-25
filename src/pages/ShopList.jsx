import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ShopList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');
  const queryParams = new URLSearchParams(location.search);
  const filterType = queryParams.get('type');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchShops();
  }, [filterType]);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const url = filterType
        ? `${backendUrl}/shops?type=${filterType}`
        : `${backendUrl}/shops`;

      const res = await fetch(url, {
        headers: { Authorization: token }
      });

      const data = await res.json();

      if (data.status === 'success') {
        setShops(data.shops || []);
      } else {
        console.warn(data.message || 'Failed to load shops');
        setShops([]);
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (!filterType) return 'All Shops';
    return filterType.charAt(0).toUpperCase() + filterType.slice(1) + ' Shops';
  };

  return (
    <div className="screen-content">
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
        {getTitle()}
      </h2>

      {loading ? (
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
          <p>Loading shops...</p>
        </div>
      ) : shops.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          No shops found in this category.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {shops.map(shop => (
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
      )}

      {/* Bottom Padding to avoid overlap */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}

export default ShopList;
