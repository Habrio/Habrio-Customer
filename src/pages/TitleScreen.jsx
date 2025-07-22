// src/pages/TitleScreen.jsx
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

function TitleScreen() {
  const navigate = useNavigate();

  return (
    <div className="mobile-screen fade-in">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>

      <div className="screen-content text-center">
        <div
          style={{
            background: 'var(--primary-gradient)',
            width: '100px',
            height: '100px',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '48px auto 28px',
            boxShadow: '0 10px 24px rgba(90, 79, 255, 0.25)',
          }}
        >
          <span style={{ fontSize: '44px', color: '#fff' }}>🏘️</span>
        </div>

        <h1
          className="title"
          style={{
            fontSize: '24px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}
        >
          Welcome to Habrio
        </h1>
        <p
          className="subtitle"
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
          }}
        >
          Your society’s very own super app
        </p>

        <button
          className="btn btn-primary btn-full btn-large"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>

        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-tertiary)',
            marginTop: '24px',
          }}
        >
          Built with ❤️ for your neighbourhood
        </p>
      </div>
    </div>
  );
}

export default TitleScreen;
