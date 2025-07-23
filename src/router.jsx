// src/router.jsx
import { Routes, Route } from 'react-router-dom';
import MobileLayout from './components/MobileLayout';

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
      {/* Auth & Onboarding Routes (no layout) */}
      <Route path="/" element={<TitleScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/onboarding/basic" element={<BasicOnboarding />} />
      <Route path="/onboarding/consumer" element={<ConsumerOnboarding />} />

      {/* Main App Routes (with layout) */}
      <Route path="/home" element={<MobileLayout><Home /></MobileLayout>} />
      <Route path="/profile" element={<MobileLayout><Profile /></MobileLayout>} />
      <Route path="/shops" element={<MobileLayout><ShopList /></MobileLayout>} />
      <Route path="/shop/:shopId" element={<MobileLayout><ShopDetail /></MobileLayout>} />
      <Route path="/shops/search" element={<MobileLayout><SearchShops /></MobileLayout>} />
      <Route path="/cart" element={<MobileLayout><Cart /></MobileLayout>} />
      <Route path="/checkout" element={<MobileLayout><Checkout /></MobileLayout>} />
      <Route path="/orders" element={<MobileLayout><OrderHistory /></MobileLayout>} />
      <Route path="/order/:orderId" element={<MobileLayout><OrderDetail /></MobileLayout>} />
      <Route path="/order/:orderId/messages" element={<MobileLayout><OrderMessages /></MobileLayout>} />
      <Route path="/order/:orderId/rate" element={<MobileLayout><RateOrder /></MobileLayout>} />
      <Route path="/wallet" element={<MobileLayout><Wallet /></MobileLayout>} />
      <Route path="/wallet/history" element={<MobileLayout><WalletHistory /></MobileLayout>} />
      <Route path="/wallet/add" element={<MobileLayout><AddMoney /></MobileLayout>} />
      <Route path="/support" element={<MobileLayout><Support /></MobileLayout>} />
      <Route path="/about" element={<MobileLayout><AboutHabrio /></MobileLayout>} />

      {/* Fallback Route */}
      <Route path="*" element={<MobileLayout><Home /></MobileLayout>} />
    </Routes>
  );
}
