import React, { useEffect } from 'react';
import styled from 'styled-components';
import { signInWithGoogle, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFF;
  font-family: 'Fustat', sans-serif;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Fustat', sans-serif;
  display: flex;
  justify-content: center;
  gap: 1rem; /* Add this line for the gap */
`;

const Button = styled.button`
  background-color: #fff;
  color: #000000;
  border-color: black;
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  width: 200px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
  font-family: 'Fustat', sans-serif;
  margin: 0 0.5rem; /* Add this line for a gap */
`;

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/setup');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLearn = () => {
    window.open('https://google.com', '_blank');
  }

  return (
    <PageContainer>
      <h1>GourmetAI</h1>
      <p>An app that creates you personalized recipes</p>
      <br></br>
      <Card>
        <Button onClick={handleLogin}>Let's go!</Button>
        <Button onClick={handleLearn}>Learn more</Button>
      </Card>
    </PageContainer>
  );
};

export default Login;
