import React from 'react';
import styled from 'styled-components';
import Hero from '../components/StyledHero';
import Form from '../components/StyledForm';
import Card from '../components/StyledCard';
import Button from '../components/Button';

const ContentSection = styled.div`
  padding: 40px 20px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const ExamplePage = () => {
  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  const formFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true
    }
  ];

  return (
    <>
      {/* Hero Section - sits directly under navbar */}
      <Hero
        title="Welcome to Our Website"
        subtitle="Discover amazing features and services"
        backgroundImage="/path-to-your-image.jpg"
        fullBleed
      >
        <Button variant="primary">Get Started</Button>
      </Hero>
      <ContentSection>
        <CardsContainer>
          {/* Card with Form */}
          <Card title="Sign In" hoverable>
            <Form
              fields={formFields}
              onSubmit={handleFormSubmit}
              submitText={<Button type="submit" variant="primary" style={{ width: '100%' }}>Sign In</Button>}
            />
          </Card>
          {/* Card with Content */}
          <Card title="Features" hoverable>
            <FeatureList>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </FeatureList>
          </Card>
          {/* Card with Custom Content */}
          <Card title="Contact Us" hoverable>
            <p>Get in touch with our team for any questions or support.</p>
            <Button variant="success">Contact Support</Button>
          </Card>
        </CardsContainer>
      </ContentSection>
    </>
  );
};

export default ExamplePage; 