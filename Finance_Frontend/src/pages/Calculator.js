import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../components/StyledCard';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import OptimizedImage from '../components/OptimizedImage';

const CalculatorBg = styled.div`
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
  padding: ${props => props.theme.spacing['2xl']} 0;
`;

const CalculatorContainer = styled.div`
  max-width: ${props => props.theme.breakpoints['2xl']};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing['2xl']};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const CalculatorCard = styled(Card)`
  transition: all ${props => props.theme.transitions.default};
  background: ${props => props.theme.colors.backgroundLight};
  border: 1px solid ${props => props.theme.colors.primary}22;
  box-shadow: ${props => props.theme.shadows.lg};
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.primary};
    transform: scaleX(0);
    transition: transform ${props => props.theme.transitions.default};
    transform-origin: left;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
    
    &::before {
      transform: scaleX(1);
    }
    
    .calculator-icon {
      transform: scale(1.1) rotate(5deg);
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-color: ${props => props.theme.colors.background};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${props => props.imagePosition || 'center'};
    transition: transform ${props => props.theme.transitions.default};
  }

  ${CalculatorCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  height: 100%;
  flex: 1;
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.textLight};
  margin: 0;
  font-size: ${props => props.theme.typography.fontSizes['2xl']};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  letter-spacing: -0.5px;
  flex-shrink: 0;
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textLight}99;
  margin: 0;
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  font-size: ${props => props.theme.typography.fontSizes.base};
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CalculatorLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all ${props => props.theme.transitions.default};
  font-size: ${props => props.theme.typography.fontSizes.base};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary}11;
  border-radius: ${props => props.theme.borderRadius.lg};
  width: fit-content;
  margin-top: auto;
  flex-shrink: 0;
  
  &:hover {
    color: ${props => props.theme.colors.textLight};
    background: ${props => props.theme.colors.primary};
    transform: translateX(4px);
  }
`;

const calculators = [
  { 
    title: 'Borrowing Power Calculator',
    link: '/calculators/borrowing-power',
    description: 'Discover how much you can borrow for your home loan based on your income, expenses, and financial situation. Our calculator takes into account your income, living expenses, existing debts, and other financial commitments to give you a realistic estimate of your borrowing capacity.',
    image: 'assets/images/calculator/Borrowing_Power_Calculator.png',
    imagePosition: 'center 20%',
    sectionTitle: 'Calculate Your Borrowing Power',
    sectionDescription: 'Understand your maximum borrowing capacity and plan your home purchase with confidence.'
  },
  { 
    title: 'Stamp Duty Calculator',
    link: '/calculators/stamp-duty',
    description: 'Calculate the stamp duty payable on your property purchase across different states and territories. Our calculator considers property value, property type, and location to provide accurate stamp duty estimates, helping you budget effectively for your purchase.',
    image: 'assets/images/calculator/Stamp Duty Calculator.jpg',
    imagePosition: 'center',
    sectionTitle: 'Estimate Your Stamp Duty',
    sectionDescription: 'Get accurate stamp duty calculations for your property purchase across all Australian states and territories.'
  },
  { 
    title: 'Loan Repayment Calculator',
    link: '/calculators/loan-repayment',
    description: 'Estimate your monthly loan repayments and understand the total cost of your loan over time. Our calculator helps you visualize your repayment schedule, including principal and interest payments, helping you make informed decisions about your loan term and structure.',
    image: 'assets/images/calculator/Loan Repayment Calculator.png',
    imagePosition: 'center 70%',
    sectionTitle: 'Plan Your Loan Repayments',
    sectionDescription: 'Calculate your monthly repayments and understand the total cost of your loan over time.'
  },
  { 
    title: 'Rent vs Buy Calculator',
    link: '/calculators/rent-vs-buy',
    description: 'Compare the costs of renting versus buying a property to make an informed decision about your housing future. Our calculator analyzes various factors including property value, rental costs, interest rates, and maintenance expenses to help you determine which option makes more financial sense for your situation.',
    image: 'assets/images/calculator/Buy vs Rent Calculator.jpg',
    imagePosition: 'center 80%',
    sectionTitle: 'Compare Renting vs Buying',
    sectionDescription: 'Make an informed decision about whether renting or buying is the better financial choice for you.'
  },
];

const Calculator = () => (
  <Layout noHeaderPadding>
    <Hero 
      title="Financial Calculators"
      subtitle="Make informed financial decisions with our suite of easy-to-use calculators."
      backgroundImage="assets/images/pexels-leeloothefirst-8962447.jpg"
      showScrollDown={true}
    />
    <CalculatorBg>
      <CalculatorContainer>
        <CalculatorGrid>
          {calculators.map((calc, idx) => (
            <CalculatorCard as={Link} to={calc.link} key={idx}>
              <CardImage>
                <OptimizedImage src={calc.image} alt={calc.title} style={{ objectPosition: calc.imagePosition || 'center' }}/>
              </CardImage>
              <CardContent>
                <CardTitle>{calc.title}</CardTitle>
                <CardDescription>{calc.description}</CardDescription>
                <CalculatorLink as="div">
                  Try Calculator
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </CalculatorLink>
              </CardContent>
            </CalculatorCard>
          ))}
        </CalculatorGrid>
      </CalculatorContainer>
    </CalculatorBg>
  </Layout>
);

export default Calculator; 
