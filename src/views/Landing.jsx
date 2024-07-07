import React from 'react'
import styled from 'styled-components';

const PageContainer = styled.div`
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Header = styled.div`
  font-size: 1.7rem;
  font-family: 'Fustat', sans-serif;
  font-weight: bold;
`;

const CenterText = styled.h1`
  font-size: 4rem;
  font-family: 'Fustat', sans-serif;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 100px;
  background: linear-gradient(to right, #ffcccc, #ff6699);
  -webkit-background-clip: text; /* Clip the gradient to the text */
  -webkit-text-fill-color: transparent; /* Make the text color transparent */
`;

const SubCenterText = styled.h3`
  font-size: 1rem;
  font-family: 'Fustat', sans-serif;
  background: gray;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 60px;
   -webkit-background-clip: text; /* Clip the gradient to the text */
  -webkit-text-fill-color: transparent; /* Make the text color transparent *
`;

const CenterTextButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 50px; /* Adjust the gap as needed */
`;

const LeftCenterTextButton = styled.button`
  color: #000000;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 30px;
  padding: 10px 20px;
  width: 150px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Fustat', sans-serif;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
`;

const RightCenterTextButton = styled.button`
  color: #000000;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 30px;
  padding: 10px 20px;
  width: 150px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Fustat', sans-serif;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
`;

const ActionButton = styled.button`
  color: #000000;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Fustat', sans-serif;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
`;

const SecondDiv = styled.div`
  margin-top: 130px;
`;

const Box = styled.div`
  background-color: #f5f5f5;
  padding: 14rem 19rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Fustat', sans-serif;
  
  margin-left: 50px;
  max-width: 100px;
  max-height: 300px;
`;

const BoxHeader = styled.h1`
  align-items: flex-start;
  white-space: nowrap;
`;

const BoxParagraph = styled.p`

`;

const handleLearn = () => {
    window.open('https://gourmetai.com', '_blank');
}

const Landing = () => {
  return (
    <PageContainer>
      <HeaderContainer>
        <Header>GourmetAI</Header>
        <ActionButton onClick={handleLearn}>Create</ActionButton>
      </HeaderContainer>
      <CenterText>Find inspiration for your next recipe</CenterText>
      <SubCenterText>A 100% free AI that allows you to think of creative, innovative, and personalized recipes </SubCenterText>
      <CenterTextButtonDiv>
        <LeftCenterTextButton>Let's innovate</LeftCenterTextButton>
        <RightCenterTextButton>Learn more</RightCenterTextButton>
      </CenterTextButtonDiv>
      <SecondDiv>
        <Box>
          <BoxHeader>What is Gourmet AI?</BoxHeader>
        </Box>
        <br></br>
      </SecondDiv>
    </PageContainer>
  )
}

export default Landing;