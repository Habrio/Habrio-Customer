import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import '../styles/design-system.css';
import PageHeader from '../components/molecules/PageHeader';

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
    <div className="screen-content">
      {/* Header */}
      <PageHeader title="Add Money" />

      {/* Add Money Card */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 mb-6 text-white text-center">
        <div className="text-5xl mb-4">💰</div>
        <h3 className="font-semibold text-lg mb-1">Add Money to Wallet</h3>
        <p className="text-sm opacity-90">Secure and instant wallet recharge</p>
      </div>

      {/* Amount Input */}
      <div className="bg-[var(--background-soft)] border border-[var(--divider)] rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-base mb-4">Enter Amount</h3>

        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-text-secondary">₹</span>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full py-4 pl-10 pr-4 border border-[var(--divider)] rounded-lg text-xl font-semibold text-center bg-white"
          />
        </div>

        {/* Quick Amount Buttons */}
        <div>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>
            Quick Select
          </p>
          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => handleQuickAmount(quickAmount)}
                className={`rounded-md py-3 text-sm font-medium border ${amount === quickAmount.toString() ? 'bg-primary text-white border-primary' : 'bg-white text-text-primary border-[var(--divider)]'}`}
              >
                ₹{quickAmount}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          Payment Method
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            background: 'white',
            border: '2px solid var(--primary-color)',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'white'
              }}></div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '600' }}>
                💳 UPI / Cards / NetBanking
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                Pay securely using UPI, Debit/Credit cards or NetBanking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div style={{
        background: 'rgba(0, 199, 117, 0.1)',
        border: '1px solid rgba(0, 199, 117, 0.2)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '16px', marginTop: '2px' }}>🔒</span>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: 'var(--success-color)' }}>
              100% Secure Payment
            </h4>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <li>All transactions are encrypted and secure</li>
              <li>Money will be instantly added to your wallet</li>
              <li>No additional charges or hidden fees</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Money Button */}
      <button
        onClick={addMoney}
        disabled={loading || !amount || parseFloat(amount) < 1}
        className={`w-full rounded-lg py-4 text-lg font-semibold mb-5 text-white ${loading || !amount || parseFloat(amount) < 1 ? 'bg-text-disabled cursor-not-allowed opacity-60' : 'bg-gradient-to-r from-primary to-primary-dark'}`}
      >
        {loading ? 'Processing...' : `Add ₹${amount || '0'} to Wallet`}
      </button>

      {/* Terms */}
      <p className="text-[11px] text-text-secondary text-center leading-tight mb-5">
        By proceeding, you agree to our{' '}
        <span className="text-primary font-medium">Terms & Conditions</span>
        {' '}and{' '}
        <span className="text-primary font-medium">Refund Policy</span>
      </p>

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}