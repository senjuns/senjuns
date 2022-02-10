import { timeToEpoch, getRandomValueBetween } from 'shared/utils';
import { MeasurementTypes } from 'shared/interfaces';

export const getData = (date: string | null, measurementType: string) => {
  if (!date) return null;
  const startDate = new Date(date);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);

  const measurementEpochTimes = [];
  const measurementValues = [];

  let minVal = 0;
  let maxVal = 0;
  let redLow;
  let yellowLow;
  let green;
  let yellowHigh;
  let redHigh;

  switch (measurementType) {
    case MeasurementTypes.Light:
      minVal = 50;
      maxVal = 100;
      redLow = { min: 50, max: 60 };
      yellowLow = { min: 60, max: 70 };
      green = { min: 70, max: 80 };
      yellowHigh = { min: 80, max: 90 };
      redHigh = { min: 90, max: 100 };
      break;
    case MeasurementTypes.Temperature:
      minVal = 10;
      maxVal = 50;
      redLow = { min: 10, max: 20 };
      yellowLow = { min: 20, max: 25 };
      green = { min: 25, max: 35 };
      yellowHigh = { min: 35, max: 40 };
      redHigh = { min: 40, max: 50 };
      break;
    case MeasurementTypes.Humidity:
      minVal = 30;
      maxVal = 90;
      redLow = { min: 30, max: 40 };
      yellowLow = { min: 40, max: 60 };
      green = { min: 60, max: 70 };
      yellowHigh = { min: 60, max: 80 };
      redHigh = { min: 80, max: 90 };
      break;
    case MeasurementTypes.LeafVpd:
    case MeasurementTypes.Vpd:
      minVal = 0;
      maxVal = 40;
      redLow = { min: 0, max: 10 };
      yellowLow = { min: 10, max: 15 };
      green = { min: 15, max: 25 };
      yellowHigh = { min: 25, max: 30 };
      redHigh = { min: 30, max: 40 };
      break;
    case MeasurementTypes.Co2:
      minVal = 10;
      maxVal = 100;
      redLow = { min: 10, max: 20 };
      yellowLow = { min: 30, max: 50 };
      green = { min: 50, max: 70 };
      yellowHigh = { min: 80, max: 90 };
      redHigh = { min: 90, max: 100 };
      break;
    case MeasurementTypes.Airflow:
      minVal = 0;
      maxVal = 30;
      redLow = { min: 0, max: 5 };
      yellowLow = { min: 5, max: 15 };
      green = { min: 15, max: 20 };
      yellowHigh = { min: 20, max: 25 };
      redHigh = { min: 25, max: 30 };
      break;
    case MeasurementTypes.Ppfd:
      minVal = 50;
      maxVal = 150;
      redLow = { min: 50, max: 60 };
      yellowLow = { min: 60, max: 90 };
      green = { min: 90, max: 110 };
      yellowHigh = { min: 110, max: 140 };
      redHigh = { min: 140, max: 150 };
      break;
  }

  for (let t = startDate; t <= endDate; t.setTime(t.getTime() + 10 * 60000)) {
    measurementEpochTimes.push(timeToEpoch(t.toISOString()));
    measurementValues.push(getRandomValueBetween(minVal, maxVal));
  }

  return {
    data: {
      timestamps: measurementEpochTimes,
      values: measurementValues,
    },
    min: minVal,
    max: maxVal,
    redLow,
    yellowLow,
    green,
    yellowHigh,
    redHigh,
  };
};
