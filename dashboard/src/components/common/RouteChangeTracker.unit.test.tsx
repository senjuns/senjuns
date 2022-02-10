import { render } from '@testing-library/react';
import RouteChangeTracker from './RouteChangeTracker';

const mockReactGASetFn = jest.fn();
const mockReactGAPageViewFn = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    listen: (callback: (location: any) => void): void => {
      callback({ pathname: 'path' });
    },
  }),
}));

jest.mock('react-ga', () => ({
  set: (param: any) => mockReactGASetFn(param),
  pageview: (path: string) => mockReactGAPageViewFn(path),
}));

jest.mock('contexts', () => ({
  useAuth: () => ({
    userInfo: { username: 'test@gmail.com' },
  }),
}));

describe('<RouteChangeTracker />', () => {
  beforeEach(() => {
    render(<RouteChangeTracker />);
  });

  test('should render RouteChangeTracker', () => {
    expect(mockReactGASetFn).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      page: 'path',
    });

    expect(mockReactGAPageViewFn).toHaveBeenCalledWith('path');
  });
});
