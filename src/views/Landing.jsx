import React from 'react'
import styled from 'styled-components';
import logoImage from './logo.png';
import mockupImage from './mockup.png';
import { useNavigate, Link } from 'react-router-dom';
import '@fontsource/geist-sans';
import '@fontsource/geist-mono';

// const PageContainer = styled.div`
//   background: linear-gradient(to right, #FF7F7F, #FFD580);
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh; /* Ensure it covers the full viewport height */
//   width: 100%; /* Ensure it covers the full viewport width */
//   padding: 0; /* Remove any padding */
//   margin: 0; /* Remove any margin */
// `;

/* Page Container */
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-x: hidden; /* Prevent horizontal overflow */
`;

/* Header Container with gradient */
const HeaderContainer = styled.div`
  background: linear-gradient(to right, #FF7F7F, #FFD580);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em; /* Flexible padding for better scalability */
  box-sizing: border-box; /* Ensure padding doesn't cause overflow */
  
  @media (max-width: 768px) {
    padding: 0.75em;
  }

  @media (max-width: 480px) { /* For very small devices */
    padding: 0.5em;
    flex-direction: column; /* Stack items vertically if needed */
    align-items: flex-start; /* Align items to the start */
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

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

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

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
`;

/* Landing Container with gradient */
const LandingContainer = styled.div`
  background: linear-gradient(to right, #FF7F7F, #FFD580);
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  justify-content: center; /* Center items vertically */
  align-items: center; /* Center items horizontally */
  padding: 50px;
  flex: 1;
  box-sizing: border-box; /* Ensure padding doesn't cause overflow */

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const LeftLandingContainer = styled.div`
  flex: 1;
  text-align: center; /* Center text inside the container */
  padding-right: 0;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

// const RightLandingContainer = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   @media (max-width: 768px) {
//     margin-bottom: 20px;
//   }
// `;

// Add a new container for the image below the create button
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// const UnderneathLandingContainer = styled.div`
//   background: linear-gradient(to right, #FF7F7F, #FFD580);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 40px;
//   flex: 1;
//   box-sizing: border-box; /* Ensure padding doesn't cause overflow */
// `;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CenterText = styled.h1`
  font-size: 5rem;
font-family: 'Geist Sans', sans-serif;
  font-weight: 700;
  margin-top: 0;
background: linear-gradient(to right, #008080, #6A0D91);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  /* Add styling for the italic part */
  span {
    font-family: Arvo;
    font-style: italic;
    font-weight: 400;
  }
`;

const SubCenterText = styled.h3`
  font-size: 2rem;
font-family: 'Geist Mono', monospace;
  font-weight: 400;
  color: #555;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
`;

const CenterTextButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column; /* Stack buttons vertically */

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const LeftCenterTextButton = styled.button`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 10px;
  padding: 20px 0px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Geist Sans', sans-serif;
  width: 200px;

  &:hover, &:focus {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Update MockupImage to resize it and ensure it's centered
const MockupImage = styled.img`
  max-width: 70%; /* Resize the image to be smaller */
  max-height: 70%;
  border-radius: 10px;
  margin-left: 70px;

  @media (max-width: 768px) {
    max-width: 60%; /* Further resize on smaller screens */
  }

  @media screen and (max-width: 767px) and (orientation: portrait) {
    display: none; /* Hide image on small portrait devices */
  }
`;

// const ScrollDownContainer = styled.div`
//   background: linear-gradient(to right, #FF7F7F, #FFD580);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ScrollDownText = styled.h1`
//   font-size: 3rem;
//   font-family: 'Inter Tight', sans-serif;
//   font-weight: 500;
//   color: #fff;

//   @media (max-width: 768px) {
//     font-size: 2.5rem;
//     margin-top: 30px;
//   }
// `;

const FeatureHeader = styled.h2`
  background: #fff;
  font-size: 3rem;
 font-family: 'Geist Sans', sans-serif;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 60px;

  color: #000;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 30px;
  }
`;

const SecondDiv = styled.div`
  background: #fff;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;
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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

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
  color: #000;
  font-family: 'Inter', sans-serif;
  &:hover {
    font-weight: bold;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const PricingLink = styled(Link)`
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Landing = () => {
  const navigate = useNavigate();

  const handleActionButton = () => {
    navigate('/login');
  }

  // const handlePricingButton = () => {
  //   navigate('/pricing');
  // }

  const handleFooter = () => {
    window.open('https://linkedin.com/in/nimaigarg', '_blank');
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>
          <Logo src={logoImage} alt="GourmetChef Logo" />
          GourmetChef
        </Header>
        <ButtonGroup>
          <PricingLink to="/pricing">Pricing</PricingLink>
          <ActionButton onClick={handleActionButton}>Create</ActionButton>
        </ButtonGroup>
      </HeaderContainer>

      <LandingContainer>
        <LeftLandingContainer>

        <CenterText>
          Find <span>inspiration</span> for your next recipe
        </CenterText>
        
        <SubCenterText>Innovate, Plan, Create. Powered by GPT 4o Mini. Try for free</SubCenterText>
        
        <CenterTextButtonDiv>
            <LeftCenterTextButton onClick={handleActionButton}>Let's begin</LeftCenterTextButton>
        </CenterTextButtonDiv>
          
        <ImageContainer>
          <MockupImage src={mockupImage} alt="GourmetChef Mockup" />
        </ImageContainer>
      
        </LeftLandingContainer>
      </LandingContainer>

{/* 
  <RightLandingContainer>
    <MockupImage src={mockupImage} alt="GourmetChef Mockup" />
  </RightLandingContainer>
    <div></div>

 <ScrollDownContainer>
  <ScrollDownText>Scroll down for more information!</ScrollDownText>
</ScrollDownContainer> */}

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
      <Footer onClick={handleFooter}>© 2024 - Created by Nimai Garg</Footer>
      <br></br>
    </PageContainer>
  )
}

export default Landing;