import { forwardRef, HTMLAttributes } from 'react';
import styled from 'styled-components';

import { COLORS, SIZES } from '../shared/constants';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * The disabled boolean value.
   */
  disabled?: boolean;
  /**
   * Shows the button in full width mode.
   */
  fullWidth?: boolean;
  /**
   * The type of button.
   *  - By default, it sets to button.
   *  - In the form, it can be submit to be used as a submit button.
   */
  type?: 'submit' | 'reset' | 'button';
  /**
   * Color of button which determines the button.
   */
  color?: 'primary' | 'secondary' | 'white';
  /**
   * The variant of the button.
   * - By default, it sets to contained.
   */
  variant?: 'outlined' | 'contained';
}

const getButtonStyles = (
  color: ButtonProps['color'],
  variant: 'outlined' | 'contained'
) => {
  switch (color) {
    case 'primary':
      return {
        background: variant === 'contained' ? COLORS.orange2 : 'transparent',
        border:
          variant === 'contained' ? 'none' : `1px solid ${COLORS.orange2}`,
        color: COLORS.orange2,
      };
    case 'secondary':
      return {
        background: variant === 'contained' ? COLORS.black : 'transparent',
        border: variant === 'contained' ? 'none' : `1px solid ${COLORS.white}`,
        color: COLORS.white,
      };
    case 'white':
    default:
      return {
        background: variant === 'contained' ? COLORS.white : 'transparent',
        border: `2px solid ${COLORS.dark9}`,
        color: COLORS.black,
      };
  }
};

/**
 * Button presentation component.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = 'primary',
      disabled,
      fullWidth,
      variant = 'contained',
      ...rest
    },
    ref
  ) => {
    return (
      <StyledButton
        color={color}
        disabled={disabled}
        fullWidth={fullWidth}
        ref={ref}
        aria-disabled={disabled ? true : undefined}
        variant={variant}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

interface StyledButtonProps extends Pick<ButtonProps, 'color' | 'fullWidth'> {
  variant: 'outlined' | 'contained';
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${SIZES.small}px ${SIZES.large}px;

  border-radius: 20px;
  cursor: pointer;

  ${(props) => getButtonStyles(props.color, props.variant)}
  ${(props) => (props.fullWidth ? 'width: 100%' : '')};
  ${(props) => (props.disabled ? 'filter: grayscale(30%)' : '')};

  font-weight: 500;
  font-size: 18px;
  line-height: 20px;

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;
