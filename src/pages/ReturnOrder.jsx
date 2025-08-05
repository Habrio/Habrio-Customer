// File: src/pages/ReturnOrder.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Loader';
import EmptyState from '../components/organisms/EmptyState';
import { get, post } from '../utils/api';

export default function ReturnOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchOrder();
  }, [orderId, navigate]);

  async function fetchOrder() {
    try {
      const { status, orders } = await get('/consumer/order/history', {
        token: localStorage.getItem('auth_token')
      });
      if (status === 'success') {
        const found = orders.find(o => o.order_id === Number(orderId));
        setOrder(found || null);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  function toggleItem(itemId) {
    setSelectedItems(prev => {
      const next = { ...prev };
      if (next[itemId]) {
        delete next[itemId];
      } else {
        next[itemId] = 1;
      }
      return next;
    });
  }

  function changeQuantity(itemId, qty) {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: Math.max(1, Math.min(qty, order.items.find(i => i.item_id === itemId).quantity))
    }));
  }

  async function submitReturn() {
    if (Object.keys(selectedItems).length === 0) {
      alert('Please select at least one item to return.');
      return;
    }
    if (!reason.trim()) {
      alert('Please provide a reason for return.');
      return;
    }
    setSubmitting(true);
    try {
      const items = Object.entries(selectedItems).map(([item_id, quantity]) => ({
        item_id: Number(item_id),
        quantity
      }));
      const { status, message } = await post(
        `/consumer/orders/${orderId}/return/raise`,
        { items, reason: reason.trim() },
        { token: localStorage.getItem('auth_token') }
      );
      if (status === 'success') {
        alert('Return request sent successfully.');
        navigate(`/order/${orderId}`);
      } else {
        alert(message || 'Failed to send return request.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <MobileLayout showNav activeTab="orders">
        <PageHeader title="Return Order" />
        <ScreenContainer className="flex justify-center items-center h-full">
          <Spinner size={48} className="text-primary" />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  if (!order) {
    return (
      <MobileLayout showNav activeTab="orders">
        <PageHeader title="Return Order" />
        <ScreenContainer className="pt-10">
          <EmptyState
            icon="⚠️"
            title="Order not found"
            description="We couldn't find that order."
          />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  if (order.status !== 'delivered') {
    return (
      <MobileLayout showNav activeTab="orders">
        <PageHeader title="Return Order" />
        <ScreenContainer className="pt-10">
          <EmptyState
            icon="🚫"
            title="Cannot return this order"
            description="Only delivered orders can be returned."
          />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showNav activeTab="orders">
      <PageHeader title="Return Order" />
      <ScreenContainer className="space-y-6">
        {/* Order Items */}
        <div className="space-y-4">
          <h4 className="font-semibold">Select items to return</h4>
          {order.items.map(item => (
            <div key={item.item_id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!selectedItems[item.item_id]}
                onChange={() => toggleItem(item.item_id)}
                className="form-checkbox"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-secondary">
                  Qty: {item.quantity} &middot; ₹{item.unit_price.toFixed(2)} each
                </p>
              </div>
              {selectedItems[item.item_id] && (
                <Input
                  type="number"
                  min={1}
                  max={item.quantity}
                  value={selectedItems[item.item_id]}
                  onChange={e => changeQuantity(item.item_id, Number(e.target.value))}
                  className="w-16"
                />
              )}
            </div>
          ))}
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <h4 className="font-semibold">Reason for return</h4>
          <textarea
            placeholder="Enter your reason..."
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full bg-background-soft border border-divider rounded p-2 h-24 resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          onClick={submitReturn}
          disabled={submitting}
          className="w-full"
        >
          {submitting ? 'Submitting...' : 'Send Return Request'}
        </Button>
      </ScreenContainer>
    </MobileLayout>
  );
}
