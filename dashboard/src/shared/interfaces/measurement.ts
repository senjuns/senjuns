export enum MeasurementTypes {
  Light = 'Light',
  Temperature = 'Temp',
  Humidity = 'Humidity',
  LeafVpd = 'Leaf VPD',
  Vpd = 'Air VPD',
  Airflow = 'Airflow',
  Co2 = 'CO2',
  Ppfd = 'PPFD',
  LeafTemperature = 'Leaf temp',
}

export enum MeasurementStatisticsTypes {
  Par = 'par',
  AirCo2 = 'air_co2',
  AirVpd = 'air_vpd',
  AirFlow = 'air_flow',
  LeafVpd = 'leaf_vpd',
  AirTemperature = 'air_temperature',
  LeafTemperature = 'leaf_temperature',
  RelativeHumidity = 'relative_humidity',
}

export enum EnumerationTypes {
  AIR_FLOW_MOBILE_RESOLUTION = 'AIR_FLOW_MOBILE_RESOLUTION',
  AIR_FLOW_DESKTOP_RESOLUTION = 'AIR_FLOW_DESKTOP_RESOLUTION',
  AIR_TEMPERATURE_MOBILE_RESOLUTION = 'AIR_TEMPERATURE_MOBILE_RESOLUTION',
  AIR_TEMPERATURE_DESKTOP_RESOLUTION = 'AIR_TEMPERATURE_DESKTOP_RESOLUTION',
  AIR_VPD_MOBILE_RESOLUTION = 'AIR_VPD_MOBILE_RESOLUTION',
  AIR_VPD_DESKTOP_RESOLUTION = 'AIR_VPD_DESKTOP_RESOLUTION',
  AIR_CO2_MOBILE_RESOLUTION = 'AIR_CO2_MOBILE_RESOLUTION',
  AIR_CO2_DESKTOP_RESOLUTION = 'AIR_CO2_DESKTOP_RESOLUTION',
  LEAF_TEMPERATURE_MOBILE_RESOLUTION = 'LEAF_TEMPERATURE_MOBILE_RESOLUTION',
  LEAF_TEMPERATURE_DESKTOP_RESOLUTION = 'LEAF_TEMPERATURE_DESKTOP_RESOLUTION',
  LEAF_VPD_MOBILE_RESOLUTION = 'LEAF_VPD_MOBILE_RESOLUTION',
  LEAF_VPD_DESKTOP_RESOLUTION = 'LEAF_VPD_DESKTOP_RESOLUTION',
  PAR_DESKTOP_RESOLUTION = 'PAR_DESKTOP_RESOLUTION',
  PAR_MOBILE_RESOLUTION = 'PAR_MOBILE_RESOLUTION',
  RELATIVE_HUMIDITY_MOBILE_RESOLUTION = 'RELATIVE_HUMIDITY_MOBILE_RESOLUTION',
  RELATIVE_HUMIDITY_DESKTOP_RESOLUTION = 'RELATIVE_HUMIDITY_DESKTOP_RESOLUTION',
  AIR_TEMPERATURE = 'AIR_TEMPERATURE',
  RGB_IMAGE = 'RGB_IMAGE',
}

export type TMeasurementStatistic = {
  max: number;
  min: number;
  mean: number;
};

export type TMeasurementRunStatistics = Record<
  MeasurementStatisticsTypes,
  TMeasurementStatistic
>;

export interface ISystemFrame {
  systemId: number;
  startTime: string;
  statistics: TMeasurementRunStatistics;
}

/* eslint-disable camelcase */
export interface IMeasurementRunPoseInfo {
  x_min: number;
  x_max: number;
  y_min: number;
  y_max: number;
  x_count: number;
  y_count: number;
}

/* eslint-disable camelcase */
export interface IMeasurementRunImageInfo {
  resolutions: [[number, number]];
}

/* eslint-disable camelcase */
export interface IMeasurementRunMetadata {
  image_info: IMeasurementRunImageInfo;
  pose_info: IMeasurementRunPoseInfo;
}
