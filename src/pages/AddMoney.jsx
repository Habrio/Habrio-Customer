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
      <div style={{
        background: 'var(--primary-gradient)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
          Add Money to Wallet
        </h3>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
          Secure and instant wallet recharge
        </p>
      </div>

      {/* Amount Input */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          Enter Amount
        </h3>
        
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <span style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--text-secondary)'
          }}>
            ₹
          </span>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 16px 16px 40px',
              border: '1px solid var(--divider)',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '600',
              textAlign: 'center',
              background: 'white'
            }}
          />
        </div>

        {/* Quick Amount Buttons */}
        <div>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>
            Quick Select
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '8px'
          }}>
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => handleQuickAmount(quickAmount)}
                style={{
                  background: amount === quickAmount.toString() ? 'var(--primary-gradient)' : 'white',
                  color: amount === quickAmount.toString() ? 'white' : 'var(--text-primary)',
                  border: amount === quickAmount.toString() ? 'none' : '1px solid var(--divider)',
                  borderRadius: '8px',
                  padding: '12px 8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
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
        style={{
          background: loading || !amount || parseFloat(amount) < 1 
            ? 'var(--text-disabled)' 
            : 'var(--primary-gradient)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: loading || !amount || parseFloat(amount) < 1 ? 'not-allowed' : 'pointer',
          width: '100%',
          marginBottom: '20px',
          opacity: loading || !amount || parseFloat(amount) < 1 ? 0.6 : 1
        }}
      >
        {loading ? 'Processing...' : `Add ₹${amount || '0'} to Wallet`}
      </button>

      {/* Terms */}
      <p style={{ 
        margin: '0 0 20px 0', 
        fontSize: '11px', 
        color: 'var(--text-secondary)', 
        textAlign: 'center',
        lineHeight: '1.4'
      }}>
        By proceeding, you agree to our{' '}
        <span style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Terms & Conditions</span>
        {' '}and{' '}
        <span style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Refund Policy</span>
      </p>

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}