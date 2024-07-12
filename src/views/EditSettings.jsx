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
  height: 100vh;
  font-family: 'Fustat', sans-serif;
  padding: 2rem;
`;

const HeadingContainer = styled.div`
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-family: 'Fustat', sans-serif;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const Question = styled.h3`
  font-family: 'Fustat', sans-serif;
  margin-bottom: 1rem;
`;

const InputField = styled.input`
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1rem;
  font-family: 'Fustat', sans-serif;
`;

const Button = styled.button`
  background-color: #fff;
  color: #000000;
  border: 2px solid black;
  border-radius: 30px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
  font-family: 'Fustat', sans-serif;
  margin-top: 1rem;
`;

const EditSettings = () => {
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

      setFirstName(''); // Clear the input field
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

      setLastName(''); // Clear the input field
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

      setDietaryRestrictions(''); // Clear the input field
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

      setCalorieRequirements(''); // Clear the input field
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

      setProteinRequirements(''); // Clear the input field
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

      setReligionChoice(''); // Clear the input field
    } catch (error) {
      console.error('Error saving religion choice:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <PageContainer>
      <HeadingContainer>
        <Heading>Edit your Setup</Heading>
        <Button onClick={handleGoBack}>Go Back</Button>
      </HeadingContainer>

      <Card>
        <Question>What is your first name?</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={firstName} // Bind the input field to the state
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Button onClick={handleSaveFirstName}>Submit</Button>
      </Card>

      <Card>
        <Question>What is your last name?</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={lastName} // Bind the input field to the state
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button onClick={handleSaveLastName}>Submit</Button>
      </Card>

      <Card>
        <Question>Tell me your dietary restrictions in detail. Type none if applicable</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={dietaryRestrictions} // Bind the input field to the state
          onChange={(e) => setDietaryRestrictions(e.target.value)}
        />
        <Button onClick={handleDietaryRestrictions}>Submit</Button>
      </Card>

      <Card>
        <Question>Do you have any calorie requirements? Type N/A if applicable</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={calorieRequirements} // Bind the input field to the state
          onChange={(e) => setCalorieRequirements(e.target.value)}
        />
        <Button onClick={handleCalorieRequirements}>Submit</Button>
      </Card>

      <Card>
        <Question>Do you have any protein requirements? Type N/A if applicable</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={proteinRequirements} // Bind the input field to the state
          onChange={(e) => setProteinRequirements(e.target.value)}
        />
        <Button onClick={handleProteinRequirements}>Submit</Button>
      </Card>

      <Card>
        <Question>What religion are you? Type none if applicable</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={religionChoice} // Bind the input field to the state
          onChange={(e) => setReligionChoice(e.target.value)}
        />
        <Button onClick={handleReligionChoice}>Submit</Button>
      </Card>
    </PageContainer>
  )
};

export default EditSettings;