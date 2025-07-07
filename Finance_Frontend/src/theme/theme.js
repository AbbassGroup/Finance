/**
 * theme.js
 * Version: 1.0.0
 * Last Updated: 2024-03-08
 * 
 * Purpose:
 * Global theme configuration for styled-components
 * Defines colors, typography, spacing, and other design tokens
 */

export const theme = {
  colors: {
    primary: '#6077CC',       // Periwinkle Blue
    textDark: '#1C1C1C',      // Almost Black
    textLight: '#FFFFFF',     // White
    backgroundLightBlue: '#E9F1FF', // Very Light Blue
    backgroundOffWhite: '#F5F7FC', // Very Light Cool Grey/Off-White
    
    // Dark theme colors
    background: '#1C1C1C',    // Main dark background
    backgroundLight: '#2A2A2A', // Slightly lighter dark background
    backgroundDark: '#141414', // Darker shade for contrast
    
    // Additional semantic colors
    success: '#6077CC',       // Using primary for consistency
    error: '#1C1C1C',         // Using textDark for consistency
    warning: '#6077CC',       // Using primary for consistency
    info: '#6077CC',         // Using primary for consistency
    
    // Additional shades
    primaryLight: '#E9F1FF',  // Using backgroundLightBlue
    primaryDark: '#1C1C1C',   // Using textDark
    textGrey: '#1C1C1C',      // Using textDark
  },
  
  typography: {
    fonts: {
      main: "'Montserrat', sans-serif",
      headings: "'Montserrat', sans-serif",
      mono: 'Consolas, Monaco, "Andale Mono", monospace',
    },
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '2.5rem',  // 40px
    '3xl': '3rem',    // 48px
  },
  
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
  
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
}; 