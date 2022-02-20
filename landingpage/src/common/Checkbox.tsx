import React, { forwardRef } from 'react';
import styled from 'styled-components';

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'style' | 'defaultValue'
  > {
  label?: string;
  value: boolean;
  className?: string;
  onChange: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

/**
 * Checkbox presentation component
 * Currently it's using mui TextField under the hood.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, value, onChange, ...rest }, ref) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      onChange(event.target.checked, event);
    };

    return (
      <InputContainer>
        <Input
          ref={ref}
          checked={value}
          type="checkbox"
          onChange={handleChange}
          {...rest}
        />
        {label && <Label>{label}</Label>}
      </InputContainer>
    );
  }
);

Checkbox.displayName = 'Checkbox';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Label = styled.label`
  margin-left: 8px;
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
`;
