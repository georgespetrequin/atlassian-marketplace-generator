import React, { useRef } from 'react';
import styled from '@emotion/styled';
import DownloadOptions from './DownloadOptions';

const PreviewContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 0;
  position: sticky;
  top: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
`;

const PreviewTitle = styled.h2`
  margin-bottom: 20px;
  color: #172B4D;
  padding: 24px 24px 0;
  font-size: 22px;
  font-weight: 600;
`;

const MarketplaceHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #DFE1E6;
  
  &.marketplace-header {
    /* Class for PDF export styling */
  }
`;

const AppLogoContainer = styled.div`
  width: 72px;
  height: 72px;
  margin-right: 16px;
  border-radius: 3px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const AppInfoHeader = styled.div`
  flex: 1;
  
  &.app-info-header {
    /* Class for PDF export styling */
  }
`;

const AppNameHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 4px;
  color: #172B4D;
  font-weight: 600;
`;

const AppVendor = styled.div`
  font-size: 14px;
  color: #6B778C;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  
  a {
    color: #0052CC;
    text-decoration: none;
    margin-right: 4px;
  }
`;

const AppCompatibility = styled.div`
  font-size: 13px;
  color: #6B778C;
  margin-top: 4px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TryFreeButton = styled.button`
  background-color: #0052CC;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const BuyNowButton = styled.button`
  background-color: white;
  color: #172B4D;
  border: 1px solid #DFE1E6;
  border-radius: 3px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  color: #6B778C;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

const StatsContainer = styled.div`
  display: flex;
  padding: 20px 30px;
  border-bottom: 1px solid #DFE1E6;
  background-color: #FAFBFC;
`;

const StatColumn = styled.div`
  flex: 1;
  padding-right: 16px;
`;

const StatTitle = styled.div`
  font-size: 12px;
  color: #6B778C;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  
  .rating-value {
    font-weight: 600;
    margin-right: 8px;
  }
  
  .stars {
    display: flex;
    color: #FFAB00;
  }
  
  .reviews {
    color: #6B778C;
    margin-left: 8px;
    font-size: 13px;
  }
`;

const Installs = styled.div`
  font-weight: 600;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: #6B778C;
  }
`;

const SupportInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SupportTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #EAE6FF;
  color: #403294;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 3px;
  font-weight: 500;
  width: fit-content;
`;

const CloudTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #E3FCEF;
  color: #006644;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 3px;
  font-weight: 500;
  width: fit-content;
`;

const ViewForContainer = styled.div`
  padding: 16px 30px;
  border-bottom: 1px solid #DFE1E6;
  display: flex;
  align-items: center;
`;

const ViewForLabel = styled.div`
  font-size: 14px;
  color: #172B4D;
  margin-right: 8px;
`;

const ViewForSelect = styled.div`
  display: flex;
  align-items: center;
  color: #0052CC;
  font-weight: 500;
  cursor: pointer;
  
  svg {
    margin-left: 4px;
  }
`;

const NavigationTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #DFE1E6;
  padding: 0 30px;
`;

const NavTab = styled.div`
  padding: 14px 20px;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#0052CC' : 'transparent'};
  color: ${props => props.active ? '#0052CC' : '#6B778C'};
  font-weight: 500;
`;

const ContentContainer = styled.div`
  padding: 32px 40px;
`;

const HeroSection = styled.div`
  display: flex;
  margin-bottom: 40px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  &.hero-section {
    /* Class for PDF export styling */
    display: flex;
    align-items: center;
  }
`;

const HeroText = styled.div`
  flex: 1;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding-right: 0;
    padding-bottom: 20px;
  }
  
  &.hero-text {
    /* Class for PDF export styling */
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const HeroTitle = styled.h2`
  font-size: 24px;
  color: #172B4D;
  margin-bottom: 16px;
  line-height: 1.3;
  text-align: center;
  
  &.hero-title {
    /* Class for PDF export styling */
    text-align: center;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }
  
  .placeholder {
    width: 100%;
    height: 100%;
    min-height: 220px;
    background-color: #F4F5F7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6B778C;
    border-radius: 8px;
  }
  
  &.hero-image {
    /* Class for PDF export styling */
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
`;

const YouTubePlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #FF0000;
  }
  
  &:before {
    content: '';
    border-style: solid;
    border-width: 10px 0 10px 20px;
    border-color: transparent transparent transparent white;
  }
`;

const HighlightSection = styled.div`
  display: flex;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  &.highlight-section {
    /* Class for PDF export styling */
  }
