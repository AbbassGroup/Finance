import React from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom'; // Removed unused import
import { HashLink } from 'react-router-hash-link';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { FaHome, FaBuilding, FaChartLine, FaHandshake, FaPiggyBank, FaShieldAlt, FaCheckDouble } from 'react-icons/fa';

const PageBg = styled.div`
  background: ${props => props.theme.colors.backgroundDark};
  min-height: 100vh;
`;

const CardSection = styled.section`
  min-height: 520px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 100px 0;
  background: ${({ altBg, theme }) => altBg ? theme.colors.background : theme.colors.backgroundDark};
  transition: background 0.3s;
  @media (max-width: 900px) {
    padding: 80px 0;
    min-height: auto;
  }
  @media (max-width: 480px) {
    padding: 60px 0;
    min-height: 600px;
  }
`;

const CardFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
    max-width: 98vw;
    padding: 0 30px;
  }
  @media (max-width: 480px) {
    padding: 0 20px;
    gap: 30px;
    min-height: 500px;
  }
`;

const bgImages = ['/assets/images/image2.jpg', '/assets/images/image3.jpg', '/assets/images/image4.jpg', '/assets/images/image5.jpg', '/assets/images/image6.jpg', '/assets/images/image7.jpg'];

const BlurredBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: ${({ $bg, theme }) => `linear-gradient(120deg, ${theme.colors.backgroundDark}77 40%, ${theme.colors.backgroundDark}bb 100%), url(${$bg}) center top/cover no-repeat`};
  filter: blur(1.5px);
  opacity: 1;
`;

const ServiceCard = styled.div`
  max-width: 960px;
  width: 100%;
  position: relative;
  z-index: 1;
  background: rgba(143, 153, 251, 0.18);
  border-radius: 20px;
  padding: 60px 70px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  border: 1.5px solid rgba(255,255,255,0.22);
  backdrop-filter: blur(18px);
  overflow: hidden;
  @media (max-width: 900px) {
    padding: 40px;
    width: 100%;
  }
  @media (max-width: 480px) {
    padding: 30px;
    border-radius: 15px;
    min-height: 400px;
    justify-content: flex-start;
  }
  &::before {
    display: none;
  }
`;

const ServiceTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 16px;
  letter-spacing: -0.5px;
  @media (max-width: 900px) {
    font-size: 2.2rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 12px;
  }
`;

const ServiceSubtitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textLight}cc;
  margin-bottom: 24px;
  opacity: 0.95;
  @media (max-width: 480px) {
    font-size: 1.15rem;
    margin-bottom: 16px;
  }
`;

const ServiceDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight}ee;
  margin-bottom: 32px;
  line-height: 1.7;
  opacity: 0.98;
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 24px;
    line-height: 1.6;
  }
`;

const StyledButton = styled(Button)`
  background: #fff;
  color: ${props => props.theme.colors.primary};
  border: none;
  padding: 18px 36px;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  display: inline-block;
  margin-top: 8px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
  }
  @media (max-width: 480px) {
    min-width: 160px;
    padding: 14px 20px;
    font-size: 1.1rem;
  }
