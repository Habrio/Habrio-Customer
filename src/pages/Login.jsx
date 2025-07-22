import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';

function Login() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    console.log('📲 sendOtp triggered');
    console.log('Phone number entered:', phone);

    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const res = await fetch(
        'https://2e6bee57-c137-4144-90f2-64265943227d-00-c6d7jiueybzk.pike.replit.dev/send-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: '+91' + phone }),
        }
      );

      const data = await res.json();
      console.log('🔁 API Response:', data);

      if (data.status === 'success') {
        navigate('/otp');
      } else {
        alert('❌ Failed to send OTP: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Error while sending OTP:', error);
      alert('Something went wrong while sending OTP');
    }
  };

  return (
    <div className="mobile-screen" id="screen-2">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>
      <div className="screen-content">
        <div style={{ paddingTop: '60px' }}>
          <div className="text-center mb-lg">
            <div
              style={{
                background: 'linear-gradient(135deg, #1A237E 0%, #3F51B5 100%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <span style={{ fontSize: '32px', color: 'white' }}>📱</span>
            </div>
            <h2 className="title">Welcome to Habrio</h2>
            <p className="subtitle">Enter your mobile number to get started</p>
          </div>

          <div className="form-group">
            <div className="phone-input-group">
              <div className="country-code">+91</div>
              <input
                type="tel"
                className="phone-input"
                placeholder="9876543210"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-primary btn-full btn-large mb-lg" onClick={sendOtp}>
            Send OTP
          </button>

          <p
            style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              lineHeight: '1.4',
            }}
          >
            By continuing, you agree to our{' '}
            <a href="#" style={{ color: 'var(--primary-color)' }}>
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a href="#" style={{ color: 'var(--primary-color)' }}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
