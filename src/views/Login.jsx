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
  font-family: 'Inter', sans-serif;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  gap: 1rem; /* Add this line for the gap */
`;

const Button = styled.button`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 10px;
  padding: 15px 25px;
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
    navigate('/');
  }

  return (
    <PageContainer>
      <h1>GourmetChef</h1>
      <p>An app that provides you cooking resources</p>
      <br></br>
      <Card>
        <Button onClick={handleLogin}>Let's go!</Button>
        <Button onClick={handleLearn}>Learn more</Button>
      </Card>
    </PageContainer>
  );
};

export default Login;
