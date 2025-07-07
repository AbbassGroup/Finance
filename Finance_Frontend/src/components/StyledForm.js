import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.backgroundOffWhite};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.base};
`;

const FormTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textDark};
  text-align: center;
  font-family: ${props => props.theme.typography.fonts.headings};
  font-size: ${props => props.theme.typography.fontSizes['2xl']};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
`;

const FormField = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textGrey};
  font-family: ${props => props.theme.typography.fonts.main};
  font-size: ${props => props.theme.typography.fontSizes.sm};
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.backgroundLightBlue};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-family: ${props => props.theme.typography.fonts.main};
  transition: ${props => props.theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLight}40;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textLight};
  border: none;
  border-radius: ${props => props.theme.borderRadius.base};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-family: ${props => props.theme.typography.fonts.main};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLight}40;
  }
`;

const Form = ({ 
  title, 
  fields, 
  onSubmit, 
  submitText = 'Submit',
  className = '',
  style = {}
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <StyledForm 
      className={className}
      onSubmit={handleSubmit}
      style={style}
    >
      {title && <FormTitle>{title}</FormTitle>}
      {fields.map((field, index) => (
        <FormField key={index}>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            type={field.type || 'text'}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            {...field.props}
          />
        </FormField>
      ))}
      <SubmitButton type="submit">
        {submitText}
      </SubmitButton>
    </StyledForm>
  );
};

export default Form; 