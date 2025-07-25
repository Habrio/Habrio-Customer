// File: src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import EmptyState from '../components/organisms/EmptyState';
import BillSummarySection from '../components/organisms/BillSummarySection';
import CartItemCard from '../components/organisms/CartItemCard';
import Button from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Loader';
import { get, post } from '../utils/api';

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    fetchCart(token);
  }, []);

  async function fetchCart(token) {
    setLoading(true);
    try {
      const { status, cart, total_price, total_savings } = await get('/cart/view', { token });
      if (status === 'success') {
        setItems(cart);
        setTotals({ total_price, total_savings });
      }
    } catch {}
    setLoading(false);
  }

  async function handleClear() {
    if (!window.confirm('Clear all items?')) return;
    setClearing(true);
    try {
      const token = localStorage.getItem('auth_token');
      await post('/cart/clear', null, { token });
      fetchCart(token);
    } catch {}
    setClearing(false);
  }

  if (loading) {
    return (
      <MobileLayout showNav activeTab="cart">
        <PageHeader title="My Cart" />
        <ScreenContainer>
          <div className="flex flex-col items-center py-12">
            <Spinner size={40} className="mb-4 text-primary" />
            <p className="text-text-secondary">Loading cart…</p>
          </div>
        </ScreenContainer>
      </MobileLayout>
    );
  }

  if (items.length === 0) {
    return (
      <MobileLayout showNav activeTab="cart">
        <PageHeader title="My Cart" />
        <ScreenContainer>
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            description="Add items from shops to get started."
            actionLabel="Browse Shops"
            onAction={() => navigate('/shops')}
          />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showNav activeTab="cart">
      <PageHeader title={`My Cart (${items.length})`} />
      <ScreenContainer>
        <div className="flex justify-end mb-4 px-4">
          <button
            disabled={clearing}
            onClick={handleClear}
            className="text-sm text-error font-medium"
          >
            {clearing ? 'Clearing…' : 'Clear All'}
          </button>
        </div>

        <div className="space-y-4 px-4">
          {items.map(item => (
            <CartItemCard
              key={item.id}
              item={item}
              onQuantityChange={(qty) => {/* call update API then refresh */}}
              onRemove={() => {/* call remove API then refresh */}}
            />
          ))}
        </div>

        <div className="px-4 mt-6">
          <BillSummarySection
            items={[
              { label: 'Subtotal', amount: totals.total_price + totals.total_savings },
              { label: 'Savings', amount: totals.total_savings, isDiscount: true },
              { label: 'Delivery Fee', amount: 0, isFree: true },
            ]}
            totalAmount={totals.total_price}
            actionLabel={`Proceed to Checkout • ₹${totals.total_price}`}
            onAction={() => navigate('/checkout')}
          />
        </div>
      </ScreenContainer>
    </MobileLayout>
  );
}
