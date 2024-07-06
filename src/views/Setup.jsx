import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Import auth from firebaseConfig.js
import { logOut } from '../firebaseConfig'; // Adjust the path to your firebaseConfig.js

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFF;
  font-family: 'Fustat', sans-serif;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Fustat', sans-serif;
`;

const Button = styled.button`
  background-color: #fff;
  color: #000000;
  border-color: black;
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  width: 180px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
  font-family: 'Fustat', sans-serif;
  margin: 0 1rem; /* Add this line for a gap */
`;

const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 300px;
  font-size: 1rem;
  font-family: 'Fustat', sans-serif;
`;

const SignOutButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  color: red;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 30px;
  margin-top: 1rem;
  font-family: 'Fustat', sans-serif;
  border: 2px solid red; // Use red color for border
  //transition: background-color 0.3s, color 0.3s, border-color 0.3s; // Smooth transition for hover effect

  &:hover {
    color: #fff;
    background-color: red; // Corrected to red background on hover
    border-color: white;
  }
`;

const GoBackButton = styled.button`
  background-color: #fff;
  color: #000000;
  border-color: black;
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  width: 180px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
  font-family: 'Fustat', sans-serif;
  margin: 0 1rem; /* Add this line for a gap */
`;

const Setup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentCard, setCurrentCard] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes and set the current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveFirstName = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { firstName }, { merge: true });
  
      setCurrentCard(2); // Move to the next card
    } catch (error) {
      console.error('Error saving first name:', error);
    }
  };
  
  const handleSaveLastName = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { lastName }, { merge: true });
  
      navigate('/nextPage'); // Redirect to the next page after setup
    } catch (error) {
      console.error('Error saving last name:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleGoBack = async () => {
    setCurrentCard(1);
  }

  return (

    <PageContainer>
      <h1>Setup</h1>
      <p>Personalization comes with the setup</p>
      <br></br>

      {currentCard === 1 && (
        <Card>
          <p>What is your first name?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Button onClick={handleSaveFirstName}>Next</Button>
          <br></br>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Card>
      )}

      {currentCard === 2 && (
        <Card>
           <p>What is your last name?</p>

          <InputField
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button onClick={handleSaveLastName}>Next</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack}>Go back</GoBackButton>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Card>
      )}
    </PageContainer>

  );
};

export default Setup;