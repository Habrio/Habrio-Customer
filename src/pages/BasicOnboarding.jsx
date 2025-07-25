import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import StatusBar from '../components/atoms/StatusBar';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

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
    <MobileLayout>
      <StatusBar />
      <div className="px-6 py-10">
        <h2 className="text-center text-xl font-semibold mb-8">Tell us about yourself</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
          <Input
            name="name"
            placeholder="Ashish Dabas"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">City</label>
          <Input
            name="city"
            placeholder="Noida"
            value={data.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Society</label>
          <Input
            name="society"
            placeholder="Hyde Park"
            value={data.society}
            onChange={handleChange}
          />
        </div>
        <Button onClick={submit}>Complete</Button>
      </div>
    </MobileLayout>
  );
}
