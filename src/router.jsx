// src/router.jsx
import { Routes, Route } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';
import BottomNav from './components/organisms/BottomNav';

// Auth & Onboarding (no layout)
import Login from './pages/Login';
import Otp from './pages/Otp';
import TitleScreen from './pages/TitleScreen';
import BasicOnboarding from './pages/BasicOnboarding';
import ConsumerOnboarding from './pages/ConsumerOnboarding';

// Main App Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import ShopList from './pages/ShopList';
import ShopDetail from './pages/ShopDetail';
import SearchShops from './pages/SearchShops';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import OrderMessages from './pages/OrderMessages';
import RateOrder from './pages/RateOrder';
import Wallet from './pages/Wallet';
import WalletHistory from './pages/WalletHistory';
import AddMoney from './pages/AddMoney';
import Support from './pages/Support';
import AboutHabrio from './pages/AboutHabrio';

// Utility layout wrapper with optional bottom nav
function PageWithLayout({ element, withNav }) {
  return (
    <MobileLayout>
      {element}
      {withNav && <BottomNav />}
    </MobileLayout>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth & Onboarding Routes (no layout) */}
      <Route path="/" element={<TitleScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/onboarding/basic" element={<BasicOnboarding />} />
      <Route path="/onboarding/consumer" element={<ConsumerOnboarding />} />

      {/* Routes WITH bottom nav */}
      <Route path="/home" element={<PageWithLayout element={<Home />} withNav />} />
      <Route path="/shops" element={<PageWithLayout element={<ShopList />} withNav />} />
      <Route path="/cart" element={<PageWithLayout element={<Cart />} withNav />} />
      <Route path="/orders" element={<PageWithLayout element={<OrderHistory />} withNav />} />
      <Route path="/profile" element={<PageWithLayout element={<Profile />} withNav />} />

      {/* Routes WITHOUT bottom nav */}
      <Route path="/shop/:shopId" element={<PageWithLayout element={<ShopDetail />} />} />
      <Route path="/shops/search" element={<PageWithLayout element={<SearchShops />} />} />
      <Route path="/checkout" element={<PageWithLayout element={<Checkout />} />} />
      <Route path="/order/:orderId" element={<PageWithLayout element={<OrderDetail />} />} />
      <Route path="/order/:orderId/messages" element={<PageWithLayout element={<OrderMessages />} />} />
      <Route path="/order/:orderId/rate" element={<PageWithLayout element={<RateOrder />} />} />
      <Route path="/wallet" element={<PageWithLayout element={<Wallet />} />} />
      <Route path="/wallet/history" element={<PageWithLayout element={<WalletHistory />} />} />
      <Route path="/wallet/add" element={<PageWithLayout element={<AddMoney />} />} />
      <Route path="/support" element={<PageWithLayout element={<Support />} />} />
      <Route path="/about" element={<PageWithLayout element={<AboutHabrio />} />} />

      {/* Fallback Route */}
      <Route path="*" element={<PageWithLayout element={<Home />} withNav />} />
    </Routes>
  );
}
