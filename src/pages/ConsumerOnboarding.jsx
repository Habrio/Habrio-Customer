// File: src/pages/ConsumerOnboarding.jsx
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

export default function ConsumerOnboarding() {
  const navigate = useNavigate();
  const [flatNumber, setFlatNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return alert('Missing login token. Please login again.');
    }
    if (!flatNumber.trim()) {
      return alert('Please enter your flat or house number');
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/onboarding/consumer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ flat_number: flatNumber.trim() }),
      });
      const result = await res.json();
      if (result.status === 'success') {
        navigate('/home');
      } else {
        alert(result.message || 'Consumer onboarding failed');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MobileLayout>
      <PageHeader back={null} title="Your Home Address" />
      <ScreenContainer>
        <SectionCard>
          <div className="space-y-4">
            <div>
              <Heading level={2} className="text-center">
                Enter Your Flat / House Number
              </Heading>
            </div>
            <div>
              <BodyText size="sm" className="mb-1">
                Flat / House Number
              </BodyText>
              <Input
                placeholder="e.g., A-302"
                value={flatNumber}
                onChange={e => setFlatNumber(e.target.value.trimStart())}
                leftIcon={<Icon name="building" />}
              />
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
