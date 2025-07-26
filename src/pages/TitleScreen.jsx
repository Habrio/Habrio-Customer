// File: src/pages/TitleScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import { Heading, BodyText } from '../components/atoms/Typography';
import Button from '../components/atoms/Button';
import logo from '../assets/habrio-logo.svg';

export default function TitleScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout className="bg-gradient-to-br from-primary to-accent text-white items-center">
      <div className="w-full max-w-md px-4 flex flex-col items-center justify-center min-h-screen space-y-6">
        {/* Logo */}
        <div className="w-28 h-28 rounded-3xl bg-white/20 flex items-center justify-center shadow-elevated">
          <img src={logo} alt="Habrio logo" className="w-16 h-16" />
        </div>

        {/* Title & Subtitle */}
        <Heading level={1} className="text-3xl font-bold text-white text-center">
          Welcome to Habrio
        </Heading>
        <BodyText size="md" as="p" className="text-white/90 text-center max-w-xs">
          Your society’s very own super app
        </BodyText>

        {/* Call to Action */}
        <Button
          fullWidth
          size="lg"
          variant="secondary"
          className="text-primary"
          onClick={() => navigate('/login')}
        >
          Get Started
        </Button>

        {/* Footer Note */}
        <BodyText size="xs" as="p" className="text-white/80 text-center">
          Built with <span className="text-error">❤️</span> for your neighbourhood
        </BodyText>
      </div>
    </MobileLayout>
  );
}
