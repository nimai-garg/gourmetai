import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import the Firebase auth instance
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
  margin-top: 60px; /* Adjust margin to move card down */
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
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  width: auto;

  &:hover, &:focus {
    background-color: #333;
    border-color: #000;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
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

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 35px;
  top: 35%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem; /* Increase the font size */
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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Send email verification
      await sendEmailVerification(user);
      
      console.log("User created:", user);
      alert("Verification email sent! Please check your inbox.");

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  }

  const handleHomePage = async () => {
    navigate('/');
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <LogoTextContainer onClick={handleHomePage}>
          <Logo src={logoImage} alt="GourmetChef Logo" />
          <Header>GourmetChef</Header>
        </LogoTextContainer>
      </HeaderContainer>

      <Card>
        <Title>Sign Up</Title>
        <form onSubmit={handleSignUp}>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInputContainer>
              <Input 
                type={passwordVisible ? "text" : "password"} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <TogglePasswordButton type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? '🙈' : '👁️'}
              </TogglePasswordButton>
            </PasswordInputContainer>
            <Input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                onCopy={(e) => e.preventDefault()} 
                onCut={(e) => e.preventDefault()} 
                onPaste={(e) => e.preventDefault()} 
              />
            <Button type="submit">Sign Up</Button>
        </form>
        <SignUpLink onClick={handleLogin}>Already have an account? Log in</SignUpLink>
      </Card>
    </PageContainer>
  );
};

export default SignUp; 