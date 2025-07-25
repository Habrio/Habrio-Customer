import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import StatusBar from '../components/atoms/StatusBar';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export default function Otp() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const phone = location.state?.phone || '9876543210';

  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      alert('Enter a valid 6-digit OTP');
      return;
    }
    try {
      const res = await fetch(`${backendUrl}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '+91' + phone, otp }),
      });
      const data = await res.json();
      if (data.status === 'success' && data.auth_token) {
        localStorage.setItem('auth_token', data.auth_token);
        if (data.basic_onboarding_done) {
          navigate('/home');
        } else {
          navigate('/onboarding/basic');
        }
      } else {
        alert('❌ ' + (data.message || 'Incorrect OTP'));
      }
    } catch {
      alert('Something went wrong while verifying OTP');
    }
  };

  return (
    <MobileLayout>
      <StatusBar />
      <div className="px-6 pt-10">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-primary to-primary-dark w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h2 className="text-xl font-semibold">Enter OTP</h2>
          <p className="text-sm text-gray-500">Sent to +91 {phone}</p>
        </div>
        <Input
          type="tel"
          placeholder="Enter 6-digit code"
          maxLength="6"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          className="text-center text-xl tracking-widest mb-6"
        />
        <Button onClick={verifyOtp}>Verify OTP</Button>
        <p className="text-xs text-gray-500 text-center mt-5">
          Didn’t receive the code?{' '}
          <a href="#" className="text-primary font-medium">Resend</a>
        </p>
      </div>
    </MobileLayout>
  );
}
