import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChevronRight, HiCreditCard, HiShoppingBag, HiSearch } from 'react-icons/hi';

function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  );
}

export function CategoryCard({ icon: IconComponent, name, to }) {
  const navigate = useNavigate();
  const Icon = IconComponent;
  return (
    <Card
      className="flex flex-col items-center justify-center w-20 flex-none"
      onClick={() => to && navigate(to)}
    >
      <Icon className="text-2xl mb-1 text-primary" />
      <div className="text-sm text-center text-gray-700">{name}</div>
    </Card>
  );
}

export function FeaturedShopCard({ shop }) {
  const navigate = useNavigate();
  return (
    <Card className="w-40 flex-none" onClick={() => navigate(`/shop/${shop.id}`)}>
      <HiShoppingBag className="text-3xl mb-2 text-primary" />
      <h4 className="font-semibold text-sm mb-1">{shop.shop_name}</h4>
      <p className="text-xs text-gray-500 mb-2">{shop.shop_type}</p>
      <div className={`text-xs font-medium ${shop.is_open ? 'text-green-600' : 'text-red-500'}`}>{shop.is_open ? 'Open' : 'Closed'}</div>
    </Card>
  );
}

export function NearbyShopCard({ shop }) {
  const navigate = useNavigate();
  return (
    <Card className="flex items-center" onClick={() => navigate(`/shop/${shop.id}`)}>
      <HiShoppingBag className="text-3xl text-primary mr-3" />
      <div className="flex-1">
        <h4 className="font-medium">{shop.shop_name}</h4>
        <p className="text-xs text-gray-500">{shop.shop_type} • {shop.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs ${shop.is_open ? 'text-green-600' : 'text-red-500'}`}>{shop.is_open ? 'Open' : 'Closed'}</span>
          {shop.delivers && <span className="text-xs text-blue-600">Delivers</span>}
        </div>
      </div>
      <HiChevronRight className="text-xl text-gray-400" />
    </Card>
  );
}

export function WalletCard({ balance }) {
  const navigate = useNavigate();
  return (
    <Card className="flex-1" onClick={() => navigate('/wallet')}>
      <div>
        <p className="text-xs text-gray-500">Wallet Balance</p>
        <h3 className="text-lg font-semibold">₹{balance.toFixed(2)}</h3>
      </div>
      <HiCreditCard className="text-3xl text-primary ml-auto" />
    </Card>
  );
}

export function SearchCard({ placeholder = 'Search…', to }) {
  const navigate = useNavigate();
  return (
    <Card className="flex-1 flex items-center gap-2" onClick={() => to && navigate(to)}>
      <HiSearch className="text-gray-400" />
      <span className="text-gray-500 text-sm">{placeholder}</span>
    </Card>
  );
}
