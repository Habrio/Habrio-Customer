import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import PageHeader from '../components/molecules/PageHeader';

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchOrderDetails();
    fetchMessages();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      // Get order from history
      const res = await fetch(`${backendUrl}/order/history`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      
      if (data.status === 'success') {
        const orderDetail = data.orders.find(o => o.order_id === parseInt(orderId));
        if (orderDetail) {
          setOrder(orderDetail);
        } else {
          alert('Order not found');
          navigate('/orders');
        }
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
    setLoading(false);
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${backendUrl}/order/consumer/messages/${orderId}`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const cancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      const res = await fetch(`${backendUrl}/order/consumer/cancel/${orderId}`, {
        method: 'POST',
        headers: { 'Authorization': token }
      });

      const data = await res.json();
      if (data.status === 'success') {
        alert('Order cancelled successfully');
        fetchOrderDetails();
      } else {
        alert(data.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'var(--warning-color)';
      case 'accepted': return 'var(--info-color)';
      case 'confirmed': return 'var(--info-color)';
      case 'delivered': return 'var(--success-color)';
      case 'cancelled': return 'var(--error-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'accepted': return '✅';
      case 'confirmed': return '📦';
      case 'delivered': return '🎉';
      case 'cancelled': return '❌';
      default: return '📋';
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
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="screen-content">
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📦</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
            Order not found
          </h3>
          <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
            The order you're looking for doesn't exist
          </p>
          <button
            onClick={() => navigate('/orders')}
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
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <PageHeader title={`Order #${order.order_id}`} />

      {/* Order Status */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>
          {getStatusIcon(order.status)}
        </div>
        <h3 style={{ 
          margin: '0 0 4px 0', 
          fontSize: '18px', 
          fontWeight: '600',
          color: getStatusColor(order.status),
          textTransform: 'capitalize'
        }}>
          {order.status}
        </h3>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Order placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        
        {/* Status Timeline */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          {['pending', 'accepted', 'confirmed', 'delivered'].map((status, index) => {
            const isActive = ['pending', 'accepted', 'confirmed', 'delivered'].indexOf(order.status) >= index;
            const isCancelled = order.status === 'cancelled';
            
            return (
              <div
                key={status}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: isCancelled 
                    ? 'var(--error-color)' 
                    : isActive 
                      ? 'var(--primary-color)' 
                      : 'var(--divider)'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Order Items */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          Order Items ({order.items.length})
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
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
            <p style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '600' }}>
              Shop #{order.shop_id}
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Items delivered together
            </p>
          </div>
        </div>

        {order.items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 0',
              borderBottom: index < order.items.length - 1 ? '1px solid var(--divider)' : 'none'
            }}
          >
            <div style={{ 
              width: '48px', 
              height: '48px', 
              background: 'var(--divider)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📦
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
                {item.name}
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                Qty: {item.quantity} × ₹{item.unit_price}
              </p>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>
              ₹{item.subtotal}
            </span>
          </div>
        ))}
      </div>

      {/* Payment & Delivery */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          Payment & Delivery
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px' }}>Payment Method</span>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>
            {order.payment_mode === 'wallet' ? '💳 Wallet' : '💵 Cash on Delivery'}
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px' }}>Payment Status</span>
          <span style={{ 
            fontSize: '12px', 
            padding: '2px 8px',
            borderRadius: '4px',
            background: order.payment_status === 'paid' ? 'var(--success-color)' : 'var(--warning-color)',
            color: 'white',
            textTransform: 'capitalize'
          }}>
            {order.payment_status}
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px' }}>Total Amount</span>
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)' }}>
            ₹{order.final_amount || order.total_amount}
          </span>
        </div>
        
        {order.delivery_notes && (
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--divider)' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '500' }}>
              Delivery Notes:
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
              {order.delivery_notes}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {order.status === 'pending' && (
          <button
            onClick={cancelOrder}
            style={{
              background: 'none',
              border: '1px solid var(--error-color)',
              color: 'var(--error-color)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Cancel Order
          </button>
        )}
        
        {order.status === 'delivered' && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate(`/order/${order.order_id}/rate`)}
              style={{
                flex: 1,
                background: 'var(--primary-gradient)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Rate Order
            </button>
            <button
              onClick={() => navigate(`/order/${order.order_id}/return`)}
              style={{
                flex: 1,
                background: 'none',
                border: '1px solid var(--primary-color)',
                color: 'var(--primary-color)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Return Items
            </button>
          </div>
        )}
        
        <button
          onClick={() => navigate(`/order/${order.order_id}/messages`)}
          style={{
            background: 'none',
            border: '1px solid var(--divider)',
            color: 'var(--text-primary)',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          💬 View Messages
          {messages.length > 0 && (
            <span style={{
              background: 'var(--primary-color)',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {messages.length}
            </span>
          )}
        </button>
      </div>

      {/* Help Section */}
      <div style={{
        background: 'rgba(252, 100, 79, 0.1)',
        border: '1px solid rgba(252, 100, 79, 0.2)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🤝</span>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
              Need Help with this Order?
            </h4>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Our support team is here to help with any questions or issues
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/support')}
          style={{
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            marginTop: '12px'
          }}
        >
          Contact Support
        </button>
      </div>

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}