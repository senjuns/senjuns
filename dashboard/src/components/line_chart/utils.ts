import {
  GetGrowthCycleByZoneIdQuery,
  GetMeasurementRunsBetweenDatesQuery,
} from '../../graphql/generated/react_apollo';
import { MeasurementTypes } from '../../shared/interfaces';
import { epochToTime, isBetween, timeToEpoch } from '../../shared/utils';
import { TimestampsValuesPair, XAxis, YAxis } from './types';

/**
 * Split lines into red and green lines based on the red area.
 * @param {TimestampsValuesPair} data - timestamp and value pairs.
 * @param {number} redLow - lower value of red area.
 * @param {number} redHigh - higher value of red area.
 * @returns {Partial<Config>} - plotly line configuration.
 */
export const splitIntoRedAndGreenLines = (
  data: TimestampsValuesPair,
  redLow: number,
  redHigh: number
) => {
  const xNorm: XAxis[] = [];
  const yNorm: YAxis[] = [];
  const xAbnormal: XAxis[] = [];
  const yAbnormal: YAxis[] = [];

  let prevTimestamp = 0;
  let prevValue = 0;

  const isInRange = (value: number) => isBetween(value, redLow, redHigh);

  data.timestamps.forEach((timestamp: number, index: number) => {
    const value = data.values[index];

    let isOut = false; // true when prev point is in range and current point is out of range
    let isIn = false; // true when prev point is out of range and current point is in range
    let isCross = false; // true when prev point is over redHigh and current point is under redLow, or vice versa

    if (index === 0) {
      isOut = false;
      isIn = false;
      isCross = false;
    } else if (isInRange(prevValue) && !isInRange(value)) {
      isOut = true;
    } else if (!isInRange(prevValue) && isInRange(value)) {
      isIn = true;
    } else if (
      (prevValue > redHigh && value < redLow) ||
      (prevValue < redLow && value > redHigh)
    ) {
      isCross = true;
    }

    if (isInRange(value)) {
      // in range
      if (isIn) {
        const addedTimestamp = (timestamp - prevTimestamp) / 2 + prevTimestamp;
        const addedValue = prevValue > redHigh ? redHigh : redLow;

        xAbnormal.push(new Date(epochToTime(addedTimestamp)));
        yAbnormal.push(addedValue.toString());
        xAbnormal.push(null);
        yAbnormal.push(null);

        xNorm.push(null);
        yNorm.push(null);
        xNorm.push(new Date(epochToTime(addedTimestamp)));
        yNorm.push(addedValue.toString());
      }

      xNorm.push(new Date(epochToTime(timestamp)));
      yNorm.push(value.toString());
    } else {
      // out of range
      if (isOut) {
        const addedTimestamp = (timestamp - prevTimestamp) / 2 + prevTimestamp;
        const addedValue = value > redHigh ? redHigh : redLow;
        xNorm.push(new Date(epochToTime(addedTimestamp)));
        yNorm.push(addedValue.toString());
        xNorm.push(null);
        yNorm.push(null);
        xAbnormal.push(null);
        yAbnormal.push(null);
        xAbnormal.push(new Date(epochToTime(addedTimestamp)));
        yAbnormal.push(addedValue.toString());
      } else if (isCross) {
        const mTimestamp1 = (timestamp - prevTimestamp) / 3 + prevTimestamp;
        const mValue1 = value > redHigh ? redLow : redHigh;
        const mTimestamp2 =
          ((timestamp - prevTimestamp) / 3) * 2 + prevTimestamp;
        const mValue2 = value > redHigh ? redHigh : redLow;

        xAbnormal.push(new Date(epochToTime(mTimestamp1)));
        yAbnormal.push(mValue1.toString());

        xNorm.push(null);
        yNorm.push(null);
        xNorm.push(new Date(epochToTime(mTimestamp1)));
        yNorm.push(mValue1.toString());
        xNorm.push(new Date(epochToTime(mTimestamp2)));
        yNorm.push(mValue2.toString());
        xNorm.push(null);
        yNorm.push(null);

        xAbnormal.push(null);
        yAbnormal.push(null);
        xAbnormal.push(new Date(epochToTime(mTimestamp2)));
        yAbnormal.push(mValue2.toString());
      }
      xAbnormal.push(new Date(epochToTime(timestamp)));
      yAbnormal.push(value.toString());
    }

    prevTimestamp = timestamp;
    prevValue = value;
  });

  return {
    xNorm,
    yNorm,
    xAbnormal,
    yAbnormal,
  };
};

export interface IBasicLineChartData {
  /**
   * timestamp and value pairs
   */
  data: TimestampsValuesPair;

  /**
   * min value
   */
  min: number;

  /**
   * max value
   */
  max: number;

  /**
   * monitoring parameters
   */
  monitoringParams: any;
}

/**
 * Get basic line chart data for a particular measurement.
 * @param {GetMeasurementRunsBetweenDatesQuery} measurementRunData - measurement run data.
 * @param {GetGrowthCycleByZoneIdQuery} growthCycleData - growth cycle data.
 * @param {string} measurementType - meaurement type string.
 * @returns {IBasicLineChartData} - basic line chart data.
 */
export const getMeasurementSpecificData = (
  measurementRunData: GetMeasurementRunsBetweenDatesQuery['measurement_run'],
  growthCycleData: GetGrowthCycleByZoneIdQuery['growth_cycle'],
  measurementType: string
): IBasicLineChartData => {
  let measurement = '';
  switch (measurementType) {
    case MeasurementTypes.Temperature:
      measurement = 'air_temperature';
      break;
    case MeasurementTypes.Humidity:
      measurement = 'relative_humidity';
      break;
    case MeasurementTypes.LeafVpd:
      measurement = 'leaf_vpd';
      break;
    case MeasurementTypes.Co2:
      measurement = 'air_co2';
      break;
    case MeasurementTypes.Vpd:
      measurement = 'air_vpd';
      break;
    case MeasurementTypes.Ppfd:
      measurement = 'par';
      break;
    case MeasurementTypes.Airflow:
      measurement = 'air_flow';
      break;
    case MeasurementTypes.LeafTemperature:
      measurement = 'leaf_temperature';
      break;
  }
  // filter out empty statistic measurements from measurementRunData
  const filteredMeasurementRunData = measurementRunData.filter(
    (measurmentRun: any) => {
      const statistics = measurmentRun.metadata?.statistics;
      return statistics !== undefined && statistics[measurement] !== undefined;
    }
  );

  const timestamps = filteredMeasurementRunData.map((measurementRun: any) => {
    return timeToEpoch(measurementRun.start_time);
  });

  const values = filteredMeasurementRunData.map((measurementRun: any) => {
    const statistics = measurementRun.metadata?.statistics;
    const mean = statistics[measurement].mean;
    const coefficient = measurementType === MeasurementTypes.Humidity ? 100 : 1;
    return +(mean * coefficient).toFixed(1);
  });

  const sortedValues = [...values];
  sortedValues.sort();
  const valueRange = sortedValues[sortedValues.length - 1] - sortedValues[0];
  const marginConstant = 0.2;
  const minValue = sortedValues[0] - valueRange * marginConstant;
  const maxValue =
    sortedValues[sortedValues.length - 1] + valueRange * marginConstant;

  const monitoringParams =
    growthCycleData[0].metadata.monitoring_parameters[measurement];

  return {
    data: {
      timestamps: timestamps,
      values: values,
    },
    min: minValue,
    max: maxValue,
    monitoringParams,
  };
};
