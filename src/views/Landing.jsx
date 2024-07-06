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

const BigText = styled.div`
    
`

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
    </PageContainer>
  )
}

export default Landing;