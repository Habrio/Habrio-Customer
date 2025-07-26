// File: src/pages/Support.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';

export default function Support() {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: '💬',
      title: 'Chat with Us',
      description: 'Get instant help from our support team',
      action: () => alert('Chat support will be available soon!'),
    },
    {
      icon: '📞',
      title: 'Call Support',
      description: 'Speak directly with our customer care',
      action: () => (window.location.href = 'tel:+918800000000'),
    },
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Send us your queries via email',
      action: () => (window.location.href = 'mailto:support@habrio.com'),
    },
    {
      icon: '❓',
      title: 'FAQ',
      description: 'Find answers to common questions',
      action: () => navigate('/faq'),
    },
  ];

  const commonIssues = [
    {
      icon: '💳',
      title: 'Payment Issues',
      description: 'Problems with wallet, refunds, or payments',
    },
    {
      icon: '📦',
      title: 'Order Problems',
      description: 'Order not received, wrong items, delays',
    },
    {
      icon: '🏪',
      title: 'Shop Issues',
      description: 'Shop not available, item out of stock',
    },
    {
      icon: '👤',
      title: 'Account Help',
      description: 'Profile, login, or account related issues',
    },
  ];

  return (
    <MobileLayout showNav activeTab="profile">
      <ScreenContainer>
        {/* Header */}
        <PageHeader title="Help & Support" />

        {/* Support Header */}
        <div className="bg-primary-gradient rounded-2xl p-7 mb-6 text-center text-white relative overflow-hidden">
          <div className="text-5xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">We're Here to Help</h3>
          <p className="text-sm opacity-90">Get support 24/7 for all your queries and issues</p>
        </div>

        {/* Contact Options */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <div className="flex flex-col gap-3">
            {supportOptions.map((option, i) => (
              <button
                key={i}
                onClick={option.action}
                className="bg-background-soft border border-divider rounded-xl p-4 flex items-center gap-4 text-left hover:bg-background-hover active:shadow"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold mb-1">{option.title}</h4>
                  <p className="text-sm text-secondary">{option.description}</p>
                </div>
                <span className="text-lg text-secondary">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Common Issues */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">Common Issues</h3>
          <div className="grid grid-cols-2 gap-3">
            {commonIssues.map((issue, i) => (
              <div
                key={i}
                className="bg-background-soft border border-divider rounded-xl p-4 text-center"
              >
                <div className="text-3xl mb-3">{issue.icon}</div>
                <h4 className="text-sm font-semibold mb-1">{issue.title}</h4>
                <p className="text-xs text-secondary leading-snug">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-error/10 border border-error/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg">🚨</span>
            <h4 className="text-base font-semibold text-error m-0">Emergency Contact</h4>
          </div>
          <p className="ml-7 text-sm text-secondary mb-3">
            For urgent issues like safety concerns or emergency situations
          </p>
          <Button
            size="sm"
            onClick={() => (window.location.href = 'tel:+911234567890')}
            className="bg-error text-white ml-7"
          >
            📞 Call Emergency Line
          </Button>
        </div>

        {/* Operating Hours */}
        <div className="bg-background-soft border border-divider rounded-xl p-5 mb-6">
          <h3 className="text-base font-semibold mb-4">Support Hours</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span>📞 Phone Support</span>
              <span className="text-secondary">9 AM - 9 PM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>💬 Chat Support</span>
              <span className="text-success font-medium">24/7</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>📧 Email Support</span>
              <span className="text-secondary">24-48 hours</span>
            </div>
          </div>
        </div>

        {/* App Version */}
        <div className="bg-background-soft border border-divider rounded-xl p-4 text-center mb-5">
          <p className="text-xs text-secondary mb-1">Habrio App Version 1.0.0</p>
          <p className="text-xs text-secondary">
            Need technical help? Include this version number when contacting support
          </p>
        </div>

        {/* Bottom Navigation Spacer */}
        <div className="h-20" />
      </ScreenContainer>
    </MobileLayout>
  );
}
