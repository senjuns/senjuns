import React from 'react';
import styled from 'styled-components';
import { COLORS, FONTS } from '../shared/constants';

interface TypographyProps {
  /**
   * className to be applied to the component.
   */
  className?: string;
  /**
   * Color of text to be displayed.
   *  default => black
   *  gray => gray
   */
  color?: keyof typeof COLORS;
  /**
   * Variant of fonts to be used.
   */
  variant?: keyof typeof FONTS;
  /**
   * Font style to be applied directly.
   */
  fontWeight?: string;
  /**
   * Line height to be applied.
   */
  lineHeight?: number | string;

  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  className,
  children,
  color = 'black',
  fontWeight,
  lineHeight,
  variant = 'h5',
}) => {
  return (
    <StyledSpan
      className={className}
      color={color}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      variant={variant}
    >
      {children}
    </StyledSpan>
  );
};

interface StyledSpanProps
  extends Pick<TypographyProps, 'fontWeight' | 'lineHeight'> {
  color: keyof typeof COLORS;
  variant: keyof typeof FONTS;
}

const StyledSpan = styled.span<StyledSpanProps>`
  color: ${(props) => COLORS[props.color]};
  font-family: Poppins;
  font-size: ${(props) => FONTS[props.variant].size}px;
  font-weight: ${(props) => props.fontWeight || FONTS[props.variant].weight};
  font-style: ${(props) => FONTS[props.variant].style};
  line-height: ${(props) => props.lineHeight || 1.25};
`;
