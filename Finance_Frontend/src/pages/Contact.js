import React from 'react';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { FaLinkedin, FaInstagram, FaCheck } from 'react-icons/fa';
import { submitContactMessage, submitCareerApplication } from '../services/api';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  
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
    padding: ${props => props.theme.spacing.lg};
    &::after {
      height: 80px;
    }
  }
  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`;

// eslint-disable-next-line no-unused-vars
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const InfoCard = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.colors.primary}22;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${props => props.theme.colors.primary}15, transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
`;

// eslint-disable-next-line no-unused-vars
const InfoIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
  display: inline-block;
  padding: 1rem;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary}10;
  
  ${InfoCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: ${props => props.theme.colors.primary}20;
  }
`;

// eslint-disable-next-line no-unused-vars
const InfoTitle = styled.h3`
  color: ${props => props.theme.colors.textDark};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.typography.fonts.headings};
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  ${InfoCard}:hover &::after {
    width: 60px;
  }
`;

// eslint-disable-next-line no-unused-vars
const InfoDetail = styled.p`
  color: ${props => props.theme.colors.textGrey};
  margin: 0.5rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  transition: color 0.3s ease;
  
  ${InfoCard}:hover & {
    color: ${props => props.theme.colors.textDark};
  }
`;

// eslint-disable-next-line no-unused-vars
const FormSection = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: 24px;
  padding: 3rem;
  margin: 4rem 0;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.colors.primary}22;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.textLight};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.typography.fonts.headings};
  font-weight: 700;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primary}80);
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  color: ${props => props.theme.colors.textLight}99;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
`;

const SocialSection = styled.div`
  text-align: center;
  margin: 3rem 0;
  padding: 2.5rem;
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.colors.primary}22;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 1rem;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  justify-content: center;
`;

const NameRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.primary}10;
  color: ${props => props.theme.colors.primary};
  border-radius: 16px;
  width: 70px;
  height: 70px;
  font-size: 2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  svg {
    position: relative;
    z-index: 1;
    transition: all 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      color: white;
      transform: scale(1.1);
    }
  }
`;

const MapSection = styled.div`
  border-radius: 24px;
  overflow: hidden;
  height: 500px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  scroll-margin-top: 2rem;
  margin: 3rem 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    height: 400px;
  }
  @media (max-width: 480px) {
    height: 300px;
    border-radius: 16px;
  }
`;

const ContactSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['2xl']};
  max-width: 1200px;
  margin: 3rem 0;
  padding: 0;
  align-items: center;
  justify-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
    padding: 0;
  }
  @media (max-width: 480px) {
    padding: 0;
    gap: ${props => props.theme.spacing.lg};
    max-width: 100%;
  }
`;

const ContactInfo = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.colors.primary}22;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  height: fit-content;
  margin: auto;
  max-width: 500px;
  width: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`;

const ContactInfoTitle = styled.h2`
  color: ${props => props.theme.colors.textLight};
  font-size: 2rem;
  margin-bottom: 2rem;
  font-family: ${props => props.theme.typography.fonts.headings};
  font-weight: 700;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textLight};
  transition: all 0.3s ease;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  
  &:hover {
    transform: translateX(5px);
  }

  div {
    flex: 1;
  }

  strong {
    display: block;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.textLight};
  }

  p {
    margin: 0.25rem 0;
    color: ${props => props.theme.colors.textLight}99;
    font-size: 1.1rem;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    gap: 1.2rem;
    margin-bottom: 1.5rem;
    
    strong {
      font-size: 1.1rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1.2rem;
    
    strong {
      font-size: 1rem;
      margin-bottom: 0.3rem;
    }
    
    p {
      font-size: 0.95rem;
      margin: 0.2rem 0;
    }
  }
`;

const ContactIcon = styled.i`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.primary}10;
  border-radius: 12px;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  ${ContactItem}:hover & {
    background: ${props => props.theme.colors.primary}20;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const InfoParagraph = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    color: ${props => props.theme.colors.textLight}99;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
  @media (max-width: 480px) {
    margin-top: 1.5rem;
    padding-top: 1.2rem;
  }
`;

const MessageForm = styled.form`
  background: ${props => props.theme.colors.backgroundLight};
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.colors.primary}22;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  max-width: 500px;
  width: 100%;
  margin: auto;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`;

const FormTitle = styled.h2`
  color: ${props => props.theme.colors.textLight};
  font-size: 2rem;
  margin-bottom: 2rem;
  font-family: ${props => props.theme.typography.fonts.headings};
  font-weight: 700;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
  }
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  width: 100%;
  
  &:focus-within {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    margin-bottom: 1.2rem;
  }
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.textLight};
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: left;
  padding-left: 2px;
  ${FormField}:focus-within & {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.4rem;
  }
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 0.3rem;
  }
