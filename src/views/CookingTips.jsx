import React, {useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  font-size: 1.7rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.2rem;
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

const MainSection = styled.div`

`;

const MainBox = styled.div`
  width: 100%;
  border-radius: 15px;
  height: 700px; /* Adjust height as needed */
  background-color: #ECECEC; /* Sets the background color to gray */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftLine = styled.div`
  width: 2px; /* Thickness of the line */
  height: 84%; /* Makes the line span the full height of its container */
  background-color: black; /* Color of the line */
  position: absolute; /* Positioned relative to its container */
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: bold;
`;

const CookingTips = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
   <PageContainer>
     <HeaderContainer>
        <Header>Cooking Tips</Header>
      
        <NavigationButtonDiv>
          <ActionButton onClick={handleGoBack}>Go Back</ActionButton>
        </NavigationButtonDiv>
      </HeaderContainer>
      <br></br>
      <MainSection>
        <MainBox>
          <LeftLine></LeftLine>
        </MainBox>
      </MainSection>
   </PageContainer>
  )
};

export default CookingTips;
