import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Import auth from firebaseConfig.js
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

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* Add gap between buttons */
`;

const InlineButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem; /* Add gap between buttons */
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
  width: 150px; /* Set a consistent width for buttons */
  
  &:hover, &:focus {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const InputField = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
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

  width: auto; /* Adjust width for smaller buttons */
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
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

    width: auto; /* Adjust width for smaller buttons */
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
`;

const HorizontalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem; /* Add gap between buttons */
  margin-top: 1rem; /* Add some space above the buttons */
`;

const SignOutButton = styled.button`
  cursor: pointer;
  background-color: red;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  border: 2px solid red; // Use red color for border

  &:hover, &:focus {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const SkipSetup = styled.button`
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

  &:hover, &:focus {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const Setup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [allergyRestrictions, setAllergyRestrictions] = useState('');
  const [calorieRequirements, setCalorieRequirements] = useState('');
  const [proteinPreferences, setProteinPreferences] = useState('')
  const [nutritionalGoals, setNutritionalGoals] = useState('');
  const [favoriteFoods, setFavoriteFoods] = useState('');
  const [leastFavoriteFoods, setLeastFavoriteFoods] = useState('');
  const [religionChoice, setReligionChoice] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [kitchenEquipment, setKitchenEquipment] = useState('');
  const [cookingRestrictions, setCookingRestrictions] = useState('');
  const [otherInstructions, setOtherInstructions] = useState('');
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
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
          setAge(userData.age || '');
          setDietaryRestrictions(userData.dietaryRestrictions || '');
          setAllergyRestrictions(userData.allergyRestrictions || '');
          setCalorieRequirements(userData.calorieRequirements || '');
          setProteinPreferences(userData.proteinPreferences || '');
          setNutritionalGoals(userData.nutritionalGoals || '');
          setFavoriteFoods(userData.favoriteFoods || '');
          setLeastFavoriteFoods(userData.leastFavoriteFoods || '');
          setReligionChoice(userData.religionChoice || '');
          setAvailableIngredients(userData.availableIngredients || '');
          setSkillLevel(userData.skillLevel || '');
          setHealthConditions(userData.healthConditions || '');
          setKitchenEquipment(userData.kitchenEquipment || '');
          setCookingRestrictions(userData.setCookingRestrictions || '');
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
        setNutritionalGoals(userData.nutritionalGoals || '');
        setFavoriteFoods(userData.favoriteFoods || '');
        setLeastFavoriteFoods(userData.leastFavoriteFoods || '');
        setReligionChoice(userData.religionChoice || '');
        setAvailableIngredients(userData.availableIngredients || '');
        setSkillLevel(userData.skillLevel || '');
        setHealthConditions(userData.healthConditions || '');
        setKitchenEquipment(userData.kitchenEquipment || '');
        setCookingRestrictions(userData.setCookingRestrictions || '');
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
  
      setCurrentCard(3); // Move to the next card
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
  
      setCurrentCard(4); // Move to the next card
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
  
      setCurrentCard(5); // Move to the next card
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
  
      setCurrentCard(6); // Move to the next card
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
  
      setCurrentCard(7); // Move to the next card
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
  
      setCurrentCard(8); // Move to the next card
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
  
      setCurrentCard(9); // Move to the next card
    } catch (error) {
      console.error('Error saving protein preferences:', error);
    }
  };

  const handleSaveNutritionalGoals = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { nutritionalGoals }, { merge: true });
  
      setCurrentCard(10); // Move to the next card
    } catch (error) {
      console.error('Error saving nutritional goals:', error);
    }
  };
  
  const handleSaveFavoriteFoods = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { favoriteFoods }, { merge: true });
  
      setCurrentCard(11); // Move to the next card
    } catch (error) {
      console.error('Error saving favorite foods:', error);
    }
  };

  const handleSaveLeastFavoriteFoods = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { leastFavoriteFoods }, { merge: true });
  
      setCurrentCard(12); // Move to the next card
    } catch (error) {
      console.error('Error saving least favorite foods:', error);
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
  
      setCurrentCard(13); // Move to the next card
    } catch (error) {
      console.error('Error saving religion choice:', error);
    }
  };

  const handleSaveAvailableIngredients = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { availableIngredients }, { merge: true });
  
      setCurrentCard(14); // Move to the next card
    } catch (error) {
      console.error('Error saving available ingredients:', error);
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
  
      setCurrentCard(15); // Move to the next card
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
  
      setCurrentCard(16); // Move to the next card
    } catch (error) {
      console.error('Error saving health conditions:', error);
    }
  };

  const handleSaveKitchenEquipment = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { kitchenEquipment }, { merge: true });
  
      setCurrentCard(17); // Move to the next card
    } catch (error) {
      console.error('Error saving kitchen equipment:', error);
    }
  };

  const handleSaveCookingRestrictions = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
  
    try {
      const userId = currentUser.uid; // Get the user ID
      const userDocRef = doc(db, 'users', userId);
  
      await setDoc(userDocRef, { cookingRestrictions }, { merge: true });
  
      setCurrentCard(18); // Move to the next card
    } catch (error) {
      console.error('Error saving cooking restrictions:', error);
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
  
      setCurrentCard(19); // Move to the next card
    } catch (error) {
      console.error('Error saving other instructions:', error);
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

  const handleGoBack11 = async () => {
    setCurrentCard(11);
  }

  const handleGoBack12 = async () => {
    setCurrentCard(12);
  }

  const handleGoBack13 = async () => {
    setCurrentCard(13);
  }

  const handleGoBack14 = async () => {
    setCurrentCard(14);
  }

  const handleGoBack15 = async () => {
    setCurrentCard(15);
  }

  const handleGoBack16 = async () => {
    setCurrentCard(16);
  }

  const handleSkipSetup = async () => {
    navigate('/dashboard')
  }

  const handleGoForward1 = async () => {
    setCurrentCard(2);
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

  const handleGoForward11 = async () => {
    setCurrentCard(12);
  }

  const handleGoForward12 = async () => {
    setCurrentCard(13);
  }

  const handleGoForward13 = async () => {
    setCurrentCard(14);
  }
  
  const handleGoForward14 = async () => {
    setCurrentCard(15);
  }

  const handleGoForward15 = async () => {
    setCurrentCard(16);
  }

  const handleGoForward16 = async () => {
    setCurrentCard(17);
  }

  const handleSaveSetup = async () => {
    navigate('/dashboard');
  }

  return (
    <PageContainer>
      <h1>Setup</h1>
      <p>Personalized comes with the Setup</p>
      
      <HorizontalButtonContainer>
        <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        <SkipSetup onClick={handleSkipSetup}>Skip Setup</SkipSetup>
      </HorizontalButtonContainer>
      
      <br></br>

      {currentCard === 1 && (
        <Card>
          <h3>Answer these 15 questions to get the best recipes</h3>
          <p>Click the button below to continue, if you skip setup you can always change your options
            in the settings page of the application</p>
        
          <Button onClick={handleGoForward1}>Continue</Button>
          <Button onClick={handleSkipSetup}>Skip Setup</Button>
        </Card>
      )}

      {currentCard === 2 && (
        <Card>
        <h3>Question #1 - First Name</h3>
        <p>What is your first name?</p>

        <InputField
          type="text"
          placeholder="Enter your response"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
    
          <ButtonContainer>
            <Button onClick={handleSaveFirstName}>Next</Button>
            <InlineButtonContainer>
              <SkipQuestion onClick={handleGoForward2}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack1}>Go Back</GoBackButton>
            </InlineButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 3 && (
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
          <Button onClick={handleSaveLastName}>Next</Button>
          </div>
          <br></br>
          <SkipQuestion onClick={handleGoForward3}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack2}>Go Back</GoBackButton>
        </Card>
      )}
      
      {currentCard === 4 && (
        <Card>
          <h3>Question #3 - Age</h3>
          <p>What is your age?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Button onClick={handleSaveAge}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward4}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack3}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 5 && (
        <Card>
          <h3>Question #4 - Dietary Restrictions</h3>
          <p>Do you follow a specific diet (e.g., vegetarian, vegan, keto, paleo)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
          <Button onClick={handleSaveDietaryRestrictions}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward5}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack4}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 6 && (
        <Card>
          <h3>Question #5 - Allergy Restrictions</h3>
          <p>Do you have any food allergies or intolerances (e.g., gluten, dairy, nuts)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={allergyRestrictions}
            onChange={(e) => setAllergyRestrictions(e.target.value)}
          />
          <Button onClick={handleSaveAllergyRestrictions}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward6}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack5}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 7 && (
        <Card>
          <h3>Question #6 - Calorie Requirements</h3>
          <p>Do you have any specific calorie requirements or goals (e.g., low-calorie, high-protein)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={calorieRequirements}
            onChange={(e) => setCalorieRequirements(e.target.value)}
          />
          <Button onClick={handleSaveCalorieRequirements}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward7}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack6}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 8 && (
        <Card>
          <h3>Question #7 - Protein Preferences</h3>
          <p>Do you prefer certain types of protein, such as chicken, beef, pork, fish, tofu, or legumes? What is your protein requirements?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={proteinPreferences}
            onChange={(e) => setProteinPreferences(e.target.value)}
          />
          <Button onClick={handleSaveProteinPreferences}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward8}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack7}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 9 && (
        <Card>
          <h3>Question #8 - Nutritional Goals</h3>
          <p>Are you aiming for any specific nutritional goals (e.g., more protein, less sugar)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={nutritionalGoals}
            onChange={(e) => setNutritionalGoals(e.target.value)}
          />
          <Button onClick={handleSaveNutritionalGoals}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward9}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack8}>Go Back</GoBackButton>
        </Card>
      )}
      
      {currentCard === 10 && (
        <Card>
          <h3>Question #9 - Religion Choice</h3>
          <p>Do you follow any religion practices (Ex. Christianity, Hinduism, Islamic, etc.)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={religionChoice}
            onChange={(e) => setReligionChoice(e.target.value)}
          />
          <Button onClick={handleSaveReligionChoice}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward10}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack9}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 11 && (
        <Card>
          <h3>Question #10 - Available Ingredients</h3>
          <p>What ingredients do you currently have available?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={availableIngredients}
            onChange={(e) => setAvailableIngredients(e.target.value)}
          />
          <Button onClick={handleSaveAvailableIngredients}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward11}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack10}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 12 && (
        <Card>
          <h3>Question #11 - Skill Level</h3>
          <p>What is your cooking skill level (e.g., beginner, intermediate, advanced)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          />
          <Button onClick={handleSaveSkillLevel}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward12}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack11}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 13 && (
        <Card>
          <h3>Question #12 - Health Conditions</h3>
          <p>Do you have any health conditions that influence your diet, such as diabetes, high blood pressure, or cholesterol? Explain</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={healthConditions}
            onChange={(e) => setHealthConditions(e.target.value)}
          />
          <Button onClick={handleSaveHealthConditions}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward13}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack12}>Go Back</GoBackButton>
        </Card>
      )}
      
      {currentCard === 14 && (
        <Card>
          <h3>Question #13 - Kitchen Equipment</h3>
          <p>Do you have any special kitchen equipment you’d like to use, such as an Instant Pot, air fryer, or sous-vide machine?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={kitchenEquipment}
            onChange={(e) => setKitchenEquipment(e.target.value)}
          />
          <Button onClick={handleSaveKitchenEquipment}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward14}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack13}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 15 && (
        <Card>
          <h3>Question #14 - Cooking Restrictions</h3>
          <p>Are there any cooking methods or equipment you don’t have or prefer not to use (e.g., oven,  blender)?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={cookingRestrictions}
            onChange={(e) => setCookingRestrictions(e.target.value)}
          />
          <Button onClick={handleSaveCookingRestrictions}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward15}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack14}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 16 && (
        <Card>
          <h3>Question #15 - Other Instructions</h3>
          <p>Do you have any other specific notes or instructions?</p>
        
          <InputField
            type="text"
            placeholder="Enter your response"
            value={otherInstructions}
            onChange={(e) => setOtherInstructions(e.target.value)}
          />
          <Button onClick={handleSaveOtherInstructions}>Next</Button>
          <br></br>
          <SkipQuestion onClick={handleGoForward16}>Skip Question</SkipQuestion>
          <GoBackButton onClick={handleGoBack15}>Go Back</GoBackButton>
        </Card>
      )}

      {currentCard === 17 && (
        <Card>
          <h3>Awesome! Thanks for completing the questions</h3>
          <p>You may change your answerrs anytime at the "Edit Setup" page located through the dashboard</p>
          <GoBackButton onClick={handleGoBack16}>Go Back</GoBackButton>
          <Button onClick={handleSaveSetup}>Finish</Button>
        </Card>
      )}

    </PageContainer>

  );
};

export default Setup;