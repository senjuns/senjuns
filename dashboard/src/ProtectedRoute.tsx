import { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { EAuthStatus, useAuth } from './contexts';
import { APP_URL } from './shared/constants';

// interface ProtectedRouteProps extends RouteProps {}

export const ProtectedRoute: FC<any> = ({ children, ...rest }) => {
  const { authStatus } = useAuth();

  return (
    <Route
      {...rest}
      render={(props: any) =>
        authStatus !== EAuthStatus.LOGGED_OUT ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: APP_URL.login,
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};
