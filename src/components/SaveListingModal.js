import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(9, 30, 66, 0.54);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  padding: 24px;
`;

const ModalHeader = styled.div`
  margin-bottom: 16px;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #172B4D;
  margin: 0;
`;

const ModalBody = styled.div`
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #172B4D;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 2px solid #DFE1E6;
  border-radius: 3px;
  
  &:focus {
    border-color: #4C9AFF;
    outline: none;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 3px;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: #42526E;
  border: 1px solid #DFE1E6;
  
  &:hover {
    background-color: #F4F5F7;
  }
`;

const SaveButton = styled(Button)`
  background-color: #0052CC;
  color: white;
  border: none;
  
  &:hover {
    background-color: #0747A6;
  }
  
  &:disabled {
    background-color: #C1C7D0;
    cursor: not-allowed;
  }
`;

const SaveListingModal = ({ isOpen, onClose, onSave, listingName = '' }) => {
  const [name, setName] = useState(listingName || '');
  
  useEffect(() => {
    if (isOpen) {
      setName(listingName || '');
    }
  }, [isOpen, listingName]);
  
  if (!isOpen) return null;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(name);
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Save Marketplace Listing</ModalTitle>
          </ModalHeader>
          
          <ModalBody>
            <FormGroup>
              <Label htmlFor="listing-name">Listing Name</Label>
              <Input
                id="listing-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a name for this listing"
                autoFocus
              />
            </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SaveButton type="submit" disabled={!name.trim()}>
              Save Listing
            </SaveButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SaveListingModal; 