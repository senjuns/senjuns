import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Container from '@material-ui/core/Container';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import Amplify, { Auth } from 'aws-amplify';

import { AuthProvider, RoomProvider } from 'contexts';
import { FeatureFlagsProvider } from 'contexts/FeatureFlagsProvider';

import { lazy, Suspense } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import config from 'shared/config';
import { APP_URL } from 'shared/constants';
import { ProtectedRoute } from './ProtectedRoute';
import theme from './theme';
import ErrorBoundary from 'components/error/ErrorBoundary';

const Home = lazy(() => import('pages/home/Home'));
const Login = lazy(() => import('pages/auth/LoginPage'));
const ForgotPassword = lazy(() => import('pages/auth/ForgotPasswordPage'));
const Reset = lazy(() => import('pages/auth/ResetPasswordPage'));
const NotFoundPage = lazy(() => import('pages/not_found/NotFoundPage'));
const RoomDetailsPage = lazy(
  () => import('pages/room_details/RoomDetailsPage')
);
const RouteChangeTracker = lazy(
  () => import('components/common/RouteChangeTracker')
);
const MainLayout = lazy(() => import('components/layout/MainLayout'));

Amplify.configure(config);

ReactGA.initialize(config.gaTrackingId);

const httpLink = createHttpLink({
  uri: config.aws_hasura_graphqlEndpoint,
});

const authLink = setContext(async (_, { headers }) => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  if (!token) {
    return headers;
  }
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

/**
 * https://v4.mui.com/styles/advanced/#injectfirst
 *
 * We need to have the jss-insertion-point in order to have the styles have higher priority than the material ui styles.
 * Since we are still using styled-components, and Material-UI,
 * when we do styled(MaterialComponent), the MaterialComponent styles take precedence without this.
 *
 * <StylesProvider injectFirst>
 */

/**
 * Return the routes for the application.
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Suspense fallback={<Container>Loading Suspense...</Container>}>
              <FeatureFlagsProvider>
                <Router>
                  <AuthProvider>
                    <RoomProvider>
                      <Switch>
                        <Route exact path={APP_URL.login} component={Login} />
                        <Route
                          exact
                          path={APP_URL.forgot}
                          component={ForgotPassword}
                        />
                        <Route exact path={APP_URL.reset} component={Reset} />
                        <ProtectedRoute exact path="/">
                          <MainLayout>
                            <Home />
                          </MainLayout>
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/room-details/:id">
                          <MainLayout>
                            <RoomDetailsPage />
                          </MainLayout>
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/room-details/:id/:tab">
                          <MainLayout>
                            <RoomDetailsPage />
                          </MainLayout>
                        </ProtectedRoute>
                        <Route path="*">
                          <NotFoundPage />
                        </Route>
                        <RouteChangeTracker />
                      </Switch>
                    </RoomProvider>
                  </AuthProvider>
                </Router>
              </FeatureFlagsProvider>
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
}

export default App;
