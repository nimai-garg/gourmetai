import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoImage from '../images/logo.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PricingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
  background-color: #fff;
`;

const PricingSection = styled.div`
  padding-top: 60px; /* Space from the very top */
  padding-bottom: 60px; /* Space at the bottom to create equal gaps */
  text-align: center; /* Center-align all content */
`;

const CompanyLogo = styled.img`
  position: absolute;
  right: 40px;
  top: 15px;
  height: 70px; /* Adjust this value */
  width: auto; /* Maintains aspect ratio if only height is set */

  // &:hover {
  //   opacity: 0.8; /* Optional hover effect */
  // }
`;

const GoBackContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  color: #333;
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'SFPro-Bold', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  left: 40px; /* Adjust the distance from the left */
  top: 20px; /* Align it vertically with the logo */

  &:hover,
  &:focus {
    background-color: #e0e0e0;
    transform: translateX(-5px);
  }

  svg {
    margin-right: 8px;
  }
`;

const FirstText = styled.h1`
  font-family: 'SFPro-Bold', sans-serif;
  font-size: 4.1rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center; /* Center the text */
  margin-bottom: 20px; /* Reduced gap between the text and pricing plans */

  span {
    background: linear-gradient(to right, blue, hotpink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Plan = styled.div`
  background: #fff;
  padding: 40px;
  margin: 0 15px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 280px;
  max-width: 320px;
  text-align: left;
  transition: all 0.3s ease;
  border: 1px solid rgba(27, 31, 35, 0.15); /* Border style */

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(27, 31, 35, 0.15); /* Border style */
  }
`;

const MiddlePlan = styled.div`
  background: #fff;
  padding: 40px;
  margin: 0 15px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 280px;
  max-width: 320px;
  text-align: left;
  transition: all 0.3s ease;
  border: 3px solid #0070f3; /* Blue border color */

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border: 4px solid #0070f3; /* Blue border color */
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 10px;
  color: #111;
  font-family: 'SFPro-Bold', sans-serif;
`;

const Badge = styled.div`
  background-color: #e0f7ff; /* Very light blue */
  color: #0070f3; /* Stronger blue */
  font-family: 'SFPro-Bold', sans-serif;
  font-size: 0.75rem; /* Small size */
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
  display: inline-block;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 20px; /* Reduced margin */
`;

const Price = styled.p`
  font-family: 'SFPro-Bold', sans-serif;
  font-size: 2.5rem; /* Increased font size */
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const PriceDetail = styled.span`
  font-family: 'SFPro-Regular', sans-serif;
  font-size: 1rem;
  color: #888;
  margin-left: 8px; /* Space between price and detail */
`;

const Description = styled.p`
  font-family: 'SFPro-UltraThin', sans-serif;
  font-size: 1rem;
  color: #777;
  margin-bottom: 30px;
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
  color: #555;
`;

const FeatureItem = styled.li`
  font-family: 'SFPro-Regular', sans-serif;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
`;

const Button = styled.button`
  font-family: 'SFPro-Bold', sans-serif;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.primary ? '#0070f3' : '#fff')};
  color: ${(props) => (props.primary ? '#fff' : '#333')};
  border: ${(props) => (props.primary ? 'none' : '1px solid #ddd')};
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? '#005bb5' : '#f1f1f1')};
  }

  svg {
    margin-left: 8px;
  }
`;

const GordonButton = styled.button`
  font-family: 'SFPro-Bold', sans-serif;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.primary ? '#0070f3' : '#000')};
  color: ${(props) => (props.primary ? '#fff' : '#fff')};
  border: ${(props) => (props.primary ? 'none' : '1px solid #ddd')};
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #444;
  }

  svg {
    margin-left: 8px;
  }
`;

const PricingPlans = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleGoBack = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <PricingSection>
      <GoBackContainer onClick={handleGoBack} tabIndex="0">
        <FaArrowLeft />
        Go Back
      </GoBackContainer>

      <CompanyLogo src={logoImage} alt="Company Logo" />

      <FirstText>Pricing that you <span>like</span>, tools that you'll <span>love</span></FirstText>
      <PricingContainer>
        <Plan>
          <Title>Amateur</Title>
          <PriceWrapper>
            <Price>Free</Price>
            <PriceDetail>per month</PriceDetail>
          </PriceWrapper>
          <Description>For those who want to try out the application. Limited Items</Description>
          <Features>
            <FeatureItem>GPT 4o Mini</FeatureItem>
            <FeatureItem>5 credits per month</FeatureItem>
            <FeatureItem>Basic Personalization</FeatureItem>
            <FeatureItem>10 saved recipes</FeatureItem>
            <FeatureItem>No Image Prompts</FeatureItem>
          </Features>
          <Button>
            Start Deploying <FaArrowRight />
          </Button>
        </Plan>

        <MiddlePlan>
          <Badge>Featured</Badge>
          <Title>Chef Curry</Title>
          <PriceWrapper>
            <Price>$4.99</Price>
            <PriceDetail>per month, per member</PriceDetail>
          </PriceWrapper>
          <Description>Cook like Chef Curry. Includes access to premium features</Description>
          <Features>
            <FeatureItem>GPT 4o Mini</FeatureItem>
            <FeatureItem>50 credits per week</FeatureItem>
            <FeatureItem>Advanced Personalization</FeatureItem>
            <FeatureItem>100 saved recipes</FeatureItem>
            <FeatureItem>No Image Prompts</FeatureItem>
          </Features>
          <Button primary>
            Upgrade now <FaArrowRight />
          </Button>
        </MiddlePlan>

        <Plan>
          <Title>Gordon Ramsay</Title>
          <PriceWrapper>
            <Price>$8.99</Price>
            <PriceDetail>per month, per member</PriceDetail>
          </PriceWrapper>
          <Description>The name says it all, choose this plan to get the best features this app has to offer</Description>
          <Features>
            <FeatureItem>Claude 3 Haiku or GPT 4o mini</FeatureItem>
            <FeatureItem>100 credits per day</FeatureItem>
            <FeatureItem>Adaptive Personalization</FeatureItem>
            <FeatureItem>1000 saved recipes</FeatureItem>
            <FeatureItem>Limited credits per week for Image Prompts</FeatureItem>
          </Features>
          <GordonButton>
            Upgrade now <FaArrowRight />
          </GordonButton>
        </Plan>
      </PricingContainer>
    </PricingSection>
  );
};

export default PricingPlans;