// File: src/pages/ShopDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import Button from '../components/atoms/Button';
import PageHeader from '../components/molecules/PageHeader';

export default function ShopDetails() {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchShopItems();
    fetchCartCount();
    // eslint-disable-next-line
  }, [shopId]);

  async function fetchShopItems() {
    try {
      const res = await fetch(`${backendUrl}/items/shop/${shopId}`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      if (data.status === 'success') {
        setShop(data.shop);
        setItems(data.items);
      } else {
        alert('Failed to load shop items');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  async function fetchCartCount() {
    try {
      const res = await fetch(`${backendUrl}/cart/view`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      if (data.status === 'success') {
        setCartCount(data.cart.length);
      }
    } catch {}
  }

  async function addToCart(itemId) {
    try {
      const res = await fetch(`${backendUrl}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ item_id: itemId, quantity: 1 }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchCartCount();
      } else {
        alert(data.message || 'Failed to add item to cart');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    }
  }

  if (loading) {
    return (
      <MobileLayout showNav activeTab="shops">
        <ScreenContainer>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin border-4 border-divider border-t-primary rounded-full w-10 h-10 mb-6" />
            <p className="text-base text-secondary">Loading shop details…</p>
          </div>
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showNav activeTab="shops">
      <ScreenContainer>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <PageHeader title={shop?.shop_name || 'Shop'} />
          {cartCount > 0 && (
            <button
              onClick={() => navigate('/cart')}
              className="relative bg-primary-gradient rounded-full w-10 h-10 flex items-center justify-center text-white text-xl shadow"
            >
              🛒
              <span className="absolute -top-2 -right-2 bg-error text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            </button>
          )}
        </div>

        {/* Shop Info */}
        <div className="bg-background-soft border border-divider rounded-xl p-5 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center text-2xl text-white">
            🏪
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-0.5">{shop?.shop_name}</h3>
            <p className="text-secondary text-sm mb-1">
              {shop?.shop_type} • {shop?.description || 'Quality products & services'}
            </p>
            <div className="flex gap-4 text-xs font-medium">
              <span className="text-success">• Open</span>
              <span className="text-primary">• Delivers</span>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <h3 className="text-lg font-bold mb-3">
          Available Items ({items.length})
        </h3>
        {items.length === 0 ? (
          <div className="text-center py-20 text-secondary text-base">
            No items available at this shop
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-background-soft border border-divider rounded-lg p-4 flex items-center gap-3"
              >
                <div
                  className="w-15 h-15 rounded-lg flex items-center justify-center text-2xl"
                  style={{
                    background: item.image_url
                      ? `url(${item.image_url}) center/cover no-repeat`
                      : 'var(--divider)',
                  }}
                >
                  {!item.image_url && '📦'}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                  <p className="text-secondary text-xs mb-1">
                    {item.brand && `${item.brand} • `}
                    {item.pack_size} {item.unit}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary text-base">
                      ₹{item.price}
                    </span>
                    {item.mrp && item.mrp > item.price && (
                      <>
                        <span className="text-secondary text-sm line-through">
                          ₹{item.mrp}
                        </span>
                        <span className="text-success text-xs font-bold">
                          {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => addToCart(item.id)}
                  className="min-w-[64px]"
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        )}
        {/* Bottom navigation spacing */}
        <div className="h-20" />
      </ScreenContainer>
    </MobileLayout>
  );
}
