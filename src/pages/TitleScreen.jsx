// File: src/pages/TitleScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import { Heading, BodyText } from '../components/atoms/Typography';
import Button from '../components/atoms/Button';

export default function TitleScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <ScreenContainer className="flex flex-col items-center justify-center h-full space-y-6">
        {/* Logo */}
        <div
          className="
            flex items-center justify-center
            w-24 h-24
            rounded-2xl shadow-card
            bg-gradient-to-r from-primary to-primary-dark
          "
        >
          <span className="text-4xl text-white">🏘️</span>
        </div>

        {/* Title & Subtitle */}
        <Heading level={1} className="text-2xl text-text-primary text-center">
          Welcome to Habrio
        </Heading>
        <BodyText size="md" color="secondary" className="text-center max-w-xs">
          Your society’s very own super app
        </BodyText>

        {/* Call to Action */}
        <Button
          fullWidth
          size="lg"
          variant="primary"
          onClick={() => navigate('/login')}
        >
          Get Started
        </Button>

        {/* Footer Note */}
        <BodyText size="xs" color="secondary" className="text-center">
          Built with <span className="text-error">❤️</span> for your neighbourhood
        </BodyText>
      </ScreenContainer>
    </MobileLayout>
  );
}
