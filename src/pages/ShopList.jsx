// src/pages/ShopList.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/common.css';

function ShopList() {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  const shopType = searchParams.get('type') || '';

  useEffect(() => {
    fetchShops();
  }, [shopType]);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const url = new URL(`${backendUrl}/shops`);
      if (shopType) url.searchParams.append('type', shopType);
      const res = await fetch(url, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      if (data.status === 'success') {
        setShops(data.shops);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch shops');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="screen-content">
        <p>Loading shops...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen-content">
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="screen-content">
      <h2 className="title">{shopType ? shopType + ' Shops' : 'All Shops'}</h2>
      {shops.length === 0 ? (
        <p>No shops found</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {shops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => navigate(`/shop/${shop.id}`)}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '8px',
                padding: '16px',
                cursor: 'pointer',
              }}
            >
              <h3 style={{ margin: 0 }}>{shop.shop_name}</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                {shop.shop_type} • {shop.description}
              </p>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>
                {shop.is_open ? 'Open' : 'Closed'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopList;