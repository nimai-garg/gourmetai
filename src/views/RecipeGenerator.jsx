import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

// Styled Components
const PageContainer = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
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

const TrashButton = styled(ActionButton)`
  background-color: #f00; // Red color
  margin-left: 10px;

  &:hover, &:focus {
    background-color: darkred;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  max-width: 800px;
  height: calc(100vh - 80px);
  max-height: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

const MessageList = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-sizing: border-box;
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
  white-space: pre-wrap;
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

const SendButton = styled(ActionButton)`
  background-color: #000;
  margin-left: 10px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
`;

const RecipeGenerator = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const assistantName = "GourmetBot"; // Name of the assistant
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isSetFetchingResponse, setIsFetchingResponse] = useState(false); // State to track if a response is being fetched

  const fetchUserData = useCallback(async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.error('No such document!');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        setLoading(false); // If there's no user, stop loading
      }
    });
  }, [fetchUserData]);

  useEffect(() => {
    if (userData) {
      const sendStaticPrompt = async () => {
        const staticText = "Give the dish name, and details based , but not the recipe please";

        const combinedPrompt = `${staticText}
          Age: ${userData.age || ''}
          Dietary Restrictions: ${userData.dietaryRestrictions || ''}
          Allergy Restrictions: ${userData.allergyRestrictions || ''}
          Calorie Requirements: ${userData.calorieRequirements || ''}
          Protein Preferences: ${userData.proteinPreferences || ''}
          Nutritional Goals: ${userData.nutritionalGoals || ''}
          Religion Choice: ${userData.religionChoice || ''}
          Available Ingredients: ${userData.availableIngredients || ''}
          Skill Level: ${userData.skillLevel || ''}
          Health Conditions: ${userData.healthConditions || ''}
          Kitchen Equipment: ${userData.kitchenEquipment || ''}
          Cooking Restrictions: ${userData.cookingRestrictions || ''}
          Other Instructions: ${userData.otherInstructions || ''}`;

        try {
          setIsFetchingResponse(true); // Start fetching response
          const response = await axios.post('http://localhost:5001/updateStaticPrompt', { prompt: combinedPrompt });
          const data = response.data;

          setMessages(prevMessages => [
            ...prevMessages,
            { type: 'bot', text: formatMessage(data.choices[0].message.content.trim()) }
          ]);
        } catch (error) {
          console.error('Error sending static prompt to backend:', error);
        } finally {
          setIsFetchingResponse(false); // Stop fetching response
        }
      };

      sendStaticPrompt();
    }
  }, [userData, setIsFetchingResponse]);

  const handleNextDish = async () => {
    if (!input) return;

    try {
      setIsFetchingResponse(true); // Start fetching response
      isSetFetchingResponse(true);
      const response = await axios.post('http://localhost:5001/updateNonStaticPrompt', { prompt: "Next Recipe" });
      const data = response.data;

      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'bot', text: formatMessage(data.choices[0].message.content.trim()) }
      ]);
      setInput('');
    } catch (error) {
      console.error('Error sending user message to ChatGPT:', error);
    } finally {
      setIsFetchingResponse(false); // Stop fetching response
    }
  };

  const handleHeaderClick = async () => {

  }

  const handleGiveInstructions = async () => {
    if (!input) return;

    try {
      setIsFetchingResponse(true); // Start fetching response
      const response = await axios.post('http://localhost:5001/updateNonStaticPrompt', { prompt: "Give me the recipe for this" });
      const data = response.data;

      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'bot', text: formatMessage(data.choices[0].message.content.trim()) }
      ]);
      setInput('');
    } catch (error) {
      console.error('Error sending user message to ChatGPT:', error);
    } finally {
      setIsFetchingResponse(false); // Stop fetching response
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const formatMessage = (message) => {
    // Format the message to include proper spacing and list formatting
    return message
      .replace(/\n/g, '\n\n') // Add extra line breaks for spacing
      .replace(/(\d+)\./g, '\n$1.'); // Add new lines before numbered lists
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingMessage>Loading...</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Header onClick={handleHeaderClick}>GourmetChef</Header>
        <NavigationButtonDiv>
          <ActionButton>Edit Setup</ActionButton>
          <SignOutButton>Sign Out</SignOutButton>

        </NavigationButtonDiv>
      </HeaderContainer>
      <ChatContainer>
        <MessageList>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.type === 'user'}>
              {message.type !== 'user' && (
                <AssistantTitle>{assistantName}</AssistantTitle>
              )}
              <MessageBubble isUser={message.type === 'user'}>
                {message.text}
              </MessageBubble>
            </Message>
          ))}
        </MessageList>
        <InputContainer>
          <SendButton onClick={handleGiveInstructions}>Instructions</SendButton>
          <SendButton onClick={handleNextDish}>Next Dish</SendButton>
          <TrashButton onClick={handleClearChat}>Delete Conversation</TrashButton>
        </InputContainer>
      </ChatContainer>
    </PageContainer>
  );
};

export default RecipeGenerator;