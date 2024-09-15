import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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

const BoldParagraph = styled(Paragraph)`
  font-family: 'SFPro-Bold', sans-serif;
`;

const Link = styled.a`
  color: #d87c52;
  text-decoration: none;
  font-family: 'SFPro-LightItalic', sans-serif;

  &:hover {
    font-family: 'SFPro-SemiboldItalic', sans-serif;
  }
`;

const UnlistedList = styled.ul`

`;

const ListItem = styled.li`
  font-family: 'SFPro-Regular', sans-serif;
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
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  }

  return (
    <Container>
        <GoBackContainer onClick={handleGoBack} tabIndex="0">
        <FaArrowLeft />
        Go Back
      </GoBackContainer>
      <Header>Terms of Use</Header>
      <HeaderContainer>
        <EffectiveDate>Effective Date: September 3, 2024</EffectiveDate>
        <Divider />
      </HeaderContainer>

      <BoldParagraph>Welcome to GourmetChef (“we,” “us,” or “our”). These Terms of Use govern your access to and use of the GourmetChef application, website, and services (“Services”). By using our Services, you agree to be bound by these Terms of Use.</BoldParagraph>

      <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <Paragraph>By creating an account or using our Services, you accept and agree to abide by these Terms. If you do not agree with any part of these Terms, you must not use our Services.</Paragraph>

      <SectionTitle>2. Eligibility</SectionTitle>
        <Paragraph>You must be at least 13 years old to use our Services. If you are under the age of 18, you must have the consent of a parent or guardian to use our Services. By using GourmetChef, you confirm that you meet these age requirements.</Paragraph>

      <SectionTitle>3. Account Registration</SectionTitle>
        <Paragraph>To access certain features of GourmetChef, you may be required to create an account. You agree to provide accurate, complete, and up-to-date information.</Paragraph>
        <UnlistedList>
          <ListItem>Provide accurate, complete, and up-to-date information.</ListItem>
          <ListItem>Maintain the security of your account and promptly update any changes to your information.</ListItem>
          <ListItem>Be responsible for all activity that occurs under your account.</ListItem>
        </UnlistedList>

      <SectionTitle>4. Use of the Services</SectionTitle>
        <Paragraph>You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</Paragraph>
        <UnlistedList>
          <ListItem>Use our Services in a way that violates any applicable laws or regulations.</ListItem>
          <ListItem>Misrepresent your identity, impersonate others, or provide inaccurate information.</ListItem>
          <ListItem>Engage in any conduct that could harm or disrupt our Services.</ListItem>
        </UnlistedList>
        <Paragraph>We reserve the right to terminate or suspend access to your account at any time if we suspect a violation of these Terms.</Paragraph>

      <SectionTitle>5. User-Generated Content</SectionTitle>
        <Paragraph>GourmetChef may allow users to submit comments, feedback, and other content. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, distribute, reproduce, and display the content for the purpose of operating and improving our Services.</Paragraph>
        <Paragraph>You are solely responsible for the content you submit and agree not to submit content that:</Paragraph>
        <UnlistedList>
          <ListItem>Is illegal, offensive, or inappropriate.</ListItem>
          <ListItem>Infringes on the intellectual property or privacy rights of others.</ListItem>
          <ListItem>Contains malicious code, such as viruses or malware.</ListItem>
        </UnlistedList>

      <SectionTitle>6. Intellectual Property</SectionTitle>
        <Paragraph>All content and materials provided through GourmetChef, including but not limited to software, graphics, text, logos, and recipes, are owned by or licensed to GourmetChef and are protected by copyright, trademark, and other intellectual property laws.</Paragraph>
        <Paragraph>You may use our content solely for personal, non-commercial use. You may not modify, reproduce, distribute, or create derivative works from our content without prior written permission from us.</Paragraph>

      <SectionTitle>7. Third-Party Services</SectionTitle>
        <Paragraph>Our Services may contain links to third-party websites or services that are not owned or controlled by GourmetChef. We are not responsible for the content, privacy policies, or practices of any third-party sites. You access third-party services at your own risk, and we encourage you to review their terms and policies before using them.</Paragraph>

      <SectionTitle>8. Disclaimer of Warranties</SectionTitle>
        <Paragraph>Our Services are provided on an “as is” and “as available” basis. We make no warranties or representations regarding the accuracy, reliability, or completeness of the content or Services provided. You agree that your use of our Services is at your own risk.</Paragraph>
        <Paragraph>To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not limited to:</Paragraph>
        <UnlistedList>
          <ListItem>Implied warranties of merchantability or fitness for a particular purpose.</ListItem>
          <ListItem>Warranties arising from course of dealing or usage of trade.</ListItem>
        </UnlistedList>
      <SectionTitle>9. Limitation of Liability</SectionTitle>
        <Paragraph>To the fullest extent permitted by law, GourmetChef and its affiliates, officers, employees, or agents will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Services. This includes but is not limited to damages for loss of profits, data, or goodwill.</Paragraph>
        <Paragraph>In jurisdictions that do not allow the exclusion of certain warranties or limitations on liability, the above limitations may not apply to you.</Paragraph>

      <SectionTitle>10. Indemnification</SectionTitle>
        <Paragraph>You agree to indemnify and hold harmless GourmetChef and its affiliates, officers, employees, and agents from any claims, damages, liabilities, costs, and expenses (including legal fees) arising from your use of the Services, violation of these Terms, or infringement of any rights of others.</Paragraph>

      <SectionTitle>11. Termination</SectionTitle>
        <Paragraph>We reserve the right to terminate or suspend your account and access to our Services at any time for any reason, including but not limited to violation of these Terms.</Paragraph>
        <Paragraph>Upon termination, your right to use our Services will cease immediately. You may also terminate your account at any time by contacting us.</Paragraph>
      
      <SectionTitle>12. Governing Law</SectionTitle>
        <Paragraph>These Terms of Use are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in California, and you consent to personal jurisdiction and venue in those courts.</Paragraph>

      <SectionTitle>13. Changes to These Terms</SectionTitle>
        <Paragraph>We may update or modify these Terms at any time. If we make significant changes, we will notify you by email or by posting a notice on our website. Continued use of our Services after any such changes constitutes your acceptance of the new Terms.</Paragraph>

      <Divider />
      <SectionTitle>Contact Us</SectionTitle>
      <Paragraph>
      If you have any questions or concerns about these Terms of Use, please contact us at:{' '}
        <Link href="mailto:support@gourmetchef.app">support@gourmetchef.app</Link>.
      </Paragraph>
      <Paragraph>This Terms of Use ensures users understand their rights, responsibilities, and the limitations of liability while using GourmetChef.</Paragraph>
    </Container>
  );
};

export default TermsOfUse;