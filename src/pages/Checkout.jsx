// File: src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import SectionCard from '../components/molecules/SectionCard';
import Button from '../components/atoms/Button';
import { BodyText, Heading } from '../components/atoms/Typography';
import EmptyState from '../components/organisms/EmptyState';
import PaymentMethodSelector from '../components/organisms/PaymentMethodSelector';
import OrderSummarySection from '../components/organisms/OrderSummarySection';
import { get, post } from '../utils/api';

export default function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentMode, setPaymentMode] = useState('wallet');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [placing, setPlacing] = useState(false);
  const [summary, setSummary] = useState({ subtotal: 0, savings: 0, total: 0 });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    Promise.all([loadCart(token), loadWallet(token)]).finally(() =>
      setLoading(false)
    );
  }, []);

  async function loadCart(token) {
    try {
      const { status, cart, total_price, total_savings } = await get('/consumer/cart/view', { token });
      if (status === 'success') {
        if (cart.length === 0) navigate('/cart');
        setCartItems(cart);
        setSummary({
          subtotal: total_price + total_savings,
          savings: total_savings,
          total: total_price,
        });
      }
    } catch { /* ignore */ }
  }

  async function loadWallet(token) {
    try {
      const { status, balance } = await get('/consumer/wallet', { token });
      if (status === 'success') setWalletBalance(balance);
    } catch { /* ignore */ }
  }

  async function handlePlaceOrder() {
    if (paymentMode === 'wallet' && walletBalance < summary.total) {
      return alert('Insufficient wallet balance. Please add money.');
    }
    setPlacing(true);
    try {
      const token = localStorage.getItem('auth_token');
      const body = { payment_mode: paymentMode, delivery_notes: deliveryNotes };
      const { status, order_id, message } = await post('/consumer/order/confirm', body, { token });
      if (status === 'success') {
        navigate(`/order/${order_id}`);
      } else {
        alert(message || 'Failed to place order');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setPlacing(false);
    }
  }

  if (loading) {
    return (
      <MobileLayout showNav activeTab="cart">
        <PageHeader title="Checkout" />
        <ScreenContainer className="flex-center">
          <Heading level={3}>Loading checkout…</Heading>
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showNav activeTab="cart">
      <PageHeader title="Checkout" />
      <ScreenContainer className="space-y-6">
        {/* Delivery Address */}
        <SectionCard>
          <Heading level={4}>Delivery Address</Heading>
          <BodyText className="mt-1 text-text-secondary">
            Your registered address will be used for delivery.
          </BodyText>
        </SectionCard>

        {/* Order Items */}
        <OrderSummarySection items={cartItems} />

        {/* Payment Method */}
        <PaymentMethodSelector
          walletBalance={walletBalance}
          value={paymentMode}
          onChange={setPaymentMode}
          onAddMoney={() => navigate('/wallet/add')}
        />

        {/* Delivery Notes */}
        <SectionCard title="Delivery Instructions (Optional)">
          <textarea
            rows={3}
            value={deliveryNotes}
            onChange={e => setDeliveryNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Any special instructions…"
          />
        </SectionCard>

        {/* Bill Summary */}
        <SectionCard>
          <div className="space-y-2">
            <div className="flex justify-between">
              <BodyText>Subtotal</BodyText>
              <BodyText>₹{summary.subtotal}</BodyText>
            </div>
            {summary.savings > 0 && (
              <div className="flex justify-between text-success">
                <BodyText>Savings</BodyText>
                <BodyText>-₹{summary.savings}</BodyText>
              </div>
            )}
            <div className="flex justify-between">
              <BodyText>Delivery Fee</BodyText>
              <BodyText>FREE</BodyText>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <BodyText>Total</BodyText>
              <BodyText>₹{summary.total}</BodyText>
            </div>
          </div>
        </SectionCard>

        {/* Place Order */}
        <Button
          onClick={handlePlaceOrder}
          disabled={placing || (paymentMode === 'wallet' && walletBalance < summary.total)}
          className="w-full"
        >
          {placing ? 'Placing Order…' : `Place Order • ₹${summary.total}`}
        </Button>
      </ScreenContainer>
    </MobileLayout>
  );
}
