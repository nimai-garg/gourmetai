import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    // Styled components
    const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
        background-color: #fff;
    `;

    const Error = styled.h1`
        color: #ff4757;
        font-family: 'Inter', sans-serif;
        font-size: 8rem;
        margin: 0;
    `;

    const PageNotFound = styled.h3`
        font-family: 'Inter', sans-serif;
        font-size: 2rem;
        margin: 20px 0;
        color: #333;
    `;

    const DashboardButton = styled.button`
        color: #fff;
        background-color: #333;
        border: none;
        border-radius: 5px;
        padding: 15px 30px;
        font-size: 1.25rem;
        font-weight: bold;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        margin-top: 20px;

        @media (max-width: 768px) {
            padding: 10px 20px;
            font-size: 1rem;
        }

        &:hover, &:focus {
            background-color: #555; /* Darker background on hover */
            transform: scale(1.05); /* Expand the button slightly on hover */
        }
    `;

    const handleDashboardButton = () => {
        navigate('/dashboard');
    }

    return (
        <Container>
            <Error>404</Error>
            <PageNotFound>Page Not Found</PageNotFound>
            <DashboardButton onClick={handleDashboardButton}>Back to Dashboard</DashboardButton>
        </Container>
    );
};

export default NotFound;