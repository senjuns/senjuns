import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '../shared/constants';

export interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'style' | 'defaultValue'
  > {
  label?: string;
  value: string;
  className?: string;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * TextInput presentation component
 * Currently it's using mui TextField under the hood.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, value, onChange, ...rest }, ref) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      onChange(event.target.value, event);
    };

    return (
      <InputContainer>
        {label && <Label>{label}</Label>}
        <Input ref={ref} value={value} onChange={handleChange} {...rest} />
      </InputContainer>
    );
  }
);

TextInput.displayName = 'TextInput';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${COLORS.grey4};
`;

const Input = styled.input`
  padding: 12px 0px;
  border: none;
  border-bottom: 1px solid ${COLORS.grey5};
  outline: none;
`;
