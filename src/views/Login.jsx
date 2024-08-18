import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { signInWithGoogle, signInWithEmail, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../images/google.png'; // Import your Google logo here
import logoImage from '../images/logo.png';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #fff;
  font-family: 'Inter', sans-serif;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5em;
  box-sizing: border-box;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0.75em;
  }

  @media (max-width: 480px) { 
    padding: 0.5em;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 600;
  color: black;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Logo = styled.img`
  height: 90px;
  width: 100px;
  margin-right: 10px;

  @media (max-width: 768px) {
    height: 30px;
    width: 30px;
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

const GoogleButton = styled.button`
  color: #24292f;
  background-color: #ffffff;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover, &:focus {
    background-color: #f6f8fa;
    box-shadow: 0 1px 0 rgba(27, 31, 35, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GoogleLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
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

const SignUpLink = styled.a`
  color: #000;
  text-decoration: none;
  font-size: 0.9rem;
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
    e.preventDefault();
    try {
      const user = await signInWithEmail(email, password);
      console.log(user);
      navigate('/setup');
    } catch (error) {
      console.error("Error signing in with email:", error);
    }
  }

  const handleHomePage = async () => {
    navigate('/');
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <LogoTextContainer onClick={handleHomePage}>
          <Logo src={logoImage} alt="GourmetChef Logo" />
          <Header>GourmetChef</Header>
        </LogoTextContainer>
      </HeaderContainer>

      <Card>
        <Title>Sign In</Title>
        <GoogleButton onClick={handleLogin}>
          <GoogleLogo src={googleLogo} alt="Google Logo" />
          Go with Google
        </GoogleButton>
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