// File: src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  async function sendOtp() {
    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
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
      <ScreenContainer className="flex flex-col justify-center min-h-screen">
        <div className="flex flex-col items-center mb-8 mt-8">
          <div className="bg-gradient-to-r from-primary to-primary-dark w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mb-5">
            <span className="text-white text-3xl">📲</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Log in to Habrio</h2>
          <p className="text-secondary text-sm mb-4">Enter your mobile number to continue</p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={e => { e.preventDefault(); sendOtp(); }}
        >
          <div className="flex gap-2 items-center">
            <span className="bg-background-soft border border-divider rounded-lg px-3 py-2 font-semibold text-base">+91</span>
            <Input
              type="tel"
              maxLength={10}
              autoFocus
              placeholder="9876543210"
              className="flex-1 text-lg"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={sending || phone.length !== 10}
            loading={sending}
          >
            Send OTP
          </Button>
        </form>
        <div className="mt-8 text-xs text-secondary text-center leading-relaxed">
          By continuing, you agree to our{' '}
          <a href="#" className="text-primary underline font-medium">Terms & Conditions</a> and{' '}
          <a href="#" className="text-primary underline font-medium">Privacy Policy</a>
        </div>
      </ScreenContainer>
    </MobileLayout>
  );
}
