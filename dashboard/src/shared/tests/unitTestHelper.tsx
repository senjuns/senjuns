import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import { FC } from 'react';
import { AuthProvider } from '../../contexts';
import theme from '../../theme';

const client = new ApolloClient({ cache: new InMemoryCache() });

/**
 * This Providers component will be used as a wrapper for the components to be rendered in.
 * This can include some sort of Context Providers and more.
 * @returns {JSX.Element} render result
 */
export const Providers: FC<any> = ({ children }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  </ApolloProvider>
);
