export interface Size {
  width: number;
  height: number;
}

export enum METRICS_TYPE {
  USER_LOGIN,
  USER_LOGOUT,
}

export enum METRICS_CATEGORY {
  USER = 'User',
}

export enum FEATURE_FLAGS {
  HEATMAP = 'FEATURE_FLAGS_HEATMAP',
  SETTINGS = 'FEATURE_FLAGS_SETTINGS',
  DASHBOARD = 'FEATURE_FLAGS_DASHBOARD',
  LINE_CHART = 'FEATURE_FLAGS_LINE_CHART',
  CALENDAR = 'FEATURE_FLAGS_LINE_CALENDAR',
  NOTIFICATION = 'FEATURE_FLAGS_NOTIFICATION',
  ANCHOR_DATE_TIME = 'FEATURE_FLAGS_ANCHOR_DATE_TIME',
  DEBUG = 'FEATURE_FLAGS_LOG',
  INTERNAL_HEATMAP_TOOL_FLAG = 'FEATURE_INTERNAL_HEATMAP_TOOL_FLAG',
  AIRFLOW_SENSOR_FLAG = 'AIRFLOW_SENSOR_FLAG',
}

export type TPasswordRule = {
  label: string;
  check: (password: string, confirmPassword: string) => boolean;
};

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Nullable<T> = T | null;

export type Maybe<T> = T | null | undefined;

export interface IPosition {
  x: number;
  y: number;
}

export interface MetricsMeta {
  email?: string;
}

export interface TimeRange {
  start: Date;
  end: Date;
}
