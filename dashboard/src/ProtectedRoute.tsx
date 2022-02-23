import { FC } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from './contexts';
import { APP_URL } from './shared/constants';

interface ProtectedRouteProps extends RouteProps {}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props: any) =>
        isLoggedIn ? (
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
