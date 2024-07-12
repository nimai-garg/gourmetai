import React from 'react'
import styled from 'styled-components';
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  font-size: 1.7rem;
  font-family: 'Fustat', sans-serif;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CenterText = styled.h1`
  font-size: 4rem;
  font-family: 'Fustat', sans-serif;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 100px;
  background: linear-gradient(to right, #ffcccc, #ff6699);
  -webkit-background-clip: text; /* Clip the gradient to the text */
  -webkit-text-fill-color: transparent; /* Make the text color transparent */

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 50px;
  }
`;

const SubCenterText = styled.h3`
  font-size: 1.2rem;
  font-family: 'Fustat', sans-serif;
  background: gray;
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
  color: #000000;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 30px;
  padding: 10px 20px;
  width: 150px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Fustat', sans-serif;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
`;

const RightCenterTextButton = styled.button`
  color: #000000;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 30px;
  padding: 10px 20px;
  width: 150px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Fustat', sans-serif;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
`;

const ActionButton = styled.button`
  color: #000000;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Fustat', sans-serif;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 0.8rem;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Fustat', sans-serif;
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
  font-family: 'Fustat', sans-serif;
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
        <Header>GourmetAI</Header>
        <ActionButton onClick={handleActionButton}>Create</ActionButton>
      </HeaderContainer>
      <CenterText>Find inspiration for your next recipe</CenterText>
      <SubCenterText>A 100% free AI that allows you to think of creative, innovative, and personalized recipes </SubCenterText>
      <CenterTextButtonDiv>
        <LeftCenterTextButton onClick={handleActionButton}>Let's innovate</LeftCenterTextButton>
        <RightCenterTextButton>Learn more</RightCenterTextButton>
      </CenterTextButtonDiv>
      <SecondDiv>
        <Box>
          <BoxHeader>What is Gourmet AI?</BoxHeader>
          <BoxParagraph>GourmetAI is an AI that helps you think of new recipes to create with your available ingredients in your house. In addition to this, we use your preferences to give you recipes that suit your needs!</BoxParagraph>
        </Box>

        <Box>
          <BoxHeader>Explain the Personalization</BoxHeader>
          <BoxParagraph>In addition to the available ingredients, we ask you for your dietary needs, calorie/protein requirements, religion needs, and any other special requirements to give you the best recipes crafted by us.</BoxParagraph>
        </Box>

        <Box>
          <BoxHeader>How does this work?</BoxHeader>
          <BoxParagraph>First, you will sign up with Google for secure authentication, then answer our setup personalization questions. You can start creating recipes by clicking the appropriate button. Happy creating! </BoxParagraph>
        </Box>
        <br></br>
      </SecondDiv>
      <Footer>© 2024 - Created by Nimai Garg</Footer>
      <br></br>
    </PageContainer>
  )
}

export default Landing;