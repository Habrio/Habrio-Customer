// File: src/pages/OrderDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Loader';
import EmptyState from '../components/organisms/EmptyState';
import { get, post } from '../utils/api';

const STATUS_META = {
  pending: { icon: '⏳', color: 'text-warning' },
  accepted: { icon: '✅', color: 'text-info' },
  confirmed: { icon: '📦', color: 'text-info' },
  delivered: { icon: '🎉', color: 'text-success' },
  cancelled: { icon: '❌', color: 'text-error' },
};

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    fetchOrder(token);
    fetchMsgs(token);
    // eslint-disable-next-line
  }, [orderId]);

  async function fetchOrder(token) {
    setLoading(true);
    try {
      const res = await get('/order/history', { token });
      if (res.status === 'success') {
        const found = res.orders.find(o => `${o.order_id}` === `${orderId}`);
        setOrder(found || null);
      }
    } catch {}
    setLoading(false);
  }

  async function fetchMsgs(token) {
    try {
      const res = await get(`/order/consumer/messages/${orderId}`, { token });
      if (res.status === 'success') setMessages(res.messages || []);
    } catch {}
  }

  async function cancelOrder() {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const token = localStorage.getItem('auth_token');
      const res = await post(`/order/consumer/cancel/${orderId}`, {}, { token });
      if (res.status === 'success') {
        alert('Order cancelled successfully');
        fetchOrder(token);
      } else {
        alert(res.message || 'Failed to cancel order');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    }
  }

  if (loading) {
    return (
      <MobileLayout showNav activeTab="orders">
        <PageHeader title="Order Details" />
        <ScreenContainer className="flex justify-center py-20">
          <Spinner size={48} className="text-primary" />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  if (!order) {
    return (
      <MobileLayout showNav activeTab="orders">
        <PageHeader title="Order Details" />
        <ScreenContainer>
          <EmptyState
            icon="📦"
            title="Order not found"
            description="The order you're looking for doesn't exist."
            actionLabel="Back to Orders"
            onAction={() => navigate('/orders')}
          />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  const meta = STATUS_META[order.status] || { icon: '📋', color: 'text-secondary' };
  const orderAmount = order.final_amount || order.total_amount;
  const items = order.items || [];

  return (
    <MobileLayout showNav activeTab="orders">
      <PageHeader title={`Order #${order.order_id}`} />
      <ScreenContainer className="space-y-6">

        {/* Status Section */}
        <div className="bg-background-soft border border-divider rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">
            {meta.icon}
          </div>
          <div className={`font-bold text-lg capitalize mb-2 ${meta.color}`}>
            {order.status}
          </div>
          <div className="text-sm text-secondary mb-3">
            Order placed on {new Date(order.created_at).toLocaleString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </div>
          <div className="flex justify-center gap-2 mt-3">
            {['pending', 'accepted', 'confirmed', 'delivered'].map((stat, idx) => {
              const active = ['pending', 'accepted', 'confirmed', 'delivered'].indexOf(order.status) >= idx;
              const cancelled = order.status === 'cancelled';
              return (
                <span
                  key={stat}
                  className={`w-3 h-3 rounded-full ${cancelled
                    ? 'bg-error'
                    : active ? 'bg-primary' : 'bg-divider'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-background-soft border border-divider rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-xl">
              🏪
            </div>
            <div>
              <div className="font-semibold text-sm">Shop #{order.shop_id}</div>
              <div className="text-xs text-secondary">Items delivered together</div>
            </div>
          </div>
          <div className="divide-y divide-divider">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 py-2">
                <div className="w-12 h-12 flex items-center justify-center rounded bg-divider text-xl">📦</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-secondary">Qty: {item.quantity} × ₹{item.unit_price}</div>
                </div>
                <div className="font-semibold text-base">₹{item.subtotal}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment & Delivery */}
        <div className="bg-background-soft border border-divider rounded-lg p-4">
          <div className="font-semibold mb-2">Payment & Delivery</div>
          <div className="flex justify-between text-sm mb-1">
            <span>Payment Method</span>
            <span className="font-medium">
              {order.payment_mode === 'wallet' ? '💳 Wallet' : '💵 Cash on Delivery'}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Payment Status</span>
            <span className={`px-2 py-1 text-xs rounded ${order.payment_status === 'paid' ? 'bg-success text-white' : 'bg-warning text-white'}`}>
              {order.payment_status}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Total Amount</span>
            <span className="font-bold text-primary text-base">₹{orderAmount}</span>
          </div>
          {order.delivery_notes && (
            <div className="mt-3 pt-2 border-t border-divider text-sm">
              <span className="font-medium">Delivery Notes:</span>
              <div className="text-secondary">{order.delivery_notes}</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {order.status === 'pending' && (
            <Button variant="outline-danger" onClick={cancelOrder}>Cancel Order</Button>
          )}
          {order.status === 'delivered' && (
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => navigate(`/order/${order.order_id}/rate`)}>Rate Order</Button>
              <Button variant="outline" className="flex-1" onClick={() => navigate(`/order/${order.order_id}/return`)}>Return Items</Button>
            </div>
          )}
          <Button
            variant="outline"
            onClick={() => navigate(`/order/${order.order_id}/messages`)}
            className="flex items-center gap-2"
          >
            💬 View Messages
            {messages.length > 0 && (
              <span className="ml-1 bg-primary text-white rounded-full px-2 text-xs">{messages.length}</span>
            )}
          </Button>
        </div>

        {/* Help Section */}
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg">🤝</span>
            <div>
              <div className="font-semibold text-sm">Need Help with this Order?</div>
              <div className="text-xs text-secondary">
                Our support team is here to help with any questions or issues.
              </div>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => navigate('/support')}
            className="mt-2"
          >
            Contact Support
          </Button>
        </div>
      </ScreenContainer>
    </MobileLayout>
  );
}
