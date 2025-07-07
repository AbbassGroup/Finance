import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Button from './Button';

const CTASectionContainer = styled.section`
  padding: 80px 32px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primary}dd 100%);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

const CTAContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 24px;
  letter-spacing: -1px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 32px;
  }
`;

const CTAButtonGroup = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    gap: 16px;
  }
`;

const PrimaryButton = styled(Button)`
  background: #fff;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    text-decoration: none;
    color: #fff;
  }
`;

const CtaSection = ({
  title = "Ready to Start Your Financial Journey?",
  description = "Take the first step towards achieving your financial goals. Our expert team is here to guide you through every step of the process.",
  primaryBtnText = "Get Started Now",
  primaryBtnLink = "/contact",
  secondaryBtnText,
  secondaryBtnLink,
}) => {
  return (
    <CTASectionContainer>
      <CTAContainer>
        <CTATitle>{title}</CTATitle>
        <CTADescription>{description}</CTADescription>
        <CTAButtonGroup>
          {primaryBtnLink.includes('#') ? (
            <PrimaryButton as={HashLink} to={primaryBtnLink}>{primaryBtnText}</PrimaryButton>
          ) : (
            <PrimaryButton as={Link} to={primaryBtnLink}>{primaryBtnText}</PrimaryButton>
          )}
          {secondaryBtnText && secondaryBtnLink && (
            secondaryBtnLink.includes('#') ? (
              <SecondaryButton as={HashLink} to={secondaryBtnLink}>{secondaryBtnText}</SecondaryButton>
            ) : (
              <SecondaryButton as={Link} to={secondaryBtnLink}>{secondaryBtnText}</SecondaryButton>
            )
          )}
        </CTAButtonGroup>
      </CTAContainer>
    </CTASectionContainer>
  );
};

export default CtaSection; 