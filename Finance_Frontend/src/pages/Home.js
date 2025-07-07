import styled from 'styled-components';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { 
  FaHome, FaBuilding, FaChartLine, FaHandshake, FaPiggyBank, FaShieldAlt,
  FaRocket, FaUserFriends, FaLightbulb, FaPhone, FaSearch, FaCheckCircle, 
  FaFileAlt, FaCheckDouble, FaHeadset, FaChevronDown, FaChevronLeft, FaChevronRight, FaCheck
} from 'react-icons/fa';
import React, { useRef, useEffect, useState } from 'react';
import { keyframes } from 'styled-components';
import { submitHomeForm } from '../services/api';

// --- Hero Section Revamp ---
const HeroSection = styled.section`
  min-height: 70vh;
  width: 100%;
  background: linear-gradient(120deg, rgba(20,20,30,0.82) 0%, rgba(20,20,30,0.62) 100%), url('assets/images/homepage-hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  position: relative;
  overflow: hidden;
  
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
      ${props => props.theme.colors.backgroundDark} 100%
    );
    pointer-events: none;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    padding: 100px 16px 60px;
    min-height: auto;
    background-attachment: scroll;
    &::after {
      height: 80px;
    }
  }
`;

const HeroGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  gap: 80px;
  position: relative;
  z-index: 2;
  margin: 0 auto;
  min-height: 520px;
  padding: 32px 0;

  @media (max-width: 1100px) {
    gap: 40px;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
    padding: 32px 0 0 0;
    min-height: unset;
    align-items: stretch;
  }
  @media (max-width: 480px) {
    gap: 24px;
    padding: 24px 0 0 0;
  }
`;

const HeroLeft = styled.div`
  flex: 1 1 0;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  min-width: 0;
  padding: 32px 0;
  height: 100%;
  margin-top: 0;
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
    padding: 0 10px 24px 10px;
  }
  @media (max-width: 480px) {
    padding: 0 8px 20px 8px;
  }
`;

const HeroHeading = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  color: #fff;
  letter-spacing: -2px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.10);
  @media (max-width: 768px) {
    font-size: 2.1rem;
    margin-bottom: 16px;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
`;

const HeroSubheading = styled.p`
  font-size: 1.25rem;
  color: #e0e6ed;
  margin-bottom: 32px;
  max-width: 500px;
  line-height: 1.6;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 1.05rem;
    margin-bottom: 20px;
    max-width: 100%;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 16px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 18px;
  margin-bottom: 0;
  margin-top: 8px;
  
  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    gap: 12px;
  }
  @media (max-width: 480px) {
    max-width: 100%;
    gap: 10px;
  }
`;

const ButtonLink = styled(Button)`
  text-decoration: none;
`;

const GlassFormWrapper = styled.div`
  flex: 1 1 0;
  max-width: 420px;
  width: 100%;
  background: rgba(40, 40, 60, 0.22);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.22), 0 2px 8px rgba(0,0,0,0.10);
  backdrop-filter: blur(18px);
  border: 1.5px solid rgba(255,255,255,0.18);
  padding: 2rem 2.2rem 1.5rem 2.2rem;
  margin: 0 auto;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  @media (max-width: 900px) {
    max-width: 100%;
    padding: 1.2rem 1.2rem 1.2rem 1.2rem;
    margin: 0 10px;
    border-radius: 14px;
    min-height: unset;
  }
  @media (max-width: 480px) {
    padding: 1rem 0.5rem 1rem 0.5rem;
    margin: 0 6px;
    border-radius: 10px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.55rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.2rem;
  text-align: center;
  position: relative;
  z-index: 1;
  line-height: 1.3;
  width: 100%;
  @media (max-width: 900px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.7rem;
`;

const FormField = styled.div`
  width: 100%;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
`;

const FormLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 0.28rem;
  font-size: 0.98rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  @media (max-width: 480px) {
    font-size: 0.93rem;
    margin-bottom: 0.22rem;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.85rem;
  background: rgba(255, 255, 255, 0.13);
  border: 1px solid ${props => {
    if (props.hasError) return 'rgba(255, 100, 100, 0.6)';
    if (props.isValid && props.touched) return 'rgba(100, 255, 100, 0.4)';
    return 'rgba(255, 255, 255, 0.18)';
  }};
  border-radius: 9px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  @media (max-width: 480px) {
    padding: 0.7rem;
    font-size: 0.93rem;
    border-radius: 8px;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.48);
  }
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.18);
    border-color: ${props => {
      if (props.hasError) return 'rgba(255, 100, 100, 0.8)';
      if (props.isValid && props.touched) return 'rgba(100, 255, 100, 0.6)';
      return 'rgba(255, 255, 255, 0.32)';
    }};
    box-shadow: 0 0 0 3px ${props => {
      if (props.hasError) return 'rgba(255, 100, 100, 0.13)';
      if (props.isValid && props.touched) return 'rgba(100, 255, 100, 0.13)';
      return 'rgba(96, 119, 204, 0.13)';
    }};
  }
