import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import logoImage from '../images/logo.png';
import externalLink from '../images/external-link.png';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../firebaseConfig';
import heartImage1 from '../images/heart-unfilled.png'; // Initial image
import heartImage2 from '../images/heart-filled.png'; // Image to switch to
import printImage from '../images/print.png'; // Import your print image
import { FaCheck } from 'react-icons/fa';

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const PageContainer = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  padding: 0;
  margin: 0;
  animation: ${fadeInAnimation} ease 0.6s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`;

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

const ImageMenu = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 1rem;
  border-radius: 15px;
  // box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  margin-left: 50px;
  max-width: 180px;

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 90%;
    padding: 1rem;
  }
`;

const ExternalLinkWrapper = styled.div`
  display: inline-block;
  cursor: pointer;

  &:hover img {
   transform: scale(1.05);
  }
`;

const ExternalLink = styled.img`
  height: 50px;
  width: 50px;
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

const HeartWrapper = styled.div`
  display: inline-block;
  cursor: pointer;

  &:hover img {
    opacity: 0.8; /* Optional hover effect */
  }
`;

const HeartImage = styled.img`
  height: 50px;
  width: 50px;

  @media (max-width: 768px) {
    height: 30px;
    width: 30px;
  }

  @media (max-width: 600px) {
    height: 40px;
    width: 40px;
  }
`;

const PrintWrapper = styled.div`
  display: inline-block;
  cursor: pointer;

  &:hover img {
    opacity: 0.8; /* Optional hover effect */
  }
`;

const PrintImage = styled.img`
  height: 50px;
  width: 50px;

  @media (max-width: 768px) {
    height: 30px;
    width: 30px;
  }
`;

const NavigationButtonDiv = styled.div`
  display: flex;
  gap: 10px; /* Adjust the gap as needed */
`

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

const MainContainer = styled.div`

`;

const RecipeTitle = styled.h1`

`;

const RecipeCuisine = styled.h3`

`;

const RecipeDescriptionBox = styled.div`
background-color: #f5f5f5;
padding: 1rem 2rem;
border-radius: 15px;
// box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
font-family: 'Inter', sans-serif;
margin-left: 50px;
max-width: 400px;
min-height: 300px;
max-height: 300px;


@media (max-width: 768px) {
  margin-left: 0;
  max-width: 90%;
  padding: 1rem;
}
`;

const RecipeInformation = styled.h3`

`;

const ImagesLink = styled.h3`

`;

const ButtonGroup = styled.div`
  display: flex; /* Ensure that flexbox layout is used */
  flex-direction: column; /* Stack buttons vertically */
  gap: 12px; /* Add space between buttons */
  align-items: center; /* Center buttons horizontally */
  width: 100%; /* Make sure it takes full width if needed */
`;

const NextRecipe = styled.button`
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

const Settings = styled.button`
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

const NotesButton = styled.button`
  color: #fff;
  background: linear-gradient(45deg, #ffa500, #ff4500); /* Orange to red */
  border: none;
  border-radius: 6px;
  padding: 12px 32px; /* Adjusted padding to match the height and width */
  font-size: 16px; /* Increased font size */
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  width: auto;
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.25); /* Subtle shadow */
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; /* Smooth transitions */

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 0.8rem;
  }

  &:hover, &:focus {
    background: linear-gradient(45deg, #ffb84d, #ff6347); /* Lighter orange to a lighter red */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.35); /* Glossy effect */
  }
`;

const IngredientsBox = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  border-radius: 15px;
  // box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  margin-left: 50px;
  max-width: 400px;
  min-height: 300px;
  max-height: 300px;


  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 90%;
    padding: 1rem;
  }
`;

const InstructionsBox = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  border-radius: 15px;
  // box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  margin-left: 50px;
  max-width: 400px;
  min-height: 300px;
  max-height: 300px;


  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 90%;
    padding: 1rem;
  }
`;

const EquipmentBox = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  border-radius: 15px;
  // box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  margin-left: 50px;
  max-width: 400px;
  min-height: 300px;
  max-height: 300px;


  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 90%;
    padding: 1rem;
  }
`;

const NutritionalInformationBox = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  border-radius: 15px;
  // box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  margin-left: 50px;
  max-width: 400px;
  min-height: 300px;
  max-height: 300px;


  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 90%;
    padding: 1rem;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #4285f4;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
  }
`;

const flyIn = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const flyOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

// Create the styled component for the alert
const AlertBox = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(210, 245, 210, 0.3);
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #006400;
  animation: ${({ animateOut }) => (animateOut ? flyOut : flyIn)} 0.5s ease-out forwards;
`;

// Create the styled component for the icon
const IconWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 24px;
`;

const NewRG = () => {
  const navigate = useNavigate();
  // const [searchTerm, setSearchTerm] = useState('');
  const [isHeartImage1, setIsHeartImage1] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  
  const handleSignOut = async () => {
    try {
      navigate('/login');
      await logOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const searchGoogleImages = () => {
    // if (searchTerm.trim()) {
    //   const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchTerm)}`;
    //   window.open(searchUrl, '_blank');
    // } else {
    //   alert('Please enter a word to search for images.');
    // }
  };

  const handleImageClick = () => {
    setIsHeartImage1(!isHeartImage1);

    setShowAlert(true);
    setAnimateOut(false);

    // Stay visible for 2 seconds, then trigger the fly out
    setTimeout(() => {
      setAnimateOut(true);
    }, 2000); // Wait for 2 seconds before transitioning out

    // Hide after the fly out animation
    setTimeout(() => {
      setShowAlert(false);
    }, 2500); // Total wait time + fly-out duration
  };

  const handlePrint = () => {
    window.print(); // Trigger the print dialog
  };

  const CustomAlert = ({ message, show }) => {
    return (
      <>
        {show && (
          <AlertBox>
            <IconWrapper>
              {/* <AiOutlineExclamationCircle /> */}
              <FaCheck />
            </IconWrapper>
            {message}
          </AlertBox>
        )}
      </>
    );
  };

return (
  <PageContainer>
      <HeaderContainer>
        <Header>
        <Logo src={logoImage} alt="GourmetChef Logo" />
          GourmetChef
        </Header>
      
        <HeaderWrapper>
          <NavigationButtonDiv>
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </NavigationButtonDiv>
        </HeaderWrapper>
      </HeaderContainer>

      <MainContainer>
        <ButtonGroup>
            <NextRecipe>Next Recipe</NextRecipe>
            <Settings>Settings</Settings>
            <NotesButton>Notes</NotesButton>
        </ButtonGroup>
        
        <RecipeDescriptionBox>
          Recipe Description
        </RecipeDescriptionBox>

        <IngredientsBox>
          Ingredients
        </IngredientsBox>

      <ImageMenu>
      <ExternalLinkWrapper onClick={searchGoogleImages}>
        <ExternalLink src={externalLink} alt="Search Images" />
      </ExternalLinkWrapper>

      <HeartWrapper onClick={handleImageClick}>
        <HeartImage 
          src={isHeartImage1 ? heartImage1 : heartImage2} 
          alt="Heart" 
        />
      </HeartWrapper>

      <PrintWrapper onClick={handlePrint}>
        <PrintImage src={printImage} alt="Print" />
      </PrintWrapper>
      </ImageMenu>

      </MainContainer>

      <div>
      {showAlert && !animateOut && (
        <CustomAlert 
          message="Saved into Favorites!"
          show={showAlert}
        />
      )}
    </div>
  </PageContainer>
 )
}

export default NewRG
