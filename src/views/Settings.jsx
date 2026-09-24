import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, deleteUserAccount, updatePassword } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #fff;
  font-family: 'Inter', sans-serif;
`;

const SettingsCard = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
`;

const Button = styled.button`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Settings = () => {
  const [newPassword, setNewPassword] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleChangePassword = async () => {
    try {
      await updatePassword(newPassword);
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Delete your account? This cannot be undone.")) return;
    try {
      await deleteUserAccount();
      alert('Account deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account.');
    }
  };

  return (
    <SettingsContainer>
      <SettingsCard>
        <Title>Settings</Title>
        <Button onClick={() => navigate('/dashboard')}>Back to dashboard</Button>
        {user && !user.providerData.some(provider => provider.providerId === 'google.com') && (
          <>
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button onClick={handleChangePassword}>Change Password</Button>
          </>
        )}
        <Button onClick={handleDeleteAccount} style={{ backgroundColor: '#e53935' }}>
          Delete Account
        </Button>
      </SettingsCard>
    </SettingsContainer>
  );
};

export default Settings;