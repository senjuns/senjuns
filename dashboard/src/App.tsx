// import {
//   ApolloClient,
//   ApolloProvider,
//   createHttpLink,
//   InMemoryCache,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import Container from '@mui/material/Container';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
// import { Amplify } from 'aws-amplify';
import './App.css';

import { lazy, Suspense } from 'react';
// import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from './components/error/ErrorBoundary';
import TeamCard from './components/team_card/TeamCard';
import { AuthProvider } from './contexts';
import { FeatureFlagsProvider } from './contexts/FeatureFlagsProvider';

// import { ProtectedRoute } from './ProtectedRoute';
// import config from './shared/config';
import { APP_URL } from './shared/constants';
import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// const Home = lazy(() => import('./pages/home/Home'));
const Login = lazy(() => import('./pages/auth/LoginPage'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const Reset = lazy(() => import('./pages/auth/ResetPasswordPage'));
const NotFoundPage = lazy(() => import('./pages/not_found/NotFoundPage'));
// const RoomDetailsPage = lazy(
//   () => import('./pages/room_details/RoomDetailsPage')
// );
const RouteChangeTracker = lazy(
  () => import('./components/common/RouteChangeTracker'),
);
const MainLayout = lazy(() => import('./components/layout/MainLayout'));

// Amplify.configure(config);

const queryClient = new QueryClient();

// ReactGA.initialize(config.gaTrackingId);

// const httpLink = createHttpLink({
//   uri: config.aws_hasura_graphqlEndpoint,
// });

// const authLink = setContext(async (_, { headers }) => {
//   const token = (await Auth.currentSession()).getIdToken().getJwtToken();
//   if (!token) {
//     return headers;
//   }
//   return {
//     headers: {
//       ...headers,
//       Authorization: `Bearer ${token}`,
//     },
//   };
// });

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
    // <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Suspense fallback={<Container>Loading Suspense...</Container>}>
              <FeatureFlagsProvider>
                <Router>
                  <AuthProvider>
                    {/* <RoomProvider> */}
                    <Switch>
                      <Route exact path={APP_URL.login} component={Login} />
                      <Route
                        exact
                        path={APP_URL.forgot}
                        component={ForgotPassword}
                      />
                      <Route exact path={APP_URL.reset} component={Reset} />
                      {/* <ProtectedRoute exact path="/"> */}
                      <MainLayout>
                        {/* <Home /> */}
                        <TeamCard />
                      </MainLayout>
                      {/* </ProtectedRoute> */}
                      {/* <ProtectedRoute exact path="/room-details/:id">
                          <MainLayout>
                            <RoomDetailsPage />
                          </MainLayout>
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/room-details/:id/:tab">
                          <MainLayout>
                            <RoomDetailsPage />
                          </MainLayout>
                        </ProtectedRoute> */}
                      <Route path="*">
                        <NotFoundPage />
                      </Route>
                      <RouteChangeTracker />
                    </Switch>
                    {/* </RoomProvider> */}
                  </AuthProvider>
                </Router>
              </FeatureFlagsProvider>
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}

export default App;
