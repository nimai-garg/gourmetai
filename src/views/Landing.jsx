import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import logoImage from '../images/logo.png';
import mockupImage from '../images/mockup.png';
import { useNavigate, Link } from 'react-router-dom';
import '@fontsource/geist-sans';
import '@fontsource/geist-mono';
import '../fonts/CalSans-SemiBold.otf';
import '../fonts/SFPro-BlackItalic.OTF';
import '../fonts/SFPro-Bold.OTF';
import '../fonts/SFPro-HeavyItalic.OTF';
import '../fonts/SFPro-LightItalic.OTF';
import '../fonts/SFPro-Medium.OTF';
import '../fonts/SFPro-Regular.OTF';
import '../fonts/SFPro-SemiboldItalic.OTF';
import '../fonts/SFPro-ThinItalic.OTF';
import '../fonts/SFPro-UltraLightItalic.OTF';
import '../fonts/fonts.css';
import hamburgerIcon from '../images/hamburger-icon.svg'; // Update with the path to your hamburger icon

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
  background: #fff;
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

    @media (max-width: 600px) {
    height: 75px;
    width: 90px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ActionButton = styled.button`
  color: #fff;
  background-color: #000;
  border: 2px solid black;
  border-radius: 10px;
  padding: 9px 19px;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 0.8rem;
  }

  &:hover, &:focus {
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const LandingContainer = styled.div`
  background: white;
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

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: black;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CenterText = styled.h1`
  font-family: 'SFPro-Bold', sans-serif;
  font-size: 4rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 16px;

  span {
    font-family: 'SFPro-SemiboldItalic', sans-serif;
    background: linear-gradient(to right, blue, hotpink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SubCenterText = styled.h3`
  font-size: 1.7rem;
font-family: 'SFPro-Regular', sans-serif;
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
  gap: 30px;
  flex-direction: row; /* Stack buttons vertically */

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const LeftCenterTextButton = styled.button`
  color: #fff; /* Text color: white */
  background-color: #000; /* Background color: black */
  border: none; /* No border */
  border-radius: 6px; /* Border radius */
  padding: 12px 32px; /* Adjust padding */
  font-size: 16px; /* Increase font size */
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  width: auto; /* Dynamic width */

  &:hover, &:focus {
    background-color: #333; /* Darker shade of black on hover */
    border-color: #000; /* Keeps border color consistent */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); /* Subtle shadow on hover */
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
  }
`;

const RightCenterTextButton = styled.button`
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
  font-family: 'SFPro-Bold', sans-serif;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const MiddleBoxHeader = styled.h1`
  align-items: flex-start;
  white-space: nowrap;
  font-family: 'SFPro-Bold', sans-serif;
  font-weight: 600;
  background: linear-gradient(90deg, #ff4757, #ff6348);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BoxParagraph = styled.p`
  font-family: 'SFPro-Regular', sans-serif;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Footer = styled.p`
  justify-content: center;
  align-items: center;
  display: flex;
  color: #000;
  font-family: 'SFPro-Regular', sans-serif;

  &:hover {
    font-family: 'SFPro-Bold', sans-serif;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const HeaderLink = styled(Link)`
  color: black;
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

  @media (max-width: 600px) {
    display: none;
  }
`;

const AccordionContainer = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  font-family: SFPro-Regular, sans-serif;
  font-size: 18px;
  color: black;
  background-color: #fff; /* White background for the entire accordion */
  border: 1px solid #d0d0d0; /* Gray border around the entire container */
  border-radius: 10px; /* Rounded edges for the container */
  overflow: hidden; /* Ensures child elements do not overflow the container */
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #e0e0e0; /* Gray line between items */
  
  &:last-child {
    border-bottom: none; /* Remove bottom border from the last item */
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  background-color: #fff; /* White background for headers */
  color: black;
  transition: background-color 0.2s ease; /* Faster transition */
  font-size: 1.3rem;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const AccordionContent = styled.div`
  padding: ${({ isOpen }) => (isOpen ? '20px' : '0 20px')}; /* Padding on all sides when open */
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.2s ease, padding 0.2s ease; /* Faster transition */
  color: #333;
  font-size: 1.1rem;
`;

const AccordionIcon = styled.span`
  font-size: 24px;
  transition: transform 0.2s ease; /* Faster transition */

  ${({ isOpen }) => isOpen && `
    transform: rotate(360deg); /* Rotate the icon when open */
  `}
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  position: relative;

  /* Media query for smaller devices */
  @media (min-width: 768px) {
    .menu-icon {
      display: none; /* Hide hamburger icon on larger devices */
    }
    .menu-content {
      display: none; /* Hide menu content on larger devices */
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;

  /* Only show hamburger icon on smaller devices */
  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuContent = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: absolute;
  top: 60px; /* Adjust as needed */
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 200px;

  /* Show menu content only on smaller devices */
  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.a`
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// Define the fade-in animation
// const fadeIn = keyframes`
//   0% { opacity: 0; }
//   100% { opacity: 1; }
// `;

// const HeaderLine = styled.h1`
//   animation: ${fadeIn} 5s forwards;
//   font-family: 'SFPro-Regular', sans-serif;
// `;

const Landing = () => {
  const navigate = useNavigate();

  const handleActionButton = () => {
    navigate('/login');
  }

  const secondDivRef = useRef(null);

  const handleLearnMore = () => {
    if (secondDivRef.current) {
      secondDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // const handlePricingButton = () => {
  //   navigate('/pricing');
  // }

  const handleFooter = () => {
    window.open('https://linkedin.com/in/nimaigarg', '_blank');
  }

  const [openSections, setOpenSections] = useState([]);

  const toggleAccordion = (index) => {
    if (openSections.includes(index)) {
      setOpenSections(openSections.filter(i => i !== index));
    } else {
      setOpenSections([...openSections, index]);
    }
  };

  const data = [
    { title: "What is GourmetChef?", content: "GourmetChef is an AI-powered app that provides personalized cooking recipes based on your dietary needs, available ingredients, calorie requirements, and preferences. It helps you discover new recipes tailored to your unique requirements." },
    { title: "Is GourmetChef free to use?", content: "GourmetChef is currently 100% free with no pricing plans at the moment. We plan to release the pricing plans in late 2024." },
    { title: "How does GourmetChef customize recipes for me?", content: "GourmetChef uses AI to analyze your inputs such as available ingredients, dietary restrictions, calorie needs, and more. It then generates a recipe that matches your inputs with the description, ingredients, and recipe." },
    { title: "Is my data secure with GourmetChef?", content: "Yes, we prioritize your privacy and security. GourmetChef uses encryption and secure protocols to protect your data and personal information. Your inputs are secured safely on Google Firebase which are accessible by Nimai (the founder of GourmetChef). The data you provide us will never be publicized without your consent. Your password is never shared with Google, GourmetChef, Nimai, or anyone. If you forgot your password, please contact Nimai at +1 650-272-7186 for assistance." },
    { title: "How can I provide feedback or report a bug?", content: "You can provide feedback or report bugs directly through the app by navigating to the 'Feedback' section. Alternatively, you can email us at nimaigarg08@gmail.com" }
  ];
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // const headers = [
  //   "Personalize your",
  //   "Calories",
  //   "Protein",
  //   "Nutritional Goals",
  //   "Available Ingredients",
  //   "Cuisine Preferences",
  //   "and more!"
  // ];

  // const [currentHeader, setCurrentHeader] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentHeader(prevHeader => (prevHeader + 1) % headers.length);
  //   }, 1500); // Switch header every 3 seconds

  //   return () => clearInterval(interval); // Clean up the interval on component unmount
  // }, [headers.length]);

  return (

    <PageContainer>


      <HeaderContainer>
        <Header>
          <Logo src={logoImage} alt="GourmetChef Logo" />
          GourmetChef
        </Header>

        <HeaderWrapper>
          <MenuWrapper>
            <MenuIcon src={hamburgerIcon} alt="Menu" onClick={toggleMenu} />
            <MenuContent open={isOpen}>
              <MenuItem href="#pricing">Pricing</MenuItem>
              <MenuItem href="#feedback">Feedback</MenuItem>
              <MenuItem href="#action">Action Button</MenuItem>
            </MenuContent>
          </MenuWrapper>
        </HeaderWrapper>

        <ButtonGroup>
          <HeaderLink to="/feedback">Feedback</HeaderLink>
          <HeaderLink to="/pricing">Pricing</HeaderLink>
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
              <RightCenterTextButton onClick={handleLearnMore}>Learn more</RightCenterTextButton>
          </CenterTextButtonDiv>

          {/* <HeaderLine>
            {headers[currentHeader]}
          </HeaderLine> */}
            
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

      <FeatureHeader ref={secondDivRef}>Take a look at the features</FeatureHeader>

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
          <BoxParagraph>First time cooking or need want some tips when cooking? Look at our Cooking Tips where we prepared the best tips for you and verified from sources including long time home cooks. Coming out on September 1st</BoxParagraph>
        </Box>
        <br></br>
      </SecondDiv>

      <AccordionContainer>
        {data.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionHeader onClick={() => toggleAccordion(index)}>
              <span>{item.title}</span>
              <AccordionIcon isOpen={openSections.includes(index)}>{openSections.includes(index) ? '-' : '+'}</AccordionIcon>
            </AccordionHeader>
            <AccordionContent isOpen={openSections.includes(index)}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionContainer>

      <Footer onClick={handleFooter}>© 2024 - Created by Nimai Garg - nimaigarg08@gmail.com - Version Beta 1.1</Footer>
      <br></br>
    </PageContainer>
  )
}

export default Landing;