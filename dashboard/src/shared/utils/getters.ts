import { SliderMark } from 'components/common/Slider';
import Cookies from 'js-cookie';
import config from 'shared/config';
import {
  EnumerationTypes,
  FEATURE_FLAGS,
  MeasurementTypes,
  Size,
} from 'shared/interfaces';

/**
 * Calculate circumference from radius.
 *
 * @param {number} radius - The radius of circle.
 * @returns {number} circumference
 */
export function circumferenceFromRadius(radius: number) {
  return 2 * Math.PI * radius;
}

/**
 * Get the local storage item and parse it into JSON.
 * @param {string} key localStorage key to get the data from
 * @returns {unknown} localStorage value associated with the key
 */
export function getLocalStorageJSONItem(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return null;
  }
}

/**
 * Returns the random value between min and max.
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The random value between min and max.
 */
export function getRandomValueBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Get the offset value based on the circle path.
 * @param {number} val percent 0 ~ 100
 * @param {number} radius radius
 * @returns {number} offset
 */
export const getOffset = (val = 0, radius = 0) =>
  Math.round(((100 - Math.min(val, 100)) / 100) * (Math.PI * radius * 2));

export const isBetween = (x: number, a: number, b: number) => {
  if (b > a) {
    return a <= x && x <= b;
  } else {
    return b <= x && x <= a;
  }
};

/**
 * Find the nearest mark position from the given value in slider.
 *
 * @param {SliderMark[]} marks - the marks on the slider.
 * @param {number} value - 0 ~ 100; the position in the slider.
 * @returns {number} nearest index.
 */
export const findNearestIndex = (
  marks: SliderMark[],
  value: number
): number => {
  const { nearestIndex } = marks.reduce(
    (aggregation, mark, index) => {
      const currentDistance = Math.abs(mark.value - value);
      if (currentDistance < aggregation.distance) {
        return { nearestIndex: index, distance: currentDistance };
      }
      return aggregation;
    },
    { nearestIndex: 0, distance: Math.abs(marks[0].value - value) }
  );
  return nearestIndex;
};

export const getEnumerationTypeFromMeasurmentOption = (
  measurementType: MeasurementTypes,
  isMobile: boolean
): EnumerationTypes => {
  const measurementToEnumeration = {
    [MeasurementTypes.Airflow]: [
      EnumerationTypes.AIR_FLOW_DESKTOP_RESOLUTION,
      EnumerationTypes.AIR_FLOW_MOBILE_RESOLUTION,
    ],
    [MeasurementTypes.Light]: [
      EnumerationTypes.AIR_TEMPERATURE_DESKTOP_RESOLUTION,
      EnumerationTypes.AIR_TEMPERATURE_MOBILE_RESOLUTION,
    ],
    [MeasurementTypes.Vpd]: [
      EnumerationTypes.AIR_VPD_DESKTOP_RESOLUTION,
      EnumerationTypes.AIR_VPD_MOBILE_RESOLUTION,
    ],
    [MeasurementTypes.Co2]: [
      EnumerationTypes.AIR_CO2_DESKTOP_RESOLUTION,
      EnumerationTypes.AIR_CO2_MOBILE_RESOLUTION,
    ],

    [MeasurementTypes.Temperature]: [
      EnumerationTypes.AIR_TEMPERATURE_DESKTOP_RESOLUTION,
      EnumerationTypes.AIR_TEMPERATURE_MOBILE_RESOLUTION,
    ],
    [MeasurementTypes.LeafVpd]: [
      EnumerationTypes.LEAF_VPD_DESKTOP_RESOLUTION,
      EnumerationTypes.LEAF_VPD_MOBILE_RESOLUTION,
    ],
    [MeasurementTypes.Ppfd]: [
      EnumerationTypes.PAR_DESKTOP_RESOLUTION,
      EnumerationTypes.PAR_MOBILE_RESOLUTION,
    ],
    [MeasurementTypes.Humidity]: [
      EnumerationTypes.RELATIVE_HUMIDITY_DESKTOP_RESOLUTION,
      EnumerationTypes.RELATIVE_HUMIDITY_MOBILE_RESOLUTION,
    ],
    [MeasurementTypes.LeafTemperature]: [
      EnumerationTypes.LEAF_TEMPERATURE_DESKTOP_RESOLUTION,
      EnumerationTypes.LEAF_TEMPERATURE_DESKTOP_RESOLUTION,
    ],
  };

  return measurementToEnumeration[measurementType][isMobile ? 1 : 0];
};

