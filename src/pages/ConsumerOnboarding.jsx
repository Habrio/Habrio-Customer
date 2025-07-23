import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

export default function ConsumerOnboarding() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [flatNumber, setFlatNumber] = useState('');

  const submit = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return alert('Missing auth token');

    const res = await fetch(`${backendUrl}/onboarding/consumer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ flat_number: flatNumber })
    });

    const result = await res.json();
    if (result.status === 'success') {
      navigate('/home');
    } else {
      alert(result.message || 'Consumer onboarding failed');
    }
  };

  return (
    <div className="mobile-screen fade-in">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>
      <div className="screen-content">
        <h2 className="title text-center mb-lg">Your Home Address</h2>

        <div className="form-group">
          <label className="form-label">Flat / House Number</label>
          <input
            className="form-input"
            placeholder="e.g., A-302"
            value={flatNumber}
            onChange={(e) => setFlatNumber(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary btn-full btn-large"
          onClick={submit}
        >
          Complete
        </button>
      </div>
    </div>
  );
}
