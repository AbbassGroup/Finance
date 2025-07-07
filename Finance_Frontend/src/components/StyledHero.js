import React from 'react';
import styled, { css } from 'styled-components';

const HeroSection = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.md};
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  ${props => props.fullBleed && css`
    width: 100vw;
    max-width: 100vw;
    margin: 0 calc(-50vw + 50%);
    padding: 0;
    border-radius: 0;
  `}
`;

const HeroContent = styled.div`
  position: relative;
  z-index: ${props => props.theme.zIndices.base};
  color: ${props => props.theme.colors.textLight};
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSizes['4xl']};
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  font-family: ${props => props.theme.typography.fonts.headings};
`;

const HeroSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSizes['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  opacity: 0.9;
  font-family: ${props => props.theme.typography.fonts.main};
`;

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  className = '',
  style = {},
  children,
  fullBleed = false
}) => {
  return (
    <HeroSection 
      className={className}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        ...style
      }}
      fullBleed={fullBleed}
    >
      <HeroContent>
        {title && <HeroTitle>{title}</HeroTitle>}
        {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
        {children}
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 