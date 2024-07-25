import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFF;
  font-family: 'Inter', sans-serif;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  gap: 50px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

const CardHeader = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  color: transparent;
  background-clip: text;
`;

const ContinueButton = styled.button`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 0.8rem;
  }

  &:hover, &:focus {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const Button = styled.button`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 10px;
  padding: 11px 21px;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
  font-family: 'Inter', sans-serif;
  margin: 0 1rem; /* Add this line for a gap */
`;

const InputField = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 300px;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
`;

const GoBackButton = styled.button`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  margin: 0 1rem; /* Add this line for a gap */

  &:hover, &:focus {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const Question1 = styled.h3`
  font-family: 'Inter', sans-serif;
  background: linear-gradient(to right, #00FFFF, #FF00FF);
  -webkit-background-clip: text;
  color: transparent;
  background-clip: text;
`;

const RecipeQuestions = () => {
  const navigate = useNavigate();
  const [countryChoice, setCountryChoice] = useState('');
  const [currentCard, setCurrentCard] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUserData = async () => {
    try {
      if (!currentUser) return;
      
      const userId = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        // Add here the questions, check ReviewSettings.jsx
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleContinueButton = async () => {
    setCurrentCard(2);
  }
  
  const handleCountryChoice = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { countryChoice }, { merge: true });
  
      setCurrentCard(3); // Move to the next card
    } catch (error) {
      console.error('Error saving country choice', error);
    }
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>Personalize your Recipe</Header>
      </HeaderContainer>

      {currentCard === 1 && (
        <Card>
          <CardHeader>Click the button below to begin your journey</CardHeader>
          <br></br>
          <ContinueButton onClick={handleContinueButton}>Continue</ContinueButton>
        </Card>
      )}

      {currentCard === 2 && (
        <Card>
           <Question1>Question #1</Question1>
           <p>Do you have any cuisine choice for the recipe? If yes, type it in. If no, type no</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={countryChoice}
            onChange={(e) => setCountryChoice(e.target.value)}
          />
          <Button onClick={handleCountryChoice}>Next</Button>
          <br></br>
          <GoBackButton>Go back</GoBackButton>
        </Card>
      )}

      {/* {currentCard === 3 && (
        <Card>
           <h3>Question #1</h3>
           <p>Do you have any country choice for the recipe? If yes, type it in. If no, type no</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
          <Button>Next</Button>
          <br></br>
          <GoBackButton>Go back</GoBackButton>
        </Card>
      )} */}

    </PageContainer>
  )
}

export default RecipeQuestions;
