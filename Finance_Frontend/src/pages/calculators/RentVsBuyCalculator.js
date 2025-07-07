import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import CtaSection from '../../components/CtaSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const CalculatorBg = styled.div`
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
  padding: ${props => props.theme.spacing['3xl']} 0;
  margin-top: 90px;
`;

const CalculatorContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const CalculatorWrapper = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.primary}22;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const CalculatorFrame = styled.iframe`
  width: 100%;
  min-height: 1000px;
  border: none;
  background: ${props => props.theme.colors.backgroundLight};
  filter: brightness(0.96) contrast(0.97);
  border-radius: 12px;
  display: block;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const InfoCard = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  border: 1px solid ${props => props.theme.colors.primary}22;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary}44;
  }
`;

const InfoIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const InfoTitle = styled.h3`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSizes['2xl']};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.textLight}99;
  font-size: ${props => props.theme.typography.fontSizes.lg};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
`;

const TipsSection = styled.div`
  background: ${props => props.theme.colors.primary}11;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  border: 1px solid ${props => props.theme.colors.primary}22;
`;

const TipsTitle = styled.h2`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSizes['3xl']};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

const TipItem = styled.li`
  color: ${props => props.theme.colors.textLight}99;
  font-size: ${props => props.theme.typography.fontSizes.lg};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  padding-left: ${props => props.theme.spacing.xl};
  position: relative;
  
  &::before {
    content: ".";
    color: ${props => props.theme.colors.primary};
    position: absolute;
    left: 0;
    font-size: 1.5em;
  }
`;

const RentVsBuyCalculator = () => (
  <Layout noHeaderPadding>
    <CalculatorBg>
      <CalculatorContainer>
        <InfoSection>
          <InfoCard>
            <InfoIcon>
              <FontAwesomeIcon icon={faHome} />
            </InfoIcon>
            <InfoTitle>Renting vs Buying: Making the Right Choice</InfoTitle>
            <InfoText>
              The decision to rent or buy depends on various factors including your financial situation, 
              lifestyle preferences, and long-term goals. Our calculator helps you compare the costs and 
              benefits of both options to make an informed decision.
            </InfoText>
          </InfoCard>
          
          <InfoCard>
            <InfoIcon>
              <FontAwesomeIcon icon={faInfoCircle} />
            </InfoIcon>
            <InfoTitle>How to Use This Calculator</InfoTitle>
            <InfoText>
              Enter details about your potential property purchase and current rental situation. 
              The calculator will compare the costs of both options over time, including mortgage payments, 
              rent, maintenance, and other associated costs.
            </InfoText>
          </InfoCard>
        </InfoSection>

        <CalculatorWrapper>
          <CalculatorFrame 
            className="VisiCalcClass" 
            id="Rent_vs_Buy_Calculator" 
            src="https://www.visionabacus.net/Tools/B3/SuiteA/G300/Rent_vs_Buy_Calculator/AbbassAdvocacy" 
            scrolling="no"
            title="Rent vs Buy Calculator"
          />
        </CalculatorWrapper>

        <TipsSection>
          <TipsTitle>
            <FontAwesomeIcon icon={faLightbulb} />
            Tips for Making Your Decision
          </TipsTitle>
          <TipsList>
            <TipItem>Consider your long-term financial goals and stability</TipItem>
            <TipItem>Factor in all costs including maintenance, insurance, and rates</TipItem>
            <TipItem>Think about your lifestyle and how long you plan to stay in the area</TipItem>
            <TipItem>Consider the flexibility of renting versus the stability of owning</TipItem>
            <TipItem>Research property market trends in your desired location</TipItem>
          </TipsList>
        </TipsSection>
      </CalculatorContainer>
    </CalculatorBg>
    <CtaSection 
      title="Need Help with Your Calculations?"
      description="Our experts are here to help you understand your results and guide you through your financial journey."
      primaryBtnText="Talk to an Expert"
      primaryBtnLink="/contact#contact-form"
    />
  </Layout>
);

export default RentVsBuyCalculator; 