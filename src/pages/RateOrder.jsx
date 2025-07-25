import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import PageHeader from '../components/molecules/PageHeader';

export default function RateOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
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

  const submitRating = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${backendUrl}/order/rate/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          rating: rating,
          review: review.trim()
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        alert('Thank you for your rating!');
        navigate(`/order/${orderId}`);
      } else {
        alert(data.message || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
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
            The order you're trying to rate doesn't exist
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
      <PageHeader title="Rate Your Order" />

      {/* Rating Header */}
      <div style={{
        background: 'var(--primary-gradient)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
          How was your experience?
        </h3>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
          Your feedback helps us improve our service
        </p>
      </div>

      {/* Order Summary */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
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
            <p style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '600' }}>
              Order #{order.order_id}
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Shop #{order.shop_id} • {order.items.length} items • ₹{order.final_amount || order.total_amount}
            </p>
          </div>
        </div>
      </div>

      {/* Rating Stars */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
          Rate your experience
        </h3>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '16px'
        }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '32px',
                cursor: 'pointer',
                color: star <= rating ? '#FFD700' : '#E0E0E0',
                transition: 'color 0.2s'
              }}
            >
              ⭐
            </button>
          ))}
        </div>
        
        {rating > 0 && (
          <p style={{ 
            margin: 0, 
            fontSize: '16px', 
            fontWeight: '600',
            color: 'var(--primary-color)'
          }}>
            {getRatingText(rating)}
          </p>
        )}
      </div>

      {/* Review Text */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
          Share your feedback (Optional)
        </h3>
        <textarea
          placeholder="Tell us about your experience with the order, delivery, and product quality..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            border: '1px solid var(--divider)',
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
          maxLength={500}
        />
        <p style={{ 
          margin: '8px 0 0 0', 
          fontSize: '12px', 
          color: 'var(--text-secondary)',
          textAlign: 'right'
        }}>
          {review.length}/500 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={submitRating}
        disabled={submitting || rating === 0}
        style={{
          background: submitting || rating === 0 
            ? 'var(--text-disabled)' 
            : 'var(--primary-gradient)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: submitting || rating === 0 ? 'not-allowed' : 'pointer',
          width: '100%',
          marginBottom: '20px',
          opacity: submitting || rating === 0 ? 0.6 : 1
        }}
      >
        {submitting ? 'Submitting Rating...' : 'Submit Rating'}
      </button>

      {/* Skip Option */}
      <button
        onClick={() => navigate(`/order/${orderId}`)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          fontSize: '14px',
          cursor: 'pointer',
          width: '100%',
          padding: '8px',
          marginBottom: '20px'
        }}
      >
        Skip for now
      </button>

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}