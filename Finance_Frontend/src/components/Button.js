import styled, { css } from 'styled-components';

const variantStyles = {
  primary: css`
    background: #fff;
    color: ${props => props.theme.colors.primary};
    box-shadow: 0 5px 15px rgba(0,0,0,0.10);
    border: none;
    position: relative;
    overflow: hidden;
    z-index: 1;
    &:hover, &:focus {
      background: ${props => props.theme.colors.primaryDark};
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      outline: none;
    }
    &:active {
      transform: scale(0.98);
      box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    }
  `,
  secondary: css`
    background: transparent;
    color: #fff;
    border: 2px solid #fff;
    box-shadow: 0 5px 15px rgba(0,0,0,0.10);
    position: relative;
    overflow: hidden;
    z-index: 1;
    &:hover, &:focus {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border-color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      outline: none;
    }
    &:active {
      transform: scale(0.98);
      box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    }
  `,
  success: css`
    background: ${props => props.theme.colors.success};
    color: ${props => props.theme.colors.textLight};
    box-shadow: 0 5px 15px rgba(0,0,0,0.10);
    position: relative;
    overflow: hidden;
    z-index: 1;
    &:hover {
      background: ${props => props.theme.colors.success};
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    }
  `,
};

const Button = styled.button`
  padding: 1.2rem 2.5rem;
  border-radius: 12px;
  font-size: 1.2rem;
  font-family: ${props => props.theme.typography.fonts.main};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  border: none;
  min-width: 120px;
  ${props => variantStyles[props.variant || 'primary']}
`;

export default Button; 