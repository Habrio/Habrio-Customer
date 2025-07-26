// File: src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Icon from '../components/atoms/Icon';
import phoneImg from '../assets/login-illustration.svg';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  async function sendOtp() {
    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10‑digit phone number');
      return;
    }
    setSending(true);
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
    setSending(false);
  }

  return (
    <MobileLayout>
      {/* make this fill the frame and center its contents */}
      <ScreenContainer className="flex flex-col justify-center items-center h-full">
        {/* Illustration + Heading */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-5">
            <img src={phoneImg} alt="Login" className="w-full h-full" />
          </div>
          <h2 className="text-2xl font-bold mb-1 text-text-primary">
            Log in to Habrio
          </h2>
          <p className="text-sm text-text-secondary mb-4 text-center">
            Enter your mobile number to continue
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendOtp();
          }}
          className="w-full space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="
                bg-background-soft border border-divider
                rounded-lg px-3 py-2 font-semibold text-base
              ">
              +91
            </span>
            <Input
              type="tel"
              maxLength={10}
              autoFocus
              placeholder="9876543210"
              className="flex-1 text-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              leftIcon={<Icon name="phone" />}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={sending || phone.length !== 10}
            loading={sending}
          >
            Send OTP
          </Button>
        </form>

        {/* Terms & Privacy */}
        <p className="mt-8 text-xs text-text-secondary text-center leading-relaxed">
          By continuing, you agree to our{' '}
          <a href="#" className="text-primary underline font-medium">
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary underline font-medium">
            Privacy Policy
          </a>
        </p>
      </ScreenContainer>
    </MobileLayout>
  );
}
