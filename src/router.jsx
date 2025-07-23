// src/router.jsx
import { Routes, Route } from 'react-router-dom';

// Auth & Onboarding
import Login from './pages/Login';
import Otp from './pages/Otp';
import TitleScreen from './pages/TitleScreen';
import BasicOnboarding from './pages/BasicOnboarding';
import ConsumerOnboarding from './pages/ConsumerOnboarding';

// Main App
import Home from './pages/Home';
import Profile from './pages/Profile';
import ShopList from './pages/ShopList';

// Shop & Items
import ShopDetail from './pages/ShopDetail';
import SearchShops from './pages/SearchShops';

// Cart & Checkout
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Orders
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import OrderMessages from './pages/OrderMessages';
import RateOrder from './pages/RateOrder';

// Wallet
import Wallet from './pages/Wallet';
import WalletHistory from './pages/WalletHistory';
import AddMoney from './pages/AddMoney';

// Support & Info
import Support from './pages/Support';
import AboutHabrio from './pages/AboutHabrio';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth & Onboarding Routes */}
      <Route path="/" element={<TitleScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/onboarding/basic" element={<BasicOnboarding />} />
      <Route path="/onboarding/consumer" element={<ConsumerOnboarding />} />

      {/* Main App Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />

      {/* Shop & Discovery Routes */}
      <Route path="/shops" element={<ShopList />} />
      <Route path="/shop/:shopId" element={<ShopDetail />} />
      <Route path="/shops/search" element={<SearchShops />} />

      {/* Cart & Checkout Routes */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Order Routes */}
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/order/:orderId" element={<OrderDetail />} />
      <Route path="/order/:orderId/messages" element={<OrderMessages />} />
      <Route path="/order/:orderId/rate" element={<RateOrder />} />

      {/* Wallet Routes */}
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/wallet/history" element={<WalletHistory />} />
      <Route path="/wallet/add" element={<AddMoney />} />

      {/* Support & Info Routes */}
      <Route path="/support" element={<Support />} />
      <Route path="/about" element={<AboutHabrio />} />

      {/* Fallback Route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}