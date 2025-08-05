// File: src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Loader';
import EmptyState from '../components/organisms/EmptyState';
import { get, post } from '../utils/api';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');
    fetchProfile();
  }, [navigate]);

  async function fetchProfile() {
    try {
      const { status, data } = await get('/consumer/profile/me', { token: localStorage.getItem('auth_token') });
      if (status === 'success') {
        setProfile(data);
        setEditData(data);
      }
    } catch {
      alert('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }

  function startEdit() {
    setEditing(true);
    setEditData({ ...profile });
  }

  function cancelEdit() {
    setEditing(false);
    setEditData({ ...profile });
  }

  async function saveEdit() {
    try {
      const { status, message } = await post('/consumer/profile/edit', editData, { token: localStorage.getItem('auth_token') });
      if (status === 'success') {
        setProfile(editData);
        setEditing(false);
        alert('Profile updated');
      } else {
        alert(message || 'Failed to update profile');
      }
    } catch {
      alert('Something went wrong');
    }
  }

  async function logout() {
    if (!window.confirm('Logout?')) return;
    try {
      await post('/logout', {}, { token: localStorage.getItem('auth_token') });
    } catch { /* ignore */ }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  }

  if (loading) {
    return (
      <MobileLayout showNav activeTab="profile">
        <PageHeader title="My Profile" />
        <ScreenContainer className="flex justify-center py-20">
          <Spinner size={48} className="text-primary" />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  if (!profile) {
    return (
      <MobileLayout showNav activeTab="profile">
        <PageHeader title="My Profile" />
        <ScreenContainer className="py-20">
          <EmptyState
            icon="👤"
            title="Profile not found"
            description="Unable to load your profile."
            action={{ label: 'Go to Login', onClick: () => navigate('/login') }}
          />
        </ScreenContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showNav activeTab="profile">
      <PageHeader title="My Profile" />
      <ScreenContainer className="space-y-6">
        {!editing && (
          <Button onClick={startEdit} className="w-fit ml-auto">
            Edit
          </Button>
        )}

        {/* Profile Header */}
        <div className="bg-background-soft p-6 rounded-lg text-center space-y-2">
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary-dark mx-auto flex items-center justify-center text-white text-4xl"
            style={{
              backgroundImage: profile.profile_image_url
                ? `url(${profile.profile_image_url})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!profile.profile_image_url && '👤'}
          </div>
          <div className="space-y-1">
            {editing ? (
              <Input
                value={editData.name || ''}
                onChange={e => setEditData({ ...editData, name: e.target.value })}
                placeholder="Full Name"
                className="mx-auto w-full max-w-xs"
              />
            ) : (
              <h2 className="text-xl font-semibold">{profile.name || 'User'}</h2>
            )}
            <p className="text-sm text-secondary">{profile.phone}</p>
            <p className="text-xs text-secondary">
              📍 {profile.flat_number}, {profile.society}, {profile.city}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="bg-background-soft p-6 rounded-lg space-y-4">
          {/* Gender */}
          <div>
            <p className="text-sm text-secondary mb-1">Gender</p>
            {editing ? (
              <select
                value={editData.gender || ''}
                onChange={e => setEditData({ ...editData, gender: e.target.value })}
                className="w-full p-2 border border-divider rounded"
              >
                <option value="">Select</option>
                {['Male','Female','Other'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            ) : (
              <p className="font-medium">{profile.gender || 'Not provided'}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <p className="text-sm text-secondary mb-1">Date of Birth</p>
            {editing ? (
              <Input
                type="date"
                value={editData.date_of_birth || ''}
                onChange={e => setEditData({ ...editData, date_of_birth: e.target.value })}
                className="w-full"
              />
            ) : (
              <p className="font-medium">{profile.date_of_birth || 'Not provided'}</p>
            )}
          </div>

          {/* Flat Number */}
          <div>
            <p className="text-sm text-secondary mb-1">Flat / House No.</p>
            {editing ? (
              <Input
                value={editData.flat_number || ''}
                onChange={e => setEditData({ ...editData, flat_number: e.target.value })}
                placeholder="e.g. A-302"
                className="w-full"
              />
            ) : (
              <p className="font-medium">{profile.flat_number || 'Not provided'}</p>
            )}
          </div>

          {/* Save / Cancel */}
          {editing && (
            <div className="flex gap-2">
              <Button onClick={cancelEdit} className="flex-1 btn-secondary">
                Cancel
              </Button>
              <Button onClick={saveEdit} className="flex-1" disabled={!editData.name || !editData.flat_number}>
                Save
              </Button>
            </div>
          )}
        </div>

        {/* Logout */}
        {!editing && (
          <Button onClick={logout} className="btn-secondary">
            Logout
          </Button>
        )}
      </ScreenContainer>
    </MobileLayout>
);
}
