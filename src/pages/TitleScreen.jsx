// File: src/pages/TitleScreen.jsx
import { useNavigate } from 'react-router-dom';

export default function TitleScreen() {
  const navigate = useNavigate();

  return (
    <div className="mobile-screen fade-in bg-background min-h-screen flex flex-col">
      <div className="status-bar flex justify-between px-4 py-2 text-xs text-secondary">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>
      <div className="screen-content flex-1 flex flex-col items-center justify-center text-center px-5">
        <div
          className="mb-6 flex items-center justify-center shadow-lg"
          style={{
            background: 'var(--primary-gradient)',
            width: 84,
            height: 84,
            borderRadius: 24,
          }}
        >
          <span className="text-4xl" style={{ color: '#fff' }}>🏘️</span>
        </div>
        <h1 className="font-bold text-2xl mb-2">Welcome to Habrio</h1>
        <p className="text-sm text-secondary mb-8">
          Your society’s very own super app
        </p>
        <button
          className="btn btn-primary btn-full btn-large w-full mb-6"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
        <p className="text-xs text-text-tertiary text-center">
          Built with <span className="text-error">❤️</span> for your neighbourhood
        </p>
      </div>
    </div>
  );
}
