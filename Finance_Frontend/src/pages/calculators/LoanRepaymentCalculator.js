import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import CtaSection from '../../components/CtaSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faInfoCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const CalculatorBg = styled.div`
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
  padding: ${props => props.theme.spacing['3xl']} 0;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing['3xl']};
`;

const CalculatorContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing['3xl']};
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const CalculatorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${props => props.theme.spacing['2xl']} 0;
`;

const CalculatorWrapper = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.primary}22;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}11 0%, transparent 100%);
    pointer-events: none;
  }
`;

const CalculatorFrame = styled.iframe`
  width: 100%;
  min-height: 1000px;
  border: none;
  background: ${props => props.theme.colors.backgroundLight};
  display: block;
  filter: brightness(0.96) contrast(0.97);
  border-radius: 12px;
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
  border: 1px solid ${props => props.theme.colors.primary}22;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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

const LoanRepaymentCalculator = () => (
  <Layout noHeaderPadding>
    <CalculatorBg>
      <CalculatorContainer>
        <InfoSection>
          <InfoCard>
            <InfoIcon>
              <FontAwesomeIcon icon={faCalculator} />
            </InfoIcon>
            <InfoTitle>Understanding Loan Repayments</InfoTitle>
            <InfoText>
              Loan repayments consist of both principal and interest components. The principal is the amount you borrowed, 
              while interest is the cost of borrowing. Our calculator helps you understand how these components work together 
              over the life of your loan.
            </InfoText>
          </InfoCard>
          
          <InfoCard>
            <InfoIcon>
              <FontAwesomeIcon icon={faInfoCircle} />
            </InfoIcon>
            <InfoTitle>How to Use This Calculator</InfoTitle>
            <InfoText>
              Enter your loan amount, interest rate, and loan term to calculate your monthly repayments. 
              The calculator will show you a detailed breakdown of your payments, including the total interest 
              you'll pay over the life of the loan.
            </InfoText>
          </InfoCard>
        </InfoSection>

        <CalculatorSection>
          <CalculatorWrapper>
            <CalculatorFrame 
              className="VisiCalcClass" 
              id="Loan_Repayment_Calculator" 
              src="https://www.visionabacus.net/Tools/B3/SuiteA/G100/Loan_Repayment_Calculator/AbbassAdvocacy" 
              scrolling="no"
              onError={(e) => {
                console.error('Calculator failed to load:', e);
              }}
              onLoad={(e) => {
                console.log('Calculator loaded successfully');
              }}
            />
          </CalculatorWrapper>
        </CalculatorSection>

        <TipsSection>
          <TipsTitle>
            <FontAwesomeIcon icon={faLightbulb} />
            Tips for Managing Loan Repayments
          </TipsTitle>
          <TipsList>
            <TipItem>Consider making extra repayments to reduce the total interest paid</TipItem>
            <TipItem>Review your loan regularly to ensure it still meets your needs</TipItem>
            <TipItem>Set up automatic payments to avoid missing repayments</TipItem>
            <TipItem>Consider an offset account to reduce interest charges</TipItem>
            <TipItem>Compare different loan terms to find the best balance between monthly payments and total cost</TipItem>
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

export default LoanRepaymentCalculator; 