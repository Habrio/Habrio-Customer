import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

export default function ShopDetail() {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchShopItems();
    fetchCartCount();
  }, [shopId]);

  const fetchShopItems = async () => {
    try {
      const res = await fetch(`${backendUrl}/items/shop/${shopId}`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      
      if (data.status === 'success') {
        setShop(data.shop);
        setItems(data.items);
      } else {
        alert('Failed to load shop items');
      }
    } catch (error) {
      console.error('Error fetching shop items:', error);
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const fetchCartCount = async () => {
    try {
      const res = await fetch(`${backendUrl}/cart/view`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setCartCount(data.cart.length);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (itemId) => {
    try {
      const res = await fetch(`${backendUrl}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ item_id: itemId, quantity: 1 })
      });

      const data = await res.json();
      if (data.status === 'success') {
        alert('Item added to cart!');
        fetchCartCount();
      } else {
        alert(data.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
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
          <p>Loading shop details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            marginRight: '16px',
            cursor: 'pointer'
          }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', flex: 1 }}>
          {shop?.shop_name}
        </h2>
        {cartCount > 0 && (
          <button
            onClick={() => navigate('/cart')}
            style={{
              position: 'relative',
              background: 'var(--primary-gradient)',
              border: 'none',
              borderRadius: '20px',
              width: '40px',
              height: '40px',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            🛒
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'var(--error-color)',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cartCount}
            </span>
          </button>
        )}
      </div>

      {/* Shop Info */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'var(--primary-gradient)', 
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            🏪
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
              {shop?.shop_name}
            </h3>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
              {shop?.shop_type} • {shop?.description || 'Quality products & services'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ 
                fontSize: '12px', 
                color: 'var(--success-color)',
                fontWeight: '500'
              }}>
                • Open
              </span>
              <span style={{ 
                fontSize: '12px', 
                color: 'var(--primary-color)',
                fontWeight: '500'
              }}>
                • Delivers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
        Available Items ({items.length})
      </h3>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p>No items available at this shop</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: item.image_url ? `url(${item.image_url})` : 'var(--divider)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                {!item.image_url && '📦'}
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                  {item.title}
                </h4>
                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {item.brand && `${item.brand} • `}{item.pack_size} {item.unit}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)' }}>
                    ₹{item.price}
                  </span>
                  {item.mrp && item.mrp > item.price && (
                    <>
                      <span style={{ 
                        fontSize: '14px', 
                        color: 'var(--text-secondary)',
                        textDecoration: 'line-through'
                      }}>
                        ₹{item.mrp}
                      </span>
                      <span style={{ 
                        fontSize: '12px', 
                        color: 'var(--success-color)',
                        fontWeight: '500'
                      }}>
                        {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => addToCart(item.id)}
                style={{
                  background: 'var(--primary-gradient)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}