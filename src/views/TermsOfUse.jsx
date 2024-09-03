import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #333;
`;

const Header = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  font-family: 'SFPro-Bold', sans-serif;
  text-align: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EffectiveDate = styled.p`
  font-size: 14px;
  color: #666;
  margin-right: auto;
  font-family: 'SFPro-SemiboldItalic', sans-serif;
`;

const Divider = styled.hr`
  flex-grow: 1;
  border: none;
  height: 1px;
  background-color: #ccc;
  margin-left: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-family: 'SFPro-Bold', sans-serif;
  margin-top: 40px;
  margin-bottom: 10px;
  color: #444;
`;

const Paragraph = styled.p`
  font-size: 16px;
  font-family: 'SFPro-Regular', sans-serif;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const Link = styled.a`
  color: #d87c52;
  text-decoration: none;
  font-family: 'SFPro-LightItalic', sans-serif;

  &:hover {
    font-family: 'SFPro-SemiboldItalic', sans-serif;
  }
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

const TermsOfUse = () => {
  return (
    <Container>
        <GoBackContainer tabIndex="0">
        <FaArrowLeft />
        Go Back
      </GoBackContainer>
      <Header>Terms of Use</Header>
      <HeaderContainer>
        <EffectiveDate>Effective Date: September 3, 2024</EffectiveDate>
        <Divider />
      </HeaderContainer>

      <SectionTitle>1. Acceptance of Terms</SectionTitle>
      <Paragraph>
        By creating an account or using our Services, you accept and agree to abide by these Terms. If you do not agree with any part of these Terms, you must not use our Services.
      </Paragraph>

      <SectionTitle>2. Eligibility</SectionTitle>
      <Paragraph>
        You must be at least 13 years old to use our Services. If you are under the age of 18, you must have the consent of a parent or guardian to use our Services. By using GourmetChef, you confirm that you meet these age requirements.
      </Paragraph>

      <SectionTitle>3. Account Registration</SectionTitle>
      <Paragraph>
        To access certain features of GourmetChef, you may be required to create an account. You agree to provide accurate, complete, and up-to-date information.
      </Paragraph>

      {/* Additional Sections here... */}

      <Divider />

      <Paragraph>
        Have questions? Contact us at{' '}
        <Link href="mailto:support@gourmetchef.app">support@gourmetchef.app</Link>.
      </Paragraph>
    </Container>
  );
};

export default TermsOfUse;