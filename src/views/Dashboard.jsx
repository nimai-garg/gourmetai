import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../firebaseConfig'; // Adjust the path to your firebaseConfig.js
import SettingsImage from './settings-icon.png';

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

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const CenterText = styled.h1`
  font-size: 2.5rem;
  font-family: 'SFPro-Bold', sans-serif;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubCenterText = styled.h3`
  font-size: 1.1rem;
  font-family: 'SFPro-Regular', sans-serif;
  font-weight: 400;
  text-align: center;
  color: gray;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const OptionButton = styled.button`
  color: #000000;
  background-color: transparent;
  border: 1.2px solid #ECECEC;
  border-radius: 10px;
  padding: 60px 0px;
  width: 250px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  font-family: 'SFPro-Semibold', sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s; /* Add a smooth transition for hover effect */

  &:hover, &:focus {
    color: #000;
    border: 1.2px solid gray;
    transform: scale(1.05); /* Expand the button slightly on hover */
  }
`;

const Footer = styled.p`
  justify-content: center;
  align-items: center;
  display: flex;
  color: #000;
  font-family: 'SFPro-Regular', sans-serif;
  margin-top: 260px;
  
  &:hover {
    font-family: 'SFPro-Bold', sans-serif;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SettingsCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ccc;
  background-image: url(${SettingsImage});
  background-size: 20px 20px; /* Resize the background image */
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #aaa;
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    background-size: 15px 15px; /* Adjust for smaller screens */
  }
`;

const Landing = () => {
  const navigate = useNavigate();

  const handleEditSetupButton = async () => {
    navigate('/editSettings');
  };

  const handleRecipeSetup = async () => {
    navigate('/reviewSettings')
  };
  
  // const handleCookingTips = async () => {
  //   navigate('/cookingTips');
  // };

  const handleNutritionalData = async () => {
    navigate('/nutritionalData');
  }

  const handleSettings = async() => {
    navigate('/settings');
  }

  const handleSignOut = async () => {
    try {
      navigate('/login');
      await logOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>GourmetChef</Header>
      
        <NavigationButtonDiv>
  <ActionButton onClick={handleEditSetupButton}>Edit Setup</ActionButton>
  <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
  <SettingsCircle onClick={handleSettings}/>
</NavigationButtonDiv>
      </HeaderContainer>

      <WelcomeContainer>
        <CenterText>Welcome to GourmetChef</CenterText>
        <SubCenterText>Choose a feature below to get started</SubCenterText>
        
        <ButtonContainer>
          <OptionButton onClick={handleRecipeSetup}>AI Recipe Generator</OptionButton>
          <OptionButton onClick={handleNutritionalData}>Nutritional Data & Insights</OptionButton>
          <br></br>
        </ButtonContainer>

        {/* <ButtonContainer>
          <OptionButton onClick={handleCookingTips}>Cooking Tips</OptionButton>
        </ButtonContainer> */}
      </WelcomeContainer>
      
      <Footer>© 2024 - Created by Nimai Garg - nimaigarg08@gmail.com</Footer>
    </PageContainer>
  )
}

export default Landing;