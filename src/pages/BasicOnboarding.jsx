// src/pages/BasicOnboarding.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

export default function BasicOnboarding() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '', city: '', society: '', role: 'consumer'
  });

  const handleChange = e => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async () => {
    const token = localStorage.getItem('auth_token');
    const res = await fetch('https://<your-backend>/onboarding/basic', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.status === 'success') {
      navigate('/home');
    } else {
      alert(result.message || 'Onboarding failed');
    }
  };

  return (
    <div className="mobile-screen fade-in">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>
      <div className="screen-content">
        <h2 className="title text-center mb-lg">Tell us about yourself</h2>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            name="name"
            className="form-input"
            placeholder="Ashish Dabas"
            value={data.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">City</label>
          <input
            name="city"
            className="form-input"
            placeholder="Noida"
            value={data.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Society</label>
          <input
            name="society"
            className="form-input"
            placeholder="Hyde Park"
            value={data.society}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role</label>
          <input
            name="role"
            className="form-input"
            value="consumer"
            disabled
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
