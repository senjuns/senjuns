import React, { FC } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import styled from 'styled-components';

import { Colors, Fonts } from 'shared/constants';

interface LinkProps extends Omit<RouterLinkProps, 'color'> {
  /**
   * Text to be rendered inside the component.
   */
  text: React.ReactNode;
  /**
   * Color to be applied to the link.
   */
  color?: keyof typeof Colors;
  /**
   * Class to be added to the link.
   */
  className?: string;
  /**
   * Color to be applied to the link.
   */
  hoverColor?: keyof typeof Colors;
}

export const Link: FC<LinkProps> = ({
  color,
  className,
  hoverColor,
  text,
  to,
  ...props
}) => {
  return (
    <StyledLink
      className={className}
      $linkColor={color}
      $hoverColor={hoverColor}
      to={to}
      {...props}
    >
      {text}
    </StyledLink>
  );
};

interface StyledLinkProps {
  $linkColor?: LinkProps['color'];
  $hoverColor?: LinkProps['hoverColor'];
}

const StyledLink = styled(RouterLink)<StyledLinkProps>`
  font-weight: 600;
  font-size: ${Fonts.body2.size}px;
  text-decoration: none;
  color: ${(props) => Colors[props.$linkColor || 'orange3']};

  &:hover {
    color: ${(props) => Colors[props.$hoverColor || 'orange4']};
  }
`;
