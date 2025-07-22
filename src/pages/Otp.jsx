// src/pages/Otp.jsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

function Otp() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '9876543210';

  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      alert('Enter a valid 6-digit OTP');
      return;
    }

    try {
      const res = await fetch(
        'https://2e6bee57-c137-4144-90f2-64265943227d-00-c6d7jiueybzk.pike.replit.dev/verify-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: '+91' + phone, otp }),
        }
      );

      const data = await res.json();
      if (data.status === 'success') {
        navigate('/home');
      } else {
        alert('❌ ' + (data.message || 'Incorrect OTP'));
      }
    } catch (error) {
      alert('Something went wrong while verifying OTP');
    }
  };

  return (
    <div className="mobile-screen fade-in">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>

      <div className="screen-content full-screen text-center">
        <div className="mb-lg">
          <div
            style={{
              background: 'var(--primary-gradient)',
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 8px 18px rgba(90, 79, 255, 0.35)',
            }}
          >
            <span style={{ fontSize: '34px', color: 'white' }}>🔐</span>
          </div>

          <h2 className="title" style={{ fontSize: '22px' }}>Enter OTP</h2>
          <p className="subtitle">Code sent to +91 {phone}</p>
        </div>

        <div className="form-group mb-md">
          <input
            type="tel"
            className="otp-full-input"
            placeholder="Enter 6-digit code"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              textAlign: 'center',
              fontSize: '22px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
              letterSpacing: '6px',
            }}
          />
        </div>

        <button className="btn btn-primary btn-full btn-large mb-md" onClick={verifyOtp}>
          Verify OTP
        </button>

        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
          }}
        >
          Didn’t receive the code?{' '}
          <a href="#" className="link">
            Resend
          </a>
        </p>
      </div>
    </div>
  );
}

export default Otp;
