import {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  HTMLAttributes,
} from 'react';
import styled from 'styled-components';

type DropdownValue = string | number;

export interface DropdownOption {
  id: DropdownValue;
  label: string;
}

export interface DropdownProps
  extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
  className?: string;
  options: DropdownOption[];
  value: DropdownValue;
  testId?: string;
  onChange: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  (
    { className, options, value, onChange, testId = 'select', ...props },
    ref
  ) => {
    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
      onChange(event.target.value, event);
    };

    return (
      <Select
        className={className}
        data-testid={testId}
        ref={ref}
        value={value}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <Option
            data-testid={`${testId}-option-${option.id}`}
            key={option.id}
            value={option.id}
          >
            {option.label}
          </Option>
        ))}
      </Select>
    );
  }
);

Dropdown.displayName = 'Dropdown';

const Select = styled.select`
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 24px;
  max-width: 300px;
`;

const Option = styled.option`
  cursor: pointer;
  width: 100%;
  user-select: none;
  &:hover {
    background: lightgrey;
    color: white;
  }
`;
