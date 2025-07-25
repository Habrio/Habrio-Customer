import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import SectionCard from '../components/molecules/SectionCard';

import Screen from "../components/layout/Screen";
export default function AddMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  
  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  const handleQuickAmount = (quickAmount) => {
    setAmount(quickAmount.toString());
  };

  const addMoney = async () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum < 1) {
      alert('Please enter a valid amount (minimum ₹1)');
      return;
    }
    
    if (amountNum > 50000) {
      alert('Maximum amount allowed is ₹50,000');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/wallet/load`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ 
          amount: amountNum,
          reference: 'Manual wallet top-up'
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        alert(`₹${amountNum} added successfully to your wallet!`);
        navigate('/wallet');
      } else {
        alert(data.message || 'Failed to add money');
      }
    } catch (error) {
      console.error('Error adding money:', error);
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Screen>
      {/* Header */}
      <PageHeader title="Add Money" />

      {/* Add Money Card */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 mb-6 text-white text-center">
        <div className="text-5xl mb-4">💰</div>
        <h3 className="font-semibold text-lg mb-1">Add Money to Wallet</h3>
        <p className="text-sm opacity-90">Secure and instant wallet recharge</p>
      </div>

      {/* Amount Input */}
      <SectionCard>
        <h3 className="font-semibold text-base mb-4">Enter Amount</h3>
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-text-secondary">₹</span>
          <Input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 text-xl font-semibold text-center bg-white"
          />
        </div>
        <p className="text-sm font-medium text-text-secondary mb-3">Quick Select</p>
        <div className="grid grid-cols-3 gap-2">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => handleQuickAmount(quickAmount)}
              className={`rounded-md py-2 text-sm font-medium border ${amount === quickAmount.toString() ? 'bg-primary text-white border-primary' : 'bg-white text-text-primary border-gray-300'}`}
            >
              ₹{quickAmount}
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Payment Methods */}
      <SectionCard>
        <h3 className="font-semibold text-base mb-4">Payment Method</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg bg-white">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm mb-0">💳 UPI / Cards / NetBanking</p>
              <p className="text-xs text-text-secondary">Pay securely using UPI, Debit/Credit cards or NetBanking</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Security Notice */}
      <SectionCard className="border-green-200 bg-green-50">
        <div className="flex items-start gap-3">
          <span className="text-lg mt-0.5">🔒</span>
          <div>
            <h4 className="font-semibold text-sm text-green-600 mb-1">100% Secure Payment</h4>
            <ul className="list-disc pl-4 text-xs text-text-secondary space-y-1">
              <li>All transactions are encrypted and secure</li>
              <li>Money will be instantly added to your wallet</li>
              <li>No additional charges or hidden fees</li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Add Money Button */}
      <Button
        onClick={addMoney}
        disabled={loading || !amount || parseFloat(amount) < 1}
        className={`mb-5 ${loading || !amount || parseFloat(amount) < 1 ? 'bg-text-disabled cursor-not-allowed opacity-60' : 'bg-gradient-to-r from-primary to-primary-dark'}`}
      >
        {loading ? 'Processing...' : `Add ₹${amount || '0'} to Wallet`}
      </Button>

      {/* Terms */}
      <p className="text-[11px] text-text-secondary text-center leading-tight mb-5">
        By proceeding, you agree to our{' '}
        <span className="text-primary font-medium">Terms & Conditions</span>
        {' '}and{' '}
        <span className="text-primary font-medium">Refund Policy</span>
      </p>

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </Screen>
  );
}