// src/pages/TitleScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../App.css';

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
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '40px auto 24px',
            boxShadow: '0 6px 20px rgba(90, 79, 255, 0.25)',
          }}
        >
          <span style={{ fontSize: '42px', color: 'white' }}>🏘️</span>
        </div>

        <h1 className="title">Welcome to Habrio</h1>
        <p className="subtitle mb-lg">Your society’s very own super app</p>

        <button
          className="btn btn-primary btn-full"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>

        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            marginTop: '20px',
          }}
        >
          Built with ❤️ for your neighbourhood
        </p>
      </div>
    </div>
  );
}

export default TitleScreen;
