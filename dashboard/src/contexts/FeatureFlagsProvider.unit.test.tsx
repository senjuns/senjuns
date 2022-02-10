import { FC } from 'react';
import Cookies from 'js-cookie';
import { render, screen } from '@testing-library/react';

import { FEATURE_FLAGS } from 'shared/interfaces';
import { FEATURE_ENABLED } from 'shared/constants';

import { FeatureFlagsProvider, useFeatureFlags } from './FeatureFlagsProvider';

const FeatureFlagsUse: FC = () => {
  const {
    heatMapViewFlag,
    settingsFlag,
    dashboardFlag,
    lineChartFlag,
    calendarFlag,
    notificationFlag,
    debugFlag,
  } = useFeatureFlags();

  return (
    <div data-testid="feature-flags-use">
      <div data-testid="heat-map-view-flag">
        {heatMapViewFlag ? 'Heatmap enabled' : 'Heatmap disabled'}
      </div>
      <div data-testid="settings-flag">
        {settingsFlag ? 'Settings enabled' : 'Settings disabled'}
      </div>
      <div data-testid="dashboard-flag">
        {dashboardFlag ? 'Dashboard enabled' : 'Dashboard disabled'}
      </div>
      <div data-testid="line-chart-flag">
        {lineChartFlag ? 'LineChart enabled' : 'LineChart disabled'}
      </div>
      <div data-testid="calendar-flag">
        {calendarFlag ? 'Calendar enabled' : 'Calendar disabled'}
      </div>
      <div data-testid="notification-flag">
        {notificationFlag ? 'Notification enabled' : 'Notification disabled'}
      </div>
      <div data-testid="debug-flag">
        {debugFlag ? 'Debug enabled' : 'Debug disabled'}
      </div>
    </div>
  );
};

describe('<FeatureFlagsProvider />', () => {
  test('should render FeatureFlagsProvider with default values', () => {
    render(
      <FeatureFlagsProvider>
        <FeatureFlagsUse />
      </FeatureFlagsProvider>
    );

    expect(screen.getByTestId('heat-map-view-flag')).toHaveTextContent(
      'Heatmap enabled'
    );
    expect(screen.getByTestId('settings-flag')).toHaveTextContent(
      'Settings disabled'
    );
    expect(screen.getByTestId('dashboard-flag')).toHaveTextContent(
      'Dashboard disabled'
    );
    expect(screen.getByTestId('line-chart-flag')).toHaveTextContent(
      'LineChart enabled'
    );
    expect(screen.getByTestId('calendar-flag')).toHaveTextContent(
      'Calendar disabled'
    );
    expect(screen.getByTestId('notification-flag')).toHaveTextContent(
      'Notification disabled'
    );
    expect(screen.getByTestId('debug-flag')).toHaveTextContent(
      'Debug disabled'
    );
  });

  test('should render FeatureFlagsProvider with settings enabled', () => {
    Cookies.set(FEATURE_FLAGS.SETTINGS, FEATURE_ENABLED);

    render(
      <FeatureFlagsProvider>
        <FeatureFlagsUse />
      </FeatureFlagsProvider>
    );

    expect(screen.getByTestId('settings-flag')).toHaveTextContent(
      'Settings enabled'
    );
  });
});
