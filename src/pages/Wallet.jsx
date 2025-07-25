import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import PageHeader from '../components/molecules/PageHeader';

export default function Wallet() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchWallet();
    fetchTransactions();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await fetch(`${backendUrl}/wallet`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setBalance(data.balance);
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${backendUrl}/wallet/history`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setTransactions(data.transactions.slice(0, 5)); // Show only recent 5
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
    setLoading(false);
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'credit':
      case 'recharge': return '💰';
      case 'debit': return '💸';
      case 'refund': return '↩️';
      default: return '💳';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'credit':
      case 'recharge':
      case 'refund': return 'var(--success-color)';
      case 'debit': return 'var(--error-color)';
      default: return 'var(--text-secondary)';
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
          <p>Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <PageHeader title="My Wallet" />

      {/* Wallet Balance Card */}
      <div style={{
        background: 'var(--primary-gradient)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px' }}>💳</span>
            <span style={{ fontSize: '16px', opacity: 0.9 }}>Wallet Balance</span>
          </div>
          
          <h1 style={{ margin: '0 0 20px 0', fontSize: '32px', fontWeight: '700' }}>
            ₹{balance.toFixed(2)}
          </h1>
          
          <button
            onClick={() => navigate('/wallet/add')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginRight: '12px'
            }}
          >
            + Add Money
          </button>
          
          <button
            onClick={() => navigate('/wallet/history')}
            style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            View History
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <button
            onClick={() => navigate('/wallet/add')}
            style={{
              background: 'var(--background-soft)',
              border: '1px solid var(--divider)',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Add Money</p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Top up your wallet
            </p>
          </button>
          
          <button
            onClick={() => navigate('/wallet/history')}
            style={{
              background: 'var(--background-soft)',
              border: '1px solid var(--divider)',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Transaction History</p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              View all transactions
            </p>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            Recent Transactions
          </h3>
          {transactions.length > 0 && (
            <button
              onClick={() => navigate('/wallet/history')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-color)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              View All
            </button>
          )}
        </div>

        {transactions.length === 0 ? (
          <div style={{
            background: 'var(--background-soft)',
            border: '1px solid var(--divider)',
            borderRadius: '12px',
            padding: '32px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
              No transactions yet
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
              Your transaction history will appear here
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                style={{
                  background: 'var(--background-soft)',
                  border: '1px solid var(--divider)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'white',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  {getTransactionIcon(transaction.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', textTransform: 'capitalize' }}>
                    {transaction.type === 'recharge' ? 'Money Added' : 
                     transaction.type === 'debit' ? 'Payment' :
                     transaction.type === 'refund' ? 'Refund' : transaction.type}
                  </p>
                  <p style={{ margin: '0 0 2px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {transaction.reference || 'Wallet transaction'}
                  </p>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {new Date(transaction.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <p style={{ 
                    margin: '0 0 2px 0', 
                    fontSize: '16px', 
                    fontWeight: '600',
                    color: getTransactionColor(transaction.type)
                  }}>
                    {transaction.type === 'debit' ? '-' : '+'}₹{transaction.amount}
                  </p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '10px', 
                    color: 'var(--success-color)',
                    textTransform: 'uppercase',
                    fontWeight: '500'
                  }}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Notice */}
      <div style={{
        background: 'rgba(252, 100, 79, 0.1)',
        border: '1px solid rgba(252, 100, 79, 0.2)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '16px', marginTop: '2px' }}>🔒</span>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: 'var(--primary-color)' }}>
              Your money is safe
            </h4>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              All transactions are secured with bank-grade encryption. Your wallet balance is protected and can be refunded anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}