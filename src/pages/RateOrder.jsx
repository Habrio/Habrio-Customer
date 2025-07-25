// File: src/pages/RateOrder.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import EmptyState from '../components/organisms/EmptyState';
import Button from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Loader';
import clsx from 'clsx';
import { get } from '../utils/api';

export default function RateOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    fetchOrder(token);
  }, [orderId, navigate]);

  async function fetchOrder(token) {
    try {
      const { status, orders } = await get('/order/history', { token });
      if (status === 'success') {
        const o = orders.find(o => o.order_id === +orderId);
        if (o) {
          setOrder(o);
        } else {
          navigate('/orders');
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  function getRatingText(r) {
    return ['','Poor','Fair','Good','Very Good','Excellent'][r] || '';
  }

  async function submitRating() {
    if (rating === 0) return;
    setSubmitting(true);
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order/rate/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ rating, review: review.trim() })
      });
      const data = await res.json();
      if (data.status === 'success') {
        navigate(`/order/${orderId}`);
      } else {
        alert(data.message || 'Failed to submit rating');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <MobileLayout>
        <PageHeader title="Rate Your Order" />
        <ScreenContainer className="flex items-center justify-center">
          <Spinner size={40} className="text-primary" />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  if (!order) {
    return (
      <MobileLayout>
        <PageHeader title="Rate Your Order" />
        <ScreenContainer>
          <EmptyState
            icon="📦"
            title="Order not found"
            description="The order you're trying to rate doesn't exist."
            actionLabel="Back to Orders"
            onAction={() => navigate('/orders')}
          />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageHeader title="Rate Your Order" />
      <ScreenContainer className="space-y-6">
        {/* Prompt */}
        <div className="bg-primary rounded-lg p-6 text-center text-white">
          <div className="text-4xl mb-2">⭐</div>
          <p className="text-lg font-semibold mb-1">How was your experience?</p>
          <p className="text-sm opacity-90">Your feedback helps us improve our service.</p>
        </div>

        {/* Order Summary */}
        <div className="bg-background-soft border border-divider rounded-lg p-4 flex items-center gap-4">
          <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white text-xl">
            🏪
          </div>
          <div>
            <p className="font-medium">Order #{order.order_id}</p>
            <p className="text-sm text-secondary">
              {order.items.length} items • ₹{order.final_amount || order.total_amount}
            </p>
          </div>
        </div>

        {/* Star Rating */}
        <div className="text-center">
          <div className="flex justify-center gap-2 mb-2">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-3xl focus:outline-none"
              >
                <span className={clsx(
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                )}>
                  ⭐
                </span>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-primary font-medium">{getRatingText(rating)}</p>
          )}
        </div>

        {/* Review Textarea */}
        <div>
          <label className="block mb-1 font-medium">Share your feedback (optional)</label>
          <textarea
            rows={4}
            value={review}
            onChange={e => setReview(e.target.value)}
            className="w-full p-3 border border-divider rounded-lg resize-y focus:outline-none"
            placeholder="Tell us about your experience..."
          />
          <p className="text-xs text-secondary text-right">
            {review.length}/500
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={submitRating}
            disabled={rating === 0 || submitting}
            className="btn-full"
          >
            {submitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
          <button
            onClick={() => navigate(`/order/${orderId}`)}
            className="w-full text-center text-secondary text-sm"
          >
            Skip for now
          </button>
        </div>
      </ScreenContainer>
    </MobileLayout>
  );
}
