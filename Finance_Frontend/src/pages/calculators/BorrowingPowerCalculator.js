import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import CtaSection from '../../components/CtaSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faInfoCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';

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
  min-height: 750px;
  border: none;
  background: ${props => props.theme.colors.backgroundLight};
  filter: brightness(0.96) contrast(0.97);
  border-radius: 12px;
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

const BorrowingPowerCalculator = () => (
  <Layout noHeaderPadding>
    <CalculatorBg>
      <CalculatorContainer>
        <InfoSection>
          <InfoCard>
            <InfoIcon>
              <FontAwesomeIcon icon={faMoneyBillWave} />
            </InfoIcon>
            <InfoTitle>What is Borrowing Power?</InfoTitle>
            <InfoText>
              Your borrowing power is the maximum amount a lender is willing to loan you based on your financial situation. 
              It's determined by factors like your income, expenses, existing debts, and credit history.
            </InfoText>
          </InfoCard>
          
          <InfoCard>
            <InfoIcon>
              <FontAwesomeIcon icon={faInfoCircle} />
            </InfoIcon>
            <InfoTitle>How to Use This Calculator</InfoTitle>
            <InfoText>
              Simply input your income, expenses, and other financial details to get an estimate of how much you could borrow. 
              The calculator considers various factors to provide a realistic assessment of your borrowing capacity.
            </InfoText>
          </InfoCard>
        </InfoSection>

        <CalculatorWrapper>
          <CalculatorFrame 
            className="VisiCalcClass" 
            id="Borrowing_Power_Calculator" 
            src="//www.visionabacus.net/Tools/B3/SuiteA/A200/Borrowing_Power_Calculator/AbbassAdvocacy" 
            scrolling="no"
          />
        </CalculatorWrapper>

        <TipsSection>
          <TipsTitle>
            <FontAwesomeIcon icon={faLightbulb} />
            Tips for Maximizing Your Borrowing Power
          </TipsTitle>
          <TipsList>
            <TipItem>Reduce existing debts and credit card limits before applying for a loan</TipItem>
            <TipItem>Maintain a good credit score by paying bills on time and keeping credit card balances low</TipItem>
            <TipItem>Consider increasing your deposit to improve your loan-to-value ratio</TipItem>
            <TipItem>Keep your living expenses in check and maintain a stable employment history</TipItem>
            <TipItem>Consider applying for a loan with a longer term to reduce monthly repayments</TipItem>
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

export default BorrowingPowerCalculator; 