// File: src/pages/AboutHabrio.jsx
import React from 'react';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import SectionCard from '../components/molecules/SectionCard';
import { BodyText, Heading } from '../components/atoms/Typography';
import EmptyState from '../components/organisms/EmptyState';

export default function AboutHabrio() {
  return (
    <MobileLayout>
      <PageHeader back={null} title="About Habrio" />
      <ScreenContainer>
        {/* App Logo & Info */}
        <SectionCard padding="lg" className="bg-gradient-to-br from-primary to-accent text-white">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
              🏘️
            </div>
            <Heading level={1} className="text-white">
              Habrio
            </Heading>
            <BodyText size="md" className="text-white/90">
              Your society's very own super app
            </BodyText>
            <BodyText size="sm" className="text-white/80">
              Version 1.0.0
            </BodyText>
          </div>
        </SectionCard>

        {/* What is Habrio */}
        <SectionCard title="What is Habrio?">
          <BodyText className="mb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            Habrio is a hyperlocal commerce platform that connects residents with local
            shops and services within their society. We make it easy to discover, order,
            and get things delivered right to your doorstep from trusted local vendors.
          </BodyText>
          {[
            { emoji: '🏪', text: 'Browse local shops and services in your society' },
            { emoji: '🛒', text: 'Order groceries, medicines, and daily essentials' },
            { emoji: '🚚', text: 'Get fast delivery right to your door' },
            { emoji: '💳', text: 'Pay securely using wallet or cash on delivery' },
          ].map(({ emoji, text }, i) => (
            <div key={i} className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{emoji}</span>
              <BodyText size="sm">{text}</BodyText>
            </div>
          ))}
        </SectionCard>

        {/* Our Mission */}
        <SectionCard title="Our Mission">
          <BodyText className="text-sm text-[var(--text-secondary)] leading-relaxed">
            To empower local communities by creating a thriving ecosystem where residents
            can easily access local products and services while supporting neighborhood
            businesses. We believe in building stronger communities through convenient,
            reliable, and personalized local commerce.
          </BodyText>
        </SectionCard>

        {/* Key Features */}
        <SectionCard title="Key Features">
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '⚡', label: 'Fast Delivery', desc: 'Quick delivery within your society' },
              { emoji: '🔒', label: 'Secure Payment', desc: 'Safe and encrypted transactions' },
              { emoji: '📱', label: 'Real-time Tracking', desc: 'Track your orders live' },
              { emoji: '🤝', label: '24/7 Support', desc: 'Always here to help' },
            ].map(({ emoji, label, desc }, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-1">{emoji}</div>
                <Heading level={4} className="text-sm font-semibold mb-1">
                  {label}
                </Heading>
                <BodyText size="xs" className="text-[var(--text-secondary)]">
                  {desc}
                </BodyText>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Contact Information */}
        <SectionCard title="Contact Us">
          {[
            { emoji: '📧', label: 'support@habrio.com' },
            { emoji: '📞', label: '+91 88000 00000' },
            { emoji: '🌐', label: 'www.habrio.com' },
          ].map(({ emoji, label }, i) => (
            <div key={i} className="flex items-center space-x-3 mb-3">
              <span className="text-lg">{emoji}</span>
              <BodyText size="sm" className="text-primary">
                {label}
              </BodyText>
            </div>
          ))}
        </SectionCard>

        {/* Legal */}
        <SectionCard title="Legal">
          {[
            { text: 'Terms & Conditions', onClick: () => alert('Terms & Conditions') },
            { text: 'Privacy Policy', onClick: () => alert('Privacy Policy') },
            { text: 'Refund & Cancellation Policy', onClick: () => alert('Refund & Cancellation Policy') },
          ].map(({ text, onClick }, i) => (
            <button
              key={i}
              onClick={onClick}
              className="text-sm text-primary font-medium text-left w-full mb-2"
            >
              {text}
            </button>
          ))}
        </SectionCard>

        {/* App Credits */}
        <SectionCard className="text-center">
          <BodyText size="sm" className="font-semibold mb-1">
            Made with ❤️ for your neighbourhood
          </BodyText>
          <BodyText size="xs" color="secondary">
            © 2024 Habrio. All rights reserved.
          </BodyText>
        </SectionCard>
      </ScreenContainer>
    </MobileLayout>
  );
}
