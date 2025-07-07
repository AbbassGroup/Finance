import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const HeroSection = styled.div`
  background: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : props.theme.colors.primary};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: ${props => props.theme.colors.textLight};
  padding: 100px ${props => props.theme.spacing.xl};
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: ${props => props.noMarginBottom ? '0' : props.theme.spacing.xl};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 120px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${props => props.theme.colors.primary}22 100%
    );
    pointer-events: none;
    z-index: 2;
  }

  @media (max-width: 768px) {
    &::after {
      height: 80px;
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.typography.fonts.headings};
  font-size: ${props => props.theme.typography.fontSizes['4xl']};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
`;

const HeroSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.xl};
  max-width: 800px;
  margin: 0 auto;
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  color: #fff;
  opacity: 0.9;
`;

const ScrollDownIndicator = styled.div`
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.85;
  pointer-events: none;

  svg {
    font-size: 2rem;
    color: #fff;
    animation: bounce 1.6s infinite;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.18));
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(12px); }
  }
`;

const Hero = ({ title, subtitle, backgroundImage, children, noMarginBottom, showScrollDown }) => {
  return (
    <HeroSection backgroundImage={backgroundImage} noMarginBottom={noMarginBottom}>
      <HeroContent>
        <HeroTitle>{title}</HeroTitle>
        {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
        {children}
      </HeroContent>
      {showScrollDown && (
        <ScrollDownIndicator>
          <FaChevronDown />
        </ScrollDownIndicator>
      )}
    </HeroSection>
  );
};

export default Hero;