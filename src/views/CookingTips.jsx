import React, { useState } from 'react';
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
`;

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
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBox = styled.div`
  width: 100%;
  height: 600px; /* Adjust height as needed */
  background-color: #ECECEC; /* Sets the background color to gray */
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 20px;
`;

const VerticalMenu = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
`;

const ContentArea = styled.div`
  width: 80%;
  padding: 20px;
  box-sizing: border-box;
`;

const HorizontalTitle = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const TipButton = styled.button`
  background: none;
  border: none;
  text-align: left;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  &:hover {
    background-color: #ddd;
  }
`;

const CookingTips = () => {
  const navigate = useNavigate();
  const [selectedTip, setSelectedTip] = useState('Select a tip to view');

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
      <MainSection>
        <MainBox>
          <div style={{ display: 'flex', height: '100%' }}>
            <VerticalMenu>
              <TipButton onClick={() => setSelectedTip('Tip 1')}>Tip 1</TipButton>
              <TipButton onClick={() => setSelectedTip('Tip 2')}>Tip 2</TipButton>
              <TipButton onClick={() => setSelectedTip('Tip 3')}>Tip 3</TipButton>
              {/* Add more TipButtons as needed */}
            </VerticalMenu>
            <ContentArea>
              <HorizontalTitle>{selectedTip}</HorizontalTitle>
              <div>
                {/* Content for the selected tip */}
                {selectedTip === 'Tip 1' && <p>Details for Tip 1...</p>}
                {selectedTip === 'Tip 2' && <p>Details for Tip 2...</p>}
                {selectedTip === 'Tip 3' && <p>Details for Tip 3...</p>}
              </div>
            </ContentArea>
          </div>
        </MainBox>
      </MainSection>
    </PageContainer>
  );
};

export default CookingTips;