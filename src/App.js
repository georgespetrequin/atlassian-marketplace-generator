import React, { useState } from 'react';
import styled from '@emotion/styled';
import MarketplaceForm from './components/MarketplaceForm';
import MarketplacePreview from './components/MarketplacePreview';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #0052CC;
  color: white;
  padding: 16px 0;
`;

const HeaderContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #F4F5F7;
`;

const Content = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 32px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Footer = styled.footer`
  background-color: #F4F5F7;
  padding: 16px 0;
  border-top: 1px solid #DFE1E6;
`;

const FooterContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  color: #6B778C;
  font-size: 14px;
`;

function App() {
  const [formData, setFormData] = useState({
    appName: '',
    appTagline: '',
    appLogo: null,
    appBanner: null,
    appYouTubeUrl: '',
    companyName: '',
    worksWithProducts: {
      jiraCloud: false,
      jiraDataCenter: false,
      confluenceCloud: false,
      confluenceDataCenter: false
    },
    highlightTitle1: '',
    highlightSummary1: '',
    highlightScreenshot1: null,
    highlightTitle2: '',
    highlightSummary2: '',
    highlightScreenshot2: null,
    highlightTitle3: '',
    highlightSummary3: '',
    highlightScreenshot3: null,
    moreDetails: '',
    videoUrl: '',
  });

  const handleFormChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Logo>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9999 0C5.3839 0 0 5.3839 0 11.9999C0 18.6159 5.3839 24 11.9999 24C18.6159 24 24 18.6159 24 11.9999C24 5.3839 18.6159 0 11.9999 0ZM16.5479 16.5479C15.9359 17.1599 14.9519 17.1599 14.3399 16.5479L11.9999 14.2079L9.6599 16.5479C9.0479 17.1599 8.0639 17.1599 7.4519 16.5479C6.8399 15.9359 6.8399 14.9519 7.4519 14.3399L9.7919 11.9999L7.4519 9.6599C6.8399 9.0479 6.8399 8.0639 7.4519 7.4519C8.0639 6.8399 9.0479 6.8399 9.6599 7.4519L11.9999 9.7919L14.3399 7.4519C14.9519 6.8399 15.9359 6.8399 16.5479 7.4519C17.1599 8.0639 17.1599 9.0479 16.5479 9.6599L14.2079 11.9999L16.5479 14.3399C17.1599 14.9519 17.1599 15.9359 16.5479 16.5479Z" fill="white"/>
            </svg>
            Atlassian Marketplace Preview Builder for Task Management Apps
          </Logo>
        </HeaderContent>
      </Header>
      
      <Main>
        <Content>
          <MarketplaceForm formData={formData} onChange={handleFormChange} />
          <MarketplacePreview formData={formData} />
        </Content>
      </Main>
      
      <Footer>
        <FooterContent>
          Atlassian Marketplace Preview Builder for Task Management Apps - A tool for product marketers and developers
        </FooterContent>
      </Footer>
    </AppContainer>
  );
}

export default App; 