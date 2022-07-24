/* eslint-disable */
import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    blue?: PaletteColorOptions;
    dark5?: PaletteColorOptions;
    hb5?: PaletteColorOptions;
    orange3?: PaletteColorOptions;
  }
}

export interface Theme {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  mixins: Mixins;
  overrides?: Overrides;
  palette: PaletteOptions;
  props?: ComponentsProps;
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
}