`;

const services = [
  {
    title: 'Home Loans',
    subtitle: "Your Path to Home Ownership",
    description: `Comprehensive home loan solutions including First Home Buyer Loans, Owner-Occupier Loans, Low Deposit Home Loans, Family Guarantee Loans, and Construction Loans. We help you find the perfect home loan that matches your needs and financial situation.`,
    image: '/assets/images/commercialloans.jpg',
    cta: 'Explore Home Loans',
    icon: FaHome,
  },
  {
    title: 'Investment Property Loans',
    subtitle: "Maximize Your Investment Returns",
    description: `Specialized investment property financing options including Interest-Only Investment Loans, Principal & Interest Investment Loans, Equity Release for Investments, and Multiple Property Loan Structuring. Maximize your investment returns with our tailored solutions.`,
    image: '/assets/images/image3.jpg',
    cta: 'Explore Investment Loans',
    icon: FaChartLine,
  },
  {
    title: 'Refinancing Solutions',
    subtitle: "Optimize Your Existing Loans",
    description: `Expert refinancing services including Refinance for Lower Rates, Debt Consolidation Loans, Equity Release for Renovations or Investments, and flexible options for switching between Fixed and Variable rates. Let us help you optimize your existing loans.`,
    image: '/assets/images/image4.jpg',
    cta: 'Explore Refinancing',
    icon: FaCheckDouble,
  },
  {
    title: 'Commercial Property Loans',
    subtitle: "Finance Your Commercial Success",
    description: `Comprehensive commercial property financing including Owner-Occupied Commercial Loans, Investment Commercial Property Loans, SMSF Loans, and specialized finance for Warehouse, Office & Retail Properties.`,
    image: '/assets/images/image5.jpg',
    cta: 'Explore Commercial Loans',
    icon: FaBuilding,
  },
  {
    title: 'Business Loans',
    subtitle: "Fuel Your Business Growth",
    description: `Flexible business financing solutions including Unsecured Business Loans, Secured Business Loans, Invoice Financing, Business Line of Credit, and Franchise Finance. We support your business growth with tailored funding options.`,
    image: '/assets/images/image8.jpg',
    cta: 'Explore Business Loans',
    icon: FaHandshake,
  },
  {
    title: 'Vehicle & Equipment Finance',
    subtitle: "Finance Your Assets",
    description: `Complete vehicle and equipment financing solutions including Car Loans (Personal & Business Use), Commercial Vehicle Loans, Equipment & Machinery Finance, Chattel Mortgage, Hire Purchase Agreements, and Novated Leases.`,
    image: '/assets/images/image10.jpg',
    cta: 'Explore Vehicle Finance',
    icon: FaPiggyBank,
  },
  {
    title: 'SMSF Loans',
    subtitle: "Maximize Your Superannuation",
    description: `Specialized SMSF lending solutions including Residential Property SMSF Loans, Commercial Property SMSF Loans, and Refinance of Existing SMSF Loans. We help you maximize your superannuation investment potential.`,
    image: '/assets/images/image4.jpg',
    cta: 'Explore SMSF Loans',
    icon: FaShieldAlt,
  },
  {
    title: 'Construction Finance',
    subtitle: "Build Your Development Dreams",
    description: `Comprehensive construction financing including Small to Medium Scale Development Loans, Land Bank & Subdivision Finance, Construction to Completion Loans, and Joint Venture Finance Options. We support your development projects from start to finish.`,
    image: '/assets/images/commercialloans.jpg',
    cta: 'Explore Construction Finance',
    icon: FaBuilding,
  }
];

const Services = () => {
  return (
    <Layout noHeaderPadding>
      <PageBg>
      <Hero 
        title="Our Services"
        subtitle="Flexible finance solutions for commercial, investment, and personal needs. Discover how we can help you grow and secure your future."
        backgroundImage="/assets/images/serviceshero.jpg"
        noMarginBottom={true}
        showScrollDown={true}
        style={{
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '120px',
            background: `linear-gradient(to bottom, transparent 0%, ${props => props.theme.colors.primary}22 100%)`,
            pointerEvents: 'none',
            zIndex: 2
          }
        }}
      />
      {services.map((service, idx) => (
          <CardSection key={service.title} altBg={idx % 2 === 1} id={service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '-and-')}>
          <BlurredBg $bg={bgImages[idx % bgImages.length]} />
            <CardFlex>
              <ServiceCard>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceSubtitle>{service.subtitle}</ServiceSubtitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <StyledButton as={HashLink} to="/contact#contact-form" variant="primary">
                  Learn More
                </StyledButton>
              </ServiceCard>
            </CardFlex>
        </CardSection>
      ))}
      </PageBg>
    </Layout>
  );
};

export default Services; 