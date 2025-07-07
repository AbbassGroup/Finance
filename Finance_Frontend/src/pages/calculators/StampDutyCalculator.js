import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import CtaSection from '../../components/CtaSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature, faInfoCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';

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
  height: 100%;
  
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

const StampDutyCalculator = () => (
  <Layout noHeaderPadding>
    <CalculatorBg>
      <CalculatorContainer>
        <InfoSection>
          <InfoCard>
            <InfoIcon>
              <FontAwesomeIcon icon={faFileSignature} />
            </InfoIcon>
            <InfoTitle>Understanding Stamp Duty</InfoTitle>
            <InfoText>
              Stamp duty is a state government tax levied on property purchases. The amount varies based on the property value, 
              location, and type of property. Our calculator helps you estimate this important cost in your property purchase.
            </InfoText>
          </InfoCard>
          
          <InfoCard>
            <InfoIcon>
              <FontAwesomeIcon icon={faInfoCircle} />
            </InfoIcon>
            <InfoTitle>How to Use This Calculator</InfoTitle>
            <InfoText>
              Select your state or territory, enter the property value, and specify the property type. 
              The calculator will provide an estimate of the stamp duty payable, helping you budget for your purchase.
            </InfoText>
          </InfoCard>
        </InfoSection>

        <CalculatorSection>
          <CalculatorWrapper>
            <CalculatorFrame 
              className="VisiCalcClass" 
              id="Stamp_Duty_Calculator" 
              src="https://www.visionabacus.net/Tools/B3/SuiteA/A200/Stamp_Duty_Calculator/AbbassAdvocacy" 
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
            Tips for Managing Stamp Duty
          </TipsTitle>
          <TipsList>
            <TipItem>Check if you qualify for any stamp duty concessions or exemptions</TipItem>
            <TipItem>Consider the timing of your purchase as stamp duty rates may change</TipItem>
            <TipItem>Factor in stamp duty when calculating your total purchase costs</TipItem>
            <TipItem>Research first home buyer incentives in your state or territory</TipItem>
            <TipItem>Consult with a financial advisor about stamp duty implications</TipItem>
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

export default StampDutyCalculator; 