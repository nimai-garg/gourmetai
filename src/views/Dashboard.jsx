import React,  { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import logoImage from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../firebaseConfig';
import SettingsImage from '../images/settings-icon.png';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const PageContainer = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  padding: 0;
  margin: 0;
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
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflowed text */
  text-overflow: ellipsis; /* Display ellipsis if text overflows */

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  span {
    font-family: 'SFPro-Semibold', sans-serif;
    background: linear-gradient(to right, blue, hotpink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
  margin-top: 70px;
  
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
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const handleEditSetupButton = async () => {
    navigate('/editSettings');
  };

  const handleRecipeSetup = async () => {
    navigate('/reviewSettings')
  };
  
  const handleCookingTips = async () => {
    // navigate('/cookingTips');
  };

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

  const fetchUserData = useCallback(async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.error('No such document!');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        setLoading(false); // If there's no user, stop loading
      }
    });
  }, [fetchUserData]);

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>
        <Logo src={logoImage} alt="GourmetChef Logo" />
          GourmetChef
        </Header>
      
        <HeaderWrapper>
          <NavigationButtonDiv>
            <ActionButton onClick={handleEditSetupButton}>Edit Setup</ActionButton>
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
            <SettingsCircle onClick={handleSettings}/>
          </NavigationButtonDiv>
        </HeaderWrapper>
      </HeaderContainer>

      <WelcomeContainer>
  {!loading && userData ? (
    <>
      <CenterText>Welcome back, <span>{userData.firstName}</span></CenterText>
      <SubCenterText>Choose a feature below to get started</SubCenterText>
    </>
  ) : (
    <CenterText>Welcome back,</CenterText> // You can customize this message
  )}
  
  <ButtonContainer>
    <OptionButton onClick={handleRecipeSetup}>AI Recipe Generator</OptionButton>
    <OptionButton onClick={handleNutritionalData}>Nutritional Data & Insights</OptionButton>
    <br></br>
  </ButtonContainer>

  <ButtonContainer>
    <OptionButton onClick={handleCookingTips}>Coming soon!</OptionButton>
  </ButtonContainer>
</WelcomeContainer>
      
      <Footer>© 2024 - Created by Nimai Garg - nimaigarg08@gmail.com</Footer>
    </PageContainer>
  )
}

export default Landing;