import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

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
        <div className="text-center mb-lg" style={{ paddingTop: 40 }}>
          <div
            style={{
              background: 'var(--primary-gradient)',
              width: 72,
              height: 72,
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 6px 16px rgba(255, 125, 30, 0.3)',
            }}
          >
            <span style={{ fontSize: 30, color: 'white' }}>🔐</span>
          </div>
          <h2 className="title">Enter OTP</h2>
          <p className="subtitle">Sent to +91 {phone}</p>
        </div>
        <div className="form-group mb-md">
          <input
            type="tel"
            className="otp-input"
            placeholder="Enter 6-digit code"
            maxLength="6"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: 20,
              letterSpacing: '4px',
              padding: 12,
              border: '1px solid #ccc',
              borderRadius: 8,
            }}
          />
        </div>
        <button className="btn btn-primary btn-full btn-large" onClick={verifyOtp}>
          Verify OTP
        </button>
        <p
          style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Didn’t receive the code?{' '}
          <a href="#" className="link">Resend</a>
        </p>
      </div>
    </div>
  );
}