`;

const FormError = styled.p`
  color: rgba(255, 100, 100, 0.9);
  font-size: 0.85rem;
  margin: 0.3rem 0 0 0;
  padding-left: 0.5rem;
  transition: all 0.3s ease;
  animation: slideDown 0.3s ease;
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FormSuccess = styled.p`
  color: rgba(100, 255, 100, 0.9);
  font-size: 0.85rem;
  margin: 0.3rem 0 0 0;
  padding-left: 0.5rem;
  transition: all 0.3s ease;
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const FormSubmitButton = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border: 1px solid transparent;
  border-radius: 9px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.7rem;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.10);
  box-sizing: border-box;
  @media (max-width: 480px) {
    padding: 0.7rem;
    font-size: 0.98rem;
    border-radius: 8px;
  }
`;

const formFields = [
  { name: 'firstName', label: 'First Name', placeholder: 'First Name', required: true },
  { name: 'lastName', label: 'Last Name', placeholder: 'Last Name', required: true },
  { name: 'phone', label: 'Phone Number', placeholder: '+61 400 000 000', required: true },
  { name: 'email', label: 'Your Email', placeholder: 'Your Email', type: 'email', required: true },
];

// Validation functions
const validateField = (name, value) => {
  switch (name) {
    case 'firstName':
    case 'lastName':
      if (!value.trim()) {
        return 'This field is required';
      }
      if (value.trim().length < 2) {
        return 'Must be at least 2 characters long';
      }
      if (value.trim().length > 50) {
        return 'Must be less than 50 characters';
      }
      if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
        return 'Only letters, spaces, hyphens, and apostrophes are allowed';
      }
      return '';
    
    case 'phone':
      if (!value.trim()) {
        return 'Phone number is required';
      }
      // Remove all non-digit characters for validation
      const phoneDigits = value.replace(/\D/g, '');
      // Accepts: 04XXXXXXXX, 614XXXXXXXX, 02XXXXXXXX, 03XXXXXXXX, 07XXXXXXXX, 08XXXXXXXX
      const isMobile = /^04\d{8}$/.test(phoneDigits) || /^614\d{8}$/.test(phoneDigits) || /^4\d{8}$/.test(phoneDigits);
      const isLandline = /^02\d{8}$/.test(phoneDigits) || /^03\d{8}$/.test(phoneDigits) || /^07\d{8}$/.test(phoneDigits) || /^08\d{8}$/.test(phoneDigits) || /^612\d{8}$/.test(phoneDigits) || /^613\d{8}$/.test(phoneDigits) || /^617\d{8}$/.test(phoneDigits) || /^618\d{8}$/.test(phoneDigits);
      if (!isMobile && !isLandline) {
        return 'Please enter a valid Australian phone number';
      }
      return '';
    
    case 'email':
      if (!value.trim()) {
        return 'Email is required';
      }
      if (value.trim().length > 100) {
        return 'Email is too long';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Please enter a valid email address';
      }
      // Additional email validation
      const emailParts = value.trim().split('@');
      if (emailParts[0].length > 64 || emailParts[1].length > 255) {
        return 'Email address is invalid';
      }
      return '';
    
    default:
      return '';
  }
};

// Format phone number as user types
const formatPhoneNumber = (value) => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // If it starts with 0, convert to +61 format
  if (digits.startsWith('0') && digits.length >= 9) {
    const remainingDigits = digits.substring(1);
    return `+61 ${remainingDigits.substring(0, 3)} ${remainingDigits.substring(3, 6)} ${remainingDigits.substring(6)}`;
  }
  
  // If it starts with 61, add + and format
  if (digits.startsWith('61') && digits.length >= 10) {
    const remainingDigits = digits.substring(2);
    return `+61 ${remainingDigits.substring(0, 3)} ${remainingDigits.substring(3, 6)} ${remainingDigits.substring(6)}`;
  }
  
  // If it's already in +61 format, just format the spacing
  if (value.startsWith('+61') && digits.length >= 10) {
    const remainingDigits = digits.substring(2);
    return `+61 ${remainingDigits.substring(0, 3)} ${remainingDigits.substring(3, 6)} ${remainingDigits.substring(6)}`;
  }
  
  return value;
};