`;

const HighlightContent = styled.div`
  flex: 1;
  
  &.highlight-content {
    /* Class for PDF export styling */
  }
  
  @media (max-width: 768px) {
    order: ${props => props.imageRight ? 2 : 1};
    padding-bottom: 20px;
  }
`;

const HighlightTitleStyled = styled.h3`
  font-size: 20px;
  color: #172B4D;
  margin-bottom: 12px;
  padding-top: ${props => props.imageRight ? '0' : '20px'};
  
  &.highlight-title-styled {
    /* Class for PDF export styling */
  }
`;

const HighlightSummaryStyled = styled.div`
  font-size: 16px;
  color: #172B4D;
  line-height: 1.5;
  
  &.highlight-summary-styled {
    /* Class for PDF export styling */
  }
`;

const HighlightImageContainer = styled.div`
  flex: 1;
  border-radius: 3px;
  overflow: hidden;
  margin: ${props => props.imageRight ? '0 0 0 30px' : '0 30px 0 0'};
  
  @media (max-width: 768px) {
    order: ${props => props.imageRight ? 1 : 2};
    margin: 0 0 20px 0;
  }
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  
  .placeholder {
    width: 100%;
    height: 100%;
    min-height: 220px;
    background-color: #F4F5F7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6B778C;
  }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #172B4D;
  margin-bottom: 16px;
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #DFE1E6;
`;

const MoreDetailsContent = styled.div`
  font-size: 16px;
  color: #172B4D;
  line-height: 1.5;
  
  ul {
    padding-left: 20px;
    margin-bottom: 16px;
  }
  
  li {
    margin-bottom: 8px;
  }
`;

const SupportingMedia = styled.div`
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #DFE1E6;
  
  h3 {
    font-size: 20px;
    color: #172B4D;
    margin-bottom: 16px;
  }
  
  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  
  .media-item {
    border: 1px solid #DFE1E6;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .media-image {
    width: 100%;
    height: 150px;
    background-color: #F4F5F7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6B778C;
  }
`;

const EmptyState = styled.div`
  padding: 32px;
  text-align: center;
  color: #6B778C;
  background-color: #F4F5F7;
  border-radius: 6px;
  margin: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  
  h3 {
    color: #172B4D;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 500;
  }
  
  p {
    max-width: 400px;
    line-height: 1.5;
    font-size: 14px;
  }
  
  svg {
    margin-bottom: 16px;
    color: #0052CC;
  }
