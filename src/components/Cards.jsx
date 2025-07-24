// src/components/Cards.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** Base Card wrapper */
function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  );
}

/** Category Card */
export function CategoryCard({ icon, name, to }) {
  const navigate = useNavigate();
  return (
    <Card
      className="category-card"
      onClick={() => to && navigate(to)}
    >
      <div className="category-icon">{icon}</div>
      <div className="category-name">{name}</div>
    </Card>
  );
}

/** Featured Shop Card (horizontal scroll) */
export function FeaturedShopCard({ shop }) {
  const navigate = useNavigate();
  return (
    <Card
      className="featured-shop-card"
      onClick={() => navigate(`/shop/${shop.id}`)}
    >
      <div className="featured-shop-icon">🏪</div>
      <h4 className="featured-shop-name">{shop.shop_name}</h4>
      <p className="featured-shop-type">{shop.shop_type}</p>
      <div
        className={`featured-shop-status ${
          shop.is_open ? 'open' : 'closed'
        }`}
      >
        {shop.is_open ? 'Open' : 'Closed'}
      </div>
    </Card>
  );
}

/** Nearby Shop Card (list) */
export function NearbyShopCard({ shop }) {
  const navigate = useNavigate();
  return (
    <Card
      className="nearby-shop-card"
      onClick={() => navigate(`/shop/${shop.id}`)}
    >
      <div className="nearby-shop-icon">🏪</div>
      <div className="nearby-shop-info">
        <h4>{shop.shop_name}</h4>
        <p>{shop.shop_type} • {shop.description}</p>
        <div className="nearby-shop-tags">
          <span className={shop.is_open ? 'open' : 'closed'}>
            {shop.is_open ? 'Open' : 'Closed'}
          </span>
          {shop.delivers && <span className="delivers">Delivers</span>}
        </div>
      </div>
      <div className="nearby-shop-arrow">→</div>
    </Card>
  );
}

/** Wallet Balance Card (header) */
export function WalletCard({ balance }) {
  const navigate = useNavigate();
  return (
    <Card
      className="wallet-card"
      onClick={() => navigate('/wallet')}
    >
      <div>
        <p>Wallet Balance</p>
        <h3>₹{balance.toFixed(2)}</h3>
      </div>
      <div className="wallet-icon">💳</div>
    </Card>
  );
}

/** Search Bar Card */
export function SearchCard({ placeholder = 'Search…', to }) {
  const navigate = useNavigate();
  return (
    <Card
      className="search-card"
      onClick={() => to && navigate(to)}
    >
      <span className="search-icon">🔍</span>
      <span className="search-text">{placeholder}</span>
    </Card>
  );
}
