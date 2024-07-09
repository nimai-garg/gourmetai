import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../firebaseConfig'; // Adjust the path to your firebaseConfig.js
import styled from 'styled-components';

const PageContainer = styled.div`
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Fustat', sans-serif;
    padding: 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const Header = styled.div`
  font-size: 1.7rem;
  font-family: 'Fustat', sans-serif;
  font-weight: bold;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SignOutButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 30px;
  font-family: 'Fustat', sans-serif;
  background-color: #fff;
  color: red;
  border: 2px solid red;
   padding: 10px 20px;

  &:hover {
    color: #fff;
    background-color: red;
    border-color: white;
  }
`;

const NewRecipeButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 30px;
  font-family: 'Fustat', sans-serif;
  background-color: #fff;
  color: black;
  border: 2px solid black;
   padding: 10px 20px;

  &:hover {
    color: #fff;
    background-color: black;
    border-color: white;
  }
`;

const EditSettingsButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 30px;
  font-family: 'Fustat', sans-serif;
  background-color: #fff;
  color: black;
  border: 2px solid black;
  padding: 10px 20px;

  &:hover {
    color: #fff;
    background-color: black;
    border-color: white;
  }
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "'Fustat', sans-serif";
  text-align: center;
  width: 50%;
  margin: 0 auto;
`;

const Dashboard = () => {
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/login'); // Redirect to login page after logging out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleRecipeSetup = () => {
    navigate('/nextPage');
  };

  const handleEditSettings = () => {
    navigate('/editSettings');
  };

  return (
    <PageContainer>
        <HeaderContainer>
          <Header>GourmetAI Dashboard</Header>
          <HeaderButtons>
            <EditSettingsButton onClick={handleEditSettings}>Edit Settings</EditSettingsButton>
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </HeaderButtons>
        </HeaderContainer>
        <p>Get started with a new recipe below.</p>
        <NewRecipeButton onClick={handleRecipeSetup}>New Recipe</NewRecipeButton>
    </PageContainer>
  );
};

export default Dashboard;