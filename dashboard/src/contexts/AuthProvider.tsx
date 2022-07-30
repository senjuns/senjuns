import { Amplify, Auth } from 'aws-amplify';

import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../lib/fetcher';

import { APP_URL } from '../shared/constants';

export enum EAuthStatus {
  LOGGED_IN = 'LOGGED_IN',
  LOGGED_OUT = 'LOGGED_OUT',
  UNDETERMINED = 'UNDETERMINED',
}

/**
 * AuthContext definition
 */
export interface AuthContextType {
  /** Shows whether the user is logged in or not. */
  authStatus: EAuthStatus;

  /** User's first name. */
  firstName?: string;

  userName?: string;

  stage?: string;

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
  const [stage, setStage] = useState('non');
  const [authStatus, setLoggedInStatus] = useState(EAuthStatus.UNDETERMINED);

  const firstName = useMemo(() => {
    return (
      userInfo?.attributes?.['given_name'] ||
      userInfo?.attributes?.['name'] ||
      userInfo?.firstName
    );
  }, [userInfo]);

  const userName = useMemo(() => {
    return userInfo?.username;
  }, [userInfo]);

  const authenticateCurrentUser = useCallback(async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUserInfo(userInfo);
      setLoggedInStatus(EAuthStatus.LOGGED_IN);
      API.updateIsSignedIn(true);
    } catch (error) {
      setLoggedInStatus(EAuthStatus.LOGGED_OUT);
      API.updateIsSignedIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await Auth.signOut();
    setLoggedInStatus(EAuthStatus.LOGGED_OUT);
    history.replace(APP_URL.login);
  }, [history]);

  const logIn = useCallback(async (email: string, password: string) => {
    try {
      const userInfo = await Auth.signIn(email, password);
      console.log('userInfo', userInfo);
      setUserInfo(userInfo);
      setLoggedInStatus(EAuthStatus.LOGGED_IN);
      API.updateIsSignedIn(true);
    } catch (error) {
      setLoggedInStatus(EAuthStatus.LOGGED_OUT);
      API.updateIsSignedIn(false);
      throw error;
    }
  }, []);

  useEffect(() => {
    authenticateCurrentUser();
  }, [authenticateCurrentUser]);

  useEffect(() => {
    fetch('/runtime-config.json')
      .then((response) => response.json())
      .then((runtimeContext) => {
        runtimeContext.region &&
          runtimeContext.userPoolId &&
          runtimeContext.userPoolWebClientId &&
          runtimeContext.identityPoolId &&
          runtimeContext.stage &&
          Amplify.configure({
            aws_project_region: runtimeContext.region,
            aws_cognito_identity_pool_id: runtimeContext.identityPoolId,
            aws_cognito_region: runtimeContext.region,
            aws_user_pools_id: runtimeContext.userPoolId,
            aws_user_pools_web_client_id: runtimeContext.userPoolWebClientId,
            aws_appsync_graphqlEndpoint: runtimeContext.appSyncGraphqlEndpoint,
            aws_appsync_region: runtimeContext.region,
            aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
            Auth: {
              region: runtimeContext.region,
              userPoolId: runtimeContext.userPoolId,
              userPoolWebClientId: runtimeContext.userPoolWebClientId,
              identityPoolId: runtimeContext.identityPoolId,
            },
          });
        setStage(runtimeContext.stage);
        console.log(Amplify);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        userInfo,
        userName,
        firstName,
        logIn,
        signOut,
        stage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
