// File: src/pages/SearchShops.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Loader';
import EmptyState from '../components/organisms/EmptyState';
import { get } from '../utils/api';

export default function SearchShops() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecent(saved);
  }, [navigate]);

  async function search(q) {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const { status, shops } = await get(`/consumer/shops/search?q=${encodeURIComponent(q)}`, { token });
      if (status === 'success') {
        setShops(shops);
        const updated = [q, ...recent.filter(r => r !== q)].slice(0, 5);
        setRecent(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      } else {
        alert('Failed to search shops');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    search(query);
  }

  function onRecentClick(q) {
    setQuery(q);
    search(q);
  }

  function clearRecent() {
    setRecent([]);
    localStorage.removeItem('recentSearches');
  }

  return (
    <MobileLayout showNav activeTab="shops">
      <PageHeader title="Search Shops" />
      <ScreenContainer className="space-y-6">
        {/* Search Bar */}
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            placeholder="Search for shops, items…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!query.trim()}>Search</Button>
        </form>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {['Grocery','Pharmacy','Restaurant','Electronics','Fashion','Services'].map(cat => (
            <Button key={cat} onClick={() => onRecentClick(cat)} className="whitespace-nowrap">
              {cat}
            </Button>
          ))}
        </div>

        {/* Recent Searches */}
        {recent.length > 0 && !query.trim() && shops.length === 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Recent Searches</h4>
              <button onClick={clearRecent} className="text-sm text-primary">Clear</button>
            </div>
            <div className="space-y-1">
              {recent.map((r, i) => (
                <button
                  key={i}
                  onClick={() => onRecentClick(r)}
                  className="w-full text-left p-2 bg-background-soft rounded"
                >
                  🕒 {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <Spinner size={48} className="text-primary" />
          </div>
        )}

        {/* Results */}
        {!loading && shops.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Results ({shops.length})</h4>
            <div className="space-y-2">
              {shops.map(shop => (
                <div
                  key={shop.id}
                  onClick={() => navigate(`/shop/${shop.id}`)}
                  className="flex items-center gap-3 p-4 bg-background-soft rounded cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-lg">
                    🏪
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{shop.shop_name}</p>
                    <p className="text-sm text-secondary">
                      {shop.shop_type} • {shop.description}
                    </p>
                    <p className="text-xs">
                      <span className={shop.is_open ? 'text-success' : 'text-error'}>
                        {shop.is_open ? 'Open' : 'Closed'}
                      </span>
                      {shop.delivers && <span className="ml-2 text-primary">Delivers</span>}
                    </p>
                  </div>
                  <div className="text-secondary text-lg">→</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && query.trim() && shops.length === 0 && (
          <EmptyState
            icon="🔍"
            title="No shops found"
            description="Try searching with different keywords."
          />
        )}
      </ScreenContainer>
    </MobileLayout>
  );
}
