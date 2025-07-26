// File: src/pages/Otp.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Icon from '../components/atoms/Icon';

export default function Otp() {
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const phone = location.state?.phone || '9876543210';

  async function verifyOtp() {
    if (!/^\d{6}$/.test(otp)) {
      alert('Enter a valid 6-digit OTP');
      return;
    }
    setVerifying(true);
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
    setVerifying(false);
  }

  // Optionally implement resend
  function resendOtp(e) {
    e.preventDefault();
    alert('Resend OTP functionality to be implemented.');
  }

  return (
    <MobileLayout>
      <ScreenContainer className="flex flex-col justify-center min-h-screen">
        <div className="flex flex-col items-center mb-8 mt-8">
          <div className="bg-gradient-to-r from-primary to-primary-dark w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Icon name="lock" size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-bold mb-1">Enter OTP</h2>
          <div className="text-secondary text-sm mb-4">Sent to +91 {phone}</div>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={e => { e.preventDefault(); verifyOtp(); }}
        >
          <Input
            autoFocus
            type="tel"
            maxLength={6}
            pattern="\d{6}"
            placeholder="Enter 6-digit code"
            className="text-center tracking-widest text-xl"
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={verifying || otp.length !== 6}
            loading={verifying}
          >
            Verify OTP
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-secondary">
          Didn’t receive the code?{' '}
          <button
            type="button"
            className="text-primary font-medium underline"
            onClick={resendOtp}
            tabIndex={-1}
          >
            Resend
          </button>
        </div>
      </ScreenContainer>
    </MobileLayout>
  );
}
