import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import '../styles/design-system.css';

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
    <div className="mobile-screen fade-in">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>
      <div className="screen-content">
        <div className="text-center pt-10 mb-6">
          <div className="bg-gradient-to-r from-primary to-primary-dark w-18 h-18 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h2 className="title">Enter OTP</h2>
          <p className="subtitle">Sent to +91 {phone}</p>
        </div>
        <div className="form-group mb-md">
          <input
            type="tel"
            className="w-full text-center text-xl tracking-widest p-3 border border-gray-300 rounded-lg"
            placeholder="Enter 6-digit code"
            maxLength="6"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-full btn-large" onClick={verifyOtp}>
          Verify OTP
        </button>
        <p className="text-xs text-text-secondary text-center mt-5">
          Didn’t receive the code?{' '}
          <a href="#" className="link">Resend</a>
        </p>
      </div>
    </div>
  );
}
