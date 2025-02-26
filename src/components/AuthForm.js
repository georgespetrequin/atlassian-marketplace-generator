import React, { useState } from 'react';
import styled from '@emotion/styled';

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #172B4D;
  margin: 0 0 16px 0;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #172B4D;
`;

const Input = styled.input`
  padding: 8px 12px;
  font-size: 14px;
  border: 2px solid #DFE1E6;
  border-radius: 3px;
  
  &:focus {
    border-color: #4C9AFF;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: #0052CC;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  
  &:hover {
    background-color: #0747A6;
  }
  
  &:disabled {
    background-color: #C1C7D0;
    cursor: not-allowed;
  }
`;

const ToggleText = styled.p`
  font-size: 14px;
  color: #6B778C;
  text-align: center;
  margin: 16px 0 0 0;
`;

const ToggleLink = styled.button`
  background: none;
  border: none;
  color: #0052CC;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #DE350B;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background-color: #FFEBE6;
  border-radius: 3px;
`;

const AuthForm = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await onLogin(email, password);
      } else {
        await onRegister(email, password);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };
  
  return (
    <AuthContainer>
      <Title>{isLogin ? 'Log In' : 'Create Account'}</Title>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </FormGroup>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : isLogin ? 'Log In' : 'Sign Up'}
        </Button>
      </Form>
      
      <ToggleText>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <ToggleLink type="button" onClick={toggleAuthMode}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </ToggleLink>
      </ToggleText>
    </AuthContainer>
  );
};

export default AuthForm; 