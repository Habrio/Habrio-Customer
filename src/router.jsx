// File: src/router.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Pages (auto‐imported as per your src/pages)
import TitleScreen from "./pages/TitleScreen";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Home from "./pages/Home";
import AboutHabrio from "./pages/AboutHabrio";
import AddMoney from "./pages/AddMoney";
import BasicOnboarding from "./pages/BasicOnboarding";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ConsumerOnboarding from "./pages/ConsumerOnboarding";
import OrderDetail from "./pages/OrderDetail";
import OrderHistory from "./pages/OrderHistory";
import OrderMessages from "./pages/OrderMessages";
import Profile from "./pages/Profile";
import RateOrder from "./pages/RateOrder";
import ReturnOrder from "./pages/ReturnOrder";
import SearchShops from "./pages/SearchShops";
import ShopDetail from "./pages/ShopDetail";
import ShopList from "./pages/ShopList";
import Support from "./pages/Support";
import Wallet from "./pages/Wallet";
import WalletHistory from "./pages/WalletHistory";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TitleScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />

      <Route path="/home" element={<Home />} />

      <Route path="/onboarding/consumer" element={<ConsumerOnboarding />} />
      <Route path="/onboarding/basic" element={<BasicOnboarding />} />

      <Route path="/about" element={<AboutHabrio />} />

      <Route path="/search" element={<SearchShops />} />
      <Route path="/shop/:shopId" element={<ShopDetail />} />
      <Route path="/shops" element={<ShopList />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/order/:orderId" element={<OrderDetail />} />
      <Route path="/order/:orderId/messages" element={<OrderMessages />} />
      <Route path="/order/:orderId/rate" element={<RateOrder />} />
      <Route path="/order/:orderId/return" element={<ReturnOrder />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/wallet" element={<Wallet />} />
      <Route path="/wallet/history" element={<WalletHistory />} />
      <Route path="/wallet/add" element={<AddMoney />} />

      <Route path="/support" element={<Support />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
