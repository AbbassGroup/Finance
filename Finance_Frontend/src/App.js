/**
 * App.js
 * Version: 1.0.0
 * Last Updated: 2024-03-08
 * 
 * Purpose:
 * Main application component that sets up the global state provider
 * and renders the application structure.
 * 
 * Dependencies:
 * - AppProvider: Global state management
 * - React Router: Navigation
 * - styled-components: Styling
 */

import { AppProvider } from './context/AppContext';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { theme } from './theme/theme';

// Lazy load components with prefetching
const Home = lazy(() => import(/* webpackPrefetch: true */ './pages/Home'));
const ExamplePage = lazy(() => import('./pages/ExamplePage'));
const About = lazy(() => import(/* webpackPrefetch: true */ './pages/About'));
const Services = lazy(() => import('./pages/Services'));
const OurServices = lazy(() => import('./pages/OurServices'));
const Contact = lazy(() => import(/* webpackPrefetch: true */ './pages/Contact'));
const Calculator = lazy(() => import('./pages/Calculator'));
const BorrowingPowerCalculator = lazy(() => import('./pages/calculators/BorrowingPowerCalculator'));
const StampDutyCalculator = lazy(() => import('./pages/calculators/StampDutyCalculator'));
const LoanRepaymentCalculator = lazy(() => import('./pages/calculators/LoanRepaymentCalculator'));
const RentVsBuyCalculator = lazy(() => import('./pages/calculators/RentVsBuyCalculator'));

// Loading component with skeleton UI
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    color: theme.colors.primary,
    background: theme.colors.backgroundOffWhite
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: `3px solid ${theme.colors.primary}20`,
      borderRadius: '50%',
      borderTopColor: theme.colors.primary,
      animation: 'spin 1s linear infinite'
    }} />
    <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/example" element={<ExamplePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/ourservices" element={<OurServices />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/calculators" element={<Calculator />} />
              <Route path="/calculators/borrowing-power" element={<BorrowingPowerCalculator />} />
              <Route path="/calculators/stamp-duty" element={<StampDutyCalculator />} />
              <Route path="/calculators/loan-repayment" element={<LoanRepaymentCalculator />} />
              <Route path="/calculators/rent-vs-buy" element={<RentVsBuyCalculator />} />
            </Routes>
          </Suspense>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
