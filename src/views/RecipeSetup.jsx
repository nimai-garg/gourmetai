import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../firebaseConfig'; // Adjust the path to your firebaseConfig.js

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFF;
  font-family: 'Fustat', sans-serif;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Fustat', sans-serif;
`;

const Button = styled.button`
  background-color: #fff;
  color: #000000;
  border-color: black;
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

const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 300px;
  font-size: 1rem;
  font-family: 'Fustat', sans-serif;
`;

const SignOutButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  color: red;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 30px;
  margin-top: 1rem;
  font-family: 'Fustat', sans-serif;
  border: 2px solid red; // Use red color for border
  //transition: background-color 0.3s, color 0.3s, border-color 0.3s; // Smooth transition for hover effect

  &:hover {
    color: #fff;
    background-color: red; // Corrected to red background on hover
    border-color: white;
  }
`;

const GoBackButton = styled.button`
  background-color: #fff;
  color: #000000;
  border-color: black;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  min-width: 100px;  /* Adjust the width to ensure "Go back" fits in one line */
  cursor: pointer;
  white-space: nowrap;  /* Prevents the text from wrapping to the next line */
  text-align: center;
  &:hover {
    color: #fff;
    background-color: #000;
    border-color: white;
  }
  font-family: 'Fustat', sans-serif;
  margin: 0 1rem; /* Add this line for a​⬤
`;

const RecipeSetup = () => {

}

export default RecipeSetup;