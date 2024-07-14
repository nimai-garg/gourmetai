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
  padding: 2rem;
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

const Button = styled.button`
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

// const Heading = styled.h1`
//   font-size: 1.5rem;
//   font-weight: bold;
//   font-family: "'Fustat', sans-serif";
//   text-align: center;
//   width: 50%;
//   margin: 0 auto;
// `;

const Box = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Fustat', sans-serif;

  max-width: 400px;
  max-height: 400px;

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 90%;
    padding: 1rem;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleRecipeSetup = () => {
    navigate('/recipeSetup');
  };

  const handleEditSettings = () => {
    navigate('/editSettings');
  };

  const handleNutritionalData = () => {
    navigate('/nutritionalData')
  }

  return (
    <PageContainer>

        <HeaderContainer>
          <Header>GourmetAI Dashboard</Header>
          
          <HeaderButtons>
            <Button onClick={handleEditSettings}>Edit Settings</Button>
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </HeaderButtons>
        </HeaderContainer>

        <br></br>
        
        <Box>
          <h3>Recipe Innovation</h3>
          <p>Get started with a new recipe below.</p>
          <Button onClick={handleRecipeSetup}>New Recipe</Button>
        </Box>

        <Box>
          <h3>Nutritional Data</h3>
          <p>Find data on a particular food item</p>
          <Button onClick={handleNutritionalData}>Let's find out</Button>
        </Box>

        <Box>
          <h3>Ingredient of the Week</h3>
          <p>Salt</p>
          <p>Health Benefits:</p>
          - Makes you stronger
        </Box>

    </PageContainer>
  );
};

export default Dashboard;