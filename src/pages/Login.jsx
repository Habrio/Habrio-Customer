import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

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
    <div className="mobile-screen fade-in">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>
      <div className="screen-content">
        <div className="text-center mb-lg" style={{ paddingTop: 48 }}>
          <div
            style={{
              background: 'var(--primary-gradient)',
              width: 80,
              height: 80,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 18px rgba(255, 145, 0, 0.35)',
            }}
          >
            <span style={{ fontSize: 36, color: 'white' }}>📲</span>
          </div>
          <h2 className="title" style={{ fontSize: 22 }}>Log in to Habrio</h2>
          <p className="subtitle">Enter your mobile number to continue</p>
        </div>
        <div className="form-group mb-md">
          <div className="phone-input-group">
            <div className="country-code">+91</div>
            <input
              type="tel"
              className="phone-input"
              placeholder="9876543210"
              maxLength="10"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary btn-full btn-large" onClick={sendOtp}>
          Send OTP
        </button>
        <p
          style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            lineHeight: 1.5,
            marginTop: 24,
          }}
        >
          By continuing, you agree to our{' '}
          <a href="#" className="link">Terms & Conditions</a> and{' '}
          <a href="#" className="link">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
