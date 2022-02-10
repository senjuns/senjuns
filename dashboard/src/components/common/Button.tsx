import { forwardRef, HTMLAttributes } from 'react';
import styled from 'styled-components';

import { Colors, Sizes } from 'shared/constants';

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
}

const getButtonStyles = (color: ButtonProps['color']) => {
  switch (color) {
    case 'primary':
      return {
        backgroundColor: Colors.orange3,
        border: 'none',
        color: Colors.white,
      };
    case 'secondary':
      return {
        backgroundColor: Colors.dark1,
        border: 'none',
        color: Colors.white,
      };
    case 'white':
    default:
      return {
        backgroundColor: Colors.white,
        border: `2px solid ${Colors.dark9}`,
        color: Colors.black,
      };
  }
};

/**
 * Button presentation component.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, color = 'primary', disabled, fullWidth, ...rest }, ref) => {
    return (
      <StyledButton
        color={color}
        disabled={disabled}
        fullWidth={fullWidth}
        ref={ref}
        aria-disabled={disabled ? true : undefined}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

interface StyledButtonProps extends Pick<ButtonProps, 'color' | 'fullWidth'> {}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${Sizes.large}px;

  border-radius: 10px;
  cursor: pointer;

  ${(props) => getButtonStyles(props.color)}
  ${(props) => (props.fullWidth ? 'width: 100%' : '')};
  ${(props) => (props.disabled ? 'filter: grayscale(30%)' : '')};

  font-weight: 500;
  font-size: 18px;
  line-height: 20px;

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;
