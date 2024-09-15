import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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
import { FaInstagram, FaLinkedin, FaCheck, FaChevronRight, FaChevronDown } from 'react-icons/fa';

// const fadeInAnimation = keyframes`
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// `;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-x: hidden; /* Prevent horizontal overflow */
  // animation: ease 0.5s;
  // animation-iteration-count: 1;
  // animation-fill-mode: forwards;
`;

const HeaderContainer = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.75em;
  }

  @media (max-width: 480px) {
    padding: 0.5em;
  }
`;

const Logo = styled.img`
  height: 90px;
  width: auto;
  margin-right: 10px;

  @media (max-width: 768px) {
    height: 60px;
  }

  @media (max-width: 480px) {
    height: 50px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.75rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: black;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem; /* Adjusted font size for very small screens */
  }
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  position: relative;

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

  @media (min-width: 768px) {
    display: none; /* Hide menu icon on larger devices */
  }
`;

const MenuContent = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: absolute;
  top: 60px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  padding: 20px;
  width: 300px;
  text-align: center; /* Center the text */

  @media (max-width: 768px) {
    right: 0;
    width: 100%;
  }
`;

const MenuItem = styled.a`
  display: block;
  width: 100%; /* Ensure full width for centering */
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  text-align: center; /* Center the text */
  margin-margin: 50px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MenuButton = styled.button`
  display: block;
  width: 100%; /* Ensure full width for centering */
  padding: 8px 13px;
  background-color: #000;
  color: #fff;
  border: none;
  text-align: center;
  font-size: 12px;
  border-radius: 6px;
  justify-content: center;

  &:hover {
    background-color: #333;
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
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  @media (max-width: 600px) {
    display: none;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const LandingContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    align-items: center; /* Ensure items are centered */
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

const CenterText = styled.h1`
  font-family: 'SFPro-Bold', sans-serif;
  font-size: 4.1rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 16px;

  span {
    font-family: 'SFPro-SemiboldItalic', sans-serif;
    background: linear-gradient(to right, blue, hotpink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
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
  max-width: 70%;
  max-height: 70%;
  border-radius: 10px;
  margin-left: 50px;

  @media (max-width: 768px) {
    max-width: 60%;
    margin-left: 0;
  }

  @media (max-width: 480px) {
    max-width: 90%;
    margin: 0;
  }
`;

const FeatureHeader = styled.h2`
  background: #fff;
  font-size: 3rem;
  font-family: 'SFPro-Bold', sans-serif;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  color: #000;
  text-align: center; /* Ensures text is centered */

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 30px;
  }

  @media (max-width: 600px) {
    font-size: 2rem; /* Optionally adjust font size for very small screens */
    margin-top: 20px; /* Optionally adjust margin for very small screens */
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
  max-width: 400px;
  max-height: 400px;
  margin: 0 auto; /* Center the box horizontally */

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 1rem;
    margin: 0 1rem; /* Add margin for better spacing on mobile */
  }

  @media (max-width: 480px) {
    max-width: calc(100% - 2rem); /* Ensure space on both sides */
    padding: 0.8rem;
    margin: 0 1rem; /* Add margin for better spacing on smaller screens */
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

const Footer = styled.footer`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

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

const HeaderLink = styled(Link)`
  color: black;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
  padding: 0.4rem 0.6rem; /* Increased padding for bigger width/height */

  &:hover {
    background-color: rgba(245, 246, 247, 1);
    border-radius: 6px; /* Slightly larger rounded corners */
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
  font-family: 'SFPro-Regular', sans-serif;
  font-size: 18px;
  color: black;
  background-color: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    margin: 10px;
    padding: 0 5px;
  }
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  background-color: #fff;
  color: black;
  transition: background-color 0.2s ease;
  font-size: 1.3rem;

  &:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size for mobile */
  }

  @media (max-width: 480px) {
    font-size: 0.9rem; /* Smaller font size for very small screens */
  }
`;

const AccordionContent = styled.div`
  padding: ${({ isOpen }) => (isOpen ? '20px' : '0 20px')};
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.2s ease, padding 0.2s ease;
  color: #333;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem; /* Adjust font size for mobile */
  }

  @media (max-width: 480px) {
    font-size: 0.85rem; /* Smaller font size for very small screens */
  }
`;

const AccordionIcon = styled.span`
  font-size: 24px;
  transition: transform 0.2s ease;

  ${({ isOpen }) => isOpen && `
    transform: rotate(-360deg);
  `}
