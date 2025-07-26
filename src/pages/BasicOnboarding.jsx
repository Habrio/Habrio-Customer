// File: src/pages/BasicOnboarding.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import SectionCard from '../components/molecules/SectionCard';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';
import { BodyText, Heading } from '../components/atoms/Typography';
import EmptyState from '../components/organisms/EmptyState';

export default function BasicOnboarding() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', city: '', society: '' });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value.trimStart() }));
  }

  async function handleSubmit() {
    const token = localStorage.getItem('auth_token');
    const { name, city, society } = data;
    if (!token) return alert('Missing login token. Please login again.');
    if (!name || !city || !society) return alert('All fields are required');

    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/onboarding/basic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ name, city, society, role: 'consumer' }),
      });
      const result = await res.json();
      if (result.status === 'success') {
        navigate('/onboarding/consumer');
      } else {
        alert(result.message || 'Onboarding failed');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MobileLayout>
      <PageHeader back={null} title="Tell us about yourself" />
      <ScreenContainer>
        <SectionCard>
          <div className="space-y-4">
            <div>
              <Heading level={2} className="text-center">
                Basic Details
              </Heading>
              <BodyText size="sm" color="secondary" className="text-center">
                Help us get to know you better
              </BodyText>
            </div>
            <div className="space-y-3">
              <div>
                <BodyText size="sm" className="mb-1">Full Name</BodyText>
                <Input
                  name="name"
                  placeholder="Ashish Dabas"
                  value={data.name}
                  onChange={handleChange}
                  leftIcon={<Icon name="user" />}
                />
              </div>
              <div>
                <BodyText size="sm" className="mb-1">City</BodyText>
                <Input
                  name="city"
                  placeholder="Noida"
                  value={data.city}
                  onChange={handleChange}
                  leftIcon={<Icon name="location" />}
                />
              </div>
              <div>
                <BodyText size="sm" className="mb-1">Society</BodyText>
                <Input
                  name="society"
                  placeholder="Hyde Park"
                  value={data.society}
                  onChange={handleChange}
                  leftIcon={<Icon name="building" />}
                />
              </div>
            </div>
            <Button
              className="w-full mt-4"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Complete'}
            </Button>
          </div>
        </SectionCard>
      </ScreenContainer>
    </MobileLayout>
  );
}
