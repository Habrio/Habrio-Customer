import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import PageHeader from '../components/molecules/PageHeader';

export default function WalletHistory() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${backendUrl}/wallet/history`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setTransactions(data.transactions);
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

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'credit') return ['credit', 'recharge', 'refund'].includes(transaction.type);
    if (filter === 'debit') return transaction.type === 'debit';
    return true;
  });

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
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <PageHeader title="Transaction History" />

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '20px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {[
          { key: 'all', label: 'All' },
          { key: 'credit', label: 'Money In' },
          { key: 'debit', label: 'Money Out' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              background: filter === tab.key ? 'var(--primary-gradient)' : 'var(--background-soft)',
              color: filter === tab.key ? 'white' : 'var(--text-primary)',
              border: filter === tab.key ? 'none' : '1px solid var(--divider)',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              minWidth: 'fit-content'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
            No transactions found
          </h3>
          <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
            Your transaction history will appear here once you start using your wallet
          </p>
          <button
            onClick={() => navigate('/wallet/add')}
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
            Add Money
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Group by Date */}
          {filteredTransactions.reduce((grouped, transaction) => {
            const date = new Date(transaction.created_at).toDateString();
            if (!grouped[date]) {
              grouped[date] = [];
            }
            grouped[date].push(transaction);
            return grouped;
          }, {}) && 
            Object.entries(
              filteredTransactions.reduce((grouped, transaction) => {
                const date = new Date(transaction.created_at).toDateString();
                if (!grouped[date]) {
                  grouped[date] = [];
                }
                grouped[date].push(transaction);
                return grouped;
              }, {})
            ).map(([date, dayTransactions]) => (
              <div key={date} style={{ marginBottom: '16px' }}>
                <h4 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {new Date(date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </h4>
                
                {dayTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    style={{
                      background: 'var(--background-soft)',
                      border: '1px solid var(--divider)',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'white',
                      borderRadius: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>
                        {transaction.type === 'recharge' ? 'Money Added' : 
                         transaction.type === 'debit' ? 'Payment' :
                         transaction.type === 'refund' ? 'Refund Received' : 
                         transaction.type === 'credit' ? 'Money Credited' : transaction.type}
                      </p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {transaction.reference || 'Wallet transaction'}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {new Date(transaction.created_at).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '18px', 
                        fontWeight: '700',
                        color: getTransactionColor(transaction.type)
                      }}>
                        {transaction.type === 'debit' ? '-' : '+'}₹{parseFloat(transaction.amount).toFixed(2)}
                      </p>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '10px', 
                        color: transaction.status === 'success' ? 'var(--success-color)' : 'var(--error-color)',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: transaction.status === 'success' ? 'rgba(0, 199, 117, 0.1)' : 'rgba(255, 59, 48, 0.1)'
                      }}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      )}

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}