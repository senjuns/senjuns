import { FC } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from 'contexts';
import theme from 'theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({ cache: new InMemoryCache() });

/**
 * This Providers component will be used as a wrapper for the components to be rendered in.
 * This can include some sort of Context Providers and more.
 * @returns {JSX.Element} render result
 */
export const Providers: FC = ({ children }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  </ApolloProvider>
);
