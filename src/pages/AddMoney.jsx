// File: src/pages/AddMoney.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import SectionCard from '../components/molecules/SectionCard';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { BodyText, Heading } from '../components/atoms/Typography';
import EmptyState from '../components/organisms/EmptyState';

export default function AddMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  async function handleAddMoney() {
    const value = parseFloat(amount);
    if (!value || value < 1) {
      alert('Please enter a valid amount (minimum ₹1)');
      return;
    }
    if (value > 50000) {
      alert('Maximum amount allowed is ₹50,000');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wallet/load`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ amount: value, reference: 'Manual wallet top-up' }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        navigate('/wallet');
      } else {
        alert(data.message || 'Failed to add money');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <MobileLayout showNav activeTab="profile">
      <PageHeader title="Add Money" />
      <ScreenContainer>
        {/* Intro Card */}
        <SectionCard className="bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="flex flex-col items-center space-y-2 py-6">
            <div className="text-5xl">💰</div>
            <Heading level={3} className="text-lg">
              Add Money to Wallet
            </Heading>
            <BodyText className="text-sm opacity-90">
              Secure and instant wallet recharge
            </BodyText>
          </div>
        </SectionCard>

        {/* Amount Input */}
        <SectionCard>
          <Heading level={4} className="mb-4">
            Enter Amount
          </Heading>
          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">₹</span>
            <Input
              type="number"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="pl-10 text-center text-xl font-semibold py-3"
            />
          </div>
          <BodyText className="mb-2 text-sm text-text-secondary font-medium">
            Quick Select
          </BodyText>
          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map(val => (
              <Button
                key={val}
                variant={amount === String(val) ? 'primary' : 'outline'}
                onClick={() => setAmount(String(val))}
                className="py-2 text-sm"
              >
                ₹{val}
              </Button>
            ))}
          </div>
        </SectionCard>

        {/* Payment Method */}
        <SectionCard title="Payment Method">
          {/* For now only one method; extendable */}
          <div className="flex items-center space-x-3 p-4 bg-white border-2 border-primary rounded-lg">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div>
              <BodyText size="sm" className="font-semibold">
                💳 UPI / Cards / NetBanking
              </BodyText>
              <BodyText size="xs" color="secondary">
                Pay securely using UPI, Debit/Credit cards or NetBanking
              </BodyText>
            </div>
          </div>
        </SectionCard>

        {/* Security Notice */}
        <SectionCard className="bg-green-50 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="text-lg mt-1">🔒</div>
            <div>
              <BodyText size="sm" className="font-semibold text-green-700 mb-1">
                100% Secure Payment
              </BodyText>
              <ul className="list-disc pl-5 text-xs text-text-secondary space-y-1">
                <li>All transactions are encrypted and secure</li>
                <li>Money will be instantly added to your wallet</li>
                <li>No additional charges or hidden fees</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Action Button */}
        <Button
          className="w-full my-4"
          onClick={handleAddMoney}
          disabled={loading || !amount || parseFloat(amount) < 1}
        >
          {loading ? 'Processing...' : `Add ₹${amount || '0'} to Wallet`}
        </Button>

        <BodyText size="xs" color="secondary" className="text-center mb-6">
          By proceeding, you agree to our{' '}
          <span className="text-primary font-medium">Terms & Conditions</span> and{' '}
          <span className="text-primary font-medium">Refund Policy</span>
        </BodyText>
      </ScreenContainer>
    </MobileLayout>
  );
}
