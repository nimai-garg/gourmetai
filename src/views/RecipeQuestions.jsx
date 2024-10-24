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
  padding: 2.5rem;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  gap: 1rem;
  
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

const GoBackButton = styled(Button)`
  width: auto; /* Adjust width for smaller buttons */
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  margin: 0 1rem; /* Add this line for a gap */
`;

const SkipQuestion = styled(Button)`
  width: auto; /* Adjust width for smaller buttons */
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  margin: 0 1rem; /* Add this line for a gap */
`;

const HorizontalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem; /* Add gap between buttons */
  margin-top: 1rem; /* Add some space above the buttons */
`;

const RecipeQuestions = () => {
  const navigate = useNavigate();
  const [cuisinePreference, setCuisinePreference] = useState('');
  const [flavorPreference, setFlavorPreference] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servingsNeeded, setServingsNeeded] = useState('');
  const [mealType, setMealType] = useState('');
  const [ageCheck, setAgeCheck] = useState('');
  const [isCuisinePreferenceValid, setIsCuisinePreferenceValid] = useState(true);
  const [isFlavorPreferenceValid, setIsFlavorPreferenceValid] = useState(true);
  const [isCookingTimeValid, setIsCookingTimeValid] = useState(true);
  const [isServingsNeededValid, setIsServingsNeededValid] = useState(true);
  const [isMealTypeValid, setIsMealTypeValid] = useState(true);
  const [isAgeCheckValid, setIsAgeCheckValid] = useState(true);
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
          setCuisinePreference(userData.cuisinePreference || '');
          setFlavorPreference(userData.flavorPreference || '');
          setCookingTime(userData.cookingTime || '');
          setServingsNeeded(userData.servingsNeeded || '');
          setMealType(userData.mealType || '');
          setAgeCheck(userData.ageCheck || '');
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

const handleSaveCuisinePreference = async () => {
  if (!cuisinePreference.trim()) {
    setIsCuisinePreferenceValid(false);
    return;
  }
  setIsCuisinePreferenceValid(true);

  if (!currentUser) {
    console.error('No current user found');
    return;
  }

  try {
    const userId = currentUser.uid; // Get the user ID
    const userDocRef = doc(db, 'users', userId);

    await setDoc(userDocRef, { cuisinePreference }, { merge: true });

    setCurrentCard(3); // Move to the next card
  } catch (error) {
    console.error('Error saving cuisine preference:', error);
  }
};

const handleSaveFlavorPreference = async () => {
  if (!flavorPreference.trim()) {
    setIsFlavorPreferenceValid(false);
    return;
  }
  setIsFlavorPreferenceValid(true);

  if (!currentUser) {
    console.error('No current user found');
    return;
  }

  try {
    const userId = currentUser.uid; // Get the user ID
    const userDocRef = doc(db, 'users', userId);

    await setDoc(userDocRef, { flavorPreference }, { merge: true });

    setCurrentCard(4); // Move to the next card
  } catch (error) {
    console.error('Error saving flavor preference:', error);
  }
};

const handleSaveCookingTime = async () => {
  if (!cookingTime.trim()) {
    setIsCookingTimeValid(false);
    return;
  }
  setIsCookingTimeValid(true);

  if (!currentUser) {
    console.error('No current user found');
    return;
  }

  try {
    const userId = currentUser.uid; // Get the user ID
    const userDocRef = doc(db, 'users', userId);

    await setDoc(userDocRef, { cookingTime }, { merge: true });

    setCurrentCard(5); // Move to the next card
  } catch (error) {
    console.error('Error saving cooking time:', error);
  }
};

const handleSaveServingsNeeded = async () => {
  if (!servingsNeeded.trim()) {
    setIsServingsNeededValid(false);
    return;
  }
  setIsServingsNeededValid(true);

  if (!currentUser) {
    console.error('No current user found');
    return;
  }

  try {
    const userId = currentUser.uid; // Get the user ID
    const userDocRef = doc(db, 'users', userId);

    await setDoc(userDocRef, { servingsNeeded }, { merge: true });

    setCurrentCard(6); // Move to the next card
  } catch (error) {
    console.error('Error saving servings needed:', error);
  }
};

const handleSaveMealType = async () => {
  if (!mealType.trim()) {
    setIsMealTypeValid(false);
    return;
  }
  setIsMealTypeValid(true);

  if (!currentUser) {
    console.error('No current user found');
    return;
  }

  try {
    const userId = currentUser.uid; // Get the user ID
    const userDocRef = doc(db, 'users', userId);

    await setDoc(userDocRef, { mealType }, { merge: true });

    setCurrentCard(7); // Move to the next card
  } catch (error) {
    console.error('Error saving meal type:', error);
  }
};

const handleSaveAgeCheck = async () => {
  if (!ageCheck.trim()) {
    setIsAgeCheckValid(false);
    return;
  }
  setIsAgeCheckValid(true);

  if (!currentUser) {
    console.error('No current user found');
    return;
  }

  try {
    const userId = currentUser.uid; // Get the user ID
    const userDocRef = doc(db, 'users', userId);

    await setDoc(userDocRef, { ageCheck }, { merge: true });

    setCurrentCard(8); // Move to the next card
  } catch (error) {
    console.error('Error saving age check:', error);
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

const handleGoBack12 = async () => {
  setCurrentCard(12);
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

const handleContinueButton = async () => {
  setCurrentCard(2);
}

const handleSaveSetup = async () => {
  navigate('/recipeGenerator');
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
          <Button onClick={handleContinueButton}>Continue</Button>
        </Card>
      )}

      {currentCard === 2 && (
        <Card>
          <h3>Question #1 - Cuisine Preference</h3>
          <p>Do you prefer any particular cuisines (e.g., Italian, Mexican, Indian)?</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={cuisinePreference}
            onChange={(e) => setCuisinePreference(e.target.value)}
            isInvalid={!isCuisinePreferenceValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveCuisinePreference}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward2}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack1}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 3 && (
        <Card>
          <h3>Question #2 - Flavor Profile</h3>
          <p> What kind of flavors do you enjoy (e.g., spicy, sweet, savory)?</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={flavorPreference}
            onChange={(e) => setFlavorPreference(e.target.value)}
            isInvalid={!isFlavorPreferenceValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveFlavorPreference}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward3}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack2}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 4 && (
        <Card>
          <h3>Question #3 - Cooking Time</h3>
          <p>How much time do you have to cook?</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            isInvalid={!isCookingTimeValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveCookingTime}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward4}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack3}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 5 && (
        <Card>
          <h3>Question #4 - Servings Needed</h3>
          <p>How many servings do you need?</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={servingsNeeded}
            onChange={(e) => setServingsNeeded(e.target.value)}
            isInvalid={!isServingsNeededValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveServingsNeeded}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward5}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack4}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 6 && (
        <Card>
          <h3>Question #5 - Meal Type</h3>
          <p>Are you looking for a recipe for breakfast, lunch, dinner, or a snack?</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            isInvalid={!isMealTypeValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveMealType}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward6}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack5}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 7 && (
        <Card>
          <h3>Question #6 - Age Check</h3>
          <p>Are you looking for recipes that are kids, teens, or adults?</p>

          <InputField
            type="text"
            placeholder="Enter your response"
            value={ageCheck}
            onChange={(e) => setAgeCheck(e.target.value)}
            isInvalid={!isAgeCheckValid}
          />
          <ButtonContainer>
            <Button onClick={handleSaveAgeCheck}>Next</Button>
            <HorizontalButtonContainer>
              <SkipQuestion onClick={handleGoForward7}>Skip Question</SkipQuestion>
              <GoBackButton onClick={handleGoBack6}>Go Back</GoBackButton>
            </HorizontalButtonContainer>
          </ButtonContainer>
        </Card>
      )}

      {currentCard === 8 && (
        <Card>
          <h3>Perfect, now let our AI create recipes for you</h3>
          <p>Please click the button below to generate, doing this will save your responses</p>
          <GoBackButton onClick={handleGoBack12}>Go Back</GoBackButton>
          <Button onClick={handleSaveSetup}>Confirm</Button>
        </Card>
      )}


    </PageContainer>
  )
}

export default RecipeQuestions;