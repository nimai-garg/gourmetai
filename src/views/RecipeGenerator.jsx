import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
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
  gap: 10px; /* Adjust the gap as needed */
`

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
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const SignOutButton = styled.button`
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
    background-color: red;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const MessageList = styled.div`
  flex-grow: 1;
  width: 100%;
  margin-bottom: 20px;
  overflow-y: auto;
  max-height: 400px;
`;

const Message = styled.div`
  display: flex;
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
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

  &:hover {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const RecipeGenerator = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { type: 'user', text: input };
      setMessages([...messages, newMessage]);

      // Call the backend API to get the response
      const response = await fetch('http://localhost:3000/recipeGenerator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { type: 'bot', text: data.reply };
      setMessages([...messages, newMessage, botMessage]);
      setInput('');
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
          <SendButton onClick={sendMessage}>Send</SendButton>
        </InputContainer>
      </ChatContainer>
    </PageContainer>
  );
};

export default RecipeGenerator;