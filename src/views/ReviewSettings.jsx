import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { logOut } from '../firebaseConfig'; // Adjust the path to your firebaseConfig.js

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

const CardHeader = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
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

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Inter', sans-serif;
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

const ReviewSettings = () => {
  const navigate = useNavigate();
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [calorieRequirements, setCalorieRequirements] = useState('');
  const [proteinRequirements, setProteinRequirements] = useState('');
  const [religionChoice, setReligionChoice] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [currentCard, setCurrentCard] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!currentUser) return;
        
        const userId = currentUser.uid;
        const userDocRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setDietaryRestrictions(userData.dietaryRestrictions || '');
          setCalorieRequirements(userData.calorieRequirements || '');
          setProteinRequirements(userData.proteinRequirements || '');
          setReligionChoice(userData.religionChoice || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    fetchUserData(); // Fetch user data on component mount

    return () => unsubscribe(); // Cleanup on component unmount
  }, [currentUser]);

  const fetchUserData = async () => {
    try {
      if (!currentUser) return;
      
      const userId = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setDietaryRestrictions(userData.dietaryRestrictions || '');
        setCalorieRequirements(userData.calorieRequirements || '');
        setProteinRequirements(userData.proteinRequirements || '');
        setReligionChoice(userData.religionChoice || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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
      fetchUserData();
  
      setCurrentCard(3); // Move to the next card
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
      fetchUserData();
  
      setCurrentCard(4); // Move to the next card
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
      fetchUserData();

      setCurrentCard(5); // Move to the next card
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
      fetchUserData();

      setCurrentCard(6);
    } catch (error) {
      console.error('Error saving religion choice:', error);
    }
  };

  const handleAvailableIngredients = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { availableIngredients }, { merge: true });
      fetchUserData();

      navigate("/recipeQuestions");
    } catch (error) {
      console.error('Error saving available ingredients:', error);
    }
  };

  const handleContinueButton = async () => {
    setCurrentCard(2);
    fetchUserData();
  }

  const homePage = async () => {
    navigate('/dashboard');
  }

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
      <Header>Review Settings</Header>
      <br></br>

      {currentCard === 1 && (
        <Card>
          <CardHeader>Let's start off by reviewing your setup</CardHeader>
          <br></br>
          <ContinueButton onClick={handleContinueButton}>Continue</ContinueButton>
        </Card>
      )}

      {currentCard === 2 && (
        <Card>
           <h3>Question #1</h3>
           <p>Do you follow a specific diet? Ex. Vegetarian, Vegan, Keto, Paleo. Type none if applicable</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
          <Button onClick={handleDietaryRestrictions}>Confirm</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack1}>Go back</GoBackButton>
        </Card>
      )}

      {currentCard === 3 && (
        <Card>
           <h3>Question #2</h3>
           <p>Do you have any calorie requirements per recipe? Type N/A if applicable</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={calorieRequirements}
            onChange={(e) => setCalorieRequirements(e.target.value)}
          />
          <Button onClick={handleCalorieRequirements}>Confirm</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack2}>Go back</GoBackButton>
        </Card>
      )}

      {currentCard === 4 && (
        <Card>
           <h3>Question #3</h3>
           <p>Do you have any protein requirements per recipe? Type N/A if applicable</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={proteinRequirements}
            onChange={(e) => setProteinRequirements(e.target.value)}
          />
          <Button onClick={handleProteinRequirements}>Confirm</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack3}>Go back</GoBackButton>
        </Card>
      )}

      {currentCard === 5 && (
        <Card>
          <h3>Question #4</h3>
           <p>What religion are you? Type none if applicable</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={religionChoice}
            onChange={(e) => setReligionChoice(e.target.value)}
          />
          <Button onClick={handleReligionChoice}>Confirm</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack4}>Go back</GoBackButton>
        </Card>
      )}

      {currentCard === 6 && (
        <Card>
          <h3>Question #5</h3>
           <p>What are available ingredients you have?</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={availableIngredients}
            onChange={(e) => setAvailableIngredients(e.target.value)}
          />
          <Button onClick={handleAvailableIngredients}>Finish</Button>
          <br></br>
          <GoBackButton onClick={handleGoBack5}>Go back</GoBackButton>
        </Card>
      )} 
    </PageContainer>
  )
}

export default ReviewSettings;