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

const PrivacyPolicy = () => {
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
      <Header>Privacy Policy</Header>
      <HeaderContainer>
        <EffectiveDate>Effective Date: September 24, 2026</EffectiveDate>
        <Divider />
      </HeaderContainer>

      <BoldParagraph>This policy describes how Gourmet Chef uses account information, saved cooking preferences, and information provided when you use the app.</BoldParagraph>

      <SectionTitle>1. Information We Collect</SectionTitle>
        <Paragraph>We collect two types of information:</Paragraph>
        <Paragraph>a. Personal Information</Paragraph>
        <Paragraph>This includes information you provide when you sign up, such as:</Paragraph>
        <UnlistedList>
          <ListItem>Name</ListItem>
          <ListItem>Email Address</ListItem>
          <ListItem>Dietary preferences and any allergies or health information you choose to provide</ListItem>
          <ListItem>Account Type (Google or Email/Password)</ListItem>
          <ListItem>Setup Preferences</ListItem>
          <ListItem>Other Information (e.g., optional feedback)</ListItem>
        </UnlistedList>

        <Paragraph>b. Non-Personal Information</Paragraph>
        <Paragraph>This includes data collected automatically:</Paragraph>
        <UnlistedList>
          <ListItem>Device Information (e.g., IP address, browser type)</ListItem>
          <ListItem>Email Address</ListItem>
          <ListItem>Usage Data (e.g., pages visited, features used)</ListItem>

        </UnlistedList>
        <Paragraph>Account information and saved preferences are stored in Firebase. Google Analytics is used for website usage measurement.</Paragraph>

      <SectionTitle>2. How We Use Your Information</SectionTitle>
        <Paragraph>We use your data to:</Paragraph>
        <UnlistedList>
          <ListItem>Improve Our Services - Analyze usage data to enhance functionality and user experience.</ListItem>
          <ListItem>Communicate - Send updates, respond to inquiries, and provide customer support.</ListItem>
          <ListItem>Comply with Legal Obligations - Ensure compliance with applicable laws and regulations.</ListItem>
        </UnlistedList>

      <SectionTitle>3. How We Share Your Information</SectionTitle>
        <Paragraph>
          We will not sell or rent your personal information to third parties. We may share your data with:
        </Paragraph>
        <UnlistedList>
          <ListItem>Firebase provides authentication and profile storage. Netlify hosts the website and recipe endpoint. Recipe requests send your saved cooking preferences, including any dietary, allergy, age, or health details you supplied, to OpenAI to generate a recipe. Your name and email are not included in the recipe prompt.</ListItem>
          <ListItem>Food searches are sent to USDA FoodData Central. The optional feedback form is hosted by Tally.</ListItem>
          <ListItem>Legal Obligations: If required by law, we may disclose your data to government authorities or legal entities.</ListItem>
        </UnlistedList>

      <SectionTitle>Data Retention</SectionTitle>
        <Paragraph>We retain your data for as long as your account is active or as needed to fulfill the purposes outlined in this Privacy Policy. You can request the deletion of your data at any time by contacting us.</Paragraph>

      <SectionTitle>5. Your Data Rights</SectionTitle>
        <Paragraph>You have the right to:</Paragraph>
        <UnlistedList>
          <ListItem>Access and Update Your Information - Review and update your personal data within your account settings.</ListItem>
          <ListItem>Request Deletion - Request the deletion of your personal data.</ListItem>
          <ListItem>Opt-Out - Opt-out of marketing emails and newsletters by following the instructions provided in those emails.</ListItem>
          <ListItem>Data Portability - Request a copy of the data we have collected.</ListItem>
        </UnlistedList>

      <SectionTitle>6. Cookies and Tracking Technologies</SectionTitle>
        <Paragraph>We use cookies and similar technologies to:</Paragraph>
        <UnlistedList>
          <ListItem>Enhance User Experience - Remember your preferences and login information.</ListItem>
          <ListItem>Analyze Traffic - Monitor site usage for performance and improvements.</ListItem>
        </UnlistedList>
        <Paragraph>You can manage your cookie preferences in your browser settings, but disabling cookies may limit the functionality of our Services.</Paragraph>

      <SectionTitle>7. Security</SectionTitle>
        <Paragraph>We take reasonable measures to protect your data, including:</Paragraph>
        <UnlistedList>
          <ListItem>Encryption - We use encryption to safeguard personal information.</ListItem>
          <ListItem>Access Controls - We restrict access to personal data to authorized personnel only.</ListItem>
        </UnlistedList>
        <Paragraph>Firebase Authentication manages passwords; the application does not store plaintext passwords. Avoid entering sensitive information that is not needed for a recipe.</Paragraph>
        <Paragraph>However, no method of data transmission or storage is entirely secure. We cannot guarantee the absolute security of your information.</Paragraph>

      <SectionTitle>Children’s Privacy</SectionTitle>
        <Paragraph>Our Services are not directed toward children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a child, we will take steps to delete it.</Paragraph>

      <SectionTitle>10. Changes to This Policy</SectionTitle>
        <Paragraph>We may update this Privacy Policy from time to time. If we make significant changes, we will notify you by email or by posting a notice on our website before the change becomes effective. Please review the policy periodically.</Paragraph>

      <Divider />
      <SectionTitle>Contact Us</SectionTitle>
      <Paragraph>
      If you have any questions or concerns about this Privacy Policy, please contact us at:{' '}
        <Link href="mailto:support@gourmetchef.app">support@gourmetchef.app</Link>.
      </Paragraph>

    </Container>
  );
};

export default PrivacyPolicy;
