import { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as Check } from '../../assets/svg/check.svg';
import { Typography } from '../../components/common';
import { Colors, Sizes } from '../../shared/constants';
import { TPasswordRule } from '../../shared/interfaces';

interface PasswordRulesProps {
  /**
   * ConfirmPassword
   */
  confirmPassword: string;
  /**
   * Password
   */
  password: string;
  /**
   * Rules to check in the component.
   */
  rules: TPasswordRule[];
}

/**
 * PasswordRules component.
 *
 * @param {PasswordRulesProps} - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
export const PasswordRules: FC<PasswordRulesProps> = ({
  confirmPassword,
  password,
  rules,
}) => {
  return (
    <RulesContainer>
      {rules.map((rule) => (
        <RuleItem key={rule.label}>
          <CheckIcon disabled={!rule.check(password, confirmPassword)}>
            <Check />
          </CheckIcon>
          <Typography variant="body1">{rule.label}</Typography>
        </RuleItem>
      ))}
    </RulesContainer>
  );
};

const RulesContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 30px;
`;

const RuleItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;

  &:not(:last-type-of) {
    margin-bottom: ${Sizes.small}px;
  }
`;

interface CheckIconProps {
  disabled: boolean;
}

const CheckIcon = styled.span<CheckIconProps>`
  color: ${(props) => (props.disabled ? Colors.hb4 : Colors.green1)};
  margin-right: ${Sizes.medium}px;
`;
