import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const PageContainer = styled.div`
  background-color: #FFF;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 2rem; /* Add padding for small screens */
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

const Header = styled.div`
  font-size: 1.7rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavigationButtonDiv = styled.div`
  display: flex;
  gap: 10px; /* Adjust the gap as needed */
`

const Card = styled.div`
  background-color: #fff;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

// const Question = styled.h3`
//   font-family: 'Inter', sans-serif;
//   font-weight: 500;
//   margin-bottom: 1rem;
// `;

const InputField = styled.textarea`
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  resize: vertical;
  max-width: 100%;

  /* Apply input restriction using regex */
  &:invalid {
    border-color: red; /* Optional: Highlight invalid input */
  }
`;

const Button = styled.button`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 10px;
  padding: 9px 19px;
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

const Container = styled.div`
  align-items: center;
`;

const EditSettings = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [allergyRestrictions, setAllergyRestrictions] = useState('');
  const [calorieRequirements, setCalorieRequirements] = useState('');
  const [proteinPreferences, setProteinPreferences] = useState('')
  const [religionChoice, setReligionChoice] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [otherInstructions, setOtherInstructions] = useState('');
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
          setAge(userData.age || '');
          setDietaryRestrictions(userData.dietaryRestrictions || '');
          setAllergyRestrictions(userData.allergyRestrictions || '');
          setCalorieRequirements(userData.calorieRequirements || '');
          setProteinPreferences(userData.proteinPreferences || '');
          setReligionChoice(userData.religionChoice || '');
          setSkillLevel(userData.skillLevel || '');
          setHealthConditions(userData.healthConditions || '');
          setOtherInstructions(userData.otherInstructions || '');
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
        setAge(userData.age || '');
        setDietaryRestrictions(userData.dietaryRestrictions || '');
        setAllergyRestrictions(userData.allergyRestrictions || '');
        setCalorieRequirements(userData.calorieRequirements || '');
        setProteinPreferences(userData.proteinPreferences || '');
        setReligionChoice(userData.religionChoice || '');
        setSkillLevel(userData.skillLevel || '');
        setHealthConditions(userData.healthConditions || '');
        setOtherInstructions(userData.otherInstructions || '');
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

  const handleSaveAge = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { age }, { merge: true });
  
    } catch (error) {
      console.error('Error saving age:', error);
    }
  };

  const handleSaveDietaryRestrictions = async () => {
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

  const handleSaveAllergyRestrictions = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { allergyRestrictions }, { merge: true });
  
    } catch (error) {
      console.error('Error saving allergy restrictions:', error);
    }
  };

  const handleSaveCalorieRequirements = async () => {
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

  const handleSaveProteinPreferences = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { proteinPreferences }, { merge: true });
  
    } catch (error) {
      console.error('Error saving protein preferences:', error);
    }
  };

  const handleSaveReligionChoice = async () => {
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

  const handleSaveSkillLevel = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { skillLevel }, { merge: true });
  
    } catch (error) {
      console.error('Error saving skill level:', error);
    }
  };

  const handleSaveHealthConditions = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { healthConditions }, { merge: true });
  
    } catch (error) {
      console.error('Error saving health conditions:', error);
    }
  };

  const handleSaveOtherInstructions = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { otherInstructions }, { merge: true });

    } catch (error) {
      console.error('Error saving other instructions:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>Edit your Setup</Header>
        <NavigationButtonDiv>
          <Button onClick={handleGoBack}>Go Back</Button>
          <Button onClick={fetchUserData}>Refresh</Button>
        </NavigationButtonDiv>
      </HeaderContainer>

      <p>P.S.: If you click Submit, your current saving of information will be replaced by the new information in the text field.</p>
      <br></br>
      <Container>
        <Card>
          <h3>Question #1 - First Name</h3>
          <p>What is your first name?</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
            <Button onClick={handleSaveFirstName}>Save</Button>
          </Card>

          <Card>
          <h3>Question #2 - Last Name</h3>
          <p>What is your last name?</p>
        
        <div>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button onClick={handleSaveLastName}>Save</Button>
          </div>
          <br></br>
        </Card>

        <Card>
          <h3>Question #3 - Age</h3>
          <p>What is your age?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Button onClick={handleSaveAge}>Save</Button>
          <br></br>
        </Card>

        <Card>
          <h3>Question #4 - Dietary Restrictions</h3>
          <p>Do you follow a specific diet (e.g., vegetarian, vegan, keto, paleo)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
          <Button onClick={handleSaveDietaryRestrictions}>Save</Button>
          <br></br>
        </Card>

        <Card>
          <h3>Question #5 - Allergy Restrictions</h3>
          <p>Do you have any food allergies or intolerances (e.g., gluten, dairy, nuts)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={allergyRestrictions}
            onChange={(e) => setAllergyRestrictions(e.target.value)}
          />
          <Button onClick={handleSaveAllergyRestrictions}>Save</Button>
          <br></br>
        </Card>

        <Card>
          <h3>Question #6 - Nutritional Goals</h3>
          <p>Are you aiming for any specific nutritional goals (e.g., more protein, less sugar)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={calorieRequirements}
            onChange={(e) => setCalorieRequirements(e.target.value)}
          />
          <Button onClick={handleSaveCalorieRequirements}>Save</Button>
          <br></br>
        </Card>

        <Card>
          <h3>Question #7 - Protein Preferences</h3>
          <p>Do you prefer certain types of protein, such as chicken, beef, pork, fish, tofu, or legumes? What is your protein requirements?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={proteinPreferences}
            onChange={(e) => setProteinPreferences(e.target.value)}
          />
          <Button onClick={handleSaveProteinPreferences}>Save</Button>
          <br></br>
        </Card>

        <Card>
          <h3>Question #8 - Religion Choice</h3>
          <p>Do you follow any religion practices (Ex. Christianity, Hinduism, Islamic, etc.)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={religionChoice}
            onChange={(e) => setReligionChoice(e.target.value)}
          />
          <Button onClick={handleSaveReligionChoice}>Save</Button>
          <br></br>
        </Card>

        <Card>
          <h3>Question #9 - Skill Level</h3>
          <p>What is your cooking skill level (e.g., beginner, intermediate, advanced)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          />
          <Button onClick={handleSaveSkillLevel}>Save</Button>
          <br></br>
        </Card>

        <Card>
          <h3>Question #10 - Health Conditions</h3>
          <p>Do you have any health conditions that influence your diet, such as diabetes, high blood pressure, or cholesterol? Explain</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={healthConditions}
            onChange={(e) => setHealthConditions(e.target.value)}
          />
          <Button onClick={handleSaveHealthConditions}>Save</Button>
          <br></br>
        </Card>

        <Card>
          <h3>Question #11 - Other Instructions</h3>
          <p>Do you have any other specific notes or instructions?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={otherInstructions}
            onChange={(e) => setOtherInstructions(e.target.value)}
          />
          <Button onClick={handleSaveOtherInstructions}>Save</Button>
          <br></br>
        </Card>
      </Container>
    </PageContainer>
  );
};

export default EditSettings;