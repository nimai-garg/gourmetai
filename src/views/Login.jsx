import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { signInWithGoogle, signInWithEmail, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff; /* Slightly off-white background */
  font-family: 'Inter', sans-serif;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px; /* Normal width, adjustable */
  height: auto; /* Increased height */
  background-color: #fff;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #ccc; /* Gray 2px border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ccc; /* Gray border below the title */
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
  font-family: 'SFPro-Regular', sans-serif;
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
  font-family: 'SFPro-Regular', sans-serif;

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.8rem;
  }

  &:hover, &:focus {
    transform: scale(1.03);
  }
  margin: 0 0.5rem;
`;

const GoogleButton = styled.button`
  color: #24292f; /* Text color */
  background-color: #ffffff; /* Background color */
  border: 1px solid rgba(27, 31, 35, 0.15); /* Border style */
  border-radius: 6px; /* Border radius */
  padding: 12px 32px; /* Adjusted padding to match the height and width */
  font-size: 16px; /* Increased font size */
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.25); /* Subtle shadow */
  transition: background-color 0.2s ease, box-shadow 0.2s ease; /* Smooth transitions */

  &:hover, &:focus {
    background-color: #f6f8fa; /* Lighter background on hover */
    border-color: rgba(27, 31, 35, 0.15);
    box-shadow: 0 1px 0 rgba(27, 31, 35, 0.1); /* More pronounced shadow */
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  font-family: 'SFPro-Regular', sans-serif;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const SignUpLink = styled.a`
  color: #000;
  text-decoration: none;
  font-size: 0.85rem;
  font-family: 'SFPro-Regular', sans-serif;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSignUp = () => {
    navigate('/signup');
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const user = await signInWithEmail(email, password);
      console.log("User signed in:", user);
      navigate('/setup'); // Redirect to setup page or desired page
    } catch (error) {
      console.error("Error signing in with email:", error);
    }
  }

  return (
    <PageContainer>
      <Card>
        <Title>Sign In</Title>
        <GoogleButton onClick={handleLogin}>
          Sign in with Google
        </GoogleButton>
        <br />
        <form>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={handleEmailLogin}>Login</Button>
        </form>
        <SignUpLink onClick={handleSignUp}>Sign up</SignUpLink>
      </Card>
    </PageContainer>
  );
};

export default Login;