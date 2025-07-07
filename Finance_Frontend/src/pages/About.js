import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { 
  FaHome, FaChartLine, FaHandshake, FaRocket, FaUserFriends, FaLightbulb
} from 'react-icons/fa';

const DARK_CARD = '#181a1b';
const ALT_DARK_CARD = '#23262b';

const AboutBg = styled.div`
  background: #101113;
  min-height: 100vh;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Section = styled.section`
  margin-bottom: 3.5rem;
  background: ${({ altBg }) => altBg ? ALT_DARK_CARD : DARK_CARD};
  border-radius: 18px;
  padding: 2.8rem 2.2rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  border: 1px solid #23262b;
  color: #fff;
  transition: background 0.3s;
  @media (max-width: 900px) {
    padding: 1.5rem 0.7rem;
  }
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-family: ${props => props.theme.typography.fonts.headings};
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  letter-spacing: -1px;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 3px;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
  }
`;

const Content = styled.div`
  color: #fff;
  font-size: 1.18rem;
  line-height: 1.8;
  font-weight: 500;
  p {
    margin-bottom: 1.3rem;
  }
`;

const MissionVisionGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  margin: 2.5rem 0 0 0;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const MissionVisionCard = styled.div`
  background: #23262b;
  color: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  border: 1px solid #23262b;
  padding: 2.5rem 2rem 2.2rem 2rem;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
`;

const MissionVisionIconCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
`;

const MissionVisionIcon = styled.div`
  font-size: 2.2rem;
  color: #fff;
`;

const MissionVisionTitle = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  letter-spacing: -0.5px;
  position: relative;
  display: inline-block;
  padding-bottom: 0.3rem;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 48px;
    height: 3px;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
  }
`;

const MissionVisionContent = styled.div`
  color: #e0e6ed;
  font-size: 1.08rem;
  line-height: 1.7;
  font-weight: 500;
  margin-top: 0.7rem;
`;

const ValuesSection = styled(Section)`
  background: transparent;
  box-shadow: none;
  border: none;
  margin-bottom: 3.5rem;
  padding: 0;
`;

const ValuesRowWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  padding: 0.5rem 0;
  @media (max-width: 1300px) {
    max-width: 98vw;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const ValuesRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 2.2rem;
  position: relative;
  min-width: 700px;
  width: 100%;
  @media (max-width: 1100px) {
    gap: 1.5rem;
    min-width: 600px;
  }
  @media (max-width: 700px) {
    gap: 1.1rem;
    min-width: 520px;
  }
`;

const ValuesLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #23262b 0%, ${props => props.theme.colors.primary} 50%, #23262b 100%);
  z-index: 0;
  transform: translateY(-50%);
`;

const ValueCard = styled.div`
  background: #23262b;
  color: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid #23262b;
  border-radius: 16px;
  min-width: 180px;
  width: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 1.2rem 0.7rem 1.1rem 0.7rem;
  @media (max-width: 700px) {
    min-width: 150px;
    width: 150px;
    height: 150px;
    padding: 0.8rem 0.3rem 0.7rem 0.3rem;
  }
`;

const ValueIconLarge = styled.div`
  font-size: 3.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.3rem;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ValueTitle = styled.h3`
  color: #fff;
  font-size: 1.08rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  letter-spacing: -0.5px;
`;

const ManagingDirectorSection = styled(Section)`
  background: #23262b;
  color: #fff;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  border: 1.5px solid #23262b;
  padding: 2.8rem 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 24px;
    bottom: 24px;
    width: 7px;
    border-radius: 8px;
    background: ${props => props.theme.colors.primary};
    z-index: 2;
  }
`;

const DirectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  align-items: center;
  margin-top: 1.5rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
`;

const DirectorImage = styled.img`
  width: 320px;
  max-width: 100%;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.18), 0 0 0 4px #23262b;
  border: 3px solid #fff2;
  transition: transform 0.3s ease;
  object-fit: cover;
  @media (max-width: 900px) {
    width: 100%;
    margin: 0 auto;
  }
  &:hover {
    transform: scale(1.02);
  }
`;

const DirectorContent = styled.div`
  flex: 1 1 0;
  color: #fff;
  padding-left: 2.5rem;
  @media (max-width: 900px) {
    padding-left: 0;
    margin-top: 1.5rem;
  }
  h3 {
    color: #fff;
    font-size: 2.3rem;
    margin-bottom: 0.7rem;
    font-weight: 700;
    letter-spacing: -1px;
    padding-bottom: 0.3rem;
    position: relative;
    display: inline-block;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 60px;
      height: 3px;
      background: ${props => props.theme.colors.primary};
      border-radius: 2px;
    }
  }
