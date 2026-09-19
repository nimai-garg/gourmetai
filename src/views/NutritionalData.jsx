import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  font-family: 'SFPro-Bold', sans-serif;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const TextField = styled.input`
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: calc(100% - 40px); /* Reduce width to ensure it doesn't hit the right edge */
  font-size: 1rem;
  font-family: 'SFPro-Regular', sans-serif;
  resize: vertical;
  max-width: 100%;

  /* Apply input restriction using regex */
  &:invalid {
    border-color: red; /* Optional: Highlight invalid input */
  }
`;

const PoweredByText = styled.span`
  font-family: 'SFPro-Bold', sans-serif;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const NextButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: 2px solid #007bff;
  padding: 10px 20px;

  &:hover, &:focus {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const PreviousButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  background-color: red;
  color: #fff;
  border: 2px solid red;
   padding: 10px 20px;

  &:hover, &:focus {
    transform: scale(1.03); /* Expand the button slightly on hover */
  }
`;

const Button = styled.button`
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 20px;
`;

const GridItem = styled.div`
  background-color: #F5F5F5;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
`;

const NutrientValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'SFPro-Bold', sans-serif;
`;

const NutrientName = styled.div`
  font-size: 0.9rem;
  font-family: 'SFPro-Regular', sans-serif;
`;

const NutritionData = styled.p`
  font-family: 'SFPro-Regular', sans-serif;
`

const NutritionalData = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(''); // Default query example
  const [nutritionData, setNutritionData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Track current page of results

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setNutritionData(null);
    setTotalPages(0);
    setError('');
    setLoading(Boolean(query.trim()));
    if (!query.trim()) return () => controller.abort();
    const timer = setTimeout(async () => {
      try {
        const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
          params: { api_key: process.env.REACT_APP_USDA_API_KEY || 'DEMO_KEY',
            query: query.trim(), pageSize: 1, pageNumber: currentPage + 1 },
          signal: controller.signal, timeout: 15000
        });
        if (!controller.signal.aborted) {
          setNutritionData(response.data.foods?.[0] || null);
          setTotalPages(response.data.totalPages || 0);
          if (!response.data.foods?.length) setError('No foods found. Try a different ingredient.');
        }
      } catch (err) {
        if (!controller.signal.aborted) setError('Food search is unavailable. Please try again later.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 350);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, currentPage]);

  const handleUSDALogo = () => {
    window.open('https://www.usda.gov/', '_blank'); // Opens USDA website in a new tab
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(0);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>
          Nutritional Data
          <PoweredByText>powered by</PoweredByText>
          <USDAImage src={usdaImage} onClick={handleUSDALogo} alt="USDA Logo" />
        </Header>

        <HeaderButtons>
          <Button onClick={handleGoBack}>Go back</Button>
        </HeaderButtons>
      </HeaderContainer>

      {/* Input for dynamic query */}
      <div>
        <br></br>
        <TextField type="text" value={query} placeholder="Enter an ingredient..." onChange={handleInputChange} />
      </div>

      {loading && <p role="status">Searching foods…</p>}
      {error && <p role="alert">{error}</p>}
      
      {nutritionData && (
        <div>
          <h2 style={{ fontFamily: 'SFPro-Bold, sans-serif' }}>Nutritional Information for "{query}"</h2>
          <NutritionData>{nutritionData.description}</NutritionData>
          <GridContainer>
          <GridItem>
            <NutrientValue>{`${nutritionData.servingSize || 'N/A'} ${nutritionData.servingSizeUnit || ''}`}</NutrientValue>
            <NutrientName>Serving Size</NutrientName>
          </GridItem>
            <GridItem>
              <NutrientValue>{nutritionData.foodNutrients?.find(nutrient => nutrient.nutrientId === 1008)?.value ?? 'N/A'}</NutrientValue>
              <NutrientName>Calories (kcal)</NutrientName>
            </GridItem>
            <GridItem>
              <NutrientValue>{nutritionData.foodNutrients?.find(nutrient => nutrient.nutrientId === 1003)?.value ?? 'N/A'}</NutrientValue>
              <NutrientName>Protein (g)</NutrientName>
            </GridItem>
            <GridItem>
              <NutrientValue>{nutritionData.foodNutrients?.find(nutrient => nutrient.nutrientId === 1004)?.value ?? 'N/A'}</NutrientValue>
              <NutrientName>Fat (g)</NutrientName>
            </GridItem>
            <GridItem>
              <NutrientValue>{nutritionData.foodNutrients?.find(nutrient => nutrient.nutrientId === 1258)?.value ?? 'N/A'}</NutrientValue>
              <NutrientName>Saturated Fat (g)</NutrientName>
            </GridItem>
            <GridItem>
              <NutrientValue>{nutritionData.foodNutrients?.find(nutrient => nutrient.nutrientId === 1005)?.value ?? 'N/A'}</NutrientValue>
              <NutrientName>Carbohydrates (g)</NutrientName>
            </GridItem>
            <GridItem>
              <NutrientValue>{nutritionData.foodNutrients?.find(nutrient => nutrient.nutrientId === 1253)?.value ?? 'N/A'}</NutrientValue>
              <NutrientName>Cholesterol (mg)</NutrientName>
            </GridItem>
            <GridItem>
              <NutrientValue> {nutritionData.foodNutrients?.find(nutrient => nutrient.nutrientId === 1093)?.value ?? 'N/A'}</NutrientValue>
              <NutrientName>Sodium (mg)</NutrientName>
            </GridItem>

            <GridItem>
              <NutrientValue>{nutritionData.foodNutrients?.find(nutrient => nutrient.nutrientId === 2000)?.value ?? 'N/A'}</NutrientValue>
              <NutrientName>Total Sugars (g)</NutrientName>
            </GridItem>

            <GridItem>
              <NutrientValue>{nutritionData.foodNutrients?.find(nutrient => nutrient.nutrientId === 2001)?.value ?? 'N/A'}</NutrientValue>
              <NutrientName>Included Sugars (g)</NutrientName>
            </GridItem>
            </GridContainer>
          </div>
      )}

      {/* Navigation buttons */}
      <ButtonContainer>
        <PreviousButton onClick={handlePrevious} disabled={loading || currentPage === 0}>Previous</PreviousButton>
        <NextButton disabled={loading || currentPage + 1 >= totalPages} onClick={handleNext}>Next</NextButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default NutritionalData;