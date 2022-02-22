import { format, isSameDay, isSameWeek, isSameYear } from 'date-fns';
import { getCurrentDateTime } from '../../shared/utils';
/**
 * Convert time string to epoch seconds.
 * @param {string} timeString time string
 * @returns {number} epoch seconds
 */
export function timeToEpoch(timeString: string) {
  const time = new Date(timeString);
  return time.getTime() / 1000;
}

/**
 * Convert epoch seconds to time string.
 * @param {number} epoch epoch seconds
 * @returns {string} time string
 */
export function epochToTime(epoch: number) {
  const time = new Date(epoch * 1000);
  return format(time, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * Format date in weekday.
 *
 * @param {Date} date The day.
 * @returns {string} The week day of given date.
 */
export const formatDateWeekday = (date: Date): string => {
  return format(date, 'EE');
};

/**
 * Returns the day in full month format.
 *
 * @param {Date} date The day.
 * @returns {string} The formatted date string.
 */
export const formatDateInMMDD = (date: Date) => {
  return format(date, 'MM/dd');
};

/**
 * Returns the date in full day format.
 *
 * @param {Date} date The day.
 * @returns {string} The formatted date string.
 */
export const formatDateInFullDay = (date: Date): string => {
  return format(date, 'MM/dd/yyyy');
};

/**
 * Returns the date in format.
 *  ie) today if it's the same day, Sun/Mon if it's in the same week
 *
 * @param {Date} date The day.
 * @returns {string} The formatted date string.
 */
export const formatRecentDate = (date: Date): string => {
  const today = getCurrentDateTime();
  if (isSameDay(date, today)) return 'Today';
  else if (isSameWeek(date, today)) return formatDateWeekday(date);
  else if (isSameYear(date, today)) return formatDateInMMDD(date);
  return formatDateInFullDay(date);
};

/**
 * Convert date to time string in full format.
 *
 * @param {Date} date date to be displayed
 * @returns {string} time string after format
 */
export function formatTimeInFullStyle(date: Date) {
  return format(date, 'MMM dd, yyyy @hh:mm aa');
}

/**
 * Convert the data (number[] or number[][]) to have fixed floating points
 *
 * @param {any[]} numbers - The number array to be converted.
 * @param {number} pointCount - The point count.
 * @returns {any[]} - The conversion result.
 */
export function convertNumbersToHaveFixedFloatingPoints(
  numbers: any[],
  pointCount: number = 2
): any[] {
  return numbers.map((row: any) => {
    if (typeof row === 'number') return Math.floor(row * 100) / 100;
    else if (Array.isArray(row)) {
      return convertNumbersToHaveFixedFloatingPoints(row, pointCount);
    } else {
      return row;
    }
  });
}

/**
 * Convert celsius degree to fahrenheit degree.
 *
 * @param {number} celsius - celsius degree
 * @returns {number} - fahrenheit degree
 */
export function convertCelsiusToFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert meters per second to miles per hour.
 *
 * @param {number} metersPerSecond - meters per second
 * @returns {number} - miles per hour
 */
export function convertMetersPerSecondToMph(metersPerSecond: number) {
  const oneHourInSecond = 3600;
  const oneMileInMeter = 1609.34;
  return (metersPerSecond * oneHourInSecond) / oneMileInMeter;
}
