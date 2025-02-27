import React from 'react';
import styled from '@emotion/styled';
import AuthForm from './AuthForm';

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
  max-width: 450px;
  padding: 24px;
`;

const ModalHeader = styled.div`
  margin-bottom: 16px;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #172B4D;
  margin: 0;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #6B778C;
  margin: 8px 0 0 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #6B778C;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: 4px;
  
  &:hover {
    color: #172B4D;
  }
`;

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  if (!isOpen) return null;
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <ModalHeader>
          <ModalTitle>Create an Account or Log In</ModalTitle>
          <ModalSubtitle>
            You need to be logged in to save your marketplace listing
          </ModalSubtitle>
        </ModalHeader>
        
        <AuthForm onLogin={onLogin} onRegister={onRegister} />
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal; 