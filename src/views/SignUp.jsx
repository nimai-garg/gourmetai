import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../firebaseConfig'; // Import the createUser function

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
  font-family: 'Inter', sans-serif;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  height: auto;
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
`;

const Title = styled.h2`
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ccc;
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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Sign-Up button clicked");
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const user = await createUser(email, password);
      console.log("User created:", user);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <PageContainer>
      <Card>
        <Title>Sign Up</Title>
        <form onSubmit={handleSignUp}>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button type="submit">Sign Up</Button>
        </form>
        <SignUpLink onClick={handleLogin}>Already have an account? Log in</SignUpLink>
      </Card>
    </PageContainer>
  );
};

export default SignUp;