`;

const MarketplacePreview = ({ formData }) => {
  const previewContentRef = useRef(null);
  const hasBasicInfo = formData.appName || formData.appTagline || formData.appLogo;
  const hasHighlight1 = formData.highlightTitle1 || formData.highlightSummary1 || formData.highlightScreenshot1;
  const hasHighlight2 = formData.highlightTitle2 || formData.highlightSummary2 || formData.highlightScreenshot2;
  const hasHighlight3 = formData.highlightTitle3 || formData.highlightSummary3 || formData.highlightScreenshot3;
  
  // Utility function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Match patterns like:
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    // https://youtube.com/shorts/VIDEO_ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Utility function to get YouTube thumbnail URL
  const getYouTubeThumbnailUrl = (videoId) => {
    if (!videoId) return null;
    // Using maxresdefault for highest quality thumbnail
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };
  
  // Generate the "works with" text based on selected products
  const getWorksWithText = () => {
    const selectedProducts = [];
    
    if (formData.worksWithProducts?.jiraCloud) {
      selectedProducts.push('Jira Cloud');
    }
    
    if (formData.worksWithProducts?.jiraDataCenter) {
      selectedProducts.push('Jira Data Center');
    }
    
    if (formData.worksWithProducts?.confluenceCloud) {
      selectedProducts.push('Confluence Cloud');
    }
    
    if (formData.worksWithProducts?.confluenceDataCenter) {
      selectedProducts.push('Confluence Data Center');
    }
    
    if (selectedProducts.length === 0) {
      return 'works with Confluence Cloud, Confluence Server 7.20.0 - 9.7.3, Confluence Data Center 8.0.0 - 9.2.3 and more';
    }
    
    return `works with ${selectedProducts.join(', ')}`;
  };
  
  // Extract YouTube video ID if a YouTube URL is provided
  const youtubeVideoId = getYouTubeVideoId(formData.appYouTubeUrl);
  const youtubeThumbnailUrl = getYouTubeThumbnailUrl(youtubeVideoId);
  
  return (
    <PreviewContainer>
      <PreviewTitle>Marketplace Preview</PreviewTitle>
      
      <div ref={previewContentRef}>
        {!hasBasicInfo && !hasHighlight1 && !hasHighlight2 && !hasHighlight3 ? (
          <EmptyState>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor"/>
            </svg>
            <h3>Add your app name on the left and your preview will appear!</h3>
            <p>We do not take any responsibility for the content of the preview. It is up to you to ensure that it is correct and up to date.</p>
          </EmptyState>
        ) : (
          <>
            <MarketplaceHeader className="marketplace-header">
              <AppLogoContainer>
                {formData.appLogo ? (
                  <img src={formData.appLogo} alt="App Logo" />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#F4F5F7' }}></div>
                )}
              </AppLogoContainer>
              
              <AppInfoHeader className="app-info-header">
                <AppNameHeader>{formData.appName || 'Your App Name'}</AppNameHeader>
                <AppVendor>
                  by&nbsp;<a href="#">{formData.companyName || 'Your Company'}</a><a href="#"></a>
                </AppVendor>
                <AppCompatibility>
                  {getWorksWithText()}
                </AppCompatibility>
              </AppInfoHeader>
              
              <HeaderActions>
                <TryFreeButton>Try it free</TryFreeButton>
                <BuyNowButton>Buy now</BuyNowButton>
                <MoreOptionsButton>•••</MoreOptionsButton>
              </HeaderActions>
            </MarketplaceHeader>
            
            <StatsContainer>
              <StatColumn>
                <StatTitle>Overall ratings</StatTitle>
                <Rating>
                  <span className="rating-value">3.8/4</span>
                  <div className="stars">
                    ★★★★☆
                  </div>
                  <span className="reviews">(1169)</span>
                </Rating>
              </StatColumn>
              
              <StatColumn>
                <StatTitle>Installs</StatTitle>
                <Installs>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 5.41V21a1 1 0 0 1-2 0V5.41l-5.3 5.3a1 1 0 1 1-1.4-1.42l7-7a1 1 0 0 1 1.4 0l7 7a1 1 0 1 1-1.4 1.42L13 5.4z" />
                  </svg>
                  1,052
                </Installs>
              </StatColumn>
              
              <StatColumn>
                <StatTitle>Support</StatTitle>
                <SupportInfo>
                  <SupportTag>PARTNER SUPPORTED</SupportTag>
                  <CloudTag>CLOUD MIGRATION ASSISTANCE</CloudTag>
                </SupportInfo>
              </StatColumn>
            </StatsContainer>
            
            <ViewForContainer>
              <ViewForLabel>View for:</ViewForLabel>
              <ViewForSelect>
                Cloud
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z" fill="currentColor" />
                </svg>
              </ViewForSelect>
            </ViewForContainer>
            
            <NavigationTabs>
              <NavTab active>Overview</NavTab>
              <NavTab>Reviews</NavTab>
              <NavTab>Pricing</NavTab>
              <NavTab>Privacy & Security</NavTab>
              <NavTab>Support</NavTab>
              <NavTab>Installation</NavTab>
            </NavigationTabs>
            
            <ContentContainer>
              <HeroSection className="hero-section">
                <HeroText className="hero-text">
                  <HeroTitle className="hero-title">
                    {formData.appTagline || 'Streamline your team\'s productivity with our intuitive task management solution, trusted by thousands of teams since 2018'}
                  </HeroTitle>
                </HeroText>
                
                <HeroImage className="hero-image">
                  {youtubeThumbnailUrl ? (
                    <>
                      <img src={youtubeThumbnailUrl} alt="App Video Thumbnail" />
                      <YouTubePlayButton />
                    </>
                  ) : formData.appBanner ? (
                    <img src={formData.appBanner} alt="App Banner" />
                  ) : (
                    <div className="placeholder">
                      App Banner (1120 x 548px) or YouTube Video URL
                    </div>
                  )}
                </HeroImage>
              </HeroSection>
              
              {hasHighlight1 && (
                <HighlightSection className="highlight-section">
                  <HighlightImageContainer>
                    {formData.highlightScreenshot1 ? (
                      <img src={formData.highlightScreenshot1} alt="Highlight Screenshot 1" />
                    ) : (
                      <div className="placeholder">
                        Highlight Screenshot 1 (1840 x 900px)
                      </div>
                    )}
                  </HighlightImageContainer>
                  
                  <HighlightContent className="highlight-content">
                    <HighlightTitleStyled className="highlight-title-styled">
                      {formData.highlightTitle1 || 'The intelligent task management solution for modern teams'}
                    </HighlightTitleStyled>
                    <HighlightSummaryStyled className="highlight-summary-styled">
                      {formData.highlightSummary1 || 'Choose TaskFlow Pro for powerful task management that brings clarity to any project. From Kanban boards to Gantt charts and sprint planning to resource allocation, TaskFlow Pro enhances your productivity with customizable workflows and templates.'}
                    </HighlightSummaryStyled>
                  </HighlightContent>
                </HighlightSection>
              )}
              
              {hasHighlight2 && (
                <HighlightSection className="highlight-section">
                  <HighlightContent imageRight className="highlight-content">
                    <HighlightTitleStyled imageRight className="highlight-title-styled">
                      {formData.highlightTitle2 || 'Why teams choose TaskFlow Pro for project management'}
                    </HighlightTitleStyled>
                    <HighlightSummaryStyled className="highlight-summary-styled">
                      {formData.highlightSummary2 || 'TaskFlow Pro combines task management and team collaboration in one app, enabling real-time updates with full Jira integration. Customize workflows and automate repetitive tasks to create, assign, and track work directly within your existing tools.'}
                    </HighlightSummaryStyled>
                  </HighlightContent>
                  
                  <HighlightImageContainer imageRight>
                    {formData.highlightScreenshot2 ? (
                      <img src={formData.highlightScreenshot2} alt="Highlight Screenshot 2" />
                    ) : (
                      <div className="placeholder">
                        Highlight Screenshot 2 (1840 x 900px)
                      </div>
                    )}
                  </HighlightImageContainer>
                </HighlightSection>
              )}
              
              {hasHighlight3 && (
                <HighlightSection className="highlight-section">
                  <HighlightImageContainer>
                    {formData.highlightScreenshot3 ? (
                      <img src={formData.highlightScreenshot3} alt="Highlight Screenshot 3" />
                    ) : (
                      <div className="placeholder">
                        Highlight Screenshot 3 (1840 x 900px)
                      </div>
                    )}
                  </HighlightImageContainer>
                  
                  <HighlightContent className="highlight-content">
                    <HighlightTitleStyled className="highlight-title-styled">
                      {formData.highlightTitle3 || 'Smart Automation'}
                    </HighlightTitleStyled>
                    <HighlightSummaryStyled className="highlight-summary-styled">
                      {formData.highlightSummary3 || 'Save time with intelligent automation that handles repetitive tasks. Set up custom triggers and actions to automatically assign tasks, send notifications, update statuses, and generate reports based on your team\'s specific workflow needs.'}
                    </HighlightSummaryStyled>
                  </HighlightContent>
                </HighlightSection>
              )}
              
              {formData.moreDetails && (
                <>
                  <SectionTitle>More details</SectionTitle>
                  <MoreDetailsContent>
                    {(() => {
                      const paragraphs = formData.moreDetails.split('\n');
                      const elements = [];
                      let inList = false;
                      let currentListItems = [];
                      let listKey = 0;
                      
                      paragraphs.forEach((paragraph, index) => {
                        const isBullet = paragraph.trim().startsWith('* ') || paragraph.trim().startsWith('- ');
                        
                        if (isBullet) {
                          // Add the bullet point to the current list
                          currentListItems.push(
                            <li key={`li-${index}`}>{paragraph.trim().substring(2)}</li>
                          );
                          inList = true;
                        } else {
                          // If we were in a list and now we're not, add the list to elements
                          if (inList) {
                            elements.push(
                              <ul key={`ul-${listKey}`}>{currentListItems}</ul>
                            );
                            currentListItems = [];
                            listKey++;
                            inList = false;
                          }
                          
                          // Add the paragraph if it's not empty
                          if (paragraph.trim()) {
                            elements.push(<p key={`p-${index}`}>{paragraph}</p>);
                          }
                        }
                      });
                      
                      // If we're still in a list at the end, add it to elements
                      if (inList) {
                        elements.push(
                          <ul key={`ul-${listKey}`}>{currentListItems}</ul>
                        );
                      }
                      
                      return elements;
                    })()}
                  </MoreDetailsContent>
                </>
              )}
              
              {formData.videoUrl && (
                <SupportingMedia>
                  <h3>Supporting media</h3>
                  <div className="media-grid">
                    <div className="media-item">
                      <div className="media-image">
                        Video URL: {formData.videoUrl}
                      </div>
                    </div>
                  </div>
                </SupportingMedia>
              )}
            </ContentContainer>
          </>
        )}
      </div>
      
      {hasBasicInfo && <DownloadOptions previewRef={previewContentRef} formData={formData} />}
    </PreviewContainer>
  );
};

export default MarketplacePreview; 