`;

const RequiredAsterisk = styled.span`
  color: ${props => props.theme.colors.error};
  margin-left: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => {
    if (props.hasError) return 'rgba(255, 100, 100, 0.6)';
    if (props.isValid && props.touched) return 'rgba(100, 255, 100, 0.4)';
    return props.theme.colors.primary + '20';
  }};
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.textLight};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => {
      if (props.hasError) return 'rgba(255, 100, 100, 0.8)';
      if (props.isValid && props.touched) return 'rgba(100, 255, 100, 0.6)';
      return props.theme.colors.primary;
    }};
    box-shadow: 0 0 0 4px ${props => {
      if (props.hasError) return 'rgba(255, 100, 100, 0.13)';
      if (props.isValid && props.touched) return 'rgba(100, 255, 100, 0.13)';
      return props.theme.colors.primary + '15';
    }};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight}66;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 0.9rem;
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.95rem;
    border-radius: 10px;
  }
`;



const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => {
    if (props.hasError) return 'rgba(255, 100, 100, 0.6)';
    if (props.isValid && props.touched) return 'rgba(100, 255, 100, 0.4)';
    return props.theme.colors.primary + '20';
  }};
  border-radius: 12px;
  font-size: 1.1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  background: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.textLight};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => {
      if (props.hasError) return 'rgba(255, 100, 100, 0.8)';
      if (props.isValid && props.touched) return 'rgba(100, 255, 100, 0.6)';
      return props.theme.colors.primary;
    }};
    box-shadow: 0 0 0 4px ${props => {
      if (props.hasError) return 'rgba(255, 100, 100, 0.13)';
      if (props.isValid && props.touched) return 'rgba(100, 255, 100, 0.13)';
      return props.theme.colors.primary + '15';
    }};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight}66;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 0.9rem;
    font-size: 1rem;
    min-height: 120px;
  }
  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.95rem;
    min-height: 100px;
    border-radius: 10px;
  }
`;

const JoinTeamSection = styled.div`
  text-align: center;
  margin: 3rem 0;
  padding: 2.5rem;
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.colors.primary}22;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 1rem;
  }
`;

const JoinTeamContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const JoinTeamTitle = styled.h2`
  color: ${props => props.theme.colors.textLight};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.typography.fonts.headings};
  font-weight: 800;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primary}80);
    border-radius: 2px;
  }
`;

const JoinTeamDescription = styled.p`
  color: ${props => props.theme.colors.textLight}99;
  font-size: 1.2rem;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  max-width: 600px;
`;

const JoinTeamForm = styled.form`
  background: ${props => props.theme.colors.backgroundLight};
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.colors.primary}22;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  max-width: 600px;
  width: 100%;
  margin: 2rem auto 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1.5rem auto 0;
  }
  @media (max-width: 480px) {
    padding: 1.5rem;
    margin: 1rem auto 0;
    max-width: 100%;
  }
`;

const FileInput = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  
  input[type="file"] {
    display: none;
  }
  
  label {
    display: block;
    padding: 1rem;
    border: 2px dashed ${props => props.theme.colors.primary}20;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: ${props => props.theme.colors.textLight}99;
    background: ${props => props.theme.colors.backgroundDark};

    &:hover {
      border-color: ${props => props.theme.colors.primary};
      background: ${props => props.theme.colors.primary}05;
    }
  }
