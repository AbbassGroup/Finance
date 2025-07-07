/**
 * Header.js
 * Version: 1.0.0
 * Last Updated: 2024-03-08
 * 
 * Purpose:
 * Main navigation header component that provides site-wide navigation
 * and branding. Includes logo and navigation links.
 * 
 * Features:
 * - Responsive design with mobile menu support (to be implemented)
 * - Sticky positioning
 * - Theme-based styling
 * - Active link highlighting
 * - Hover effects
 * 
 * Dependencies:
 * - styled-components: For styling
 * - react-router-dom: For navigation
 * - theme.js: For styling tokens
 * 
 * Usage:
 * <Header />
 * 
 * Props:
 * None currently, but can be extended for:
 * - customLogo: string (path to custom logo)
 * - customLinks: array (custom navigation links)
 * - transparent: boolean (transparent background)
 */

import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

/**
 * HeaderContainer
 * Main wrapper for the header component
 * - Sticky positioning
 * - Transparent background
 * - Full width with proper z-index
 */
const HeaderContainer = styled.header`
  background-color: ${props => props.isScrolled ? props.theme.colors.backgroundDark : 'transparent'};
  padding: ${props => props.theme.spacing.md} 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndices.sticky};
  transition: transform 0.3s ease, background-color 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md} 0;
    transform: translateY(${props => props.hidden ? '-100%' : '0'});
  }
`;

/**
 * HeaderContent
 * Content wrapper for header elements
 * - Full width with proper padding
 * - Flex layout for logo and navigation
 * - Better spacing and alignment
 */
const HeaderContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

/**
 * LogoContainer
 * Wrapper for logo
 * - Links to home page
 * - Better left alignment
 * - Proper sizing and spacing
 */
const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  margin-right: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;

/**
 * Logo
 * Company logo image
 * - Larger size
 * - Maintains aspect ratio
 * - Better responsive sizing
 */
const Logo = styled.img`
  height: 65px;
  width: auto;
  object-fit: contain;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 55px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 45px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 40px;
  }
`;

/**
 * Navigation
 * Navigation menu container
 * - Flex layout for links
 * - Better spacing and alignment
 * - Mobile responsive
 */
const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  margin-left: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    gap: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    height: 100vh;
    width: 280px;
    background-color: ${props => props.theme.colors.textDark};
    flex-direction: column;
    padding: ${props => props.theme.spacing.xl};
    gap: ${props => props.theme.spacing.lg};
    transition: right 0.3s ease;
    box-shadow: ${props => props.theme.shadows.lg};
    margin-left: 0;
    align-items: flex-start;
  }
`;

/**
 * NavLink
 * Navigation link component
 * - Theme-based styling
 * - Hover and active states
 * - Smooth transitions
 * - Better alignment
 */
const NavLink = styled(Link)`
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.base};
  transition: ${props => props.theme.transitions.default};
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: ${props => props.theme.typography.fontSizes.sm};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSizes.lg};
    padding: ${props => props.theme.spacing.md};
    width: 100%;
    justify-content: flex-start;
  }
`;

const StyledNavLink = styled(NavLink)`
  ${props => props.isCurrent && css`
    color: ${props.theme.colors.primary};
  `}
`;

/**
 * MenuButton
 * Hamburger menu button for mobile
 * - Better positioning and alignment
 */
const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSizes.xl};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.base};
  transition: ${props => props.theme.transitions.default};
  margin-left: ${props => props.theme.spacing.md};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}15;
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

/**
 * CloseButton
 * Close button for mobile menu
 */
const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSizes.xl};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

/**
 * Overlay
 * Dark overlay for mobile menu
 */
const Overlay = styled.div`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: ${props => props.theme.zIndices.modal};
  }
`;

/**
 * Header Component
 * Main navigation header
 * 
 * @returns {JSX.Element} Header component with logo and navigation
 */
const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.innerWidth <= 768) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <HeaderContainer hidden={hidden} isScrolled={isScrolled}>
      <HeaderContent>
        <LogoContainer to="/" onClick={closeMenu}>
          <Logo src="assets/images/logo1-removebg-preview-2.png" alt="Abbass Finance Logo" />
        </LogoContainer>
        
        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </MenuButton>

        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
        
        <Navigation isOpen={isMenuOpen}>
          <CloseButton onClick={closeMenu} aria-label="Close menu">×</CloseButton>
          <StyledNavLink to="/" isCurrent={pathname === '/'} onClick={closeMenu}>Home</StyledNavLink>
          <StyledNavLink to="/about" isCurrent={pathname.startsWith('/about')} onClick={closeMenu}>About</StyledNavLink>
          <StyledNavLink to="/services" isCurrent={pathname.startsWith('/services')} onClick={closeMenu}>Services</StyledNavLink>
          <StyledNavLink to="/calculators" isCurrent={pathname.startsWith('/calculators')} onClick={closeMenu}>Calculators</StyledNavLink>
          <StyledNavLink to="/contact" isCurrent={pathname.startsWith('/contact')} onClick={closeMenu}>Contact Us</StyledNavLink>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default React.memo(Header); 
