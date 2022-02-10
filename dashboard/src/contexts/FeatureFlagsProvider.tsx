import { createContext, FC, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FEATURE_FLAGS } from 'shared/interfaces';
import { FEATURE_ENABLED } from 'shared/constants';

export interface FeatureFlagsContextState {
  heatMapViewFlag: boolean;
  settingsFlag: boolean;
  dashboardFlag: boolean;
  lineChartFlag: boolean;
  calendarFlag: boolean;
  notificationFlag: boolean;
  debugFlag: boolean;
}

export const FeatureFlagsContext = createContext<FeatureFlagsContextState>(
  undefined!
);

/**
 * This is the provider component that provides the Feature Flags
 * The feature flags can be fetched from the backend or can be stored in the cookie or whatever.
 * @param {FC} props The props
 * @returns {JSX.Element} The rendered element.
 */
export const FeatureFlagsProvider: FC = (props) => {
  const [heatMapViewFlag, setHeatMapViewFlag] = useState(true);
  const [settingsFlag, setSettingsFlag] = useState(false);
  const [dashboardFlag, setDashboardFlag] = useState(false);
  const [lineChartFlag, setLineChartFlag] = useState(true);
  const [calendarFlag, setCalendarFlag] = useState(false);
  const [notificationFlag, setNotificationFlag] = useState(false);
  const [debugFlag, setDebugFlag] = useState(false);

  useEffect(() => {
    setHeatMapViewFlag(true);
    setSettingsFlag(Cookies.get(FEATURE_FLAGS.SETTINGS) === FEATURE_ENABLED);
    setDashboardFlag(Cookies.get(FEATURE_FLAGS.DASHBOARD) === FEATURE_ENABLED);
    setLineChartFlag(true);
    setCalendarFlag(Cookies.get(FEATURE_FLAGS.CALENDAR) === FEATURE_ENABLED);
    setNotificationFlag(
      Cookies.get(FEATURE_FLAGS.NOTIFICATION) === FEATURE_ENABLED
    );
    setDebugFlag(Cookies.get(FEATURE_FLAGS.DEBUG) === FEATURE_ENABLED);
  }, []);

  return (
    <FeatureFlagsContext.Provider
      {...props}
      value={{
        heatMapViewFlag,
        settingsFlag,
        dashboardFlag,
        lineChartFlag,
        calendarFlag,
        notificationFlag,
        debugFlag,
      }}
    />
  );
};

export const useFeatureFlags = () => {
  return useContext(FeatureFlagsContext);
};
