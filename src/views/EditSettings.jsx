import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

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

const InputField = styled.textarea`
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1rem;
  font-family: 'Fustat', sans-serif;
  resize: vertical;
  max-width: 100%;

  /* Apply input restriction using regex */
  &:invalid {
    border-color: red; /* Optional: Highlight invalid input */
  }
`;

const Button = styled.button`
  background-color: #fff;
  color: #000000;
  border: 2px solid black;
  border-radius: 30px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
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
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
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
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setDietaryRestrictions(userData.dietaryRestrictions || '');
        setCalorieRequirements(userData.calorieRequirements || '');
        setProteinRequirements(userData.proteinRequirements || '');
        setReligionChoice(userData.religionChoice || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSaveFirstName = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }

    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);

      await setDoc(userDocRef, { firstName }, { merge: true });

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

    } catch (error) {
      console.error('Error saving religion choice:', error);
    }
  };

  // Implement handleSaveLastName, handleDietaryRestrictions, handleCalorieRequirements,
  // handleProteinRequirements, and handleReligionChoice similarly as handleSaveFirstName

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <PageContainer>
      <HeadingContainer>
        <Heading>Edit your Setup</Heading>
        <Button onClick={handleGoBack}>Go Back</Button>
        <Button onClick={fetchUserData}>Refresh</Button>
        <p>P.S.: If you click Submit, your current saving of information will be replaced by the new information in the text field.</p>
      </HeadingContainer>

      <Card>
        <Question>What is your first name?</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Button onClick={handleSaveFirstName}>Save</Button>
      </Card>

      <Card>
        <Question>What is your last name?</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button onClick={handleSaveLastName}>Save</Button>
      </Card>

      <Card>
        <Question>What is your dietary restrictions?</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={dietaryRestrictions}
          onChange={(e) => {
            // Allow alphabetical characters, spaces, and special characters, but not digits
            const newValue = e.target.value.replace(/[0-9]/g, '');
            setDietaryRestrictions(newValue);
          }}
        />
        <Button onClick={handleDietaryRestrictions}>Save</Button>
      </Card>

      <Card>
        <Question>What is your calorie requirements? Answer in cals</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={calorieRequirements}
          onChange={(e) => {
          // Remove non-numeric characters using regex
          const newValue = e.target.value.replace(/[^0-9]/g, '');
          setCalorieRequirements(newValue);
        }}
        />
        <Button onClick={handleCalorieRequirements}>Save</Button>
      </Card>

      <Card>
        <Question>What is your protein requirements? Answer in grams</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={proteinRequirements}
          onChange={(e) => {
            // Remove non-numeric characters using regex
            const newValue = e.target.value.replace(/[^0-9]/g, '');
            setProteinRequirements(newValue);
          }}
        />
        <Button onClick={handleProteinRequirements}>Save</Button>
      </Card>

      <Card>
        <Question>Do you follow any religion?</Question>
        <InputField
          type="text"
          placeholder="Enter your response"
          value={religionChoice}
          onChange={(e) => {
            // Remove non-alphabetical characters using regex
            const newValue = e.target.value.replace(/[^a-zA-Z ]/g, '');
            setReligionChoice(newValue);
          }}
        />
        <Button onClick={handleReligionChoice}>Save</Button>
      </Card>

    </PageContainer>
  );
};

export default EditSettings;