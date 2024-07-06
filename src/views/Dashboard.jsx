import React from 'react';
import { logOut } from '../firebaseConfig'; // Adjust the path to your firebaseConfig.js

const styles = {
  pageContainer: {
    marginTop: '70px',
    padding: '1rem',
    fontFamily: "'Gotham', 'Quicksand', sans-serif",
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  signOutButton: {
    cursor: 'pointer',
    backgroundColor: '#f44336',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    marginTop: '1rem',
  }
};

const StudentDashboard = () => {
  const navigate = navigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleRecipeSetup = async () => {
    navigate('/nextPage');
  }

  const handleEditSettings = async () => {
    navigate('/nextPage');
  }
  
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Welcome back!</h1>
      <p>Get started with a new recipe below.</p>
      <button onClick={handleRecipeSetup}>Let's go!</button>
      <button onClick={handleEditSettings}>Edit Settings</button>
      <button style={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
    </div>
  )
};

export default StudentDashboard;