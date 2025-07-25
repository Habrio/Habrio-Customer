import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import PageHeader from '../components/molecules/PageHeader';

export default function Support() {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: '💬',
      title: 'Chat with Us',
      description: 'Get instant help from our support team',
      action: () => alert('Chat support will be available soon!')
    },
    {
      icon: '📞',
      title: 'Call Support',
      description: 'Speak directly with our customer care',
      action: () => window.location.href = 'tel:+918800000000'
    },
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Send us your queries via email',
      action: () => window.location.href = 'mailto:support@habrio.com'
    },
    {
      icon: '❓',
      title: 'FAQ',
      description: 'Find answers to common questions',
      action: () => navigate('/faq')
    }
  ];

  const commonIssues = [
    {
      icon: '💳',
      title: 'Payment Issues',
      description: 'Problems with wallet, refunds, or payments'
    },
    {
      icon: '📦',
      title: 'Order Problems',
      description: 'Order not received, wrong items, delays'
    },
    {
      icon: '🏪',
      title: 'Shop Issues',
      description: 'Shop not available, item out of stock'
    },
    {
      icon: '👤',
      title: 'Account Help',
      description: 'Profile, login, or account related issues'
    }
  ];

  return (
    <div className="screen-content">
      {/* Header */}
      <PageHeader title="Help & Support" />

      {/* Support Header */}
      <div style={{
        background: 'var(--primary-gradient)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
          We're Here to Help
        </h3>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
          Get support 24/7 for all your queries and issues
        </p>
      </div>

      {/* Contact Options */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          Contact Us
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {supportOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                textAlign: 'left'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: 'white',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {option.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                  {option.title}
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {option.description}
                </p>
              </div>
              <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Common Issues */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          Common Issues
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {commonIssues.map((issue, index) => (
            <div
              key={index}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                {issue.icon}
              </div>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '600' }}>
                {issue.title}
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                {issue.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div style={{
        background: 'rgba(255, 59, 48, 0.1)',
        border: '1px solid rgba(255, 59, 48, 0.2)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px' }}>🚨</span>
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'var(--error-color)' }}>
            Emergency Contact
          </h4>
        </div>
        <p style={{ margin: '0 0 12px 32px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          For urgent issues like safety concerns or emergency situations
        </p>
        <button
          onClick={() => window.location.href = 'tel:+911234567890'}
          style={{
            background: 'var(--error-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            marginLeft: '32px'
          }}
        >
          📞 Call Emergency Line
        </button>
      </div>

      {/* Operating Hours */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          Support Hours
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px' }}>📞 Phone Support</span>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>9 AM - 9 PM</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px' }}>💬 Chat Support</span>
            <span style={{ fontSize: '14px', color: 'var(--success-color)', fontWeight: '500' }}>24/7</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px' }}>📧 Email Support</span>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>24-48 hours</span>
          </div>
        </div>
      </div>

      {/* App Version */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
          Habrio App Version 1.0.0
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
          Need technical help? Include this version number when contacting support
        </p>
      </div>

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}