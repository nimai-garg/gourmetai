import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig.js'; // Adjust the import path as needed
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

// Styled-components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #fff;
  font-family: 'Inter', sans-serif;
`;

const GoBackContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  color: #333;
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'SFPro-Bold', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  left: 40px; /* Adjust the distance from the left */
  top: 20px; /* Align it vertically with the logo */

  &:hover,
  &:focus {
    background-color: #e0e0e0;
    transform: translateX(-5px);
  }

  svg {
    margin-right: 8px;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  margin-top: 60px; /* Adjust margin to move card down */
`;

const Title = styled.h2`
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ccc;
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Button = styled.button`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 15px;
  cursor: pointer;
  width: auto;

  &:hover, &:focus {
    background-color: #333;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.$error ? 'red' : 'green')};
  margin-top: 10px;
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Password reset email sent! Check your inbox.');
        setError(false);
      })
      .catch((error) => {
        setMessage('Error: ' + error.message);
        setError(true);
      });
  };

  const handleGoBack = () => {
    navigate('/login');
  }

  return (
    <PageContainer>
      <GoBackContainer onClick={handleGoBack} tabIndex="0">
        <FaArrowLeft />
        Go Back
      </GoBackContainer>
      <Card>
        <Title>Forgot Password</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Button type="submit">Send Reset Link</Button>
        </form>
        {message && <Message $error={error} role="status">{message}</Message>}
      </Card>
    </PageContainer>
  );
};

export default ForgotPassword;