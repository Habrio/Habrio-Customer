// src/pages/Otp.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../App.css';

function Otp() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
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

      <div className="screen-content">
        <div className="text-center mb-lg" style={{ paddingTop: '40px' }}>
          <div
            style={{
              background: 'var(--primary-gradient)',
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 6px 16px rgba(90, 79, 255, 0.3)',
            }}
          >
            <span style={{ fontSize: '30px', color: 'white' }}>🔐</span>
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
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button className="btn btn-primary btn-full" onClick={verifyOtp}>
          Verify OTP
        </button>

        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          Didn’t receive the code?{' '}
          <a href="#" style={{ color: 'var(--primary-color)' }}>
            Resend
          </a>
        </p>
      </div>
    </div>
  );
}

export default Otp;
