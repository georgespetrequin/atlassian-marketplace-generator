import React, { useState } from 'react';
import styled from '@emotion/styled';

const NavContainer = styled.nav`
  background-color: #0052CC;
  color: white;
  padding: 16px 0;
`;

const NavContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.div`
  margin-left: 24px;
  position: relative;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StartNewButton = styled(NavLink)`
  background-color: #36B37E;
  color: white;
  padding: 8px 16px;
  border-radius: 3px;
  font-weight: 500;
  
  &:hover {
    background-color: #2da06c;
    text-decoration: none;
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 8px;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 250px;
  z-index: 10;
  margin-top: 8px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  color: #172B4D;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background-color: #F4F5F7;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #FF5630;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
  border-radius: 3px;
  
  &:hover {
    background-color: #FFEBE6;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const EmptyState = styled.div`
  padding: 16px;
  color: #6B778C;
  text-align: center;
  font-style: italic;
`;

const NavigationBar = ({ 
  savedListings = [], 
  onSelectListing, 
  onSaveCurrentListing,
  onDeleteListing,
  onStartNewListing
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleSelectListing = (listing) => {
    onSelectListing(listing);
    setDropdownOpen(false);
  };
  
  const handleDeleteClick = (e, listingId) => {
    e.stopPropagation();
    onDeleteListing(listingId);
  };
  
  return (
    <NavContainer>
      <NavContent>
        <Logo>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9999 0C5.3839 0 0 5.3839 0 11.9999C0 18.6159 5.3839 24 11.9999 24C18.6159 24 24 18.6159 24 11.9999C24 5.3839 18.6159 0 11.9999 0ZM16.5479 16.5479C15.9359 17.1599 14.9519 17.1599 14.3399 16.5479L11.9999 14.2079L9.6599 16.5479C9.0479 17.1599 8.0639 17.1599 7.4519 16.5479C6.8399 15.9359 6.8399 14.9519 7.4519 14.3399L9.7919 11.9999L7.4519 9.6599C6.8399 9.0479 6.8399 8.0639 7.4519 7.4519C8.0639 6.8399 9.0479 6.8399 9.6599 7.4519L11.9999 9.7919L14.3399 7.4519C14.9519 6.8399 15.9359 6.8399 16.5479 7.4519C17.1599 8.0639 17.1599 9.0479 16.5479 9.6599L14.2079 11.9999L16.5479 14.3399C17.1599 14.9519 17.1599 15.9359 16.5479 16.5479Z" fill="white"/>
          </svg>
          Atlassian Marketplace Preview Builder
        </Logo>
        
        <NavLinks>
          <StartNewButton onClick={onStartNewListing}>
            Start New Listing
          </StartNewButton>
          
          <NavLink onClick={onSaveCurrentListing}>
            Save Current Listing
          </NavLink>
          
          <NavLink>
            <DropdownButton onClick={toggleDropdown}>
              Saved Listings
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </DropdownButton>
            
            <DropdownMenu isOpen={dropdownOpen}>
              {savedListings.length > 0 ? (
                savedListings.map((listing) => (
                  <DropdownItem 
                    key={listing.id} 
                    onClick={() => handleSelectListing(listing)}
                  >
                    <span>{listing.listingName || listing.appName || 'Unnamed Listing'}</span>
                    <DeleteButton 
                      onClick={(e) => handleDeleteClick(e, listing.id)}
                      title="Delete listing"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                      </svg>
                    </DeleteButton>
                  </DropdownItem>
                ))
              ) : (
                <EmptyState>No saved listings yet</EmptyState>
              )}
            </DropdownMenu>
          </NavLink>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default NavigationBar; 