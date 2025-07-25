// src/pages/TitleScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';

export default function TitleScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center h-full p-6">
        {/* Logo */}
        <div
          className="flex items-center justify-center mb-6 w-20 h-20 rounded-2xl shadow-lg bg-gradient-to-r from-primary to-primary-dark"
        >
          <span className="text-4xl text-onPrimary">🏘️</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-bold mb-2">Welcome to Habrio</h1>
        <p className="text-sm text-secondary mb-8 text-center">
          Your society’s very own super app
        </p>

        {/* Call to Action */}
        <button
          onClick={() => navigate('/login')}
          className="w-full py-4 mb-6 rounded-lg bg-primary text-onPrimary font-medium"
        >
          Get Started
        </button>

        {/* Footer Note */}
        <p className="text-xs text-secondary text-center">
          Built with <span className="text-error">❤️</span> for your neighbourhood
        </p>
      </div>
    </MobileLayout>
  );
}
