import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// const floatAnimation = keyframes`
//   0% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0); }
// `;

const shineAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(
    45deg,
    ${props => props.theme.colors.textDark} 0%,
    #1a1a1a 50%,
    ${props => props.theme.colors.textDark} 100%
  );
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: ${props => props.theme.colors.textLight};
  padding: ${props => props.fullBleed ? '0' : `${props.theme.spacing.xl} 0`};
  width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.primary}50,
      transparent
    );
    opacity: 0.7;
  }
`;

const FooterContent = styled.div`
  max-width: ${props => props.fullBleed ? '100vw' : '1200px'};
  margin: 0 auto;
  padding: 0 ${props => props.fullBleed ? '0' : props.theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: ${props => props.theme.spacing.xl};
  box-sizing: border-box;
  width: 100%;
  position: relative;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  align-items: flex-start;
  text-align: left;
  position: relative;
  padding: ${props => props.theme.spacing.lg};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-right: 0;
    margin-bottom: ${props => props.theme.spacing.lg};
    padding-bottom: ${props => props.theme.spacing.lg};
    align-items: center;
    text-align: center;
  }
`;

const BrandColumn = styled(FooterColumn)`
  grid-column: 1;
  padding-right: ${props => props.theme.spacing.xl};
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  margin-right: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-right: 0;
    margin-bottom: ${props => props.theme.spacing.lg};
    padding-bottom: ${props => props.theme.spacing.lg};
    align-items: center;
    text-align: center;
  }
`;

const FooterLogo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: ${props => props.theme.spacing.sm};
  max-width: 100%;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.1));

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: 180px;
  }
`;

const FooterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
  position: relative;
  padding-bottom: ${props => props.theme.spacing.xs};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 1px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.primary},
      transparent
    );
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after {
    width: 100%;
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: ${props => props.theme.typography.fontSizes.xs};
  padding: ${props => props.theme.spacing.xs} 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  &::before {
    content: '>';
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.primary},
      transparent
    );
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(8px);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);

    &::before {
      opacity: 1;
      transform: translateX(0);
    }

    &::after {
      width: 100%;
    }
  }
`;

const FooterText = styled.p`
  margin: 0;
  line-height: 1.6;
  font-size: ${props => props.theme.typography.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
  text-align: left;
  opacity: 0.9;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 1;
    transform: translateX(4px);
  }
`;

const BrandDescription = styled(FooterText)`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  line-height: 1.6;
  margin-top: ${props => props.theme.spacing.md};
  max-width: 300px;
  color: rgba(255, 255, 255, 0.8);
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }

  i {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.typography.fontSizes.base};
  }
`;

const SocialLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
  width: 100%;

  a {
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.typography.fontSizes.base};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 36px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    text-decoration: none;
    outline: none;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.primaryDark}
      );
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 0;
    }

    i {
      position: relative;
      z-index: 1;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &:hover {
      color: ${props => props.theme.colors.textLight};
      border-color: ${props => props.theme.colors.primary};
      transform: translateY(-3px);
      box-shadow: 
        0 10px 20px rgba(0, 0, 0, 0.3),
        0 0 10px rgba(255, 255, 255, 0.1);

      &::before {
        opacity: 1;
      }

      i {
        transform: scale(1.2) rotate(360deg);
      }
    }

    &:active {
      transform: translateY(-1px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${props => props.theme.spacing.lg};
  padding-right: ${props => props.theme.spacing.lg};
  box-sizing: border-box;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${props => props.theme.colors.primary},
      transparent
    );
  }
`;

const CopyrightText = styled(FooterText)`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSizes.xs};
  opacity: 0.7;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.textLight},
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.textLight}
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shineAnimation} 8s linear infinite;
`;

const Footer = ({ fullBleed = false }) => {
  return (
    <FooterContainer fullBleed={fullBleed}>
      <FooterContent fullBleed={fullBleed}>
        <BrandColumn>
          <FooterLogo src="assets/images/logo1-removebg-preview.png" alt="ABBASS Finance" />
          <BrandDescription>
            Your trusted partner in financial solutions, helping you achieve your dreams through innovative and personalized services.
          </BrandDescription>
          <SocialLinks>
            <a 
              href="https://www.linkedin.com/company/abbassfinance" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              title="Follow us on LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a 
              href="https://www.instagram.com/abbassfinance" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              title="Follow us on Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </SocialLinks>
        </BrandColumn>

        <FooterColumn>
          <FooterTitle>Contact Us</FooterTitle>
          <ContactInfo>
            <ContactItem>
              <i className="fas fa-map-marker-alt"></i>
              <FooterText>102 / 24 Albert Road, South Melbourne, VIC 3205</FooterText>
            </ContactItem>
            <ContactItem>
              <i className="fas fa-envelope"></i>
              <FooterText>info@abbass.group</FooterText>
            </ContactItem>
            <ContactItem>
              <i className="fas fa-phone"></i>
              <FooterText>(03) 9103 1317</FooterText>
            </ContactItem>
          </ContactInfo>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/calculators">Calculators</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Calculators</FooterTitle>
          <FooterLink to="/calculators/borrowing-power">Borrowing Power</FooterLink>
          <FooterLink to="/calculators/stamp-duty">Stamp Duty</FooterLink>
          <FooterLink to="/calculators/loan-repayment">Loan Repayment</FooterLink>
          <FooterLink to="/calculators/rent-vs-buy">Rent vs Buy</FooterLink>
        </FooterColumn>
      </FooterContent>

      <Copyright>
        <CopyrightText>© 2025 ABBASS Finance. All rights reserved</CopyrightText>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 
