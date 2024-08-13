import React from 'react'
import styled from 'styled-components';
import '@fontsource/geist-sans';
import '@fontsource/geist-mono';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFF;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.h1`
    font-family: 'Geist Sans', sans-serif;
    font-weight: bold;

`;

const SubHeader = styled.h2`
    font-family: 'Geist Sans', sans-serif;
    font-weight: 30;
`;

const Button = styled.button`
font-family: 'Geist Sans', sans-serif;
  color: #fff;
  background-color: #000;
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px 0px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  font-weight: 500;
  margin-top: 15px;
  width: 190px;

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
`

const Pricing = () => {

    const handleJoinToday = () => {
        window.open('https://getwaitlist.com/waitlist/19450', '_blank');
      }
      
  return (
    <PageContainer>
        <Header>Coming late 2024!, Free for now</Header>
        <SubHeader>Enter the exclusive list to get premium 100% free for 1 year when it comes out</SubHeader>
        <Button onClick={handleJoinToday}>Join today</Button>
    </PageContainer>
  )
}

export default Pricing
