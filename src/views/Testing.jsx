import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const testimonials = [
  {
    logo: "https://via.placeholder.com/80",
    name: "John Doe",
    text: "GourmetChef has completely transformed my cooking habits. Every recipe is personalized perfectly for me!",
  },
  {
    logo: "https://via.placeholder.com/80",
    name: "Jane Smith",
    text: "Bright Sparks made a real difference in my child’s education. The personalized learning approach is unbeatable!",
  },
  {
    logo: "https://via.placeholder.com/80",
    name: "Alex Johnson",
    text: "The level of detail in GourmetChef recipes is astounding. I feel like a pro chef every time I cook!",
  },
];

const TestimonialPage = () => {
  const [current, setCurrent] = useState(1); // Start with the middle card focused

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000); // Transition every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper>
      <Header>What People Are Saying</Header>
      <TestimonialsWrapper>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            isFocused={current === index}
            position={index - current}
          >
            <Logo src={testimonial.logo} alt="Person Logo" />
            <Name>{testimonial.name}</Name>
            <TestimonialText>{testimonial.text}</TestimonialText>
          </TestimonialCard>
        ))}
      </TestimonialsWrapper>
    </PageWrapper>
  );
};

export default TestimonialPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 40px;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 50px;
  font-weight: 400;
`;

const TestimonialsWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 30%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  transition: transform 0.5s ease, opacity 0.5s ease;

  ${({ isFocused }) =>
    isFocused &&
    css`
      transform: scale(1.2);
      z-index: 2;
      opacity: 1;
    `}

  ${({ position }) =>
    position === -1 &&
    css`
      transform: translateX(-150%) scale(0.8);
      opacity: 0.5;
    `}

  ${({ position }) =>
    position === 1 &&
    css`
      transform: translateX(150%) scale(0.8);
      opacity: 0.5;
    `}

  ${({ position }) =>
    position === 0 &&
    css`
      transform: translateX(0) scale(1);
    `}
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  border-radius: 50%;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.75;
  padding: 0 10px;
  margin-bottom: 20px;
`;