export const mathRoundTo2Decimals = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export interface IDateTime {
  year: number;
  month: number;
  date: number;
  hour?: number;
  minute?: number;
  second?: number;
  useNow?: boolean;
}

export const createDateTimeFromObject = (dateTime: IDateTime): Date => {
  const { year, month, date, hour, minute, second } = dateTime;
  const resultDateTime = new Date();
  resultDateTime.setFullYear(year);
  resultDateTime.setMonth(month);
  resultDateTime.setDate(date);
  resultDateTime.setHours(hour !== undefined ? hour : 0);
  resultDateTime.setMinutes(minute !== undefined ? minute : 0);
  resultDateTime.setSeconds(second !== undefined ? second : 0);
  return resultDateTime;
};

/**
 * Function for getting date time based on cookie/config.
 * If no cookie and no config then use current date time.
 * Cookie has priority over config.
 * If config is set then use config for date time.
 * If cookie is set then use cookie for date time.
 * If config is set and cookie is set then use cookie for date time.
 *
 * Example cookie:
 *  Months are from 0 - 11 ( January = 0 an December = 11 )
 *  if useNow is True the current date time will be used
 *  otherwise use FEATURE_FLAGS_ANCHOR_DATE_TIME
 *  "FEATURE_FLAGS_ANCHOR_DATE_TIME =
 * {
 *     "year": 2021,
 *     "month": 11,
 *     "date": 15,
 *     "hour": 10,
 *     "minute": 13,
 *     "second": 14,
 *     "useNow": false
 * }
 * 
  //
 * @returns {Date} date
 */
export const getCurrentDateTime = () => {
  let resultDateTime = new Date();

  // check config
  const configAnchorDateTime = config.anchorDateTime;
  if (configAnchorDateTime !== null && configAnchorDateTime !== undefined) {
    resultDateTime = createDateTimeFromObject(configAnchorDateTime);
  }

  // check cookie
  const cookieAnchorDateTime = Cookies.get(FEATURE_FLAGS.ANCHOR_DATE_TIME);
  if (cookieAnchorDateTime !== null && cookieAnchorDateTime !== undefined) {
    try {
      const dateTime = JSON.parse(cookieAnchorDateTime) as IDateTime;
      // use current date time if flag says so
      if (dateTime.useNow === true) {
        resultDateTime = new Date();
      } else {
        resultDateTime = createDateTimeFromObject(dateTime);
        if (resultDateTime instanceof Date && isNaN(resultDateTime.getTime())) {
          throw new Error('Invalid date time');
        }
      }
    } catch (err) {
      console.error('Error parsing cookie: using current date time');
      console.error(`err: ${JSON.stringify(err, null, 2)}`);
      resultDateTime = new Date();
    }
  }

  return resultDateTime;
};

/**
 * @param {any} selector Selector to select an element from the
 * @returns {number} inner height of the element
 */
export const getElementSize = (selector: any): Size => {
  const element = document.querySelector(selector);
  if (!element) {
    return { height: 0, width: 0 };
  }

  const computed = getComputedStyle(element);
  const paddingHeight =
    parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);
  const paddingWidth =
    parseInt(computed.paddingLeft) + parseInt(computed.paddingRight);

  return {
    height: element.clientHeight - paddingHeight,
    width: element.clientWidth - paddingWidth,
  };
};
