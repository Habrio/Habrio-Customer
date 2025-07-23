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
          className="logo-box"
          style={{
            background: 'var(--primary-gradient)',
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 6px 14px rgba(255, 125, 30, 0.3)',
          }}
        >
          <span className="logo-icon" style={{ fontSize: '36px', color: '#fff' }}>🏘️</span>
        </div>

        <h1 className="title mb-xs" style={{ fontSize: '24px' }}>
          Welcome to Habrio
        </h1>
        <p className="subtitle mb-lg" style={{ fontSize: '14px' }}>
          Your society’s very own super app
        </p>

        <button
          className="btn btn-primary btn-full btn-large"
          style={{ marginBottom: '24px' }}
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>

        <p
          className="text-center"
          style={{
            fontSize: '12px',
            color: 'var(--text-tertiary)',
          }}
        >
          Built with ❤️ for your neighbourhood
        </p>
      </div>
    </div>
  );
}

export default TitleScreen;
