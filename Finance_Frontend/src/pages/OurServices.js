import React from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom'; // Removed unused import
import { HashLink } from 'react-router-hash-link';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Button from '../components/Button';

// Import images for services
// homeLoansImg, investmentPropertyLoansImg, refinancingSolutionsImg, commercialPropertyLoansImg, businessLoansImg, vehicleEquipmentFinanceImg, smsfLoansImg, constructionFinanceImg

const servicesData = [
  {
    title: 'Home Loans',
    subtitle: 'Your Path to Home Ownership',
    description: 'Comprehensive home loan solutions including First Home Buyer Loans, Owner-Occupier Loans, Low Deposit Home Loans, Family Guarantee Loans, and Construction Loans. We help you find the perfect home loan that matches your needs and financial situation.',
    image: 'assets/images/ourservices/home_loans.png',
  },
  {
    title: 'Investment Property Loans',
    subtitle: 'Maximize Your Investment Returns',
    description: 'Specialized investment property financing options including Interest-Only Investment Loans, Principal & Interest Investment Loans, Equity Release for Investments, and Multiple Property Loan Structuring. Maximize your investment returns with our tailored solutions.',
    image: 'assets/images/ourservices/investment_property_loans.png',
  },
  {
    title: 'Refinancing Solutions',
    subtitle: 'Optimize Your Existing Loans',
    description: 'Expert refinancing services including Refinance for Lower Rates, Debt Consolidation Loans, Equity Release for Renovations or Investments, and flexible options for switching between Fixed and Variable rates. Let us help you optimize your existing loans.',
    image: 'assets/images/ourservices/refinanceing_solution.png',
  },
  {
    title: 'Commercial Property Loans',
    subtitle: 'Finance Your Commercial Success',
    description: 'Comprehensive commercial property financing including Owner-Occupied Commercial Loans, Investment Commercial Property Loans, SMSF Loans, and specialized finance for Warehouse, Office & Retail Properties.',
    image: 'assets/images/ourservices/commercial_property_loans.png',
  },
  {
    title: 'Business Loans',
    subtitle: 'Fuel Your Business Growth',
    description: 'Flexible business financing solutions including Unsecured Business Loans, Secured Business Loans, Invoice Financing, Business Line of Credit, and Franchise Finance. We support your business growth with tailored funding options.',
    image: 'assets/images/ourservices/business_loans.png',
  },
  {
    title: 'Vehicle & Equipment Finance',
    subtitle: 'Finance Your Assets',
    description: 'Complete vehicle and equipment financing solutions including Car Loans (Personal & Business Use), Commercial Vehicle Loans, Equipment & Machinery Finance, Chattel Mortgage, Hire Purchase Agreements, and Novated Leases.',
    image: 'assets/images/ourservices/vehicle&equipment_finance.png',
  },
  {
    title: 'SMSF Loans',
    subtitle: 'Maximize Your Superannuation',
    description: 'Specialized SMSF lending solutions including Residential Property SMSF Loans, Commercial Property SMSF Loans, and Refinance of Existing SMSF Loans. We help you maximize your superannuation investment potential.',
    image: 'assets/images/ourservices/SMSF_loans.png',
  },
  {
    title: 'Construction Finance',
    subtitle: 'Build Your Development Dreams',
    description: 'Comprehensive construction financing including Small to Medium Scale Development Loans, Land Bank & Subdivision Finance, Construction to Completion Loans, and Joint Venture Finance Options. We support your development projects from start to finish.',
    image: 'assets/images/ourservices/construction_finance.png',
  },
];

const PageContainer = styled.div`
  background: ${props => props.theme.colors.background};
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  background-color: ${({ index, theme }) => index % 2 === 0 ? theme.colors.background : theme.colors.backgroundLight};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  max-width: 1200px;
  width: 100%;
  gap: 50px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 500px;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const TextContainer = styled.div`
  flex: 1;
  color: ${props => props.theme.colors.textLight};

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 20px;
    color: ${props => props.theme.colors.primary};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 30px;
  }
`;

const StyledButton = styled(Button)`
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: bold;
`;

const OurServices = () => {
  return (
    <Layout noHeaderPadding>
      <PageContainer>
        <Hero
          title="Our Services"
          subtitle="Tailored financial solutions to meet your unique needs."
          backgroundImage="assets/images/serviceshero.jpg"
        />
        {servicesData.map((service, index) => (
          <Section key={index} index={index}>
            <ContentWrapper reverse={index % 2 !== 0}>
              <ImageContainer>
                <img src={service.image} alt={service.title} />
              </ImageContainer>
              <TextContainer>
                <h2>{service.title}</h2>
                <h3>{service.subtitle}</h3>
                <p>{service.description}</p>
                <StyledButton as={HashLink} to="/contact#contact-form">
                  Explore {service.title}
                </StyledButton>
              </TextContainer>
            </ContentWrapper>
          </Section>
        ))}
      </PageContainer>
    </Layout>
  );
};

export default OurServices; 
