import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MarketplaceForm from './components/MarketplaceForm';
import MarketplacePreview from './components/MarketplacePreview';
import NavigationBar from './components/NavigationBar';
import SaveListingModal from './components/SaveListingModal';
import ConfirmationDialog from './components/ConfirmationDialog';
import AuthForm from './components/AuthForm';
import AuthModal from './components/AuthModal';
import { saveMarketplaceListing, getMarketplaceListings, deleteMarketplaceListing } from './services/listingService';
import { registerUser, loginUser, logoutUser, getCurrentUser, onAuthStateChange } from './services/authService';

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

const AuthContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const WelcomeTitle = styled.h1`
  font-size: 28px;
  color: #172B4D;
  margin-bottom: 16px;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  color: #6B778C;
  max-width: 600px;
  margin: 0 auto;
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
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingSaveAction, setPendingSaveAction] = useState(false);

  // Check for existing user session on component mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsAuthenticating(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          // If user is logged in, fetch their listings
          await fetchSavedListings(currentUser.id);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsAuthenticating(false);
      }
    };
    
    checkUser();
    
    // Set up auth state change listener
    const unsubscribe = onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        await fetchSavedListings(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSavedListings([]);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchSavedListings = async (userId) => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      const listings = await getMarketplaceListings(userId);
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
    if (!user) {
      // Instead of showing a notification, open the auth modal
      setIsAuthModalOpen(true);
      // Set a flag to indicate we want to save after login
      setPendingSaveAction(true);
      return;
    }
    
    setIsSaveModalOpen(true);
  };

  const handleSaveModalClose = () => {
    setIsSaveModalOpen(false);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    setPendingSaveAction(false);
  };

  const handleSaveListing = async (listingName) => {
    if (!user) {
      // This shouldn't happen now, but just in case
      setIsAuthModalOpen(true);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Prepare the listing data with a name
      const listingToSave = {
        ...formData,
        listingName,
      };
      
      // Save to Supabase with user ID
      await saveMarketplaceListing(listingToSave, user.id);
      
      // Refresh the listings
      await fetchSavedListings(user.id);
      
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
    if (!listingToDelete || !user) return;
    
    try {
      setIsLoading(true);
      
      // Delete from Supabase with user ID
      await deleteMarketplaceListing(listingToDelete, user.id);
      
      // Refresh the listings
      await fetchSavedListings(user.id);
      
      // Show success notification
      showNotification('Listing deleted successfully');
    } catch (error) {
      showNotification('Error deleting listing', 'error');
    } finally {
      setIsLoading(false);
      setListingToDelete(null);
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleStartNewListing = () => {
    setFormData(initialFormData);
    showNotification('Started a new listing');
  };

  const handleLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const { user: loggedInUser } = await loginUser(email, password);
      setUser(loggedInUser);
      await fetchSavedListings(loggedInUser.id);
      
      // Close the auth modal
      setIsAuthModalOpen(false);
      
      // If there was a pending save action, open the save modal
      if (pendingSaveAction) {
        setPendingSaveAction(false);
        setIsSaveModalOpen(true);
      }
      
      showNotification('Logged in successfully');
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      setIsLoading(true);
      const { user: registeredUser } = await registerUser(email, password);
      setUser(registeredUser);
      
      // Close the auth modal
      setIsAuthModalOpen(false);
      
      // If there was a pending save action, open the save modal
      if (pendingSaveAction) {
        setPendingSaveAction(false);
        setIsSaveModalOpen(true);
      }
      
      showNotification('Account created successfully');
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setUser(null);
      setSavedListings([]);
      showNotification('Logged out successfully');
    } catch (error) {
      showNotification('Error logging out', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Show loading state while checking authentication
  if (isAuthenticating) {
    return (
      <AppContainer>
        <NavigationBar />
        <Main>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Loading...
          </div>
        </Main>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <NavigationBar 
        savedListings={savedListings}
        onSelectListing={handleSelectListing}
        onSaveCurrentListing={handleSaveCurrentListing}
        onDeleteListing={handleDeleteListing}
        onStartNewListing={handleStartNewListing}
        user={user}
        onLogout={handleLogout}
      />
      
      <Main>
        <Content>
          <MarketplaceForm 
            formData={formData}
            onChange={handleFormChange}
          />
          
          <MarketplacePreview 
            formData={formData}
          />
        </Content>
      </Main>
      
      <Footer>
        <FooterContent>
          &copy; {new Date().getFullYear()} Atlassian Marketplace App Builder
        </FooterContent>
      </Footer>
      
      <SaveListingModal
        isOpen={isSaveModalOpen}
        onClose={handleSaveModalClose}
        onSave={handleSaveListing}
      />
      
      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteListing}
        title="Delete Listing"
        message="Are you sure you want to delete this listing? This action cannot be undone."
        confirmText="Delete"
        destructive={true}
      />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        onLogin={handleLogin}
        onRegister={handleRegister}
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