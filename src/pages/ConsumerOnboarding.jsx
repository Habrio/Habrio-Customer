import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import StatusBar from '../components/atoms/StatusBar';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export default function ConsumerOnboarding() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [flatNumber, setFlatNumber] = useState('');

  const submit = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return alert('Missing login token. Please login again.');
    if (!flatNumber.trim()) {
      alert('Please enter your flat or house number');
      return;
    }
    try {
      const res = await fetch(`${backendUrl}/onboarding/consumer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ flat_number: flatNumber.trim() })
      });
      const result = await res.json();
      if (result.status === 'success') {
        navigate('/home');
      } else {
        alert(result.message || 'Consumer onboarding failed');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <MobileLayout>
      <StatusBar />
      <div className="px-6 py-10">
        <h2 className="text-center text-xl font-semibold mb-8">Your Home Address</h2>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Flat / House Number</label>
          <Input
            placeholder="e.g., A-302"
            value={flatNumber}
            onChange={e => setFlatNumber(e.target.value.trimStart())}
          />
        </div>
        <Button onClick={submit}>Complete</Button>
      </div>
    </MobileLayout>
  );
}
