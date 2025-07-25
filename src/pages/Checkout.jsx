import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentMode, setPaymentMode] = useState('wallet');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [placing, setPlacing] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCart();
    fetchWallet();
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
        
        if (data.cart.length === 0) {
          navigate('/cart');
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
    setLoading(false);
  };

  const fetchWallet = async () => {
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

  const placeOrder = async () => {
    if (paymentMode === 'wallet' && walletBalance < totalPrice) {
      alert('Insufficient wallet balance. Please add money to your wallet.');
      return;
    }

    setPlacing(true);
    try {
      const res = await fetch(`${backendUrl}/order/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          payment_mode: paymentMode,
          delivery_notes: deliveryNotes
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        alert('Order placed successfully!');
        navigate(`/order/${data.order_id}`);
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Something went wrong. Please try again.');
    }
    setPlacing(false);
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
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <PageHeader title="Checkout" />

      {/* Delivery Address */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '16px' }}>📍</span>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Delivery Address</h3>
        </div>
        <p style={{ margin: '0 0 4px 28px', fontSize: '14px', fontWeight: '500' }}>
          Home Address
        </p>
        <p style={{ margin: '0 0 8px 28px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Your registered address will be used for delivery
        </p>
      </div>

      {/* Order Items */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
            Order Items ({cartItems.length})
          </h3>
          <button
            onClick={() => navigate('/cart')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
        </div>
        
        {cartItems.slice(0, 3).map((item, index) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 0',
              borderBottom: index < Math.min(cartItems.length, 3) - 1 ? '1px solid var(--divider)' : 'none'
            }}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'var(--divider)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              📦
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '500' }}>
                {item.item_name}
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                Qty: {item.quantity} • ₹{item.price} each
              </p>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>
              ₹{item.subtotal}
            </span>
          </div>
        ))}
        
        {cartItems.length > 3 && (
          <p style={{ margin: '8px 0 0 52px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            +{cartItems.length - 3} more items
          </p>
        )}
      </div>

      {/* Payment Method */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          Payment Method
        </h3>
        
        {/* Wallet Option */}
        <div
          onClick={() => setPaymentMode('wallet')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            borderRadius: '8px',
            border: paymentMode === 'wallet' ? '2px solid var(--primary-color)' : '1px solid var(--divider)',
            background: paymentMode === 'wallet' ? 'rgba(252, 100, 79, 0.1)' : 'white',
            cursor: 'pointer',
            marginBottom: '8px'
          }}
        >
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid var(--primary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {paymentMode === 'wallet' && (
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--primary-color)'
              }}></div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '500' }}>
              💳 Wallet
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: walletBalance >= totalPrice ? 'var(--success-color)' : 'var(--error-color)' }}>
              Balance: ₹{walletBalance.toFixed(2)}
              {walletBalance < totalPrice && ' (Insufficient balance)'}
            </p>
          </div>
        </div>

        {/* Cash on Delivery Option */}
        <div
          onClick={() => setPaymentMode('cash')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            borderRadius: '8px',
            border: paymentMode === 'cash' ? '2px solid var(--primary-color)' : '1px solid var(--divider)',
            background: paymentMode === 'cash' ? 'rgba(252, 100, 79, 0.1)' : 'white',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid var(--primary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {paymentMode === 'cash' && (
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--primary-color)'
              }}></div>
            )}
          </div>
          <div>
            <p style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '500' }}>
              💵 Cash on Delivery
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Pay when you receive your order
            </p>
          </div>
        </div>

        {/* Add Money to Wallet */}
        {paymentMode === 'wallet' && walletBalance < totalPrice && (
          <button
            onClick={() => navigate('/wallet/add')}
            style={{
              background: 'var(--primary-gradient)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginTop: '12px',
              width: '100%'
            }}
          >
            Add Money to Wallet
          </button>
        )}
      </div>

      {/* Delivery Instructions */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
          Delivery Instructions (Optional)
        </h3>
        <textarea
          placeholder="Add any special instructions for delivery..."
          value={deliveryNotes}
          onChange={(e) => setDeliveryNotes(e.target.value)}
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '12px',
            border: '1px solid var(--divider)',
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
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
            <span>Total Amount</span>
            <span style={{ color: 'var(--primary-color)' }}>₹{totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={placeOrder}
        disabled={placing || (paymentMode === 'wallet' && walletBalance < totalPrice)}
        style={{
          background: placing || (paymentMode === 'wallet' && walletBalance < totalPrice) 
            ? 'var(--text-disabled)' 
            : 'var(--primary-gradient)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: placing || (paymentMode === 'wallet' && walletBalance < totalPrice) ? 'not-allowed' : 'pointer',
          width: '100%',
          marginBottom: '20px',
          opacity: placing || (paymentMode === 'wallet' && walletBalance < totalPrice) ? 0.6 : 1
        }}
      >
        {placing ? 'Placing Order...' : `Place Order • ₹${totalPrice}`}
      </button>

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}