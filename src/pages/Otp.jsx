// src/pages/Otp.jsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

export default function Otp() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '';

  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      // 1) Verify OTP
      const res = await fetch(
        'https://2e6bee57-c137-4144-90f2-64265943227d-00-c6d7jiueybzk.pike.replit.dev/verify-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: '+91' + phone, otp }),
        }
      );
      const data = await res.json();
      if (data.status !== 'success') {
        alert('❌ ' + (data.message || 'Incorrect OTP'));
        setLoading(false);
        return;
      }

      // 2) Store token (verify-otp returns { status, token })
      const token = data.token || data.auth_token;
      localStorage.setItem('auth_token', token);

      // 3) Check onboarding status
      const profileRes = await fetch(
        'https://2e6bee57-c137-4144-90f2-64265943227d-00-c6d7jiueybzk.pike.replit.dev/onboarding/status',
        {
          headers: {
            Authorization: token
          }
        }
      );
      const profileData = await profileRes.json();
      const done = profileData.basic_onboarding_done;

      // 4) Navigate accordingly
      navigate(done ? '/home' : '/onboard');
    } catch (error) {
      console.error(error);
      alert('Something went wrong while verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-screen fade-in">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>

      <div className="screen-content text-center">
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
              boxShadow: '0 8px 18px rgba(252, 100, 79, 0.35)',
            }}
          >
            <span style={{ fontSize: '32px', color: 'white' }}>🔐</span>
          </div>
          <h2 className="title" style={{ fontSize: '22px' }}>Enter OTP</h2>
          <p className="subtitle">Code sent to +91 {phone}</p>
        </div>

        <div className="form-group mb-md">
          <input
            type="tel"
            maxLength={6}
            className="otp-full-input"
            placeholder="______"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          className="btn btn-primary btn-full btn-large mb-lg"
          onClick={verifyOtp}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
          Didn’t receive the code?{' '}
          <button
            className="link"
            onClick={() => alert('Resend OTP coming soon')}
            disabled={loading}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
