import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';
import PageHeader from '../components/molecules/PageHeader';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${backendUrl}/profile/me`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      
      if (data.status === 'success') {
        setProfile(data.data);
        setEditData(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    setLoading(false);
  };

  const handleEdit = () => {
    setEditing(true);
    setEditData({ ...profile });
  };

  const handleCancel = () => {
    setEditing(false);
    setEditData({ ...profile });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${backendUrl}/profile/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(editData)
      });

      const data = await res.json();
      if (data.status === 'success') {
        setProfile(editData);
        setEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return;
    
    try {
      await fetch(`${backendUrl}/logout`, {
        method: 'POST',
        headers: { 'Authorization': token }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="screen-content">
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid var(--divider)', 
            borderTop: '3px solid var(--primary-color)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="My Profile" />
        {!editing && (
          <button
            onClick={handleEdit}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
        )}
      </div>

      {/* Profile Header */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: profile?.profile_image_url ? `url(${profile.profile_image_url})` : 'var(--primary-gradient)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '32px',
          color: 'white'
        }}>
          {!profile?.profile_image_url && '👤'}
        </div>
        
        <h3 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600' }}>
          {profile?.name || 'User'}
        </h3>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
          {profile?.phone}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px' }}>📍</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {profile?.flat_number}, {profile?.society}, {profile?.city}
          </span>
        </div>
      </div>

      {/* Profile Details */}
      <div style={{
        background: 'var(--background-soft)',
        border: '1px solid var(--divider)',
        borderRadius: '12px',
        marginBottom: '24px'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--divider)' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
            Personal Information
          </h3>
        </div>
        
        <div style={{ padding: '20px' }}>
          {/* Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: 'var(--text-secondary)'
            }}>
              Full Name
            </label>
            {editing ? (
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--divider)',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            ) : (
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
                {profile?.name || 'Not provided'}
              </p>
            )}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: 'var(--text-secondary)'
            }}>
              Phone Number
            </label>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
              {profile?.phone}
            </p>
          </div>

          {/* Gender */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: 'var(--text-secondary)'
            }}>
              Gender
            </label>
            {editing ? (
              <select
                value={editData.gender || ''}
                onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--divider)',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
                {profile?.gender || 'Not provided'}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: 'var(--text-secondary)'
            }}>
              Date of Birth
            </label>
            {editing ? (
              <input
                type="date"
                value={editData.date_of_birth || ''}
                onChange={(e) => setEditData({ ...editData, date_of_birth: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--divider)',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            ) : (
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
                {profile?.date_of_birth || 'Not provided'}
              </p>
            )}
          </div>

          {/* Flat Number */}
          <div style={{ marginBottom: editing ? '20px' : '0' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: 'var(--text-secondary)'
            }}>
              Flat/House Number
            </label>
            {editing ? (
              <input
                type="text"
                value={editData.flat_number || ''}
                onChange={(e) => setEditData({ ...editData, flat_number: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--divider)',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            ) : (
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
                {profile?.flat_number || 'Not provided'}
              </p>
            )}
          </div>

          {/* Edit Actions */}
          {editing && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={handleCancel}
                style={{
                  flex: 1,
                  background: 'none',
                  border: '1px solid var(--divider)',
                  color: 'var(--text-secondary)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  background: 'var(--primary-gradient)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {!editing && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => navigate('/wallet')}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '12px',
                padding: '16px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '20px' }}>💳</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '500' }}>
                  My Wallet
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Manage your wallet and transactions
                </p>
              </div>
              <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>→</span>
            </button>

            <button
              onClick={() => navigate('/orders')}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '12px',
                padding: '16px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '20px' }}>📦</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '500' }}>
                  My Orders
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Track and manage your orders
                </p>
              </div>
              <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>→</span>
            </button>

            <button
              onClick={() => navigate('/support')}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '12px',
                padding: '16px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '20px' }}>❓</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '500' }}>
                  Help & Support
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Get help and contact support
                </p>
              </div>
              <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>→</span>
            </button>

            <button
              onClick={() => navigate('/about')}
              style={{
                background: 'var(--background-soft)',
                border: '1px solid var(--divider)',
                borderRadius: '12px',
                padding: '16px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '20px' }}>ℹ️</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '500' }}>
                  About Habrio
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                  App info and terms
                </p>
              </div>
              <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Logout Button */}
      {!editing && (
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: '1px solid var(--error-color)',
            color: 'var(--error-color)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '20px'
          }}
        >
          Logout
        </button>
      )}

      {/* Bottom Navigation Placeholder */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}