`;

const FileName = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
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



// Update validation logic for required fields
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
    case 'email':
      if (value.trim() && value.trim().length > 100) {
        return 'Email is too long';
      }
      if (value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address';
        }
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
    case 'message':
      if (!value.trim()) {
        return 'Message is required';
      }
      if (value.trim().length > 1000) {
        return 'Message must be less than 1000 characters';
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

// Career form validation functions
const validateCareerField = (name, value) => {
  switch (name) {
    case 'name':
      if (!value.trim()) {
        return 'Name is required';
      }
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters long';
      }
      if (value.trim().length > 100) {
        return 'Name must be less than 100 characters';
      }
      if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes';
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
    case 'message':
      if (value.trim() && value.trim().length > 2000) {
        return 'Cover letter must be less than 2000 characters';
      }
      return '';
    default:
      return '';
  }
};

const Contact = () => {
  const scrollToMap = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form state management
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState({});
  const [touchedFields, setTouchedFields] = React.useState({});
  
  // Career form state management
  const [careerFormErrors, setCareerFormErrors] = React.useState({});
  const [careerTouchedFields, setCareerTouchedFields] = React.useState({});

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

  // Update validateForm to only require name, phone, and message
  const validateForm = (formData) => {
    const errors = {};
    let isValid = true;

    // Only these fields are required
    const requiredFields = ['firstName', 'lastName', 'phone', 'message'];
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    // Email is optional, but if filled, validate it
    if (formData.email) {
      const error = validateField('email', formData.email);
      if (error) {
        errors.email = error;
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const isFieldValid = (fieldName) => {
    return touchedFields[fieldName] && !formErrors[fieldName];
  };

  // Career form field handlers
  const handleCareerFieldChange = (fieldName, value) => {
    let processedValue = value;
    
    // Format phone number as user types
    if (fieldName === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    const error = validateCareerField(fieldName, processedValue);
    setCareerFormErrors(prev => ({
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

  const handleCareerFieldBlur = (fieldName, value) => {
    setCareerTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
    const error = validateCareerField(fieldName, value);
    setCareerFormErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const isCareerFieldValid = (fieldName) => {
    return careerTouchedFields[fieldName] && !careerFormErrors[fieldName];
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    // Validate form
    if (!validateForm(formData)) {
      setLoading(false);
      // Mark all required fields as touched to show errors
      const allTouched = {};
      ['firstName', 'lastName', 'email', 'phone', 'message'].forEach(field => {
        allTouched[field] = true;
      });
      setTouchedFields(allTouched);
      return;
    }

    try {
      const backendData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email || '',
        phone: formData.phone || '',
        message: formData.message || ''
      };

      const res = await submitContactMessage(backendData);
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

  return (
    <Layout noHeaderPadding>
      <Hero
        title="Contact Us"
        subtitle="Let's discuss your business needs"
        backgroundImage="assets/images/pexels-shkrabaanthony-7984816.jpg"
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
            background: 'linear-gradient(to bottom, transparent 0%, #1C1C1C 100%)',
            pointerEvents: 'none',
            zIndex: 2
          }
        }}
      />
      <ContactContainer>
        <ContactSection>
          <ContactInfo>
            <ContactInfoTitle>Contact Information</ContactInfoTitle>
            <ContactItem isClickable onClick={scrollToMap}>
              <ContactIcon className="fas fa-map-marker-alt"></ContactIcon>
              <div>
                <strong>Visit Us</strong>
                <p>Unit 102/24 Albert Rd</p>
                <p>South Melbourne VIC 3205</p>
              </div>
            </ContactItem>
            <ContactItem>
              <ContactIcon className="fas fa-phone"></ContactIcon>
              <div>
                <strong>Call Us</strong>
                <p>(03) 9103 1317</p>
              </div>
            </ContactItem>
            <ContactItem>
              <ContactIcon className="fas fa-envelope"></ContactIcon>
              <div>
                <strong>Email Us</strong>
                <p>info@abbass.group</p>
              </div>
            </ContactItem>
            <InfoParagraph>
              <p>
                At ABBASS Finance, your success is our priority. Whether you're looking for a new loan, do a refinance or simply have a question about how we can support your journey, we're just a message away.
                <br/><br/>
                Our dedicated team is here to provide prompt, diligent, and tailored support across all our services. Fill out the form, give us a call, or send us an email, we'll get back to you as soon as we can.
              </p>
            </InfoParagraph>
          </ContactInfo>

          <MessageForm onSubmit={handleContactFormSubmit} id="contact-form">
            <FormTitle>Send Us a Message</FormTitle>
            <NameRow>
              <FormField style={{ flex: 1 }}>
                <Label htmlFor="firstName">
                  First Name<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                  hasError={formErrors.firstName}
                  isValid={isFieldValid('firstName')}
                  touched={touchedFields.firstName}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                  onBlur={(e) => handleFieldBlur('firstName', e.target.value)}
                />
                {touchedFields.firstName && formErrors.firstName && <FormError>{formErrors.firstName}</FormError>}
                {isFieldValid('firstName') && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />First Name looks good!</FormSuccess>}
              </FormField>
              <FormField style={{ flex: 1 }}>
                <Label htmlFor="lastName">
                  Last Name<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                  hasError={formErrors.lastName}
                  isValid={isFieldValid('lastName')}
                  touched={touchedFields.lastName}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                  onBlur={(e) => handleFieldBlur('lastName', e.target.value)}
                />
                {touchedFields.lastName && formErrors.lastName && <FormError>{formErrors.lastName}</FormError>}
                {isFieldValid('lastName') && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />Last Name looks good!</FormSuccess>}
              </FormField>
            </NameRow>
            <FormField>
              <Label htmlFor="email">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                hasError={formErrors.email}
                isValid={isFieldValid('email')}
                touched={touchedFields.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={(e) => handleFieldBlur('email', e.target.value)}
              />
              {touchedFields.email && formErrors.email && <FormError>{formErrors.email}</FormError>}
              {isFieldValid('email') && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />Email looks good!</FormSuccess>}
            </FormField>
            <FormField>
              <Label htmlFor="phone">Phone Number<RequiredAsterisk>*</RequiredAsterisk></Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+61 400 000 000"
                hasError={formErrors.phone}
                isValid={isFieldValid('phone')}
                touched={touchedFields.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onBlur={(e) => handleFieldBlur('phone', e.target.value)}
              />
              {touchedFields.phone && formErrors.phone && <FormError>{formErrors.phone}</FormError>}
              {isFieldValid('phone') && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />Phone looks good!</FormSuccess>}
            </FormField>
            <FormField>
              <Label htmlFor="message">Your Message</Label>
              <TextArea
                id="message"
                name="message"
                placeholder="How can we help you?"
                hasError={formErrors.message}
                isValid={isFieldValid('message')}
                touched={touchedFields.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                onBlur={(e) => handleFieldBlur('message', e.target.value)}
              />
              {touchedFields.message && formErrors.message && <FormError>{formErrors.message}</FormError>}
              {isFieldValid('message') && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />Message looks good!</FormSuccess>}
            </FormField>
            <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'} <i className="fas fa-paper-plane"></i>
            </Button>
            {loading && <p style={{ color: '#666', margin: '8px 0', textAlign: 'center' }}>Sending your message...</p>}
            {success && <FormSuccess style={{ textAlign: 'center', marginTop: '8px' }}>{success}</FormSuccess>}
            {error && <FormError style={{ textAlign: 'center', marginTop: '8px' }}>{error}</FormError>}
          </MessageForm>
        </ContactSection>

        <SocialSection>
          <SectionTitle>Connect With Us</SectionTitle>
          <SectionSubtitle>
            Follow us on social media to stay updated with the latest financial insights, 
            market trends, and exclusive opportunities.
          </SectionSubtitle>
          <SocialRow>
            <SocialButton 
              href="https://www.linkedin.com/company/abbassfinance" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on LinkedIn"
            >
              <FaLinkedin />
            </SocialButton>
            <SocialButton 
              href="https://www.instagram.com/abbassfinance" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram />
            </SocialButton>
          </SocialRow>
        </SocialSection>

        <JoinTeamSection>
          <JoinTeamContent>
            <JoinTeamTitle>Join Our Team</JoinTeamTitle>
            <JoinTeamDescription>
              As a growing startup, we're always looking for passionate individuals who want to make a difference. 
              Our CEO personally reviews all applications and makes hiring decisions. If you believe you can contribute 
              to our success story, submit your application below.
            </JoinTeamDescription>
            <JoinTeamForm onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setSuccess(null);
              setError(null);
              
              try {
                const formData = new FormData(e.target);
                
                // Get CV file from FormData
                const cvFile = formData.get('cv');
                  
                // Validate all required fields
                const name = formData.get('name');
                const email = formData.get('email');
                const phone = formData.get('phone');
                
                const nameError = validateCareerField('name', name);
                const emailError = validateCareerField('email', email);
                const phoneError = validateCareerField('phone', phone);
                
                if (nameError || emailError || phoneError || !cvFile || (cvFile && cvFile.size === 0)) {
                  // Mark all fields as touched to show errors
                  setCareerTouchedFields({
                    name: true,
                    email: true,
                    phone: true
                  });
                  setCareerFormErrors({
                    name: nameError,
                    email: emailError,
                    phone: phoneError
                  });
                  
                  if (!cvFile || (cvFile && cvFile.size === 0)) {
                    setError('CV file is required.');
                  } else {
                    setError('Please fix the validation errors above.');
                  }
                  setLoading(false);
                  return;
                }
                
                // Submit application
                const result = await submitCareerApplication(formData);
                
                if (result.success) {
                  setSuccess('Your application has been submitted successfully! We will contact you soon.');
                  e.target.reset();
                  // Reset validation state
                  setCareerFormErrors({});
                  setCareerTouchedFields({});
                } else {
                  setError(result.message || 'There was an error submitting your application.');
                }
              } catch (error) {
                console.error('Application submission error:', error);
                setError(error.message || 'There was an error submitting your application. Please try again or contact us directly.');
              } finally {
                setLoading(false);
              }
            }}>
              <FormField>
                <Label htmlFor="applicant-name">
                  Full Name<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  type="text"
                  id="applicant-name"
                  name="name"
                  placeholder="John Doe"
                  required
                  hasError={careerFormErrors.name}
                  isValid={isCareerFieldValid('name')}
                  touched={careerTouchedFields.name}
                  onChange={(e) => handleCareerFieldChange('name', e.target.value)}
                  onBlur={(e) => handleCareerFieldBlur('name', e.target.value)}
                />
                {careerTouchedFields.name && careerFormErrors.name && <FormError>{careerFormErrors.name}</FormError>}
                {isCareerFieldValid('name') && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />Name looks good!</FormSuccess>}
              </FormField>
              <FormField>
                <Label htmlFor="applicant-email">
                  Email Address<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  type="email"
                  id="applicant-email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  hasError={careerFormErrors.email}
                  isValid={isCareerFieldValid('email')}
                  touched={careerTouchedFields.email}
                  onChange={(e) => handleCareerFieldChange('email', e.target.value)}
                  onBlur={(e) => handleCareerFieldBlur('email', e.target.value)}
                />
                {careerTouchedFields.email && careerFormErrors.email && <FormError>{careerFormErrors.email}</FormError>}
                {isCareerFieldValid('email') && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />Email looks good!</FormSuccess>}
              </FormField>
              <FormField>
                <Label htmlFor="applicant-phone">
                  Phone Number<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  type="tel"
                  id="applicant-phone"
                  name="phone"
                  placeholder="+61 400 000 000"
                  required
                  hasError={careerFormErrors.phone}
                  isValid={isCareerFieldValid('phone')}
                  touched={careerTouchedFields.phone}
                  onChange={(e) => handleCareerFieldChange('phone', e.target.value)}
                  onBlur={(e) => handleCareerFieldBlur('phone', e.target.value)}
                />
                {careerTouchedFields.phone && careerFormErrors.phone && <FormError>{careerFormErrors.phone}</FormError>}
                {isCareerFieldValid('phone') && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />Phone looks good!</FormSuccess>}
              </FormField>

              <FormField>
                <Label htmlFor="applicant-message">Cover Letter</Label>
                <TextArea
                  id="applicant-message"
                  name="message"
                  placeholder="Tell us about yourself and why you'd like to join our team..."
                  rows={4}
                  hasError={careerFormErrors.message}
                  isValid={isCareerFieldValid('message')}
                  touched={careerTouchedFields.message}
                  onChange={(e) => handleCareerFieldChange('message', e.target.value)}
                  onBlur={(e) => handleCareerFieldBlur('message', e.target.value)}
                />
                {careerTouchedFields.message && careerFormErrors.message && <FormError>{careerFormErrors.message}</FormError>}
                {isCareerFieldValid('message') && <FormSuccess><FaCheck style={{color: 'limegreen', marginRight: 6}} />Cover letter looks good!</FormSuccess>}
              </FormField>
              <FileInput>
                <Label htmlFor="applicant-cv">
                  Upload CV/Resume<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <input
                  type="file"
                  id="applicant-cv"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={(e) => {
                    const fileName = e.target.files[0]?.name;
                    const fileNameElement = e.target.nextElementSibling;
                    if (fileName) {
                      fileNameElement.textContent = `Selected file: ${fileName}`;
                      fileNameElement.style.display = 'block';
                    } else {
                      fileNameElement.style.display = 'none';
                    }
                  }}
                />
                <FileName className="file-name" style={{ display: 'none' }}></FileName>
              </FileInput>
              <Button type="submit" variant="primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'} <i className="fas fa-paper-plane"></i>
              </Button>
              {loading && <p style={{ color: '#666', margin: '8px 0', textAlign: 'center' }}>Submitting your application...</p>}
              {success && <FormSuccess style={{ textAlign: 'center', marginTop: '8px' }}>{success}</FormSuccess>}
              {error && <FormError style={{ textAlign: 'center', marginTop: '8px' }}>{error}</FormError>}
            </JoinTeamForm>
          </JoinTeamContent>
        </JoinTeamSection>

        <MapSection id="map-section">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.148138424717!2d144.97150729999998!3d-37.8334177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642a81029e79f%3A0xbae359ce81039253!2sUnit%20102%2F24%20Albert%20Rd%2C%20South%20Melbourne%20VIC%203205!5e0!3m2!1sen!2sau!4v1746160838419!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapSection>
      </ContactContainer>
    </Layout>
  );
};

export default Contact; 