`;

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  max-width: 100%; /* Ensure container doesn't overflow on mobile */
  box-sizing: border-box; /* Include padding in width calculations */
`;

const NewsletterTitle = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
  font-family: 'SFPro-Bold', sans-serif;
  text-align: center; /* Center text by default */

  @media (max-width: 768px) {
    font-size: 2.5rem; /* Reduce font size for tablets and small screens */
    text-align: center; /* Ensure text is centered on tablets */
  }

  @media (max-width: 480px) {
    font-size: 2rem; /* Further reduce font size for smaller screens */
    text-align: center; /* Ensure text is centered on mobile screens */
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #666;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Reduce font size for tablets */
  }

  @media (max-width: 480px) {
    font-size: 1rem; /* Further reduce font size for mobile screens */
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Full width to avoid overflow */
  max-width: 400px; /* Set a max-width for better control on larger screens */
  box-sizing: border-box; /* Include padding in width calculations */
`;

const InputField = styled.input`
  padding: 15px;
  font-size: 1.2rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 30px;
  margin-bottom: 15px; /* Space between input and button */
  width: 100%; /* Full width within the form */
  box-sizing: border-box; /* Include padding in width calculations */
  font-family: 'SFPro-Regular', sans-serif;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #007bff; /* Add a consistent blue shadow on focus */
  }

  @media (max-width: 480px) {
    padding: 12px; /* Adjust padding for mobile */
    font-size: 1rem; /* Adjust font size for mobile */
  }
`;

const SubmitButton = styled.button`
  padding: 15px 25px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-family: 'SFPro-Regular', sans-serif;
  width: auto; /* Auto width to fit content */
  max-width: 80%; /* Shorter width compared to the input field */
  box-sizing: border-box; /* Include padding in width calculations */
  align-self: center; /* Center the button */

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 480px) {
    padding: 12px 20px; /* Adjust padding for mobile */
    font-size: 1rem; /* Adjust font size for mobile */
    max-width: 90%; /* Adjust max-width for smaller screens */
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

const AlertBox = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(180, 215, 180, 0.3);
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
  width: 100%;
  max-width: 90vw;

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 24px;
`;

const Landing = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const secondDivRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [email, setEmail] = useState('');

  const handleActionButton = () => {
    navigate('/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const docRef = doc(db, "newsletter", "users");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await setDoc(docRef, {
                emails: [...(docSnap.data().emails || []), email]
            }, { merge: true });
        } else {
            await setDoc(docRef, {
                emails: [email]
            });
        }

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

        setEmail('');
    } catch (error) {
        console.error("Error during subscription:", error);
    }
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

  const handleLearnMore = () => {
    if (secondDivRef.current) {
      secondDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

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
              <MenuItem href="/">Home</MenuItem>
              <MenuItem href="/feedback">Feedback</MenuItem>
              {/* <MenuItem href="/pricing">Pricing</MenuItem> */}
              <MenuButton onClick={handleActionButton}>Create</MenuButton> {/* Create button */}
            </MenuContent>
          </MenuWrapper>
        </HeaderWrapper>

        <ButtonGroup>
          <HeaderLink to="/feedback">Feedback</HeaderLink>
          {/* <HeaderLink to="/pricing">Pricing</HeaderLink> */}
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
            
          <ImageContainer>
            <MockupImage src={mockupImage} alt="GourmetChef Mockup" />
          </ImageContainer>
      
        </LeftLandingContainer>
      </LandingContainer>

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
      </SecondDiv>

      <NewsletterContainer>
        <NewsletterTitle>Subscribe to Our Newsletter</NewsletterTitle>
        <Description>Stay updated with the latest news and updates by subscribing to our newsletter.</Description>
        <Form onSubmit={handleSubmit}>
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <SubmitButton type="submit">Subscribe</SubmitButton>
        </Form>
        {showAlert && !animateOut && (
        <CustomAlert 
          message="Subscribed!"
          show={showAlert}
        />
      )}
    </NewsletterContainer>

    <AccordionContainer>
      {data.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionHeader onClick={() => toggleAccordion(index)}>
            <span>{item.title}</span>
            <AccordionIcon isOpen={openSections.includes(index)}>
              {openSections.includes(index) ? <FaChevronDown /> : <FaChevronRight />}
            </AccordionIcon>
          </AccordionHeader>
          <AccordionContent isOpen={openSections.includes(index)}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>

      <Footer>
        <FooterLine />
        <FooterContent>
          <FooterText>© 2024 GourmetChef. All rights reserved.</FooterText>
          
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