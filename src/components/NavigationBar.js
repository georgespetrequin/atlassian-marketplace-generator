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

const SaveButton = styled.button`
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

const DropdownHeader = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px;
  color: #172B4D;
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #F4F5F7;
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleSelectListing = (listing) => {
    onSelectListing(listing);
    setIsDropdownOpen(false);
  };
  
  const handleDeleteClick = (e, listingId) => {
    e.stopPropagation();
    onDeleteListing(listingId);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
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
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
            <path d="M2 17L12 22L22 17" fill="white"/>
            <path d="M2 12L12 17L22 12" fill="white"/>
          </svg>
          Atlassian Marketplace App Builder
        </Logo>
        
        <NavLinks>
          <StartNewButton onClick={onStartNewListing}>
            Start New Listing
          </StartNewButton>
          
          <SaveButton onClick={onSaveCurrentListing}>
            Save Listing
          </SaveButton>
          
          {user ? (
            <NavLink ref={dropdownRef}>
              <DropdownButton onClick={toggleDropdown}>
                {user.email}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </DropdownButton>
              
              <DropdownMenu isOpen={isDropdownOpen}>
                {savedListings && savedListings.length > 0 ? (
                  <>
                    <DropdownHeader>Your Saved Listings</DropdownHeader>
                    {savedListings.map(listing => (
                      <DropdownItem key={listing.id} onClick={() => handleSelectListing(listing)}>
                        {listing.listingName}
                        <DeleteButton onClick={(e) => handleDeleteClick(e, listing.id)}>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
                          </svg>
                        </DeleteButton>
                      </DropdownItem>
                    ))}
                  </>
                ) : (
                  <DropdownItem>No saved listings</DropdownItem>
                )}
                
                <DropdownDivider />
                
                <DropdownItem onClick={onLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </NavLink>
          ) : null}
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default NavigationBar; 