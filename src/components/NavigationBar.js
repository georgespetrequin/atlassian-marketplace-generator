import React, { useState, useRef, useEffect } from 'react';
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
  gap: 16px;
`;

const NavLink = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 10;
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 4px;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  color: #172B4D;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background-color: #F4F5F7;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #6B778C;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    color: #DE350B;
  }
`;

const StartNewButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
`;

const UserEmail = styled.span`
  font-size: 14px;
  color: white;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const EmptyState = styled.div`
  padding: 16px;
  text-align: center;
  color: #6B778C;
  font-size: 14px;
`;

const NavigationBar = ({ 
  savedListings, 
  onSelectListing, 
  onSaveCurrentListing, 
  onDeleteListing, 
  onStartNewListing,
  user,
  onLogout
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
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
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <NavContainer>
      <NavContent>
        <Logo>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z" fill="white"/>
          </svg>
          Atlassian Marketplace Preview Builder
        </Logo>
        
        {user ? (
          <>
            <NavLinks>
              <UserInfo>
                <UserEmail>{user.email}</UserEmail>
                <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
              </UserInfo>
              
              <StartNewButton onClick={onStartNewListing}>
                Start New Listing
              </StartNewButton>
              
              <NavLink onClick={onSaveCurrentListing}>
                Save Current Listing
              </NavLink>
              
              <NavLink ref={dropdownRef}>
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
          </>
        ) : (
          <div>
            {/* No navigation links shown when user is not logged in */}
          </div>
        )}
      </NavContent>
    </NavContainer>
  );
};

export default NavigationBar; 