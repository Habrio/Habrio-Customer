import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

function Otp() {
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

        // 🔍 Debug: Confirm token stored correctly
        const savedToken = localStorage.getItem('auth_token');
        if (!savedToken) {
          alert('Login token not stored. Try again.');
          return;
        }

        // Fetch onboarding status
        const statusRes = await fetch(`${backendUrl}/onboarding/status`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        const status = await statusRes.json();

        if (status.status === 'success' && status.basic_onboarding_done) {
          navigate('/home');
        } else {
          navigate('/onboarding/basic');
        }
      } else {
        alert('❌ ' + (data.message || 'Incorrect OTP'));
      }
    } catch (error) {
      alert('Something went wrong while verifying OTP');
      console.error(error);
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
              boxShadow: '0 6px 16px rgba(255, 125, 30, 0.3)',
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
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: '20px',
              letterSpacing: '4px',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          />
        </div>

        <button className="btn btn-primary btn-full btn-large" onClick={verifyOtp}>
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
          <a href="#" className="link">
            Resend
          </a>
        </p>
      </div>
    </div>
  );
}

export default Otp;
