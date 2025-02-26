import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const DownloadContainer = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #DFE1E6;
  background-color: #FAFBFC;
  display: block !important; /* Ensure this is always displayed */
`;

const DownloadTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 12px;
  color: #172B4D;
  font-weight: 500;
`;

const DownloadButtons = styled.div`
  display: flex;
  gap: 12px;
  visibility: visible !important; /* Ensure buttons are always visible */
`;

const DownloadButton = styled.button`
  background-color: white;
  color: #0052CC;
  border: 1px solid #DFE1E6;
  border-radius: 3px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex !important; /* Force display flex */
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
  opacity: ${props => props.disabled ? 0.6 : 1};
  
  &:hover {
    background-color: ${props => props.disabled ? 'white' : '#F4F5F7'};
  }
  
  svg {
    width: 16px;
    height: 16px;
    display: inline-block !important; /* Ensure SVG is displayed */
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(9, 30, 66, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(9, 30, 66, 0.25);
  padding: 20px;
  text-align: center;
  max-width: 300px;
  
  h4 {
    margin-top: 16px;
    margin-bottom: 8px;
    color: #172B4D;
  }
  
  p {
    color: #6B778C;
    margin-bottom: 0;
  }
  
  .spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 3px solid rgba(0, 82, 204, 0.2);
    border-radius: 50%;
    border-top-color: #0052CC;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const DownloadOptions = ({ previewRef, formData }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Add debugging useEffect
  useEffect(() => {
    console.log('DownloadOptions component mounted');
    
    // Check if we're on the live site
    const isLiveSite = window.location.hostname.includes('github.io');
    console.log('Is live site:', isLiveSite);
    
    // Log the styles of the download container after mounting
    setTimeout(() => {
      const container = document.querySelector('.download-options-container');
      const buttons = document.querySelectorAll('.download-button');
      
      if (container) {
        console.log('Download container found:', container);
        console.log('Container computed style:', window.getComputedStyle(container));
      } else {
        console.error('Download container not found in DOM');
      }
      
      if (buttons && buttons.length > 0) {
        console.log('Download buttons found:', buttons.length);
        console.log('First button computed style:', window.getComputedStyle(buttons[0]));
      } else {
        console.error('Download buttons not found in DOM');
      }
    }, 1000);
  }, []);
  
  // Function to download as PDF
  const downloadAsPDF = () => {
    if (!previewRef.current) return;
    
    // Show loading indicator
    setIsGeneratingPDF(true);
    
    const element = previewRef.current;
    const filename = `${formData.appName || 'Marketplace-Preview'}.pdf`;
    
    // Add a class to the element for PDF styling
    element.classList.add('pdf-export');
    
    // Create a clone of the element to modify for PDF export
    const clone = element.cloneNode(true);
    
    // Fix text wrapping issues by adding explicit width to text elements
    const textElements = clone.querySelectorAll('h1, h2, h3, p, div');
    textElements.forEach(el => {
      if (el.textContent && el.textContent.trim().length > 0) {
        // Only apply to elements with text content
        el.style.maxWidth = '100%';
        el.style.wordWrap = 'break-word';
        el.style.overflowWrap = 'break-word';
        el.style.whiteSpace = 'normal';
      }
    });
    
    // Specifically target the hero title which seems to be problematic
    const heroTitles = clone.querySelectorAll('.hero-title');
    heroTitles.forEach(title => {
      title.style.fontSize = '18px';
      title.style.lineHeight = '1.4';
      title.style.letterSpacing = '-0.01em';
      title.style.whiteSpace = 'normal';
      title.style.textAlign = 'center';
    });
    
    // Ensure proper styling for hero section
    const heroSections = clone.querySelectorAll('.hero-section');
    heroSections.forEach(section => {
      section.style.display = 'flex';
      section.style.alignItems = 'center';
      section.style.marginBottom = '30px';
      section.style.pageBreakInside = 'avoid';
    });
    
    // Style hero text containers
    const heroTexts = clone.querySelectorAll('.hero-text');
    heroTexts.forEach(text => {
      text.style.flex = '1';
      text.style.display = 'flex';
      text.style.flexDirection = 'column';
      text.style.justifyContent = 'center';
    });
    
    // Style hero images
    const heroImages = clone.querySelectorAll('.hero-image');
    heroImages.forEach(image => {
      image.style.flex = '1';
      image.style.display = 'flex';
      image.style.justifyContent = 'center';
      image.style.alignItems = 'center';
      image.style.borderRadius = '8px';
    });
    
    // Ensure proper spacing between sections
    const sections = clone.querySelectorAll('.highlight-section');
    sections.forEach(section => {
      section.style.marginBottom = '30px';
      section.style.pageBreakInside = 'avoid';
    });
    
    // Create a temporary container for the clone
    const container = document.createElement('div');
    container.appendChild(clone);
    document.body.appendChild(container);
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    
    const options = {
      margin: [15, 15, 20, 15], // top, right, bottom, left margins in mm
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };
    
    html2pdf()
      .set(options)
      .from(clone)
      .save()
      .then(() => {
        // Clean up
        document.body.removeChild(container);
        element.classList.remove('pdf-export');
        setIsGeneratingPDF(false);
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
        document.body.removeChild(container);
        element.classList.remove('pdf-export');
        setIsGeneratingPDF(false);
      });
  };
  
  // Function to download as text
  const downloadAsText = () => {
    if (!previewRef.current) return;
    
    const element = previewRef.current;
    const filename = `${formData.appName || 'Marketplace-Preview'}.txt`;
    
    // Extract text content
    let content = '';
    
    // App basic info
    content += `App Name: ${formData.appName || 'Not specified'}\n`;
    content += `Tagline: ${formData.appTagline || 'Not specified'}\n`;
    content += `Company: ${formData.companyName || 'Not specified'}\n\n`;
    
    // Compatibility
    content += 'Compatible with: ';
    const compatProducts = [];
    if (formData.worksWithProducts?.jiraCloud) compatProducts.push('Jira Cloud');
    if (formData.worksWithProducts?.jiraDataCenter) compatProducts.push('Jira Data Center');
    if (formData.worksWithProducts?.confluenceCloud) compatProducts.push('Confluence Cloud');
    if (formData.worksWithProducts?.confluenceDataCenter) compatProducts.push('Confluence Data Center');
    content += compatProducts.length > 0 ? compatProducts.join(', ') : 'Not specified';
    content += '\n\n';
    
    // Highlights
    content += '=== HIGHLIGHTS ===\n\n';
    
    if (formData.highlightTitle1 || formData.highlightSummary1) {
      content += `Highlight 1: ${formData.highlightTitle1 || 'Not specified'}\n`;
      content += `Description: ${formData.highlightSummary1 || 'Not specified'}\n\n`;
    }
    
    if (formData.highlightTitle2 || formData.highlightSummary2) {
      content += `Highlight 2: ${formData.highlightTitle2 || 'Not specified'}\n`;
      content += `Description: ${formData.highlightSummary2 || 'Not specified'}\n\n`;
    }
    
    if (formData.highlightTitle3 || formData.highlightSummary3) {
      content += `Highlight 3: ${formData.highlightTitle3 || 'Not specified'}\n`;
      content += `Description: ${formData.highlightSummary3 || 'Not specified'}\n\n`;
    }
    
    // More details
    if (formData.moreDetails) {
      content += '=== MORE DETAILS ===\n\n';
      content += formData.moreDetails + '\n\n';
    }
    
    // Video URL
    if (formData.appYouTubeUrl) {
      content += '=== VIDEO ===\n\n';
      content += `YouTube URL: ${formData.appYouTubeUrl}\n\n`;
    }
    
    // Create and download the text file
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  };
  
  // Function to download as spreadsheet (XLSX)
  const downloadAsSpreadsheet = () => {
    if (!previewRef.current) return;
    
    const filename = `${formData.appName || 'Marketplace-Preview'}.xlsx`;
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    
    // Basic Info worksheet
    const basicInfoData = [
      ['App Name', formData.appName || 'Not specified'],
      ['Tagline', formData.appTagline || 'Not specified'],
      ['Company', formData.companyName || 'Not specified'],
      ['YouTube URL', formData.appYouTubeUrl || 'Not specified'],
    ];
    
    // Compatibility row
    const compatProducts = [];
    if (formData.worksWithProducts?.jiraCloud) compatProducts.push('Jira Cloud');
    if (formData.worksWithProducts?.jiraDataCenter) compatProducts.push('Jira Data Center');
    if (formData.worksWithProducts?.confluenceCloud) compatProducts.push('Confluence Cloud');
    if (formData.worksWithProducts?.confluenceDataCenter) compatProducts.push('Confluence Data Center');
    basicInfoData.push(['Compatible with', compatProducts.length > 0 ? compatProducts.join(', ') : 'Not specified']);
    
    const basicInfoWs = XLSX.utils.aoa_to_sheet(basicInfoData);
    XLSX.utils.book_append_sheet(wb, basicInfoWs, 'Basic Info');
    
    // Highlights worksheet
    const highlightsData = [
      ['Highlight', 'Title', 'Description'],
      ['Highlight 1', formData.highlightTitle1 || 'Not specified', formData.highlightSummary1 || 'Not specified'],
      ['Highlight 2', formData.highlightTitle2 || 'Not specified', formData.highlightSummary2 || 'Not specified'],
      ['Highlight 3', formData.highlightTitle3 || 'Not specified', formData.highlightSummary3 || 'Not specified'],
    ];
    
    const highlightsWs = XLSX.utils.aoa_to_sheet(highlightsData);
    XLSX.utils.book_append_sheet(wb, highlightsWs, 'Highlights');
    
    // More Details worksheet (if available)
    if (formData.moreDetails) {
      const moreDetailsData = [
        ['More Details'],
        [formData.moreDetails]
      ];
      
      const moreDetailsWs = XLSX.utils.aoa_to_sheet(moreDetailsData);
      XLSX.utils.book_append_sheet(wb, moreDetailsWs, 'More Details');
    }
    
    // Generate and download the XLSX file
    XLSX.writeFile(wb, filename);
  };
  
  // Use regular HTML elements instead of styled components for the live site
  return (
    <>
      {/* Use regular HTML with inline styles instead of styled components */}
      <div 
        className="download-options-container"
        style={{
          padding: '16px 20px',
          borderTop: '1px solid #DFE1E6',
          backgroundColor: '#FAFBFC',
          display: 'block'
        }}
      >
        <h3 
          style={{
            fontSize: '16px',
            marginBottom: '12px',
            color: '#172B4D',
            fontWeight: 500
          }}
        >
          Download Preview
        </h3>
        <div 
          className="download-buttons-container"
          style={{
            display: 'flex',
            gap: '12px',
            visibility: 'visible'
          }}
        >
          <button 
            onClick={downloadAsPDF} 
            disabled={isGeneratingPDF}
            className="download-button pdf-button"
            style={{
              backgroundColor: 'white',
              color: '#0052CC',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: isGeneratingPDF ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s',
              opacity: isGeneratingPDF ? 0.6 : 1
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor"
              style={{
                width: '16px',
                height: '16px',
                display: 'inline-block'
              }}
            >
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            PDF
          </button>
          <button 
            onClick={downloadAsText}
            className="download-button text-button"
            style={{
              backgroundColor: 'white',
              color: '#0052CC',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor"
              style={{
                width: '16px',
                height: '16px',
                display: 'inline-block'
              }}
            >
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            Text
          </button>
          <button 
            onClick={downloadAsSpreadsheet}
            className="download-button spreadsheet-button"
            style={{
              backgroundColor: 'white',
              color: '#0052CC',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor"
              style={{
                width: '16px',
                height: '16px',
                display: 'inline-block'
              }}
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.99 6H7V7h10.01v2zm0 4H7v-2h10.01v2zm-3 4H7v-2h7.01v2z"/>
            </svg>
            Spreadsheet
          </button>
        </div>
      </div>
      
      {isGeneratingPDF && (
        <LoadingOverlay>
          <LoadingContent>
            <div className="spinner"></div>
            <h4>Generating PDF</h4>
            <p>This may take a few moments...</p>
          </LoadingContent>
        </LoadingOverlay>
      )}
    </>
  );
};

export default DownloadOptions; 