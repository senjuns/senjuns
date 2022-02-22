import Cookies from 'js-cookie';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { FEATURE_ENABLED } from '../shared/constants';
import { FEATURE_FLAGS } from '../shared/interfaces';

export interface FeatureFlagsContextState {
  heatMapViewFlag: boolean;
  settingsFlag: boolean;
  dashboardFlag: boolean;
  lineChartFlag: boolean;
  calendarFlag: boolean;
  notificationFlag: boolean;
  debugFlag: boolean;
  internalHeatmapToolFlag: boolean;
  airflowSensorFlag: boolean;
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
  const [lineChartFlag, setLineChartFlag] = useState(false);
  const [calendarFlag, setCalendarFlag] = useState(false);
  const [notificationFlag, setNotificationFlag] = useState(false);
  const [debugFlag, setDebugFlag] = useState(false);
  const [internalHeatmapToolFlag, setInternalHeatmapToolFlag] = useState(false);
  const [airflowSensorFlag, setAirflowSensorFlag] = useState(false);

  useEffect(() => {
    setHeatMapViewFlag(true);
    setSettingsFlag(Cookies.get(FEATURE_FLAGS.SETTINGS) === FEATURE_ENABLED);
    setDashboardFlag(Cookies.get(FEATURE_FLAGS.DASHBOARD) === FEATURE_ENABLED);
    setLineChartFlag(Cookies.get(FEATURE_FLAGS.LINE_CHART) === FEATURE_ENABLED);
    setCalendarFlag(Cookies.get(FEATURE_FLAGS.CALENDAR) === FEATURE_ENABLED);
    setNotificationFlag(
      Cookies.get(FEATURE_FLAGS.NOTIFICATION) === FEATURE_ENABLED
    );
    setDebugFlag(Cookies.get(FEATURE_FLAGS.DEBUG) === FEATURE_ENABLED);
    // cookieStore.set("FEATURE_INTERNAL_HEATMAP_TOOL_FLAG", "FEATURE_ENABLED");
    setInternalHeatmapToolFlag(
      Cookies.get(FEATURE_FLAGS.INTERNAL_HEATMAP_TOOL_FLAG) === FEATURE_ENABLED
    );
    setAirflowSensorFlag(
      Cookies.get(FEATURE_FLAGS.AIRFLOW_SENSOR_FLAG) === FEATURE_ENABLED
    );
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
        internalHeatmapToolFlag,
        airflowSensorFlag,
      }}
    />
  );
};

export const useFeatureFlags = () => {
  return useContext(FeatureFlagsContext);
};