const Home = () => {
  const [activeFAQ, setActiveFAQ] = React.useState(null);
  const timelineWrapperRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  
  // Form validation state
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const handleFieldChange = (fieldName, value) => {
    let processedValue = value;
    
    // Format phone number as user types
    if (fieldName === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    const error = validateField(fieldName, processedValue);
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    // Update the input value for phone formatting
    if (fieldName === 'phone' && processedValue !== value) {
      const event = new Event('input', { bubbles: true });
      const input = document.querySelector(`input[name="${fieldName}"]`);
      if (input) {
        input.value = processedValue;
        input.dispatchEvent(event);
      }
    }
  };

  const handleFieldBlur = (fieldName, value) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
    const error = validateField(fieldName, value);
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const validateForm = (formData) => {
    const errors = {};
    let isValid = true;

    formFields.forEach(field => {
      const error = validateField(field.name, formData[field.name]);
      if (error) {
        errors[field.name] = error;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const isFieldValid = (fieldName) => {
    return touchedFields[fieldName] && !formErrors[fieldName] && formErrors[fieldName] !== undefined;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };

    // Validate all fields
    if (!validateForm(formData)) {
      setLoading(false);
      // Mark all fields as touched to show errors
      const allTouched = {};
      formFields.forEach(field => {
        allTouched[field.name] = true;
      });
      setTouchedFields(allTouched);
      return;
    }

    try {
      const res = await submitHomeForm(formData);
      if (res.success) {
        setSuccess(res.message);
        e.target.reset();
        setFormErrors({});
        setTouchedFields({});
      } else {
        setError(res.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const ServicesSection = styled.section`
    padding: 120px 32px;
    background: ${props => props.theme.colors.background};
    position: relative;
    
    @media (max-width: 768px) {
      padding: 80px 20px;
    }
    @media (max-width: 480px) {
      padding: 60px 16px;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, ${props => props.theme.colors.primary}33, transparent);
    }
  `;

  const ServicesContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
  `;

  const ServicesHeader = styled.div`
    text-align: center;
    margin-bottom: 64px;
  `;

  const ServicesTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 16px;
    letter-spacing: -1px;
  `;

  const ServicesSubtitle = styled.p`
    font-size: 1.2rem;
    color: ${props => props.theme.colors.textLight}99;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  `;

  const ServicesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 48px;
    align-items: stretch;
    margin-top: 48px;
    
    @media (max-width: 768px) {
      gap: 32px;
      margin-top: 32px;
    }
    @media (max-width: 480px) {
      gap: 24px;
      margin-top: 24px;
    }
  `;

  const ServiceCard = styled(HashLink)`
    background: ${props => props.theme.colors.backgroundLight};
    border-radius: 24px;
    padding: 40px;
    transition: all 0.3s ease;
    border: 1px solid ${props => props.theme.colors.primary}22;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    @media (max-width: 768px) {
      padding: 32px 24px;
    }
    @media (max-width: 480px) {
      padding: 24px 20px;
      border-radius: 20px;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${props => props.theme.colors.primary}11 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      border-color: ${props => props.theme.colors.primary}44;
      text-decoration: none;
      color: inherit;
      &::before {
        opacity: 1;
      }
      .service-icon {
        transform: scale(1.1);
        color: ${props => props.theme.colors.primary};
      }
    }
  `;

  const ServiceIcon = styled.div`
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 24px;
    transition: all 0.3s ease;
  `;

  const ServiceTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 16px;
  `;

  const ServiceDescription = styled.p`
    color: ${props => props.theme.colors.textLight}99;
    line-height: 1.6;
    margin-bottom: 24px;
  `;

  const ServiceCardLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    margin-top: auto;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
    
    svg {
      width: 16px;
      height: 16px;
      margin-left: 8px;
      transition: transform 0.3s ease;
    }
    
    &:hover svg {
      transform: translateX(4px);
    }
  `;

  const services = [
    {
      icon: <FaHome />,
      title: "Home Loans",
      description: "Expert guidance through the mortgage process, finding the best rates and terms tailored to your needs.",
      link: "/services#home-loans"
    },
    {
      icon: <FaBuilding />,
      title: "Commercial Property Loans",
      description: "Strategic financing solutions for businesses of all sizes, from startups to established enterprises.",
      link: "/services#commercial-property-loans"
    },
    {
      icon: <FaChartLine />,
      title: "Investment Property Loans",
      description: "Personalized investment strategies to help you achieve your long-term financial goals.",
      link: "/services#investment-property-loans"
    },
    {
      icon: <FaHandshake />,
      title: "Business Loans",
      description: "Comprehensive financial solutions to support your business growth and development.",
      link: "/services#business-loans"
    },
    {
      icon: <FaPiggyBank />,
      title: "Vehicle & Equipment Finance",
      description: "Flexible personal loan options with competitive rates and terms to meet your needs.",
      link: "/services#vehicle-and-equipment-finance"
    },
    {
      icon: <FaShieldAlt />,
      title: "SMSF Loans",
      description: "Protect your assets and future with our comprehensive insurance coverage options.",
      link: "/services#smsf-loans"
    }
  ];

  const WhyChooseUsSection = styled.section`
    padding: 120px 32px;
    background: ${props => props.theme.colors.backgroundDark};
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
      padding: 80px 20px;
    }
    @media (max-width: 480px) {
      padding: 60px 16px;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, ${props => props.theme.colors.primary}33, transparent);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -10%;
      width: 40%;
      height: 40%;
      background: ${props => props.theme.colors.primary}11;
      border-radius: 50%;
      filter: blur(100px);
      z-index: 0;
    }
  `;

  const WhyChooseUsContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  `;

  const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: 80px;
  `;

  const SectionTitle = styled.h2`
    font-size: 3rem;
    font-weight: 700;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 24px;
    letter-spacing: -1px;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: ${props => props.theme.colors.primary};
      border-radius: 2px;
    }
  `;

  const SectionSubtitle = styled.p`
    font-size: 1.3rem;
    color: ${props => props.theme.colors.textLight}99;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  `;

  const MainContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    @media (max-width: 480px) {
      gap: 32px;
    }
  `;

  const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
  `;

  const RightContent = styled.div`
    position: relative;
  `;

  const FeatureCard = styled.div`
    background: ${props => props.theme.colors.backgroundLight};
    border-radius: 24px;
    padding: 32px;
    border: 1px solid ${props => props.theme.colors.primary}22;
    transition: all 0.3s ease;
    display: flex;
    gap: 24px;
    align-items: flex-start;
    
    @media (max-width: 480px) {
      padding: 24px;
      gap: 20px;
      border-radius: 20px;
    }
    
    &:hover {
      transform: translateX(8px);
      border-color: ${props => props.theme.colors.primary}44;
      background: linear-gradient(135deg, ${props => props.theme.colors.primary}11 0%, transparent 100%);
    }
  `;

  const FeatureIcon = styled.div`
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.colors.primary}11;
    border-radius: 12px;
    transition: all 0.3s ease;
    
    ${FeatureCard}:hover & {
      transform: scale(1.1);
      background: ${props => props.theme.colors.primary}22;
    }
  `;

  const FeatureContent = styled.div`
    flex: 1;
  `;

  const FeatureTitle = styled.h3`
    font-size: 1.3rem;
    font-weight: 600;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 8px;
  `;

  const FeatureDescription = styled.p`
    color: ${props => props.theme.colors.textLight}99;
    line-height: 1.6;
    font-size: 1.1rem;
  `;

  const HighlightBox = styled.div`
    background: ${props => props.theme.colors.backgroundLight};
    border-radius: 24px;
    padding: 48px;
    border: 1px solid ${props => props.theme.colors.primary}22;
    position: relative;
    overflow: visible;
    
    @media (max-width: 480px) {
      padding: 32px 24px;
      border-radius: 20px;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${props => props.theme.colors.primary}11 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 1;
    }
    
    &:hover::before {
      opacity: 1;
    }
  `;

  const HighlightTitle = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 24px;
    line-height: 1.3;
  `;

  const HighlightText = styled.p`
    color: ${props => props.theme.colors.textLight}99;
    line-height: 1.8;
    font-size: 1.2rem;
    margin-bottom: 32px;
  `;

  const HighlightButton = styled(HashLink)`
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textLight};
    border: none;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    position: relative;
    z-index: 100;
    pointer-events: auto;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px ${props => props.theme.colors.primary}33;
      text-decoration: none;
      color: ${props => props.theme.colors.textLight};
    }
  `;

  const features = [
    {
      icon: <FaRocket />,
      title: "Innovation First",
      description: "We're not bound by traditional methods. Our fresh perspective allows us to create truly innovative financial solutions."
    },
    {
      icon: <FaUserFriends />,
      title: "Your Success Partner",
      description: "We're not just service providers - we're your partners in financial growth, committed to your long-term success."
    },
    {
      icon: <FaLightbulb />,
      title: "Smart Solutions",
      description: "Leveraging cutting-edge technology to provide intelligent, efficient, and personalized financial solutions."
    }
  ];

  const ProcessSection = styled.section`
    padding: 80px 0;
    background: ${props => props.theme.colors.background};
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
      padding: 60px 20px;
    }
    @media (max-width: 480px) {
      padding: 40px 16px;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, ${props => props.theme.colors.primary}33, transparent);
    }
  `;

  const ProcessContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    line-height: 1.5;
  `;

  const ProcessHeader = styled.div`
    text-align: center;
    margin-bottom: 48px;
  `;

  const ProcessTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 16px;
    letter-spacing: -1px;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: ${props => props.theme.colors.primary};
      border-radius: 2px;
    }
  `;

  const ProcessSubtitle = styled.p`
    font-size: 1.1rem;
    color: ${props => props.theme.colors.textLight}99;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  `;

  const ProcessSliderWrapper = styled.div`
    position: relative;
    padding: 0 60px;

    @media (max-width: 768px) {
      padding: 0 40px;
    }

    @media (max-width: 480px) {
      padding: 0 20px;
    }
  `;

  const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: ${props => props.theme.colors.backgroundLight};
    border: 1px solid ${props => props.theme.colors.primary}44;
    color: ${props => props.theme.colors.textLight};
    width: 44px;
    height: 44px;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${props => props.theme.colors.primary};
      transform: translateY(-50%) scale(1.05);
    }
    
    &:disabled {
      opacity: 0;
      pointer-events: none;
    }
    
    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  `;

  const TimelineWrapper = styled.div`
    position: relative;
    padding: 40px 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    @media (max-width: 480px) {
      padding: 32px 16px;
    }
  `;

  const Timeline = styled.div`
    display: flex;
    gap: 32px;
    padding: 30px 0;
    min-width: max-content;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(to right, 
        ${props => props.theme.colors.primary}22,
        ${props => props.theme.colors.primary}44,
        ${props => props.theme.colors.primary}22
      );
      transform: translateY(-50%);
      z-index: 1;
    }
  `;

  const TimelineItem = styled.div`
    position: relative;
    width: 320px;
    flex-shrink: 0;
    z-index: 2;
    
    @media (max-width: 480px) {
      width: 280px;
    }
  `;

  const ProcessCard = styled.div`
    background: ${props => props.theme.colors.backgroundLight};
    border-radius: 20px;
    padding: 32px 28px;
    border: 1px solid ${props => props.theme.colors.primary}22;
    transition: all 0.3s ease;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    @media (max-width: 480px) {
      padding: 24px 20px;
      border-radius: 16px;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${props => props.theme.colors.primary}11 0%, transparent 100%);
      border-radius: 20px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-4px);
      border-color: ${props => props.theme.colors.primary}44;
      box-shadow: 0 16px 32px rgba(0,0,0,0.2);
      
      &::before {
        opacity: 1;
      }
      
      .process-icon {
        transform: scale(1.1) translateY(-2px);
        color: ${props => props.theme.colors.primary};
      }
    }
  `;

  const ProcessNumber = styled.div`
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    width: 56px;
    height: 56px;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.textLight};
    font-weight: 700;
    font-size: 1.8rem;
    z-index: 3;
    box-shadow: 0 4px 16px ${props => props.theme.colors.primary}44;
    border: 2px solid ${props => props.theme.colors.background};
  `;

  const ProcessStepTitle = styled.h3`
    font-size: 1.3rem;
    font-weight: 600;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 16px;
    line-height: 1.4;
    margin-top: 28px;
  `;

  const ProcessDescription = styled.p`
    color: ${props => props.theme.colors.textLight}99;
    line-height: 1.6;
    font-size: 1rem;
    flex: 1;
  `;

  const processSteps = [
    {
      number: 1,
      icon: <FaPhone />,
      title: "Discovery Call",
      description: "Free phone call, zoom consultation or in person meeting to understand your financial goals and situation. We'll discuss your income, expenses, liabilities, and objectives to determine your eligibility and direction."
    },
    {
      number: 2,
      icon: <FaSearch />,
      title: "Strategy & Loan Options",
      description: "We analyze your borrowing capacity and tailor a finance strategy to your needs. We compare multiple lenders and loan products, presenting recommended options with their pros and cons."
    },
    {
      number: 3,
      icon: <FaCheckCircle />,
      title: "Pre-Approval",
      description: "Select your preferred lender and lodge your pre-approval application. We ensure your budget is secured before you purchase and review all conditions attached to the pre-approval."
    },
    {
      number: 4,
      icon: <FaFileAlt />,
      title: "Documentation & Submission",
      description: "We help gather all necessary documents and prepare your application professionally. We liaise directly with the lender on your behalf and monitor progress throughout the process."
    },
    {
      number: 5,
      icon: <FaCheckDouble />,
      title: "Formal Approval",
      description: "Receive official loan approval from the lender. We ensure property valuation is completed and confirm all terms and conditions of your approval, explaining next steps and answering any questions."
    },
    {
      number: 6,
      icon: <FaHandshake />,
      title: "Settlement",
      description: "We coordinate with your solicitor/conveyancer and lender, finalize paperwork and loan contracts, and oversee the entire process until settlement day."
    },
    {
      number: 7,
      icon: <FaHeadset />,
      title: "Ongoing Support",
      description: "We provide regular loan reviews and refinancing check-ins, keep you updated on rate changes and market trends, and remain your long-term finance partner as your goals evolve."
    }
  ];

  const FAQSection = styled.section`
    padding: 120px 32px;
    background: ${props => props.theme.colors.backgroundDark};
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
      padding: 80px 20px;
    }
    @media (max-width: 480px) {
      padding: 60px 16px;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, ${props => props.theme.colors.primary}33, transparent);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10%;
      left: -10%;
      width: 40%;
      height: 40%;
      background: ${props => props.theme.colors.primary}11;
      border-radius: 50%;
      filter: blur(100px);
      z-index: 0;
    }
  `;

  const FAQContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  `;

  const FAQHeader = styled.div`
    text-align: center;
    margin-bottom: 64px;
  `;

  const FAQTitle = styled.h2`
    font-size: 3rem;
    font-weight: 700;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 24px;
    letter-spacing: -1px;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: ${props => props.theme.colors.primary};
      border-radius: 2px;
    }
  `;

  const FAQSubtitle = styled.p`
    font-size: 1.3rem;
    color: ${props => props.theme.colors.textLight}99;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  `;

  const FAQGrid = styled.div`
    display: grid;
    gap: 24px;
    
    @media (max-width: 768px) {
      gap: 16px;
    }
  `;

  const FAQItem = styled.div`
    background: ${props => props.theme.colors.backgroundLight};
    border-radius: 16px;
    border: 1px solid ${props => props.theme.colors.primary}22;
    overflow: hidden;
    transition: all 0.3s ease;
    
    @media (max-width: 480px) {
      border-radius: 12px;
    }
    
    &:hover {
      border-color: ${props => props.theme.colors.primary}44;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
  `;

  const FAQQuestion = styled.button`
    width: 100%;
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    color: ${props => props.theme.colors.textLight};
    font-size: 1.2rem;
    font-weight: 600;
    transition: all 0.3s ease;
    
    @media (max-width: 480px) {
      padding: 20px 24px;
      font-size: 1.1rem;
    }
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
    
    .icon {
      transition: transform 0.3s ease;
      color: ${props => props.theme.colors.primary};
      font-size: 1.1rem;
    }
    
    &.active .icon {
      transform: rotate(180deg);
    }
  `;

  const FAQAnswer = styled.div`
    padding: 0 32px;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    color: ${props => props.theme.colors.textLight}99;
    line-height: 1.6;
    font-size: 1.1rem;
    
    @media (max-width: 480px) {
      padding: 0 24px;
      font-size: 1rem;
    }
    
    &.active {
      padding: 0 32px 24px;
      max-height: 500px;
    }
    
    @media (max-width: 480px) {
      &.active {
        padding: 0 24px 20px;
      }
    }
  `;

  const faqs = [
    {
      question: "What services does ABBASS Finance offer?",
      answer: "ABBASS Finance offers tailored finance solutions, including residential home loans, investment property loans, refinancing, commercial property finance, business loans, and vehicle and asset finance. We work with a wide panel of lenders to find the best deal for your unique situation."
    },
    {
      question: "Why should I use a mortgage broker instead of going straight to a bank?",
      answer: "Banks only offer their own products, while ABBASS Finance has access to close to a hundred lenders and hundreds of loan options. We act in your best interest to find a loan that suits your needs, not the bank's."
    },
    {
      question: "How do you get paid?",
      answer: "Our services are free for clients. We are paid a commission by the lender once your loan settles. We'll always disclose our commission structure transparently."
    },
    {
      question: "I'm a first home buyer. Can you help me?",
      answer: "Absolutely. We specialise in guiding first-time buyers through the entire process, from securing pre-approval to settlement, and help you understand government incentives like the First Home Owner Grant or stamp duty concessions."
    },
    {
      question: "How much can I borrow?",
      answer: "Your borrowing power depends on your income, expenses, credit history, deposit size, and other financial factors. We can give you a quick assessment and provide a formal pre-approval with one of our lenders."
    },
    {
      question: "When should I consider refinancing?",
      answer: "If want a better interest rate, need to consolidate debts, or want to access equity, it's worth reviewing your loan annually. We offer free loan health checks."
    },
    {
      question: "How long does the loan process take?",
      answer: "It varies. Pre-approvals usually take 1-5 business days. Full approvals and settlements can take 2-6 weeks depending on your situation and the lender's turnaround."
    },
    {
      question: "Can you help self-employed borrowers?",
      answer: "Yes. We understand the complexities of self-employment and have access to lenders that cater specifically to business owners and freelancers."
    }
  ];

  const CTASection = styled.section`
    padding: 120px 32px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primary}dd 100%);
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
      padding: 80px 20px;
    }
    @media (max-width: 480px) {
      padding: 60px 16px;
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
    font-size: 3.5rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 24px;
    letter-spacing: -1px;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 2.25rem;
      margin-bottom: 20px;
    }
  `;

  const CTADescription = styled.p`
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 700px;
    margin: 0 auto 48px;
    line-height: 1.6;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
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
    }
    @media (max-width: 480px) {
      max-width: 100%;
      gap: 16px;
    }
  `;

  const PrimaryCTAButton = styled(Link)`
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
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
      text-decoration: none;
      color: ${props => props.theme.colors.primary};
    }
    
    @media (max-width: 768px) {
      width: 100%;
      padding: 16px 24px;
    }
    @media (max-width: 480px) {
      padding: 14px 20px;
      font-size: 1.1rem;
    }
  `;

  const SecondaryCTAButton = styled(Link)`
    background: transparent;
    color: #fff;
    border: 2px solid #fff;
    padding: 18px 36px;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
      text-decoration: none;
      color: #fff;
    }
    
    @media (max-width: 768px) {
      width: 100%;
      padding: 16px 24px;
    }
    @media (max-width: 480px) {
      padding: 14px 20px;
      font-size: 1.1rem;
    }
  `;

  const rotate = keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  `;

  const reverseRotate = keyframes`
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0);
    }
  `;

  const PartnersSection = styled.section`
    padding: 40px 0;
    background: ${props => props.theme.colors.backgroundDark};
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
      padding: 30px 0;
    }
    @media (max-width: 480px) {
      padding: 24px 0;
    }
  `;

  const PartnersContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    padding: 0 32px;

    @media (max-width: 768px) {
      padding: 0 20px;
    }
    @media (max-width: 480px) {
      padding: 0 16px;
    }
  `;

  const PartnersHeader = styled.div`
    text-align: center;
    margin-bottom: 24px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: linear-gradient(to right, 
        transparent,
        ${props => props.theme.colors.primary},
        transparent
      );
    }
  `;

  const PartnersTitle = styled.h2`
    font-size: 2rem;
    font-weight: 800;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 12px;
    letter-spacing: -1px;
    position: relative;
    display: inline-block;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  `;

  const PartnersSubtitle = styled.p`
    font-size: 1rem;
    color: ${props => props.theme.colors.textLight}99;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.5;
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  `;

  const PartnersWrapper = styled.div`
    position: relative;
    padding: 20px 0;
    overflow: hidden;
    width: 100%;
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 90px;
      z-index: 2;
      pointer-events: none;
    }
    
    &::before {
      left: 0;
      background: linear-gradient(to right, 
        ${props => props.theme.colors.backgroundDark} 0%,
        ${props => props.theme.colors.backgroundDark}99 50%,
        transparent 100%
      );
    }
    
    &::after {
      right: 0;
      background: linear-gradient(to left, 
        ${props => props.theme.colors.backgroundDark} 0%,
        ${props => props.theme.colors.backgroundDark}99 50%,
        transparent 100%
      );
    }
  `;

  const PartnersWrapperSecond = styled(PartnersWrapper)`
    margin-top: 24px;
  `;

  const PartnersTrack = styled.div`
    display: flex;
    gap: 40px;
    animation: ${rotate} 40s linear infinite;
    width: max-content;
    padding: 10px 0;
    will-change: transform;
    
    &:hover {
      animation-play-state: paused;
    }
  `;

  const PartnersTrackReverse = styled(PartnersTrack)`
    animation: ${reverseRotate} 40s linear infinite;
  `;

  const PartnerLogo = styled.div`
    width: 180px;
    height: 80px;
    position: relative;
    transition: all 0.3s ease;
    padding: 16px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 480px) {
      width: 150px;
      height: 70px;
      padding: 12px;
      border-radius: 12px;
    }
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-color: ${props => props.theme.colors.primary};
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: all 0.3s ease;
      filter: brightness(0.9) contrast(1.1);
    }
  `;

  const partners = [
    { name: 'ANZ', logo: 'assets/images/company_logo/anz.png' },
    { name: 'Commonwealth Bank', logo: 'assets/images/company_logo/commbank.png' },
    { name: 'Macquarie Bank', logo: 'assets/images/company_logo/macqarie.png' },
    { name: 'NAB', logo: 'assets/images/company_logo/nab.png' },
    { name: 'Westpac', logo: 'assets/images/company_logo/westpac.png' }
  ];

  const newPartners = [
    { name: 'Suncorp', logo: 'assets/images/company_logo/suncorp_bank_logo-removebg-preview.png' },
    { name: 'Images', logo: 'assets/images/company_logo/images-removebg-preview.png' },
    { name: 'Bank of Queensland', logo: 'assets/images/company_logo/Bank_of_Queensland_Limited.png' },
    { name: 'IMB', logo: 'assets/images/company_logo/imb.png' },
    { name: 'HSBC', logo: 'assets/images/company_logo/hsbc.svg' },
    { name: 'Bendigo Bank', logo: 'assets/images/company_logo/Bendigo_Bank_logo.svg.png' }
  ];

  // Create duplicated arrays for smooth infinite scrolling animation
  const allPartners = [...partners, ...partners];
  const allNewPartners = [...newPartners, ...newPartners];

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

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const checkScrollability = () => {
    const el = timelineWrapperRef.current;
    if (el) {
        const isScrollable = el.scrollWidth > el.clientWidth;
        const canScrollLeft = el.scrollLeft > 0;
        const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth -1;
        setCanScroll({ left: canScrollLeft, right: canScrollRight && isScrollable });
    }
  };

  useEffect(() => {
      const el = timelineWrapperRef.current;
      if (el) {
          checkScrollability();
          el.addEventListener('scroll', checkScrollability);
          window.addEventListener('resize', checkScrollability);

          return () => {
              el.removeEventListener('scroll', checkScrollability);
              window.removeEventListener('resize', checkScrollability);
          };
      }
  }, []);

  const scroll = (direction) => {
      if (timelineWrapperRef.current) {
          const scrollAmount = direction === 'left' ? -352 : 352;
          timelineWrapperRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
  };

  return (
    <Layout noHeaderPadding>
      <HeroSection>
        <HeroGrid>
          <HeroLeft>
            <HeroHeading>Empowering Your Financial Future</HeroHeading>
            <HeroSubheading>
              Tailored lending solutions, expert guidance, and ongoing support - so you can achieve your goals with confidence.
            </HeroSubheading>
            <ButtonRow>
              <ButtonLink 
                variant="primary"
                as={Link} 
                to="/contact#contact-form"
              >
                Get Your Free Assessment
              </ButtonLink>
              <ButtonLink 
                variant="secondary" 
                as={Link} 
                to="/services"
              >
                See Loan Options
              </ButtonLink>
            </ButtonRow>
          </HeroLeft>
          <GlassFormWrapper>
            <FormTitle>Get in touch for tailored finance & mortgage broking</FormTitle>
            <StyledForm onSubmit={handleFormSubmit}>
              {formFields.map((field, index) => (
                <FormField key={index}>
                  <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                  <FormInput
                    name={field.name}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    required={field.required}
                    hasError={formErrors[field.name]}
                    isValid={isFieldValid(field.name)}
                    touched={touchedFields[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    onBlur={(e) => handleFieldBlur(field.name, e.target.value)}
                  />
                  {touchedFields[field.name] && formErrors[field.name] && <FormError>{formErrors[field.name]}</FormError>}
                  {isFieldValid(field.name) && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />{field.label} looks good!</FormSuccess>}
                </FormField>
              ))}
              <FormSubmitButton type="submit" disabled={loading}>Send Message</FormSubmitButton>
              {loading && <p style={{ color: '#fff', margin: '8px 0' }}>Sending...</p>}
              {success && <FormSuccess>{success}</FormSuccess>}
              {error && <FormError>{error}</FormError>}
            </StyledForm>
          </GlassFormWrapper>
        </HeroGrid>
        <ScrollDownIndicator>
          <FaChevronDown />
        </ScrollDownIndicator>
      </HeroSection>

      <PartnersSection>
        <PartnersContainer>
          <PartnersHeader>
            <PartnersTitle>Our Trusted Partners</PartnersTitle>
            <PartnersSubtitle>
              We collaborate with Australia's leading financial institutions to bring you comprehensive and competitive financial solutions
            </PartnersSubtitle>
          </PartnersHeader>
        </PartnersContainer>
        <PartnersWrapper>
          <PartnersTrack>
            {allPartners.map((partner, index) => (
              <PartnerLogo key={`${index}-${partner.name}`}>
                <img src={partner.logo} alt={`${partner.name} logo`} />
              </PartnerLogo>
            ))}
          </PartnersTrack>
        </PartnersWrapper>
        <PartnersWrapperSecond>
          <PartnersTrackReverse>
            {allNewPartners.map((partner, index) => (
              <PartnerLogo key={`${index}-${partner.name}`}>
                <img src={partner.logo} alt={`${partner.name} logo`} />
              </PartnerLogo>
            ))}
          </PartnersTrackReverse>
        </PartnersWrapperSecond>
      </PartnersSection>
      
      <ServicesSection>
        <ServicesContainer>
          <ServicesHeader>
            <ServicesTitle>Our Financial Services</ServicesTitle>
            <ServicesSubtitle>
              Discover our comprehensive range of financial solutions designed to help you achieve your goals
            </ServicesSubtitle>
          </ServicesHeader>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index} to={service.link}>
                <ServiceIcon className="service-icon">{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceCardLink>
                  <ButtonLink to={service.link}>
                    Learn More
                  </ButtonLink>
                </ServiceCardLink>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesContainer>
      </ServicesSection>
      
      <WhyChooseUsSection>
        <WhyChooseUsContainer>
          <SectionHeader>
            <SectionTitle>Why Choose Us</SectionTitle>
            <SectionSubtitle>
              We're redefining financial services with a fresh approach that puts you first
            </SectionSubtitle>
          </SectionHeader>
          
          <MainContent>
            <LeftContent>
              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureContent>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureContent>
                </FeatureCard>
              ))}
            </LeftContent>
            
            <RightContent>
              <HighlightBox>
                <HighlightTitle>
                  Experience the Future of Financial Services
                </HighlightTitle>
                <HighlightText>
                  As a new player in the market, we bring a fresh perspective to financial services. 
                  We combine innovative technology with personalized attention to create a truly unique 
                  experience. Our approach is simple: we treat every client as a partner in their 
                  financial journey, not just another number.
                </HighlightText>
                <HighlightButton to="/contact#contact-form">
                  Start Your Journey
                </HighlightButton>
              </HighlightBox>
            </RightContent>
          </MainContent>
        </WhyChooseUsContainer>
      </WhyChooseUsSection>
      
      <ProcessSection>
        <ProcessContainer>
          <ProcessHeader>
            <ProcessTitle>How It Works</ProcessTitle>
            <ProcessSubtitle>
              A clear, step-by-step guide to working with us
            </ProcessSubtitle>
          </ProcessHeader>
        </ProcessContainer>
        
        <ProcessSliderWrapper>
          <ArrowButton className="left" onClick={() => scroll('left')} disabled={!canScroll.left}>
            <FaChevronLeft />
          </ArrowButton>
          <TimelineWrapper ref={timelineWrapperRef}>
            <Timeline>
              {processSteps.map((step, index) => (
                <TimelineItem key={index}>
                  <ProcessNumber>{step.icon}</ProcessNumber>
                  <ProcessCard>
                    <ProcessStepTitle>{step.title}</ProcessStepTitle>
                    <ProcessDescription>{step.description}</ProcessDescription>
                  </ProcessCard>
                </TimelineItem>
              ))}
            </Timeline>
          </TimelineWrapper>
          <ArrowButton className="right" onClick={() => scroll('right')} disabled={!canScroll.right}>
            <FaChevronRight />
          </ArrowButton>
        </ProcessSliderWrapper>
      </ProcessSection>
      
      <FAQSection>
        <FAQContainer>
          <FAQHeader>
            <FAQTitle>Frequently Asked Questions</FAQTitle>
            <FAQSubtitle>
              Get answers to common questions about our services and process
            </FAQSubtitle>
          </FAQHeader>
          
          <FAQGrid>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion 
                  className={activeFAQ === index ? 'active' : ''}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <FaChevronDown className="icon" />
                </FAQQuestion>
                <FAQAnswer className={activeFAQ === index ? 'active' : ''}>
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQGrid>
        </FAQContainer>
      </FAQSection>
      
      <CTASection>
        <CTAContainer>
          <CTATitle>Ready to Start Your Financial Journey?</CTATitle>
          <CTADescription>
            Take the first step towards achieving your financial goals. Our expert team is here to guide you through every step of the process.
          </CTADescription>
          <CTAButtonGroup>
            <PrimaryCTAButton to="/contact">
              Get Started Now
            </PrimaryCTAButton>
            <SecondaryCTAButton to="/services">
              Explore Our Services
            </SecondaryCTAButton>
          </CTAButtonGroup>
        </CTAContainer>
      </CTASection>
    </Layout>
  );
};

export default Home; 
