import { Amplify, Auth } from 'aws-amplify';

import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import { APP_URL } from '../shared/constants';

/**
 * AuthContext definition
 */
export interface AuthContextType {
  /**
   * Shows whether the user is logged in or not.
   */
  isLoggedIn: boolean;
  /**
   * Callback to login with email and password.
   */
  logIn: (email: string, password: string) => void;
  /**
   * Callback to sign out from the application.
   */
  signOut: () => Promise<void>;
  /**
   * UserInfo that has the authenticated user information.
   */
  userInfo: any;
}

export const AuthContext = createContext<AuthContextType>(undefined!);

export const AuthProvider: FC<any> = ({ children }) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signOut = useCallback(async () => {
    await Auth.signOut();
    setIsLoggedIn(false);
    history.push(APP_URL.login);
  }, [history]);

  const logIn = useCallback(async (email: string, password: string) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const userInfo = await Auth.signIn(email, password);
    setUserInfo(userInfo);
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    fetch('/runtime-config.json')
      .then((response) => response.json())
      .then((runtimeContext) => {
        runtimeContext.region &&
          runtimeContext.userPoolId &&
          runtimeContext.userPoolWebClientId &&
          runtimeContext.identityPoolId &&
          Amplify.configure({
            aws_project_region: runtimeContext.region,
            aws_cognito_identity_pool_id: runtimeContext.identityPoolId,
            aws_cognito_region: runtimeContext.region,
            aws_user_pools_id: runtimeContext.userPoolId,
            aws_user_pools_web_client_id: runtimeContext.userPoolWebClientId,
            aws_appsync_graphqlEndpoint: runtimeContext.appSyncGraphqlEndpoint,
            aws_appsync_region: runtimeContext.region,
            aws_appsync_authenticationType: 'AWS_IAM',
            Auth: {
              region: runtimeContext.region,
              userPoolId: runtimeContext.userPoolId,
              userPoolWebClientId: runtimeContext.userPoolWebClientId,
              identityPoolId: runtimeContext.identityPoolId,
            },
          });
        console.log(Amplify);
      })
      .catch((e) => console.log(e));
  }, []);

  const values = useMemo<AuthContextType>(
    () => ({
      isLoggedIn,
      logIn,
      signOut,
      userInfo,
    }),
    [isLoggedIn, logIn, signOut, userInfo],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
