import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: `Poppins, Inter, Quicksand, Sans Serif`,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    fontWeightBold: 600,
    fontSize: 16,
    h1: {
      fontWeight: 'bold',
      fontSize: 56,
      lineHeight: 1.15,
    },
    h2: {
      fontWeight: 'bold',
      fontSize: 44,
      lineHeight: 1.1,
    },
    h3: {
      fontWeight: 'bold',
      fontSize: 36,
      lineHeight: 1.1,
    },
    h4: {
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 'bold',
      fontSize: 22,
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.25,
    },
    body2: {
      fontSize: 14,
      lineHeight: 1.428,
    },
    caption: {
      fontSize: 12,
      lineHeight: 1.67,
      color: '#5F5F5F',
    },
  },
  palette: {
    primary: {
      main: '#45A2F8',
    },
    secondary: {
      main: '#F2F6FF',
    },
    blue: {
      main: '#2986D2',
    },
    dark5: {
      main: '#5F5F5F',
    },
    hb5: {
      main: '#F0F1F4',
    },
    orange3: {
      main: '#F48E42',
    },
  },
});

export default theme;
