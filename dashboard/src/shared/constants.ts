import {
  MeasurementTypes,
  MeasurementStatisticsTypes,
  TPasswordRule,
} from 'shared/interfaces';

export const MeasurementUnit = {
  CelciusDegree: '°C',
  FahrenheitDegree: '°F',
  Percent: '%',
  KP: 'kP',
  mph: 'mph',
  ppm: 'ppm',
  DLI: 'DLI',
  μMol_m2_s: 'μMol/m2/s',
};

export const NotificationLevel = {
  Nominal: 'nominal',
  Warning: 'warning',
  Error: 'error',
};

export const ScreenSize = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400,
};

export const Colors = {
  black: '#000000',
  dark1: '#383838',
  dark7: '#808080',
  dark8: '#B4B4B4',
  dark9: '#CFCFCF',
  green1: '#56C254',
  grey5: '#E0E0E0',
  hb1: '#82879A',
  hb2: '#9BA0B6',
  hb3: '#C3C7D9',
  hb4: '#ECEDF1',
  hb5: '#F0F1F4',
  hb6: '#F8F8FC',
  orange1: '#DD382F',
  orange2: '#E86339',
  orange3: '#F48E42',
  orange4: '#FFB94C',
  white: '#ffffff',
  linearGradientedOrange: 'linear-gradient(90deg, #E86339 0%, #FFB94C 100%)',
};

export const Sizes = {
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

export const Fonts = {
  h1: { size: 48, style: 'normal', weight: 600 },
  h2: { size: 40, style: 'normal', weight: 600 },
  h3: { size: 36, style: 'normal', weight: 600 },
  h4: { size: 24, style: 'normal', weight: 600 },
  h5: { size: 20, style: 'normal', weight: 600 },
  h6: { size: 18, style: 'normal', weight: 600 },
  body1: { size: 16, style: 'normal', weight: 'normal' },
  body2: { size: 14, style: 'normal', weight: 'normal' },
};

export const MEASUREMENT_OPTION_DETAILS = {
  [MeasurementTypes.Light]: {
    statisticsKey: MeasurementStatisticsTypes.AirTemperature,
    unit: MeasurementUnit.FahrenheitDegree,
  },
  [MeasurementTypes.Temperature]: {
    statisticsKey: MeasurementStatisticsTypes.AirTemperature,
    unit: MeasurementUnit.FahrenheitDegree,
  },
  [MeasurementTypes.Humidity]: {
    statisticsKey: MeasurementStatisticsTypes.RelativeHumidity,
    unit: MeasurementUnit.Percent,
  },
  [MeasurementTypes.LeafVpd]: {
    statisticsKey: MeasurementStatisticsTypes.LeafVpd,
    unit: MeasurementUnit.KP,
  },
  [MeasurementTypes.Vpd]: {
    statisticsKey: MeasurementStatisticsTypes.AirVpd,
    unit: MeasurementUnit.KP,
  },
  [MeasurementTypes.Airflow]: {
    statisticsKey: MeasurementStatisticsTypes.AirFlow,
    unit: MeasurementUnit.mph,
  },
  [MeasurementTypes.Co2]: {
    statisticsKey: MeasurementStatisticsTypes.AirCo2,
    unit: MeasurementUnit.ppm,
  },
  [MeasurementTypes.Ppfd]: {
    statisticsKey: MeasurementStatisticsTypes.Par,
    unit: MeasurementUnit.μMol_m2_s,
  },
  [MeasurementTypes.LeafTemperature]: {
    statisticsKey: MeasurementStatisticsTypes.LeafTemperature,
    unit: MeasurementUnit.FahrenheitDegree,
  },
};

export const APP_URL = {
  login: '/login',
  forgot: '/forgot',
  reset: '/reset',
  notFound: '/not-found',
  resetPassword: (username: string) => `/reset?username=${username}`,
  userHome: '/user/home',
  userAbout: '/user/about',
  home: '/',
  roomDetails: (id: number) => `/room-details/${id}`,
  roomDetailsOverview: (id: number) => `/room-details/${id}/overview`,
  roomDetailsHeatMap: (id: number) => `/room-details/${id}/heat-map`,
  roomDetailsLineChart: (id: number) => `/room-details/${id}/line-chart`,
  roomDetailsPhotoFeed: (id: number) => `/room-details/${id}/photo-feed`,
};

export enum ROOM_DETAIL_TABS {
  OVERVIEW = 'overview-tab',
  LINE_CHART = 'line-chart-tab',
  HEAT_MAP = 'heat-map-tab',
  PHOTO_FEED = 'photo-feed-tab',
}

export const AWS_API_CODE = {
  // will return when username or password incorrect or when user does not exists.
  user_not_found_exception: 'UserNotFoundException',
};

export const PASSWORD_RULES: TPasswordRule[] = [
  {
    label: 'Password must match',
    check: (password: string, confirmPassword: string): boolean =>
      password === confirmPassword,
  },
  {
    label: 'At least 8 characters',
    check: (password: string): boolean => password.length >= 8,
  },
  {
    label: 'Must contain at least one upper case letter',
    check: (password: string): boolean => /[A-Z]/.test(password),
  },
  {
    label: 'Must contain at least one special character',
    check: (password: string): boolean => /[#?!@$%^&*-]/.test(password),
  },
  {
    label: 'Must contain at least one number',
    check: (password: string): boolean => /[0-9]/.test(password),
  },
];

export const FEATURE_ENABLED = 'FEATURE_ENABLED';

export const NULL_VALUE = -1;

export const Z_INDEXES = {
  DROPDOWN: 10001,
};
