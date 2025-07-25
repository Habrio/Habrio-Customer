import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import StatusBar from '../components/atoms/StatusBar';
import Button from '../components/atoms/Button';

export default function Login() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const sendOtp = async () => {
    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    try {
      const res = await fetch(`${backendUrl}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '+91' + phone }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        navigate('/otp', { state: { phone } });
      } else {
        alert('❌ ' + (data.message || 'Failed to send OTP'));
      }
    } catch {
      alert('Something went wrong while sending OTP');
    }
  };

  return (
    <MobileLayout>
      <StatusBar />
      <div className="px-6 pt-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-3xl text-white">📲</span>
          </div>
          <h2 className="text-xl font-semibold mb-1">Log in to Habrio</h2>
          <p className="text-sm text-gray-500">Enter your mobile number to continue</p>
        </div>
        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 mb-6 h-11">
          <span className="text-gray-500 mr-2">+91</span>
          <input
            type="tel"
            placeholder="9876543210"
            maxLength="10"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        <Button onClick={sendOtp}>Send OTP</Button>
        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our{' '}
          <a href="#" className="text-primary font-medium">Terms & Conditions</a> and{' '}
          <a href="#" className="text-primary font-medium">Privacy Policy</a>
        </p>
      </div>
    </MobileLayout>
  );
}
