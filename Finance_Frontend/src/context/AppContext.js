/**
 * AppContext.js
 * Version: 1.0.0
 * Last Updated: 2024-03-08
 * 
 * Purpose:
 * This file implements a lightweight state management system using React's Context API.
 * It provides a centralized way to manage and share state across components without
 * additional dependencies, keeping the application bundle size minimal.
 * 
 * Features:
 * - Global state management using React Context
 * - Custom hook (useApp) for easy state access
 * - Type-safe state updates
 * - Error handling for context usage
 * 
 * Usage:
 * 1. Wrap your app with <AppProvider>
 * 2. Access state in components using useApp hook
 * 3. Update state using the provided setter functions
 * 
 * Example:
 * const { theme, setTheme } = useApp();
 */

import { createContext, useContext, useState } from 'react';

// Create the context with a default value
const AppContext = createContext(undefined);

/**
 * AppProvider Component
 * Wraps the application to provide global state access
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function AppProvider({ children }) {
  // Global state declarations
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  // Consolidated state object
  const value = {
    theme,
    setTheme,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * useApp Hook
 * Custom hook to access the global state
 * @returns {Object} The global state and its setter functions
 * @throws {Error} If used outside of AppProvider
 */
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 