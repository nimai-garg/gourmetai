import React from 'react'
import styled from 'styled-components';
import logoImage from './logo.png';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 20px; /* Add padding for small screens */
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 10px;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CenterText = styled.h1`
  font-size: 4rem;
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 100px;
  
  background: linear-gradient(90deg, #ff4757, #1e90ff);
  -webkit-background-clip: text; /* Clip the gradient to the text */
  -webkit-text-fill-color: transparent; /* Make the text color transparent */

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 50px;
  }
`;

const SubCenterText = styled.h3`
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  background: black;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 60px;
  -webkit-background-clip: text; /* Clip the gradient to the text */
  -webkit-text-fill-color: transparent; /* Make the text color transparent */

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

const CenterTextButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 50px; /* Adjust the gap as needed */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LeftCenterTextButton = styled.button`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 10px;
  padding: 11px 21px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  width: 150px; /* Set a consistent width for buttons */
  gap: 1rem;
  
  &:hover, &:focus {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

// const RightCenterTextButton = styled.button`
//   color: #fff;
//   background-color: #000;
//   border: none;
//   border-radius: 10px;
//   padding: 11px 21px;
//   font-size: 1rem;
//   font-weight: bold;
//   cursor: pointer;
//   font-family: 'Inter', sans-serif;
//   font-weight: 500;
//   width: 150px; /* Set a consistent width for buttons */
//   gap: 1rem;
  
//   &:hover, &:focus {
//     transform: scale(1.03); /* Expand the button slightly on hover */
//   }
// `;

const ActionButton = styled.button`
  color: #fff;
  background-color: #000;
  border: 2px solid black;
  border-radius: 10px;
  padding: 9px 19px;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  // &:hover {
  //   color: #000;
  //   background-color: #fff;
  //   border-color: white;
  // }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
`;

const FeatureHeader = styled.h2`
  font-size: 3rem;
  font-family: 'Inter Tight', sans-serif;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 100px;
  
  background: linear-gradient(90deg, #008080, #FF7F50);
  -webkit-background-clip: text; /* Clip the gradient to the text */
  -webkit-text-fill-color: transparent; /* Make the text color transparent */

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 50px;
  }
`;

const SecondDiv = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px; /* Adjust the gap as needed */

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 40px;
    gap: 10px;
  }
`;

const Box = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  margin-left: 50px;
  max-width: 400px;
  max-height: 400px;

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 90%;
    padding: 1rem;
  }
`;

const BoxHeader = styled.h1`
  align-items: flex-start;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const MiddleBoxHeader = styled.h1`
  align-items: flex-start;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  background: linear-gradient(90deg, #ff4757, #ff6348);
  -webkit-background-clip: text; /* Clip the gradient to the text */
  -webkit-text-fill-color: transparent; /* Make the text color transparent */

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BoxParagraph = styled.p`
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Footer = styled.p`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 60px;
  font-family: 'Inter', sans-serif;
  &:hover {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 0.9rem;
  }
`;

const Landing = () => {
  const navigate = useNavigate();

  const handleActionButton = () => {
    navigate('/login');
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>
          <Logo src={logoImage} alt="GourmetChef Logo" />
          GourmetChef
        </Header>
        <ActionButton onClick={handleActionButton}>Create</ActionButton>
      </HeaderContainer>
      <CenterText>Find inspiration for your next recipe</CenterText>
      <SubCenterText>Create, Learn, Gourmet. Powered by GPT 4o Mini. No cost. No pricing plans</SubCenterText>
      <CenterTextButtonDiv>
        <LeftCenterTextButton onClick={handleActionButton}>Let's begin</LeftCenterTextButton>
      </CenterTextButtonDiv>
      <FeatureHeader>Take a look at the features</FeatureHeader>
      <SecondDiv>
        <Box>
          <BoxHeader>Nutritional Data</BoxHeader>
          <BoxParagraph>You can find all the nutritional information on any food item you want including those at fast food, restaurants, packaged, overall, and other types verified by the USDA</BoxParagraph>
        </Box>

        <Box>
          <MiddleBoxHeader>AI Personalized Recipes</MiddleBoxHeader>
          <BoxParagraph>GourmetChef offers you personalized, creative, and innovative recipes based on 26 short questions. The AI uses GPT 4o Mini, the latest released model from OpenAI</BoxParagraph>
        </Box>

        <Box>
          <BoxHeader>Cooking Tips</BoxHeader>
          <BoxParagraph>First time cooking or need want some tips when cooking? Look at our Cooking Tips where we prepared the best tips for you and verified from sources including long time home cooks</BoxParagraph>
        </Box>
        <br></br>
      </SecondDiv>
      <Footer>© 2024 - Created by Nimai Garg</Footer>
      <br></br>
    </PageContainer>
  )
}

export default Landing;