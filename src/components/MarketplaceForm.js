import React from 'react';
import styled from '@emotion/styled';
import FormField from './FormField';

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  height: fit-content;
`;

const FormTitle = styled.h2`
  margin-bottom: 24px;
  color: #172B4D;
  font-size: 22px;
  font-weight: 600;
`;

const FormSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 16px;
  color: #172B4D;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: #0052CC;
    margin-right: 8px;
    border-radius: 2px;
  }
`;

const HighlightSection = styled.div`
  border: 1px solid #DFE1E6;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 24px;
  background-color: #FAFBFC;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const HighlightTitle = styled.h4`
  margin-bottom: 16px;
  font-size: 15px;
  color: #172B4D;
  font-weight: 600;
`;

const FileInputLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #172B4D;
`;

const FileInput = styled.div`
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  
  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }
  
  .file-input-button {
    background-color: white;
    color: #0052CC;
    border: 1px solid #DFE1E6;
    border-radius: 4px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
    transition: all 0.2s ease;
    position: relative;
    z-index: 0;
    
    &:hover {
      background-color: #F4F5F7;
      border-color: #C1C7D0;
    }
  }
  
  .file-name {
    margin-left: 12px;
    font-size: 14px;
    color: #6B778C;
  }
`;

const InfoText = styled.div`
  font-size: 13px;
  color: #6B778C;
  margin: 10px 0 16px 0;
  padding: 12px;
  background-color: #F4F5F7;
  border-radius: 4px;
  line-height: 1.5;
  border-left: 3px solid #DFE1E6;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const CheckboxGroup = styled.div`
  margin: 12px 0 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #172B4D;
  cursor: pointer;
  padding: 6px 0;
  
  input {
    margin-right: 10px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  
  &:hover {
    color: #0052CC;
  }
`;

const MarketplaceForm = ({ formData, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(name, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange('worksWithProducts', {
      ...formData.worksWithProducts,
      [name]: checked
    });
  };

  return (
    <FormContainer>
      <FormTitle>Create Your Marketplace Listing</FormTitle>
      
      <FormSection>
        <SectionTitle>Basic Information</SectionTitle>
        
        <FormField
          label="App Name"
          name="appName"
          value={formData.appName}
          onChange={handleInputChange}
          maxLength={60}
          helperText="Use title casing, 60 characters or less"
        />
        
        <InfoText>
          Example: "TaskFlow Pro | Task Management, Automation, Reporting & Workflows"
          <br />
          Ensure your app name does NOT include the words: Atlassian, plugin, beta, BETA, Beta, add-on, or app.
        </InfoText>
        
        <FormField
          label="Your Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          maxLength={60}
          helperText="The name of your company that will be displayed in the marketplace listing"
        />
        
        <FormField
          label="App Tagline"
          name="appTagline"
          value={formData.appTagline}
          onChange={handleInputChange}
          maxLength={130}
          helperText="A short phrase that summarizes what your app can do, 130 characters or less"
        />
        
        <InfoText>
          Example: "Streamline your team's productivity with our intuitive task management solution, trusted by thousands of teams since 2018"
        </InfoText>
        
        <FormGroup>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px', color: '#172B4D' }}>Works with</label>
          <CheckboxGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="jiraCloud"
                checked={formData.worksWithProducts.jiraCloud}
                onChange={handleCheckboxChange}
              />
              Jira Cloud
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="jiraDataCenter"
                checked={formData.worksWithProducts.jiraDataCenter}
                onChange={handleCheckboxChange}
              />
              Jira Data Center
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="confluenceCloud"
                checked={formData.worksWithProducts.confluenceCloud}
                onChange={handleCheckboxChange}
              />
              Confluence Cloud
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="confluenceDataCenter"
                checked={formData.worksWithProducts.confluenceDataCenter}
                onChange={handleCheckboxChange}
              />
              Confluence Data Center
            </CheckboxLabel>
          </CheckboxGroup>
        </FormGroup>
        
        <FormGroup>
          <FileInputLabel>App Logo (144 x 144px PNG/JPG)</FileInputLabel>
          <FileInput>
            <div className="file-input-button">Choose File</div>
            <span className="file-name">
              {formData.appLogo ? 'Logo selected' : 'No file chosen'}
            </span>
            <input
              type="file"
              name="appLogo"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </FileInput>
          <InfoText>
            Upload a crisp logo at 144 x 144px. Use transparent or bounded, chiclet-style backgrounds.
          </InfoText>
        </FormGroup>
        
        <FormGroup>
          <FileInputLabel>App Banner (1120 x 548px PNG/JPG)</FileInputLabel>
          <FileInput>
            <div className="file-input-button">Choose File</div>
            <span className="file-name">
              {formData.appBanner ? 'Banner selected' : 'No file chosen'}
            </span>
            <input
              type="file"
              name="appBanner"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </FileInput>
          <InfoText>
            Provide a banner at 1120 x 548px in PNG/JPG format. Include your app name, your partner name, and brief text about your app's functionality.
          </InfoText>
        </FormGroup>
        
        <FormGroup>
          <FormField
            label="YouTube Video URL (Alternative to App Banner)"
            name="appYouTubeUrl"
            value={formData.appYouTubeUrl || ''}
            onChange={handleInputChange}
            placeholder="https://www.youtube.com/watch?v=..."
            helperText="Enter a YouTube video URL to use as your app banner"
          />
          <InfoText>
            <strong>Note:</strong> You can either upload an image banner OR provide a YouTube video URL, not both. If both are provided, the YouTube video will be displayed. Many app vendors use a YouTube video as their banner to better showcase their app's functionality.
          </InfoText>
        </FormGroup>
      </FormSection>
      
      <FormSection>
        <SectionTitle>Highlight 1</SectionTitle>
        <HighlightSection>
          <FormField
            label="Highlight Title"
            name="highlightTitle1"
            value={formData.highlightTitle1}
            onChange={handleInputChange}
            maxLength={50}
            helperText="A short action-oriented title, 50 characters or less"
          />
          
          <InfoText>
            Example: "The intelligent task management solution for modern teams"
          </InfoText>
          
          <FormField
            label="Highlight Summary"
            name="highlightSummary1"
            value={formData.highlightSummary1}
            onChange={handleInputChange}
            maxLength={220}
            textarea
            helperText="Summarize your app's key feature, 220 characters or less"
          />
          
          <FormGroup>
            <FileInputLabel>Highlight Screenshot (1840 x 900px PNG/JPG)</FileInputLabel>
            <FileInput>
              <div className="file-input-button">Choose File</div>
              <span className="file-name">
                {formData.highlightScreenshot1 ? 'Screenshot selected' : 'No file chosen'}
              </span>
              <input
                type="file"
                name="highlightScreenshot1"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </FileInput>
            <InfoText style={{ marginBottom: 0 }}>
              Illustrate your highlight with a screenshot. High-definition display screenshots encouraged.
            </InfoText>
          </FormGroup>
        </HighlightSection>
      </FormSection>
      
      <FormSection>
        <SectionTitle>Highlight 2</SectionTitle>
        <HighlightSection>
          <FormField
            label="Highlight Title"
            name="highlightTitle2"
            value={formData.highlightTitle2}
            onChange={handleInputChange}
            maxLength={50}
            helperText="A short action-oriented title, 50 characters or less"
          />
          
          <InfoText>
            Example: "Why teams choose TaskFlow Pro for project management"
          </InfoText>
          
          <FormField
            label="Highlight Summary"
            name="highlightSummary2"
            value={formData.highlightSummary2}
            onChange={handleInputChange}
            maxLength={220}
            textarea
            helperText="Summarize your app's key feature, 220 characters or less"
          />
          
          <FormGroup>
            <FileInputLabel>Highlight Screenshot (1840 x 900px PNG/JPG)</FileInputLabel>
            <FileInput>
              <div className="file-input-button">Choose File</div>
              <span className="file-name">
                {formData.highlightScreenshot2 ? 'Screenshot selected' : 'No file chosen'}
              </span>
              <input
                type="file"
                name="highlightScreenshot2"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </FileInput>
            <InfoText style={{ marginBottom: 0 }}>
              Illustrate your highlight with a screenshot. High-definition display screenshots encouraged.
            </InfoText>
          </FormGroup>
        </HighlightSection>
      </FormSection>
      
      <FormSection>
        <SectionTitle>Highlight 3</SectionTitle>
        <HighlightSection>
          <FormField
            label="Highlight Title"
            name="highlightTitle3"
            value={formData.highlightTitle3}
            onChange={handleInputChange}
            maxLength={50}
            helperText="A short action-oriented title, 50 characters or less"
          />
          
          <InfoText>
            Example: "Smart Automation"
          </InfoText>
          
          <FormField
            label="Highlight Summary"
            name="highlightSummary3"
            value={formData.highlightSummary3}
            onChange={handleInputChange}
            maxLength={220}
            textarea
            helperText="Summarize your app's key feature, 220 characters or less"
          />
          
          <FormGroup>
            <FileInputLabel>Highlight Screenshot (1840 x 900px PNG/JPG)</FileInputLabel>
            <FileInput>
              <div className="file-input-button">Choose File</div>
              <span className="file-name">
                {formData.highlightScreenshot3 ? 'Screenshot selected' : 'No file chosen'}
              </span>
              <input
                type="file"
                name="highlightScreenshot3"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </FileInput>
            <InfoText style={{ marginBottom: 0 }}>
              Illustrate your highlight with a screenshot. High-definition display screenshots encouraged.
            </InfoText>
          </FormGroup>
        </HighlightSection>
      </FormSection>
      
      <FormSection>
        <SectionTitle>Additional Information</SectionTitle>
        
        <FormField
          label="More Details"
          name="moreDetails"
          value={formData.moreDetails}
          onChange={handleInputChange}
          maxLength={1000}
          textarea
          helperText="List awards, testimonials, accolades, or other details about your app, 1000 characters or less"
        />
        
        <InfoText>
          Example: "You can use TaskFlow Pro to manage everything: Task Management and Tracking (Kanban boards, Gantt charts, Sprint planning...), Workflow Automation (Custom triggers, Smart assignments, Time tracking...), Reporting and Analytics (Burndown charts, Velocity metrics, Custom dashboards...)..."<br />
          <strong>Tip:</strong> You can create bullet points by starting a new line with "* " or "- " followed by your text.
        </InfoText>
        
        <FormField
          label="Video URL (YouTube)"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleInputChange}
          helperText="Provide a YouTube link to a short video about your app"
        />
        
        <InfoText style={{ marginBottom: 0 }}>
          Users like short videos (30 seconds or less), and videos that show how your app is used. Marketplace displays your video as 800 x 600px.
        </InfoText>
      </FormSection>
    </FormContainer>
  );
};

export default MarketplaceForm; 