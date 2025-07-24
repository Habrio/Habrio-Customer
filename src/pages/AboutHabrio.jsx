
import '../styles/common.css';
import '../styles/App.css';
import '../styles/design-system.css';
import PageHeader from '../components/molecules/PageHeader';

export default function AboutHabrio() {

  return (
    <div className="screen-content">
      {/* Header */}
      <PageHeader title="About Habrio" />

      {/* App Logo & Info */}
      <div style={{
        background: 'var(--primary-gradient)',
        borderRadius: '16px',
        padding: '32px 24px',
        marginBottom: '24px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '36px'
        }}>
          🏘️
        </div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>
          Habrio
        </h1>
        <p style={{ margin: '0 0 16px 0', fontSize: '16px', opacity: 0.9 }}>
          Your society's very own super app
        </p>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
          Version 1.0.0
        </p>
      </div>

      {/* What is Habrio */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          What is Habrio?
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
          Habrio is a hyperlocal commerce platform that connects residents with local shops and services within their society. 
          We make it easy to discover, order, and get things delivered right to your doorstep from trusted local vendors.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🏪</span>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Browse local shops and services in your society
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🛒</span>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Order groceries, medicines, and daily essentials
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🚚</span>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Get fast delivery right to your door
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>💳</span>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Pay securely using wallet or cash on delivery
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          Our Mission
        </h3>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
          To empower local communities by creating a thriving ecosystem where residents can easily access 
          local products and services while supporting neighborhood businesses. We believe in building 
          stronger communities through convenient, reliable, and personalized local commerce.
        </p>
      </div>

      {/* Key Features */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          Key Features
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚡</div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
              Fast Delivery
            </h4>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Quick delivery within your society
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔒</div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
              Secure Payment
            </h4>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Safe and encrypted transactions
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📱</div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
              Real-time Tracking
            </h4>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Track your orders live
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🤝</div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
              24/7 Support
            </h4>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Always here to help
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          Contact Us
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '16px' }}>📧</span>
            <span style={{ fontSize: '14px', color: 'var(--primary-color)' }}>
              support@habrio.com
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '16px' }}>📞</span>
            <span style={{ fontSize: '14px', color: 'var(--primary-color)' }}>
              +91 88000 00000
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '16px' }}>🌐</span>
            <span style={{ fontSize: '14px', color: 'var(--primary-color)' }}>
              www.habrio.com
            </span>
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
          Legal
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => alert('Terms & Conditions will be shown here')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontSize: '14px',
              textAlign: 'left',
              cursor: 'pointer',
              padding: 0
            }}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => alert('Privacy Policy will be shown here')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontSize: '14px',
              textAlign: 'left',
              cursor: 'pointer',
              padding: 0
            }}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => alert('Refund Policy will be shown here')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontSize: '14px',
              textAlign: 'left',
              cursor: 'pointer',
              padding: 0
            }}
          >
            Refund & Cancellation Policy
          </button>
        </div>
      </div>

      {/* App Credits */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
          Made with ❤️ for your neighbourhood
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
          © 2024 Habrio. All rights reserved.
        </p>
      </div>

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}