import React, {useState} from 'react';
import styled from 'styled-components';

const CookingTipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const ContentSection = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  ${(props) => props.isHidden && `display: none;`}
`;

const GoBackButtonContainer = styled.div`
  margin-top: 20px;
`;

const CookingTips = () => {
  const [isIndianTipsVisible, setIsIndianTipsVisible] = useState(false);

  const handleToggleIndianTips = () => {
    setIsIndianTipsVisible(!isIndianTipsVisible);
  };

  return (
    <CookingTipsContainer>
      <TitleSection onClick={handleToggleIndianTips}>
        <Title>General Cooking Tips</Title>
        {/* GoBackButton component */}
      </TitleSection>
      <ContentSection isHidden={!isIndianTipsVisible}>
        {/* Content for General Cooking Tips */}
      </ContentSection>
      <ContentSection isHidden={isIndianTipsVisible}>
        {/* Content for Indian Cooking Tips */}
      </ContentSection>
      <GoBackButtonContainer>
        {/* GoBackButton component */}
      </GoBackButtonContainer>
    </CookingTipsContainer>
  );
};

export default CookingTips;
