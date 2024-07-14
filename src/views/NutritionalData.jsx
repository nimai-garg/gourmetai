import React from 'react';
import styled from 'styled-components';

// Import your USDA image
import usdaImage from '../images/USDA_Logo.jpg';

const PageContainer = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 20px; /* Add padding for small screens */
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  font-family: 'Fustat', sans-serif;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const PoweredByText = styled.span`
  margin-right: 10px; /* Adjust spacing as needed */
  margin-left: 10px;
  font-size: 1rem;
  font-weight: light;
`;

const USDAImage = styled.img`
  width: 50px; /* Adjust size as needed */
  height: auto;
  cursor: pointer; /* Make the cursor change to a pointer on hover */
`;

const NutritionalData = () => {

  const handleUSDALogo = () => {
    window.open('https://www.usda.gov/', '_blank'); // Opens USDA website in a new tab
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>
          Nutritional Data
          <PoweredByText>powered by</PoweredByText>
          <USDAImage src={usdaImage} onClick={handleUSDALogo} alt="USDA Logo" />
        </Header>
      </HeaderContainer>
    </PageContainer>
  );
};

export default NutritionalData;