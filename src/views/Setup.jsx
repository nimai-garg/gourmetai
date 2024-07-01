import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFFACD;
`;

const Card = styled.div`
  background-color: #f5f5dc;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Button = styled.button`
  background-color: #d3d3d3;
  color: #000000;
  border: none;
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: #c0c0c0;
  }
`;

const Setup = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/dashboard');
  };

  return (
    <PageContainer>
      <Card>
        <Button onClick={handleProceed}>Proceed to Dashboard</Button>
      </Card>
    </PageContainer>
  );
};

export default Setup;
