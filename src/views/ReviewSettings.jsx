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

const Header = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
`;

// const CardHeader = styled.h2`
//   font-family: 'Inter', sans-serif;
//   font-weight: 600;
// `;

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
  margin: 0 1rem; /* Add this line for a gap */

  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }

  &:hover, &:focus {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const InputField = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${props => (props.isInvalid ? 'red' : '#ccc')};
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 300px;
  font-size: 1rem;
  font-family: 'Inter Tight', sans-serif;
  resize: vertical;
  max-width: 100%;
  max-height: 200%;
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

const SkipQuestion = styled.button`
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HorizontalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem; /* Add gap between buttons */
  margin-top: 1rem; /* Add some space above the buttons */
`;

const SkipSetup = styled(Button)`
  width: auto; /* Adjust width for smaller buttons */
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
`;

const ReviewSettings = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [allergyRestrictions, setAllergyRestrictions] = useState('');
  const [calorieRequirements, setCalorieRequirements] = useState('');
  const [proteinPreferences, setProteinPreferences] = useState('')
  const [religionChoice, setReligionChoice] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [otherInstructions, setOtherInstructions] = useState('');

  const [isAgeValid, setIsAgeValid] = useState(true);
  const [isDietaryRestrictionsValid, setIsDietaryRestrictionsValid] = useState(true);
  const [isAllergyRestrictionsValid, setIsAllergyRestrictionsValid] = useState(true);
  const [isCalorieRequirementsValid, setIsCalorieRequirementsValid] = useState(true);
  const [isProteinPreferencesValid, setIsProteinPreferencesValid] = useState(true);
  const [isReligionChoiceValid, setIsReligionChoiceValid] = useState(true);
  const [isSkillLevelValid, setIsSkillLevelValid] = useState(true);
  const [isHealthConditionsValid, setIsHealthConditionsValid] = useState(true);
  const [isOtherInstructionsValid, setIsOtherInstructionsValid] = useState(true);
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

  // const fetchUserData = async () => {
  //   try {
  //     if (!currentUser) return;
      
  //     const userId = currentUser.uid;
  //     const userDocRef = doc(db, 'users', userId);
  //     const docSnap = await getDoc(userDocRef);

  //     if (docSnap.exists()) {
  //       const userData = docSnap.data();
  //       setAge(userData.age || '');
  //         setDietaryRestrictions(userData.dietaryRestrictions || '');
  //         setAllergyRestrictions(userData.allergyRestrictions || '');
  //         setCalorieRequirements(userData.calorieRequirements || '');
  //         setProteinPreferences(userData.proteinPreferences || '');
  //         setNutritionalGoals(userData.nutritionalGoals || '');
  //         setReligionChoice(userData.religionChoice || '');
  //         setAvailableIngredients(userData.availableIngredients || '');
  //         setSkillLevel(userData.skillLevel || '');
  //         setHealthConditions(userData.healthConditions || '');
  //         setKitchenEquipment(userData.kitchenEquipment || '');
  //         setCookingRestrictions(userData.setCookingRestrictions || '');
  //         setOtherInstructions(userData.otherInstructions || '');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  const handleSaveAge = async () => {
    if (!age.trim()) {
      setIsAgeValid(false);
      return;
    }
    setIsAgeValid(true);
  
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { age }, { merge: true });
  
      setCurrentCard(3); // Move to the next card
    } catch (error) {
      console.error('Error saving age:', error);
    }
  };

  const handleSaveDietaryRestrictions = async () => {
    if (!dietaryRestrictions.trim()) {
      setIsDietaryRestrictionsValid(false);
      return;
    }
    setIsDietaryRestrictionsValid(true);
  
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

  const handleSaveAllergyRestrictions = async () => {
    if (!allergyRestrictions.trim()) {
      setIsAllergyRestrictionsValid(false);
      return;
    }
    setIsAllergyRestrictionsValid(true);
  
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { allergyRestrictions }, { merge: true });
  
      setCurrentCard(5); // Move to the next card
    } catch (error) {
      console.error('Error saving allergy restrictions:', error);
    }
  };

  const handleSaveCalorieRequirements = async () => {
    if (!calorieRequirements.trim()) {
      setIsCalorieRequirementsValid(false);
      return;
    }
    setIsCalorieRequirementsValid(true);
  
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { calorieRequirements }, { merge: true });
  
      setCurrentCard(6); // Move to the next card
    } catch (error) {
      console.error('Error saving calorie requirements:', error);
    }
  };

  const handleSaveProteinPreferences = async () => {
    if (!proteinPreferences.trim()) {
      setIsProteinPreferencesValid(false);
      return;
    }
    setIsProteinPreferencesValid(true);
  
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { proteinPreferences }, { merge: true });
  
      setCurrentCard(7); // Move to the next card
    } catch (error) {
      console.error('Error saving protein preferences:', error);
    }
  };

  // const handleSaveNutritionalGoals = async () => {
  //   if (!nutritionalGoals.trim()) {
  //     setIsNutritionalGoalsValid(false);
  //     return;
  //   }
  //   setIsNutritionalGoalsValid(true);
  
  //   if (!currentUser) {
  //     console.error('No current user found');
  //     return;
  //   }
  
  //   try {
  //     const userId = currentUser.uid; // Get the user ID
  //     const userDocRef = doc(db, 'users', userId);
  
  //     await setDoc(userDocRef, { nutritionalGoals }, { merge: true });
  
  //     setCurrentCard(8); // Move to the next card
  //   } catch (error) {
  //     console.error('Error saving nutritional goals:', error);
  //   }
  // };

  const handleSaveReligionChoice = async () => {
    if (!religionChoice.trim()) {
      setIsReligionChoiceValid(false);
      return;
    }
    setIsReligionChoiceValid(true);
  
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { religionChoice }, { merge: true });
  
      setCurrentCard(8); // Move to the next card
    } catch (error) {
      console.error('Error saving religion choice:', error);
    }
  };

  // const handleSaveAvailableIngredients = async () => {
  //   if (!availableIngredients.trim()) {
  //     setIsAvailableIngredientsValid(false);
  //     return;
  //   }
  //   setIsAvailableIngredientsValid(true);
  
  //   if (!currentUser) {
  //     console.error('No current user found');
  //     return;
  //   }
  
  //   try {
  //     const userId = currentUser.uid; // Get the user ID
  //     const userDocRef = doc(db, 'users', userId);
  
  //     await setDoc(userDocRef, { availableIngredients }, { merge: true });
  
  //     setCurrentCard(10); // Move to the next card
  //   } catch (error) {
  //     console.error('Error saving available ingredients:', error);
  //   }
  // };

  const handleSaveSkillLevel = async () => {
    if (!skillLevel.trim()) {
      setIsSkillLevelValid(false);
      return;
    }
    setIsSkillLevelValid(true);
  
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { skillLevel }, { merge: true });
  
      setCurrentCard(9); // Move to the next card
    } catch (error) {
      console.error('Error saving skill level:', error);
    }
  };

  const handleSaveHealthConditions = async () => {
    if (!healthConditions.trim()) {
      setIsHealthConditionsValid(false);
      return;
    }
    setIsHealthConditionsValid(true);
  
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { healthConditions }, { merge: true });
  
      setCurrentCard(10); // Move to the next card
    } catch (error) {
      console.error('Error saving health conditions:', error);
    }
  };

  // const handleSaveKitchenEquipment = async () => {
  //   if (!kitchenEquipment.trim()) {
  //     setIsKitchenEquipmentValid(false);
  //     return;
  //   }
  //   setIsKitchenEquipmentValid(true);
  
  //   if (!currentUser) {
  //     console.error('No current user found');
  //     return;
  //   }
  
  //   try {
  //     const userId = currentUser.uid; // Get the user ID
  //     const userDocRef = doc(db, 'users', userId);
  
  //     await setDoc(userDocRef, { kitchenEquipment }, { merge: true });
  
  //     setCurrentCard(13); // Move to the next card
  //   } catch (error) {
  //     console.error('Error saving kitchen equipment:', error);
  //   }
  // };

  // const handleSaveCookingRestrictions = async () => {
  //   if (!cookingRestrictions.trim()) {
  //     setIsCookingRestrictionsValid(false);
  //     return;
  //   }
  //   setIsCookingRestrictionsValid(true);
  
  //   if (!currentUser) {
  //     console.error('No current user found');
  //     return;
  //   }
  
  //   try {
  //     const userId = currentUser.uid; // Get the user ID
  //     const userDocRef = doc(db, 'users', userId);
  
  //     await setDoc(userDocRef, { cookingRestrictions }, { merge: true });
  
  //     setCurrentCard(14); // Move to the next card
  //   } catch (error) {
  //     console.error('Error saving cooking restrictions:', error);
  //   }
  // };

  const handleSaveOtherInstructions = async () => {
    if (!otherInstructions.trim()) {
      setIsOtherInstructionsValid(false);
      return;
    }
    setIsOtherInstructionsValid(true);
  
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { otherInstructions }, { merge: true });
  
      setCurrentCard(11); // Move to the next card
    } catch (error) {
      console.error('Error saving other instructions:', error);
    }
  };

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

  const handleGoBack6 = async () => {
    setCurrentCard(6);
  }

  const handleGoBack7 = async () => {
    setCurrentCard(7);
  }

  const handleGoBack8 = async () => {
    setCurrentCard(8);
  }

  const handleGoBack9 = async () => {
    setCurrentCard(9);
  }

  const handleGoBack10 = async () => {
    setCurrentCard(10);
  }

  const handleSkipSetup = async () => {
    navigate('/recipeQuestions')
  }

  const handleGoForward2 = async () => {
    setCurrentCard(3);
  }

  const handleGoForward3 = async () => {
    setCurrentCard(4);
  }

  const handleGoForward4 = async () => {
    setCurrentCard(5);
  }

  const handleGoForward5 = async () => {
    setCurrentCard(6);
  }

  const handleGoForward6 = async () => {
    setCurrentCard(7);
  }

  const handleGoForward7 = async () => {
    setCurrentCard(8);
  }

  const handleGoForward8 = async () => {
    setCurrentCard(9);
  }

  const handleGoForward9 = async () => {
    setCurrentCard(10);
  }

  const handleGoForward10 = async () => {
    setCurrentCard(11);
  }
  
  const handleSaveSetup = async () => {
    navigate('/recipeQuestions')
  }

  const handleContinueButton = async () => {
    setCurrentCard(2);
  }

  return (
    <PageContainer>
      <Header>Review Settings</Header>
      <SkipSetup onClick={handleSkipSetup}>Skip Review</SkipSetup>
      <br></br>
      <br></br>

      {currentCard === 1 && (
        <Card>
          <h3>Please review your settings</h3>
          <p></p>
          <ContinueButton onClick={handleContinueButton}>Continue</ContinueButton>
          <Button onClick={handleSkipSetup}>Skip Review</Button>
        </Card>
      )}

      {currentCard === 2 && (
        <Card>
          <h3>Question #1 - Age</h3>
          <p>What is your age?</p>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            isInvalid={!isAgeValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveAge}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward2}>Skip Question</SkipQuestion>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 3 && (
        <Card>
          <h3>Question #2 - Dietary Restrictions</h3>
          <p>Do you follow a specific diet (e.g., vegetarian, vegan, keto, paleo)?</p>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            isInvalid={!isDietaryRestrictionsValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveDietaryRestrictions}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward3}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack2}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 4 && (
        <Card>
          <h3>Question #3 - Allergy Restrictions</h3>
          <p>Do you have any food allergies or intolerances (e.g., gluten, dairy, nuts)?</p>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={allergyRestrictions}
            onChange={(e) => setAllergyRestrictions(e.target.value)}
            isInvalid={!isAllergyRestrictionsValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveAllergyRestrictions}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward4}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack3}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 5 && (
        <Card>
          <h3>Question #4 - Nutritional Goals</h3>
          <p>Are you aiming for any specific nutritional goals (e.g., more protein, less sugar)?</p>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={calorieRequirements}
            onChange={(e) => setCalorieRequirements(e.target.value)}
            isInvalid={!isCalorieRequirementsValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveCalorieRequirements}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward5}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack4}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 6 && (
        <Card>
          <h3>Question #5 - Protein Preferences</h3>
          <p>Do you prefer certain types of protein, such as chicken, beef, pork, fish, tofu, or legumes? What is your protein requirements?</p>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={proteinPreferences}
            onChange={(e) => setProteinPreferences(e.target.value)}
            isInvalid={!isProteinPreferencesValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveProteinPreferences}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward6}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack5}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 7 && (
        <Card>
          <h3>Question #6 - Religion Choice</h3>
          <p>Do you follow any religion practices (Ex. Christianity, Hinduism, Islamic, etc.)?</p>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={religionChoice}
            onChange={(e) => setReligionChoice(e.target.value)}
            isInvalid={!isReligionChoiceValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveReligionChoice}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward7}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack6}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 8 && (
        <Card>
          <h3>Question #7 - Skill Level</h3>
          <p>What is your cooking skill level (e.g., beginner, intermediate, advanced)?</p>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            isInvalid={!isSkillLevelValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveSkillLevel}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward8}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack7}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 9 && (
        <Card>
          <h3>Question #8 Health Conditions</h3>
          <p>Do you have any health conditions that influence your diet, such as diabetes, high blood pressure, or cholesterol? Explain</p>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={healthConditions}
            onChange={(e) => setHealthConditions(e.target.value)}
            isInvalid={!isHealthConditionsValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveHealthConditions}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward9}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack8}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 10 && (
        <Card>
          <h3>Question #9 - Other Instructions</h3>
          <p>Do you have any other specific notes or instructions?</p>
          <InputField
            type="text"
            placeholder="Enter your response"
            value={otherInstructions}
            onChange={(e) => setOtherInstructions(e.target.value)}
            isInvalid={!isOtherInstructionsValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveOtherInstructions}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward10}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack9}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 11 && (
        <Card>
          <h3>Thanks for confirming your questions</h3>
          <p>Next, we will ask you the specifics of your recipe</p>
          <GoBackButton onClick={handleGoBack10}>Go Back</GoBackButton>
          <Button onClick={handleSaveSetup}>Continue</Button>
        </Card>
      )}
    </PageContainer>
  )
}

export default ReviewSettings;