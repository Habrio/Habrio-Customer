import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader';

export default function SearchShops() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    // Load recent searches from localStorage
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(recent);
  }, []);

  const searchShops = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/shops/search?q=${encodeURIComponent(query)}`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      
      if (data.status === 'success') {
        setShops(data.shops);
        // Save to recent searches
        const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      } else {
        alert('Failed to search shops');
      }
    } catch (error) {
      console.error('Error searching shops:', error);
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchShops(searchQuery);
  };

  const handleRecentSearch = (query) => {
    setSearchQuery(query);
    searchShops(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="screen-content">
      {/* Header */}
      <PageHeader title="Search Shops" />

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          background: 'var(--background-soft)',
          border: '1px solid var(--divider)',
          borderRadius: '12px',
          padding: '12px 16px',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '16px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search for shops, items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                color: 'var(--text-secondary)'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </form>

      {/* Quick Filters */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {['Grocery', 'Pharmacy', 'Restaurant', 'Electronics', 'Fashion', 'Services'].map((category) => (
            <button
              key={category}
              onClick={() => handleRecentSearch(category)}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && !searchQuery && shops.length === 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Recent Searches</h3>
            <button
              onClick={clearRecentSearches}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-color)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearch(search)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '12px 0',
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderBottom: index < recentSearches.length - 1 ? '1px solid var(--divider)' : 'none'
                }}
              >
                <span style={{ fontSize: '16px' }}>🕒</span>
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid var(--divider)', 
            borderTop: '3px solid var(--primary-color)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Searching...</p>
        </div>
      )}

      {/* Search Results */}
      {shops.length > 0 && (
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
            Search Results ({shops.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {shops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => navigate(`/shop/${shop.id}`)}
                style={{
                  background: 'var(--background-soft)',
                  border: '1px solid var(--divider)',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'var(--primary-gradient)', 
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  🏪
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                    {shop.shop_name}
                  </h4>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {shop.shop_type} • {shop.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      fontSize: '12px', 
                      color: shop.is_open ? 'var(--success-color)' : 'var(--error-color)',
                      fontWeight: '500'
                    }}>
                      {shop.is_open ? '• Open' : '• Closed'}
                    </span>
                    {shop.delivers && (
                      <span style={{ 
                        fontSize: '12px', 
                        color: 'var(--primary-color)',
                        fontWeight: '500'
                      }}>
                        • Delivers
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>→</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && searchQuery && shops.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
            No shops found
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
            Try searching with different keywords
          </p>
        </div>
      )}

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}