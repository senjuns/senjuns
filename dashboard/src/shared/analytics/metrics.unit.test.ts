import ReactGA from 'react-ga';
import { METRICS_CATEGORY, METRICS_TYPE } from 'shared/interfaces';
import { submitMetrics } from './metrics';

describe('submitMetrics test', () => {
  const spyEvent = jest.spyOn(ReactGA, 'event');

  test('submitMetrics when user logins', () => {
    submitMetrics(METRICS_TYPE.USER_LOGIN, { email: 'test@neatleaf.com' });
    expect(spyEvent).toHaveBeenCalledWith({
      action: 'User Login',
      category: METRICS_CATEGORY.USER,
      dimension1: 'test@neatleaf.com',
    });
  });

  test('submitMetrics when user logs out', () => {
    submitMetrics(METRICS_TYPE.USER_LOGOUT, { email: 'test@neatleaf.com' });
    expect(spyEvent).toHaveBeenCalledWith({
      action: 'User Logout',
      category: METRICS_CATEGORY.USER,
    });
  });
});
