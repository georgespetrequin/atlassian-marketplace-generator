import React from 'react';
import styled from '@emotion/styled';

const DialogOverlay = styled.div`
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

const DialogContent = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  padding: 24px;
`;

const DialogHeader = styled.div`
  margin-bottom: 16px;
`;

const DialogTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #172B4D;
  margin: 0;
`;

const DialogBody = styled.div`
  margin-bottom: 24px;
  color: #42526E;
`;

const DialogFooter = styled.div`
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

const ConfirmButton = styled(Button)`
  background-color: ${props => props.destructive ? '#FF5630' : '#0052CC'};
  color: white;
  border: none;
  
  &:hover {
    background-color: ${props => props.destructive ? '#DE350B' : '#0747A6'};
  }
`;

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  destructive = false
}) => {
  if (!isOpen) return null;
  
  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <DialogBody>
          {message}
        </DialogBody>
        
        <DialogFooter>
          <CancelButton onClick={onClose}>
            {cancelText}
          </CancelButton>
          <ConfirmButton 
            destructive={destructive} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </ConfirmButton>
        </DialogFooter>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ConfirmationDialog; 