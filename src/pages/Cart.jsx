import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import '../styles/design-system.css';
import PageHeader from '../components/molecules/PageHeader';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${backendUrl}/cart/view`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      
      if (data.status === 'success') {
        setCartItems(data.cart);
        setTotalPrice(data.total_price);
        setTotalSavings(data.total_savings);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
    setLoading(false);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const res = await fetch(`${backendUrl}/cart/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ item_id: itemId, quantity: newQuantity })
      });

      const data = await res.json();
      if (data.status === 'success') {
        fetchCart();
      } else {
        alert(data.message || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await fetch(`${backendUrl}/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ item_id: itemId })
      });

      const data = await res.json();
      if (data.status === 'success') {
        fetchCart();
      } else {
        alert(data.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear the cart?')) return;
    
    try {
      const res = await fetch(`${backendUrl}/cart/clear`, {
        method: 'POST',
        headers: { 'Authorization': token }
      });

      const data = await res.json();
      if (data.status === 'success') {
        fetchCart();
      } else {
        alert(data.message || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
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
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <PageHeader title={`My Cart (${cartItems.length})`} />
      {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--error-color)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        )}

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
            Your cart is empty
          </h3>
          <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
            Add items from shops to get started
          </p>
          <button
            onClick={() => navigate('/shops')}
            style={{
              background: 'var(--primary-gradient)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Browse Shops
          </button>
        </div>
      ) : (
        <>
          {/* Shop Info */}
          {cartItems.length > 0 && (
            <div style={{
              background: 'var(--background-soft)',
              border: '1px solid var(--divider)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'var(--primary-gradient)', 
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                🏪
              </div>
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '600' }}>
                  {cartItems[0]?.shop_name}
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Items will be delivered together
                </p>
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div style={{ marginBottom: '20px' }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--background-soft)',
                  border: '1px solid var(--divider)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: 'var(--divider)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    📦
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                      {item.item_name}
                    </h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {item.pack_size} {item.unit}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
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
                            You save ₹{item.savings}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          onClick={() => updateQuantity(item.item_id, item.quantity - 1)}
                          style={{
                            background: 'white',
                            border: '1px solid var(--divider)',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '16px'
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: '16px', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.item_id, item.quantity + 1)}
                          style={{
                            background: 'white',
                            border: '1px solid var(--divider)',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '16px'
                          }}
                        >
                          +
                        </button>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '600' }}>
                          ₹{item.subtotal}
                        </span>
                        <button
                          onClick={() => removeItem(item.item_id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--error-color)',
                            fontSize: '16px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bill Summary */}
          <div style={{
            background: 'var(--background-soft)',
            border: '1px solid var(--divider)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
              Bill Summary
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Subtotal</span>
              <span>₹{totalPrice + totalSavings}</span>
            </div>
            
            {totalSavings > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--success-color)' }}>
                <span>Savings</span>
                <span>-₹{totalSavings}</span>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span>Delivery Fee</span>
              <span style={{ color: 'var(--success-color)' }}>FREE</span>
            </div>
            
            <div style={{ borderTop: '1px solid var(--divider)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '600' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary-color)' }}>₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate('/checkout')}
            style={{
              background: 'var(--primary-gradient)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              marginBottom: '20px'
            }}
          >
            Proceed to Checkout • ₹{totalPrice}
          </button>
        </>
      )}

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}