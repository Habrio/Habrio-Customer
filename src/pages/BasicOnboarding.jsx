import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

export default function BasicOnboarding() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState({ name: '', city: '', society: '' });

  const handleChange = e => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value.trimStart() }));
  };

  const submit = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Missing login token. Please login again.');
      return;
    }
    const { name, city, society } = data;
    if (!name || !city || !society) {
      alert('All fields are required');
      return;
    }
    try {
      const res = await fetch(`${backendUrl}/onboarding/basic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          name: name.trim(),
          city: city.trim(),
          society: society.trim(),
          role: 'consumer'
        })
      });
      const result = await res.json();
      if (result.status === 'success') {
        navigate('/onboarding/consumer');
      } else {
        alert(result.message || 'Onboarding failed');
      }
    } catch {
      alert('Something went wrong. Please try again.');
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
        <button className="btn btn-primary btn-full btn-large" onClick={submit}>
          Complete
        </button>
      </div>
    </div>
  );
}
