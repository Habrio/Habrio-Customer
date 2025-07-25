import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${backendUrl}/order/history`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      
      if (data.status === 'success') {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
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

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['pending', 'accepted', 'confirmed'].includes(order.status);
    if (filter === 'completed') return order.status === 'delivered';
    if (filter === 'cancelled') return order.status === 'cancelled';
    return true;
  });

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
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <PageHeader title="My Orders" />

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '20px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              background: filter === tab.key ? 'var(--primary-gradient)' : 'var(--background-soft)',
              color: filter === tab.key ? 'white' : 'var(--text-primary)',
              border: filter === tab.key ? 'none' : '1px solid var(--divider)',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              minWidth: 'fit-content'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📦</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
            {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
          </h3>
          <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
            {filter === 'all' 
              ? 'Start shopping to place your first order'
              : `You don't have any ${filter} orders at the moment`
            }
          </p>
          {filter === 'all' && (
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
              Start Shopping
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredOrders.map((order) => (
            <div
              key={order.order_id}
              onClick={() => navigate(`/order/${order.order_id}`)}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer'
              }}
            >
              {/* Order Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                    Order #{order.order_id}
                  </h4>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '14px' }}>{getStatusIcon(order.status)}</span>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: '500',
                    color: getStatusColor(order.status),
                    textTransform: 'capitalize'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items Preview */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px' }}>🏪</span>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>
                    Shop #{order.shop_id}
                  </span>
                </div>
                <div style={{ paddingLeft: '22px' }}>
                  {order.items.slice(0, 2).map((item, index) => (
                    <p key={index} style={{ margin: '0 0 2px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                  {order.items.length > 2 && (
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {order.payment_mode === 'wallet' ? '💳' : '💵'} {order.payment_mode === 'wallet' ? 'Wallet' : 'Cash'}
                  </span>
                  <span style={{ 
                    fontSize: '10px', 
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: order.payment_status === 'paid' ? 'var(--success-color)' : 'var(--warning-color)',
                    color: 'white'
                  }}>
                    {order.payment_status}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)' }}>
                    ₹{order.final_amount || order.total_amount}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {order.items.length} items
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              {order.status === 'delivered' && (
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--divider)'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/order/${order.order_id}/rate`);
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid var(--primary-color)',
                      color: 'var(--primary-color)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    Rate Order
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/order/${order.order_id}/return`);
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid var(--divider)',
                      color: 'var(--text-secondary)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    Return
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}