import React,  { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import logoImage from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../firebaseConfig';
import SettingsImage from '../images/settings-icon.png';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

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

  span {
    color: red;
  }
`;

const OptionSystemDownButton = styled.button`
  color: #000000;
  background-color: transparent;
  border: 1.2px solid #ECECEC;
  border-radius: 10px;
  padding: 60px 0px;
  width: 250px;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'SFPro-Semibold', sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s; /* Add a smooth transition for hover effect */

  span {
    color: red;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 130px; /* Add this to move the footer down */

  @media (max-width: 768px) {
    padding: 15px; /* Reduce padding for tablets */
  }

  @media (max-width: 480px) {
    padding: 10px; /* Reduce padding for mobile screens */
  }
`;

const FooterLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(27, 31, 35, 0.15);
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px; /* Reduce bottom margin on smaller screens */
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically on small screens */
  align-items: center; /* Center align items */
  text-align: center; /* Center align text */
  width: 100%;
  gap: 20px; /* Space between items vertically */

  @media (min-width: 481px) {
    flex-direction: row; /* Row layout for larger screens */
    justify-content: space-between; /* Aligns text left, links center, and icons right */
    align-items: center; /* Align items vertically */
    gap: 30px; /* Space between elements horizontally */
  }
`;

const FooterText = styled.p`
  font-family: 'SFPro-Regular', sans-serif;
  font-size: 1rem;
  color: #333;
  margin: 0; /* Remove default margin */

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 15px; /* Space between the links */
  justify-content: center; /* Center the links horizontally */
`;

const FooterLink = styled.a`
  font-family: 'SFPro-Regular', sans-serif;
  font-size: 15px;
  color: #333;
  text-decoration: none;

  &:hover {
    font-family: 'SFPro-Bold', sans-serif;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  flex-direction: row; /* Row layout for icons */
  gap: 15px;
  margin-top: 20px; /* Increase margin to lower the icons more */
  
  @media (max-width: 768px) {
    gap: 10px;
    margin-top: 15px; /* Adjust margin for tablets */
  }

  @media (max-width: 480px) {
    gap: 8px;
    margin-top: 10px; /* Adjust margin for mobile screens */
  }
`;

const IconStyle = styled.a`
  color: black;
  font-size: 24px;
  text-decoration: none;

  &:hover {
    color: grey;
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

  //  const handleRecipeSetup = async () => {
  //   navigate('/reviewSettings')
  //  };
  
  // const handleCookingTips = async () => {
  //   // navigate('/cookingTips');
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
          Gourmet Chef
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
            <OptionSystemDownButton>
                <span>Maintenance <br></br>Expected: January 2025</span>
                <br></br>
                <br></br>
                AI Recipe Generator
            </OptionSystemDownButton>

            <OptionButton onClick={handleNutritionalData}>Nutritional Data & Insights</OptionButton>
            <br></br>
          </ButtonContainer>
      </WelcomeContainer>
      
      <Footer>
        <FooterLine />
        <FooterContent>
          <FooterText>© 2025 GourmetChef. All rights reserved.</FooterText>
          
          <FooterLinks>
            <FooterLink href="/legal/terms-of-use">Terms of Use</FooterLink>
            <FooterLink href="/legal/privacy-policy">Privacy Policy</FooterLink>
          </FooterLinks>

          <SocialMediaIcons>
            <IconStyle href="https://www.instagram.com/gourmetchefapp/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </IconStyle>

            <IconStyle href="https://www.linkedin.com/company/gourmetchefapp" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </IconStyle>
          </SocialMediaIcons>
        </FooterContent>
      </Footer>
    </PageContainer>
  )
}

export default Landing;