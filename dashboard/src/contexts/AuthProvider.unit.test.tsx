import { FC } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AuthProvider, useAuth } from './AuthProvider';
import { APP_URL } from 'shared/constants';

const mockHistoryPush = jest.fn();

jest.mock('aws-amplify', () => ({
  Auth: {
    currentAuthenticatedUser: jest
      .fn()
      .mockReturnValueOnce({ email: 'test@neatleaf.com' })
      .mockRejectedValueOnce(new Error('not implemented')),
    signIn: (email: string, password: string) => {
      if (email === 'test@neatleaf.com' && password === 'password') {
        return { email: 'test@neatleaf.com' };
      } else {
        throw new Error('not implemented');
      }
    },
    signOut: () => {},
  },
}));

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: (url: string) => mockHistoryPush(url),
  }),
}));

const AuthUse: FC = () => {
  const { isLoggedIn, logIn, signOut, userInfo } = useAuth();

  return (
    <div data-testid="auth-use">
      <div>{isLoggedIn ? 'Logged In' : 'Logged Out'}</div>
      <div data-testid="email">{userInfo?.email}</div>
      <button onClick={() => logIn('test@neatleaf.com', 'password')}>
        Log In
      </button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

describe('<AuthProvider />', () => {
  test('authenticateCurrentUser test', async () => {
    render(
      <AuthProvider>
        <AuthUse />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Logged In')).toBeInTheDocument();
    });
  });

  test('logIn & signOut test', async () => {
    render(
      <AuthProvider>
        <AuthUse />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

    await waitFor(() => {
      expect(screen.getByText('Logged In')).toBeInTheDocument();
      expect(screen.getByText('test@neatleaf.com')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Out' }));

    await waitFor(() => {
      expect(screen.getByText('Logged Out')).toBeInTheDocument();
      expect(mockHistoryPush).toHaveBeenCalledWith(APP_URL.login);
    });
  });
});
