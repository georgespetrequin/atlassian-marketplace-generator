import React from 'react';
import styled from '@emotion/styled';

const FormGroup = styled.div`
  margin-bottom: 24px;
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #172B4D;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #DFE1E6;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: #FFFFFF;
  box-sizing: border-box;
  
  &:hover {
    background-color: #FAFBFC;
    border-color: #C1C7D0;
  }
  
  &:focus {
    border-color: #4C9AFF;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.2);
  }
  
  ${props => props.isWarning && `
    border-color: #FFAB00;
    &:focus {
      box-shadow: 0 0 0 2px rgba(255, 171, 0, 0.2);
    }
  `}
  
  ${props => props.isError && `
    border-color: #FF5630;
    &:focus {
      box-shadow: 0 0 0 2px rgba(255, 86, 48, 0.2);
    }
  `}
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #DFE1E6;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s ease;
  background-color: #FFFFFF;
  box-sizing: border-box;
  
  &:hover {
    background-color: #FAFBFC;
    border-color: #C1C7D0;
  }
  
  &:focus {
    border-color: #4C9AFF;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.2);
  }
  
  ${props => props.isWarning && `
    border-color: #FFAB00;
    &:focus {
      box-shadow: 0 0 0 2px rgba(255, 171, 0, 0.2);
    }
  `}
  
  ${props => props.isError && `
    border-color: #FF5630;
    &:focus {
      box-shadow: 0 0 0 2px rgba(255, 86, 48, 0.2);
    }
  `}
`;

const HelperText = styled.div`
  font-size: 12px;
  color: #6B778C;
  margin-top: 6px;
  line-height: 1.4;
`;

const CharacterCount = styled.div`
  font-size: 12px;
  color: ${props => {
    if (props.count > props.max) return '#FF5630';
    if (props.count >= props.max * 0.9) return '#FFAB00';
    return '#6B778C';
  }};
  text-align: right;
  margin-top: 6px;
  font-weight: ${props => props.count >= props.max * 0.9 ? '500' : 'normal'};
`;

const FieldFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 6px;
  width: 100%;
`;

const FormField = ({
  label,
  name,
  value,
  onChange,
  maxLength,
  helperText,
  textarea = false,
  ...props
}) => {
  const characterCount = value ? value.length : 0;
  const isWarning = maxLength && characterCount >= maxLength * 0.9 && characterCount < maxLength;
  const isError = maxLength && characterCount > maxLength;
  
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      
      {textarea ? (
        <Textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          maxLength={maxLength}
          isWarning={isWarning}
          isError={isError}
          {...props}
        />
      ) : (
        <Input
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          maxLength={maxLength}
          isWarning={isWarning}
          isError={isError}
          {...props}
        />
      )}
      
      <FieldFooter>
        {helperText && <HelperText>{helperText}</HelperText>}
        
        {maxLength && (
          <CharacterCount count={characterCount} max={maxLength}>
            {characterCount}/{maxLength}
          </CharacterCount>
        )}
      </FieldFooter>
    </FormGroup>
  );
};

export default FormField; 