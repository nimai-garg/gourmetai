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

const InputField = styled.textarea`
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
  padding: 0.5rem 1rem;
  font-weight: bold;
  min-width: 100px;  /* Adjust the width to ensure "Go back" fits in one line */
  cursor: pointer;
  white-space: nowrap;  /* Prevents the text from wrapping to the next line */
  text-align: center;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
  font-family: 'Fustat', sans-serif;
  margin: 0 1rem; /* Add this line for a​⬤
`;

const Setup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [calorieRequirements, setCalorieRequirements] = useState('');
  const [proteinRequirements, setProteinRequirements] = useState('');
  const [religionChoice, setReligionChoice] = useState('');
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
  
      setCurrentCard(3); // Move to the next card
    } catch (error) {
      console.error('Error saving last name:', error);
    }
  };

  const handleDietaryRestrictions = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { dietaryRestrictions }, { merge: true });
  
      setCurrentCard(4); // Move to the next card
    } catch (error) {
      console.error('Error saving dietary restrictions:', error);
    }
  };

  const handleCalorieRequirements = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { calorieRequirements }, { merge: true });
  
      setCurrentCard(5); // Move to the next card
    } catch (error) {
      console.error('Error saving calorie requirements:', error);
    }
  };

  const handleProteinRequirements = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { proteinRequirements }, { merge: true });

      setCurrentCard(6); // Move to the next card
    } catch (error) {
      console.error('Error saving protein requirements:', error);
    }
  };

  const handleReligionChoice = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { religionChoice }, { merge: true });

      navigate("/dashboard");
    } catch (error) {
      console.error('Error saving religion choice:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleGoBack1 = async () => {
    setCurrentCard(1);
  }

  const handleGoBack2 = async () => {
    setCurrentCard(2);
  }

  const handleGoBack3 = async () => {
    setCurrentCard(3);
  }

  const handleGoBack4 = async () => {
    setCurrentCard(4);
  }

  const handleGoBack5 = async () => {
    setCurrentCard(5);
  }

  return (

    <PageContainer>
      <h1>Setup</h1>
      <p>Personalization comes with the setup</p>
      <br></br>

      {currentCard === 1 && (
        <Card>
           <h3>Question #1</h3>
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
           <h3>Question #2</h3>
           <p>What is your last name?</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button onClick={handleSaveLastName}>Next</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack1}>Go back</GoBackButton>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Card>
      )}

      {currentCard === 3 && (
        <Card>
           <h3>Question #3</h3>
           <p>Tell me your dietary restrictions in detail. Type none if applicable</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
          <Button onClick={handleDietaryRestrictions}>Next</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack2}>Go back</GoBackButton>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Card>
      )}

      {currentCard === 4 && (
        <Card>
           <h3>Question #4</h3>
           <p>Do you have any calorie requirements? Type N/A if applicable</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={calorieRequirements}
            onChange={(e) => setCalorieRequirements(e.target.value)}
          />
          <Button onClick={handleCalorieRequirements}>Next</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack3}>Go back</GoBackButton>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Card>
      )}

      {currentCard === 5 && (
        <Card>
           <h3>Question #5</h3>
           <p>Do you have any protein requirements? Type N/A if applicable</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={proteinRequirements}
            onChange={(e) => setProteinRequirements(e.target.value)}
          />
          <Button onClick={handleProteinRequirements}>Next</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack4}>Go back</GoBackButton>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Card>
      )}

      {currentCard === 6 && (
        <Card>
          <h3>Question #6</h3>
           <p>What religion are you? Type none if applicable</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={religionChoice}
            onChange={(e) => setReligionChoice(e.target.value)}
          />
          <Button onClick={handleReligionChoice}>Next</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack5}>Go back</GoBackButton>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Card>
      )}

    </PageContainer>

  );
};

export default Setup;