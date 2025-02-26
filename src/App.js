import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MarketplaceForm from './components/MarketplaceForm';
import MarketplacePreview from './components/MarketplacePreview';
import NavigationBar from './components/NavigationBar';
import SaveListingModal from './components/SaveListingModal';
import ConfirmationDialog from './components/ConfirmationDialog';
import { saveMarketplaceListing, getMarketplaceListings, deleteMarketplaceListing } from './services/listingService';

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

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${props => props.type === 'error' ? '#FF5630' : '#36B37E'};
  color: white;
  padding: 12px 16px;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 300px;
`;

function App() {
  const initialFormData = {
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
  };
  
  const [formData, setFormData] = useState(initialFormData);
  
  const [savedListings, setSavedListings] = useState([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch saved listings on component mount
  useEffect(() => {
    fetchSavedListings();
  }, []);

  useEffect(() => {
    console.log('SUPABASE URL:', process.env.REACT_APP_SUPABASE_URL);
    console.log('SUPABASE KEY EXISTS:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
  }, []);

  const fetchSavedListings = async () => {
    try {
      setIsLoading(true);
      const listings = await getMarketplaceListings();
      setSavedListings(listings);
    } catch (error) {
      showNotification('Error fetching saved listings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveCurrentListing = () => {
    setIsSaveModalOpen(true);
  };

  const handleSaveModalClose = () => {
    setIsSaveModalOpen(false);
  };

  const handleSaveListing = async (listingName) => {
    try {
      setIsLoading(true);
      
      // Prepare the listing data with a name
      const listingToSave = {
        ...formData,
        listingName,
      };
      
      // Save to Supabase
      await saveMarketplaceListing(listingToSave);
      
      // Refresh the listings
      await fetchSavedListings();
      
      // Close the modal
      setIsSaveModalOpen(false);
      
      // Show success notification
      showNotification('Listing saved successfully');
    } catch (error) {
      showNotification('Error saving listing', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectListing = (listing) => {
    // Update the form data with the selected listing
    setFormData(listing);
    showNotification('Listing loaded successfully');
  };

  const handleDeleteListing = (listingId) => {
    setListingToDelete(listingId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteListing = async () => {
    if (!listingToDelete) return;
    
    try {
      setIsLoading(true);
      
      // Delete from Supabase
      await deleteMarketplaceListing(listingToDelete);
      
      // Refresh the listings
      await fetchSavedListings();
      
      // Show success notification
      showNotification('Listing deleted successfully');
    } catch (error) {
      showNotification('Error deleting listing', 'error');
    } finally {
      setIsLoading(false);
      setListingToDelete(null);
    }
  };

  const handleStartNewListing = () => {
    setFormData(initialFormData);
    showNotification('Started a new listing');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <AppContainer>
      <NavigationBar 
        savedListings={savedListings}
        onSelectListing={handleSelectListing}
        onSaveCurrentListing={handleSaveCurrentListing}
        onDeleteListing={handleDeleteListing}
        onStartNewListing={handleStartNewListing}
      />
      
      <Main>
        <Content>
          <MarketplaceForm formData={formData} onChange={handleFormChange} />
          <MarketplacePreview formData={formData} />
        </Content>
      </Main>
      
      <Footer>
        <FooterContent>
          Atlassian Marketplace Preview Builder - A tool for product marketers and developers
        </FooterContent>
      </Footer>
      
      <SaveListingModal 
        isOpen={isSaveModalOpen}
        onClose={handleSaveModalClose}
        onSave={handleSaveListing}
        listingName={formData.appName}
      />
      
      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteListing}
        title="Delete Listing"
        message="Are you sure you want to delete this listing? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        destructive={true}
      />
      
      {notification && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
    </AppContainer>
  );
}

export default App; 