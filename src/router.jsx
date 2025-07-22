// src/router.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import TitleScreen from './pages/TitleScreen';
import Otp from './pages/Otp';
import BasicOnboarding from './pages/BasicOnboarding';



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TitleScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
       <Route path="/onboard" element={<BasicOnboarding />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
