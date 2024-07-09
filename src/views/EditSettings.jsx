import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Import auth from firebaseConfig.js
import { logOut } from '../firebaseConfig'; // Adjust the path to your firebaseConfig.js

const PageContainer = styled.div`

`;

const HeadingContainer = styled.div`

`;

const Heading = styled.h1`
  font-family: 'Fustat', sans-serif;
`;

const Card = styled.div`

`;

const QuestionOne = styled.h3`
  font-family: 'Fustat', sans-serif;
`;

const InputField = styled.input`
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 300px;
  font-size: 1rem;
  font-family: 'Fustat', sans-serif;
`;

const SubmitOne = styled.button`
  background-color: #fff;
  color: #000000;
  border-color: black; /* Set the border color to black */
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  width: 180px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
  font-family: 'Fustat', sans-serif;
  margin: 0 1rem; /* Add this line for a gap */
`;

const EditSettings = () => {
  return (
    <PageContainer>

      <HeadingContainer>
        <Heading>Edit your Setup</Heading>
      </HeadingContainer>

      <Card>
          <QuestionOne>Hello</QuestionOne>
          <InputField
            type="text"
            placeholder="Enter your response"
          />
          <SubmitOne>Next</SubmitOne>
        </Card>

    </PageContainer>
  )
}

export default EditSettings
