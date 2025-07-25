// File: src/pages/Wallet.jsx
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

export default function Wallet() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    fetchWallet(token);
    fetchTransactions(token);
  }, [navigate]);

  async function fetchWallet(token) {
    try {
      const { status, balance } = await get('/wallet', { token });
      if (status === 'success') setBalance(balance);
    } catch {
      // fail silent
    }
  }

  async function fetchTransactions(token) {
    try {
      const { status, transactions } = await get('/wallet/history', { token });
      if (status === 'success') setTransactions(transactions.slice(0, 5));
    } catch {
      // fail silent
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <MobileLayout>
        <PageHeader title="My Wallet" />
        <ScreenContainer className="flex justify-center py-20">
          <Spinner size={48} className="text-primary" />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageHeader title="My Wallet" />
      <ScreenContainer className="space-y-6">

        {/* Wallet Balance Card */}
        <div className="relative bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white overflow-hidden mb-4">
          <div className="absolute -top-16 -right-12 w-44 h-44 bg-white/10 rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">💳</span>
              <span className="opacity-90 font-medium">Wallet Balance</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">₹{balance.toFixed(2)}</h1>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/wallet/add')} size="sm" variant="white">+ Add Money</Button>
              <Button onClick={() => navigate('/wallet/history')} size="sm" variant="outline-white">View History</Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => navigate('/wallet/add')}
              className="flex flex-col items-center gap-2 p-4"
              variant="soft"
            >
              <span className="text-2xl">💰</span>
              <span className="font-semibold text-base">Add Money</span>
              <span className="text-xs text-secondary">Top up your wallet</span>
            </Button>
            <Button
              onClick={() => navigate('/wallet/history')}
              className="flex flex-col items-center gap-2 p-4"
              variant="soft"
            >
              <span className="text-2xl">📊</span>
              <span className="font-semibold text-base">Transaction History</span>
              <span className="text-xs text-secondary">View all transactions</span>
            </Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            {transactions.length > 0 && (
              <Button onClick={() => navigate('/wallet/history')} size="sm" variant="link">
                View All
              </Button>
            )}
          </div>
          {transactions.length === 0 ? (
            <EmptyState
              icon="📝"
              title="No transactions yet"
              description="Your transaction history will appear here"
            />
          ) : (
            <div className="flex flex-col gap-2">
              {transactions.map(tx => (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 bg-background-soft border border-divider rounded-lg p-4"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-lg">
                    {getTransactionIcon(tx.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-base capitalize">
                      {tx.type === 'recharge'
                        ? 'Money Added'
                        : tx.type === 'debit'
                        ? 'Payment'
                        : tx.type === 'refund'
                        ? 'Refund'
                        : tx.type}
                    </p>
                    <p className="text-xs text-secondary">{tx.reference || 'Wallet transaction'}</p>
                    <p className="text-xs text-secondary">
                      {new Date(tx.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-base ${getTransactionColor(tx.type)}`}>
                      {tx.type === 'debit' ? '-' : '+'}₹{tx.amount}
                    </p>
                    <p className="text-xs text-success uppercase font-semibold">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Safety Notice */}
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-base mt-1">🔒</span>
            <div>
              <h4 className="text-sm font-semibold text-primary mb-1">Your money is safe</h4>
              <p className="text-xs text-secondary leading-normal">
                All transactions are secured with bank-grade encryption. Your wallet balance is protected and can be refunded anytime.
              </p>
            </div>
          </div>
        </div>
      </ScreenContainer>
    </MobileLayout>
  );
}