`;

const DirectorTitle = styled.p`
  color: ${props => props.theme.colors.primary};
  font-size: 1.25rem;
  margin-bottom: 0.7rem;
  font-weight: 700;
`;

const values = [
  {
    icon: FaHandshake,
    title: 'Trust',
  },
  {
    icon: FaChartLine,
    title: 'Excellence',
  },
  {
    icon: FaUserFriends,
    title: 'Commitment',
  },
  {
    icon: FaRocket,
    title: 'Convenience',
  },
  {
    icon: FaHome,
    title: 'Expertise',
  },
];

const About = () => {
  return (
    <Layout noHeaderPadding>
      <Hero 
        title="About ABBASS Finance"
        subtitle="Your trusted partner in financial solutions, dedicated to helping you achieve your financial goals."
        backgroundImage="assets/images/pexels-a-darmel-7710182.jpg"
        noMarginBottom
        showScrollDown={true}
      />
      <AboutBg>
      <AboutContainer>
          <Section id="who-we-are">
          <SectionTitle>Who We Are</SectionTitle>
          <Content>
            <p>
              At ABBASS Finance, we're not just another financial services company - we're a dynamic startup 
              revolutionizing the way people approach their financial future. With our innovative solutions 
              and forward-thinking approach, we're making sophisticated financial strategies accessible to everyone.
            </p>
            <p>
              Our team of young, passionate financial experts combines traditional wisdom with cutting-edge 
              technology to deliver exceptional results. We pride ourselves on our agility, creativity, and 
              commitment to client success.
            </p>
          </Content>
        </Section>

          <Section>
            <MissionVisionGrid>
          <MissionVisionCard>
                <MissionVisionIconCircle>
                  <MissionVisionIcon><FaHome /></MissionVisionIcon>
                </MissionVisionIconCircle>
            <MissionVisionTitle>Our Mission</MissionVisionTitle>
            <MissionVisionContent>
              <p>
                To democratize access to premium financial services and empower individuals and businesses 
                with innovative solutions that drive growth and prosperity. We're committed to breaking 
                down barriers and making sophisticated financial strategies accessible to everyone.
              </p>
            </MissionVisionContent>
          </MissionVisionCard>

          <MissionVisionCard>
                <MissionVisionIconCircle>
                  <MissionVisionIcon><FaLightbulb /></MissionVisionIcon>
                </MissionVisionIconCircle>
            <MissionVisionTitle>Our Vision</MissionVisionTitle>
            <MissionVisionContent>
              <p>
                To become the most trusted and innovative financial advisory firm, transforming how people 
                approach wealth management and investment. We envision a future where financial success is 
                accessible, transparent, and achievable for everyone.
              </p>
            </MissionVisionContent>
          </MissionVisionCard>
            </MissionVisionGrid>
          </Section>

          <ValuesSection altBg>
            <SectionTitle>Our Values</SectionTitle>
            <ValuesRowWrapper>
              <ValuesLine />
              <ValuesRow>
                {values.map((val, idx) => (
                  <ValueCard key={val.title}>
                    <ValueIconLarge>{React.createElement(val.icon)}</ValueIconLarge>
                    <ValueTitle>{val.title}</ValueTitle>
                  </ValueCard>
                ))}
              </ValuesRow>
            </ValuesRowWrapper>
          </ValuesSection>

          <SectionTitle>Meet The Managing Director</SectionTitle>
          <ManagingDirectorSection>
          <DirectorContainer>
            <DirectorImage 
                src="assets/images/ceo.JPG" 
              alt="Portrait of Managing Director"
            />
            <DirectorContent>
              <h3>Sadeq Abbass</h3>
              <DirectorTitle>Managing Director</DirectorTitle>
              <p>Visionary And Strategic Leader</p>
              <Content>
                <p>
                  Sadeq Abbass is a dynamic finance and investment expert with a proven track record in global 
                  financial markets. As the founder of ABBASS Finance, Sadeq brings a fresh perspective to wealth 
                  management, combining traditional financial wisdom with innovative approaches.
                </p>
                <p>
                  With extensive experience in finance, investment, and business strategy, Sadeq has built a 
                  reputation for delivering exceptional results. His global network and deep market insights 
                  position ABBASS Finance as a trusted partner for individuals and businesses seeking financial success.
                </p>
              </Content>
            </DirectorContent>
          </DirectorContainer>
        </ManagingDirectorSection>
      </AboutContainer>
      </AboutBg>
    </Layout>
  );
};

export default About; 
