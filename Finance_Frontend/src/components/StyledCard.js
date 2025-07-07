import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: ${props => props.theme.colors.backgroundOffWhite};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.base};
  overflow: hidden;
  transition: ${props => props.theme.transitions.default};

  ${props => props.hoverable && `
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${props.theme.shadows.lg};
    }
  `}
`;

const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.backgroundLightBlue};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSizes.xl};
  color: ${props => props.theme.colors.textDark};
  font-family: ${props => props.theme.typography.fonts.headings};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
`;

const CardBody = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const Card = ({
  title,
  children,
  className = '',
  style = {},
  onClick,
  hoverable = false
}) => {
  return (
    <CardContainer 
      className={className}
      style={style}
      onClick={onClick}
      hoverable={hoverable}
    >
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardBody>
        {children}
      </CardBody>
    </CardContainer>
  );
};

export default Card; 