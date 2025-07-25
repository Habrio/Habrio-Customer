// File: src/pages/WalletHistory.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Loader';
import EmptyState from '../components/organisms/EmptyState';
import { get } from '../utils/api';

function getTransactionIcon(type) {
  switch (type) {
    case 'credit':
    case 'recharge': return '💰';
    case 'debit': return '💸';
    case 'refund': return '↩️';
    default: return '💳';
  }
}

function getTransactionColor(type) {
  switch (type) {
    case 'credit':
    case 'recharge':
    case 'refund': return 'text-success';
    case 'debit': return 'text-error';
    default: return 'text-secondary';
  }
}

export default function WalletHistory() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    fetchTransactions(token);
  }, [navigate]);

  async function fetchTransactions(token) {
    try {
      const { status, transactions } = await get('/wallet/history', { token });
      if (status === 'success') setTransactions(transactions);
    } catch {
      // fail silent
    } finally {
      setLoading(false);
    }
  }

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'credit') return ['credit', 'recharge', 'refund'].includes(t.type);
    if (filter === 'debit') return t.type === 'debit';
    return true;
  });

  // Group by date
  const grouped = filteredTransactions.reduce((acc, tx) => {
    const date = new Date(tx.created_at).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(tx);
    return acc;
  }, {});

  if (loading) {
    return (
      <MobileLayout>
        <PageHeader title="Transaction History" />
        <ScreenContainer className="flex justify-center py-20">
          <Spinner size={48} className="text-primary" />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageHeader title="Transaction History" />
      <ScreenContainer className="space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 pb-2 overflow-x-auto">
          {[
            { key: 'all', label: 'All' },
            { key: 'credit', label: 'Money In' },
            { key: 'debit', label: 'Money Out' }
          ].map(tab => (
            <Button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`whitespace-nowrap rounded-full ${filter === tab.key ? 'bg-primary text-white' : 'bg-background-soft text-text-primary border border-divider'}`}
              size="sm"
              variant={filter === tab.key ? 'primary' : 'soft'}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <EmptyState
            icon="📝"
            title="No transactions found"
            description="Your transaction history will appear here once you start using your wallet"
            actionLabel="Add Money"
            onAction={() => navigate('/wallet/add')}
          />
        ) : (
          <div className="flex flex-col gap-6">
            {Object.entries(grouped).map(([date, txs]) => (
              <div key={date}>
                <h4 className="text-xs font-semibold text-secondary uppercase mb-2 tracking-wide">
                  {new Date(date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </h4>
                <div className="flex flex-col gap-2">
                  {txs.map(tx => (
                    <div
                      key={tx.id}
                      className="flex items-center gap-3 bg-background-soft border border-divider rounded-lg p-4"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-xl">
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold capitalize">
                          {tx.type === 'recharge'
                            ? 'Money Added'
                            : tx.type === 'debit'
                            ? 'Payment'
                            : tx.type === 'refund'
                            ? 'Refund Received'
                            : tx.type === 'credit'
                            ? 'Money Credited'
                            : tx.type}
                        </p>
                        <p className="text-xs text-secondary">{tx.reference || 'Wallet transaction'}</p>
                        <p className="text-xs text-secondary">
                          {new Date(tx.created_at).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-base ${getTransactionColor(tx.type)}`}>
                          {tx.type === 'debit' ? '-' : '+'}₹{parseFloat(tx.amount).toFixed(2)}
                        </p>
                        <span className={`text-xs uppercase font-bold px-2 py-1 rounded 
                          ${tx.status === 'success'
                            ? 'bg-success/10 text-success'
                            : 'bg-error/10 text-error'}`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScreenContainer>
    </MobileLayout>
  );
}
