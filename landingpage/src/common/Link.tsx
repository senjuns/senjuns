import React, { FC } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import styled from 'styled-components';

import { COLORS, FONTS, SIZES } from 'shared/constants';

interface LinkProps extends Omit<RouterLinkProps, 'color'> {
  /**
   * Text to be rendered inside the component.
   */
  text: React.ReactNode;
  /**
   * Color to be applied to the link.
   */
  color?: keyof typeof COLORS;
  /**
   * Class to be added to the link.
   */
  className?: string;
  /**
   * Color to be applied to the link.
   */
  hoverColor?: keyof typeof COLORS;
  /**
   * Variant to be applied to the link.
   */
  variant?: 'text' | 'contained';
}

export const Link: FC<LinkProps> = ({
  color = 'white',
  className,
  hoverColor = 'grey5',
  text,
  to,
  variant = 'text',
  ...props
}) => {
  return (
    <StyledLink
      className={className}
      $linkColor={color}
      $hoverColor={hoverColor}
      to={to}
      variant={variant}
      {...props}
    >
      {text}
    </StyledLink>
  );
};

interface StyledLinkProps {
  $linkColor: keyof typeof COLORS;
  $hoverColor: keyof typeof COLORS;
  variant: 'text' | 'contained';
}

const StyledLink = styled(RouterLink)<StyledLinkProps>`
  ${({ variant, $hoverColor, $linkColor }) => {
    switch (variant) {
      case 'text':
        return `
          font-weight: 600;
          font-size: ${FONTS.body1.size}px;
          text-decoration: none;
          color: ${COLORS[$linkColor]};
        
          &:hover {
            color: ${COLORS[$hoverColor]};
          }
        `;
      case 'contained':
      default:
        return `
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: ${SIZES.small}px ${SIZES.large}px;

          background: ${COLORS.orange2};
          color: ${$linkColor};

          border-radius: 20px;
          cursor: pointer;

          font-weight: 600;
          font-size: 14px;
          line-height: 120%;
          text-decoration: none;
        `;
    }
  }}
`;
