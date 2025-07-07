import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

// Styled Components
const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.backgroundDark};
  overflow-x: hidden;
  width: 100%;
`;

const Main = styled.main`
  min-height: 100vh;
  padding: ${props => props.noHeaderPadding ? '0' : props.theme.spacing.xl};
  width: 100%;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.backgroundDark};
`;

/**
 * Layout
 * @param {ReactNode} children - Page content
 * @param {boolean} noHeaderPadding - If true, removes top padding (for hero at top)
 */
const Layout = ({ children, noHeaderPadding = false }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main noHeaderPadding={noHeaderPadding}>{children}</Main>
      <Footer fullBleed={noHeaderPadding} />
    </LayoutContainer>
  );
};

export default Layout; 