import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Import auth from firebaseConfig.js

// Styled Components
const PageContainer = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box; /* Include padding in the height calculation */
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

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
  gap: 10px;
`;

const ActionButton = styled.button`
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
    transform: scale(1.03);
  }
`;

const SignOutButton = styled(ActionButton)`
  background-color: #f00;

  &:hover, &:focus {
    background-color: red;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px); /* Full width with padding on both sides */
  max-width: 800px; /* Adjust as needed */
  height: calc(100vh - 80px); /* Full height minus header and input container space */
  max-height: 600px; /* Optional: set a max-height */
  margin: 0 auto; /* Center the container */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box; /* Include padding in the width and height calculation */
`;

const MessageList = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-sizing: border-box; /* Include padding in the width calculation */
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ isUser }) => (isUser ? '#007bff' : '#f1f1f1')};
  color: ${({ isUser }) => (isUser ? '#fff' : '#000')};
  font-family: 'Inter', sans-serif;
`;

const AssistantTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const TextInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 10px;
  font-family: 'Inter', sans-serif;
`;

const SendButton = styled(ActionButton)`
  background-color: #000;
`;

const RecipeGenerator = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const assistantName = "GourmetBot"; // Name of the assistant
  const [age, setAge] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [allergyRestrictions, setAllergyRestrictions] = useState('');
  const [calorieRequirements, setCalorieRequirements] = useState('');
  const [proteinPreferences, setProteinPreferences] = useState('')
  const [nutritionalGoals, setNutritionalGoals] = useState('');
  const [religionChoice, setReligionChoice] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [kitchenEquipment, setKitchenEquipment] = useState('');
  const [cookingRestrictions, setCookingRestrictions] = useState('');
  const [otherInstructions, setOtherInstructions] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const sendStaticPrompt = async () => {

      const userId = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const {
          age,
          dietaryRestrictions,
          allergyRestrictions,
          calorieRequirements,
          proteinPreferences,
          nutritionalGoals,
          religionChoice,
          availableIngredients,
          skillLevel,
          healthConditions,
          kitchenEquipment,
          cookingRestrictions,
          otherInstructions
        } = userData;
      }

      const combinedPrompt = `${staticText}
          Age: ${age}
          Dietary Restrictions: ${dietaryRestrictions}
          Allergy Restrictions: ${allergyRestrictions}
          Calorie Requirements: ${calorieRequirements}
          Protein Preferences: ${proteinPreferences}
          Nutritional Goals: ${nutritionalGoals}
          Religion Choice: ${religionChoice}
          Available Ingredients: ${availableIngredients}
          Skill Level: ${skillLevel}
          Health Conditions: ${healthConditions}
          Kitchen Equipment: ${kitchenEquipment}
          Cooking Restrictions: ${cookingRestrictions}
          Other Instructions: ${otherInstructions}`;

      const staticText = "Make recipes based on this";

      try {
        const response = await axios.post('http://localhost:5001/updatePrompt', { prompt: combinedPrompt });
        const data = response.data;

        setMessages(prevMessages => [
          ...prevMessages,
          { type: 'bot', text: data.choices[0].message.content.trim() }
        ]);
      } catch (error) {
        console.error('Error sending static prompt to backend:', error);
      }
    };

    sendStaticPrompt();
  }, []);

  const handleSendMessage = async () => {
    if (!input) return;

    try {
      const response = await axios.post('http://localhost:5001/updatePrompt', { prompt: input });
      const data = response.data;

      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'bot', text: data.choices[0].message.content.trim() }
      ]);
      setInput('');
    } catch (error) {
      console.error('Error sending user message to ChatGPT:', error);
    }
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>GourmetAI</Header>
        <NavigationButtonDiv>
          <ActionButton>Edit Setup</ActionButton>
          <SignOutButton>Sign Out</SignOutButton>
        </NavigationButtonDiv>
      </HeaderContainer>
      <ChatContainer>
        <MessageList>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.type === 'user'}>
              {!message.type === 'user' && (
                <AssistantTitle>{assistantName}</AssistantTitle>
              )}
              <MessageBubble isUser={message.type === 'user'}>
                {message.text}
              </MessageBubble>
            </Message>
          ))}
        </MessageList>
        <InputContainer>
          <TextInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <SendButton onClick={handleSendMessage}>Send</SendButton>
        </InputContainer>
      </ChatContainer>
    </PageContainer>
  );
};

export default RecipeGenerator;