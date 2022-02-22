import { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { ScreenSize, Sizes } from '../../shared/constants';

interface NonAuthFormProps {
  /**
   * Header of the NonAuthForm
   */
  header?: ReactNode;
  /**
   * Instruction Header of the NonAuthForm. like `Reset Password` and `Forgot Password`
   */
  instructionHeader?: ReactNode;
  /**
   * Instructions of the NonAuthForm.
   */
  instructions?: ReactNode;
  /**
   * Link of the NonAuthForm.
   */
  footer?: ReactNode;
}

/**
 * NonAuthForm presentation component.
 *
 * @param {NonAuthFormProps} - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
export const NonAuthForm: FC<NonAuthFormProps> = ({
  children,
  header,
  instructionHeader,
  instructions,
  footer,
}) => {
  return (
    <>
      {header && <Header>{header}</Header>}
      {instructionHeader && (
        <InstructionHeader>{instructionHeader}</InstructionHeader>
      )}
      {instructions && <Instructions>{instructions}</Instructions>}
      {children}
      <Footer>{footer}</Footer>
    </>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;

  @media only screen and (max-width: ${ScreenSize.sm}px) {
    display: none;
  }
`;

const InstructionHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Instructions = styled.div`
  margin-bottom: 100px;

  @media only screen and (max-width: ${ScreenSize.sm}px) {
    margin-bottom: 50px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: ${Sizes.xxSmall}px;
`;
