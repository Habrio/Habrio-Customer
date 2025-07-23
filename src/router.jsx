// src/router.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import TitleScreen from './pages/TitleScreen';
import Login from './pages/Login';
import Otp from './pages/Otp';
import BasicOnboarding from './pages/BasicOnboarding';
import ConsumerOnboarding from './pages/ConsumerOnboarding';
import Home from './pages/Home';
import ShopList from './pages/ShopList';
// Future imports like: ShopView, Orders, Cart, Profile, etc.


// 🔐 Token-based access protection
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token');
  return token ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<TitleScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />

        {/* Onboarding routes (requires token) */}
        <Route path="/onboarding/basic" element={
          <PrivateRoute><BasicOnboarding /></PrivateRoute>
        } />
        <Route path="/onboarding/consumer" element={
          <PrivateRoute><ConsumerOnboarding /></PrivateRoute>
        } />

        {/* Authenticated user routes */}
        <Route path="/home" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />
        <Route path="/shops" element={
          <PrivateRoute><ShopList /></PrivateRoute>
        } />

        {/* Optional: fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
