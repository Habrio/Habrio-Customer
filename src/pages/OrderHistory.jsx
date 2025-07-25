// File: src/pages/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import TabSelector from '../components/organisms/TabSelector';
import EmptyState from '../components/organisms/EmptyState';
import OrderCard from '../components/organisms/OrderCard';
import { Spinner } from '../components/atoms/Loader';
import { get } from '../utils/api';

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    fetchOrders(token);
  }, []);

  async function fetchOrders(token) {
    try {
      const { status, orders } = await get('/order/history', { token });
      if (status === 'success') setOrders(orders);
    } catch {
      // handle error silently
    } finally {
      setLoading(false);
    }
  }

  function filterOrders() {
    return orders.filter(o => {
      if (filter === 'all') return true;
      if (filter === 'active') return ['pending', 'accepted', 'confirmed'].includes(o.status);
      if (filter === 'completed') return o.status === 'delivered';
      if (filter === 'cancelled') return o.status === 'cancelled';
      return true;
    });
  }

  const filtered = filterOrders();

  if (loading) {
    return (
      <MobileLayout>
        <PageHeader title="My Orders" />
        <ScreenContainer className="flex-center">
          <Spinner size={40} className="text-primary" />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  if (filtered.length === 0) {
    return (
      <MobileLayout>
        <PageHeader title="My Orders" />
        <ScreenContainer>
          <EmptyState
            icon="📦"
            title={filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
            description={
              filter === 'all'
                ? 'Start shopping to place your first order.'
                : `You don't have any ${filter} orders.`
            }
            actionLabel={filter === 'all' ? 'Start Shopping' : null}
            onAction={filter === 'all' ? () => navigate('/shops') : undefined}
          />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageHeader title="My Orders" />
      <ScreenContainer className="space-y-4">
        <TabSelector
          tabs={tabs}
          selectedKey={filter}
          onSelect={setFilter}
        />
        <div className="space-y-3">
          {filtered.map(order => (
            <OrderCard
              key={order.order_id}
              order={order}
              onClick={() => navigate(`/order/${order.order_id}`)}
            />
          ))}
        </div>
      </ScreenContainer>
    </MobileLayout>
  );
}
