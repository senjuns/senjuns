import { forwardRef, HTMLAttributes } from 'react';
import styled from 'styled-components';

import { Sizes } from '../../shared/constants';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * The disabled boolean value.
   */
  disabled?: boolean;
}

/**
 * IconButton presentation component.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, disabled, ...rest }, ref) => {
    return (
      <StyledIconButton
        disabled={disabled}
        ref={ref}
        aria-disabled={disabled ? true : undefined}
        {...rest}
      >
        {children}
      </StyledIconButton>
    );
  }
);

IconButton.displayName = 'IconButton';

interface StyledIconButtonProps extends Pick<IconButtonProps, 'disabled'> {}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${Sizes.medium}px;
  background: none;
  border: none;

  cursor: pointer;
  ${(props) => (props.disabled ? 'filter: grayscale(30%)' : '')};

  font-weight: 500;
  font-size: 18px;
  line-height: 20px;

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;
