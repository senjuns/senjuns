import React from 'react';
import styled from 'styled-components';
import { Colors, Fonts } from '../../shared/constants';

interface TypographyProps {
  children: any;
  /**
   * className to be applied to the component.
   */
  className?: string;
  /**
   * Color of text to be displayed.
   *  default => black
   *  gray => gray
   */
  color?: 'default' | 'gray';
  /**
   * Variant of fonts to be used.
   */
  variant: keyof typeof Fonts;
  /**
   * Font style to be applied directly.
   */
  fontWeight?: string;
  /**
   * Line height to be applied.
   */
  lineHeight?: number | string;
}

export const Typography: React.FC<TypographyProps> = ({
  className,
  children,
  color,
  fontWeight,
  lineHeight,
  variant,
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
  extends Pick<TypographyProps, 'fontWeight' | 'variant' | 'lineHeight'> {}

const StyledSpan = styled.span<StyledSpanProps>`
  ${(props) => (props.color === 'gray' ? `color: ${Colors.dark7}` : '')};
  font-family: Poppins;
  font-size: ${(props) => Fonts[props.variant].size}px;
  font-weight: ${(props) => props.fontWeight || Fonts[props.variant].weight};
  font-style: ${(props) => Fonts[props.variant].style};
  line-height: ${(props) => props.lineHeight || 1.25};
`;
