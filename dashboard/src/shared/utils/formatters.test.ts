import {
  formatTimeInFullStyle,
  formatDateWeekday,
  formatDateInMMDD,
  formatDateInFullDay,
  formatRecentDate,
  convertNumbersToHaveFixedFloatingPoints,
  convertCelsiusToFahrenheit,
  convertMetersPerSecondToMph,
} from './formatters';

jest.mock('shared/utils', () => ({
  getCurrentDateTime: () => new Date(),
}));

describe('formatTimeInFullStyle test', () => {
  test('should return the date in correct format AM', () => {
    expect(formatTimeInFullStyle(new Date(2021, 9, 4, 10, 20, 30))).toBe(
      'Oct 04, 2021 @10:20 AM'
    );
  });

  test('should return the date in correct format PM', () => {
    expect(formatTimeInFullStyle(new Date(2021, 9, 4, 22, 20, 30))).toBe(
      'Oct 04, 2021 @10:20 PM'
    );
  });
});

describe('formatDateWeekday test', () => {
  test('should return the correct weekday 1', () => {
    expect(formatDateWeekday(new Date(2021, 9, 20, 10, 20, 30))).toBe('Wed');
  });

  test('should return the correct weekday 2', () => {
    expect(formatDateWeekday(new Date(2021, 9, 23, 22, 20, 30))).toBe('Sat');
  });
});

describe('formatDateInMMDD test', () => {
  test('should return the correct day in MM/DD 1', () => {
    expect(formatDateInMMDD(new Date(2021, 9, 20, 10, 20, 30))).toBe('10/20');
  });

  test('should return the correct day in MM/DD 2', () => {
    expect(formatDateInMMDD(new Date(2021, 9, 23, 22, 20, 30))).toBe('10/23');
  });
});

describe('formatDateInFullDay test', () => {
  test('should return the correct day in MM/DD/yyyy 1', () => {
    expect(formatDateInFullDay(new Date(2021, 9, 20, 10, 20, 30))).toBe(
      '10/20/2021'
    );
  });

  test('should return the correct day in MM/DD/yyyy 2', () => {
    expect(formatDateInFullDay(new Date(2021, 9, 23, 22, 20, 30))).toBe(
      '10/23/2021'
    );
  });
});

describe('formatRecentDate test', () => {
  test('should return if it is current day', () => {
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2021-10-20').getTime());

    expect(formatRecentDate(new Date(2021, 9, 20, 10, 20, 30))).toBe('Today');
  });

  test('should return weekday if in the same week', () => {
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2021-10-19').getTime());

    expect(formatRecentDate(new Date(2021, 9, 20, 10, 20, 30))).toBe('Wed');
  });

  test('should return 10/20 if in the same year', () => {
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2021-09-19').getTime());

    expect(formatRecentDate(new Date(2021, 9, 20, 10, 20, 30))).toBe('10/20');
  });

  test('should return 10/20 if in the different year', () => {
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2020-10-19').getTime());

    expect(formatRecentDate(new Date(2021, 9, 20, 10, 20, 30))).toBe(
      '10/20/2021'
    );
  });
});

describe('convertNumbersToHaveFixedFloatingPoints test', () => {
  test('should handle one dimensional array of numbers', () => {
    expect(
      convertNumbersToHaveFixedFloatingPoints([2.00002, 3.10003, 4.00002])
    ).toStrictEqual([2, 3.1, 4]);
  });

  test('should handle two dimensional array of numbers', () => {
    expect(
      convertNumbersToHaveFixedFloatingPoints([
        2.00002,
        3.10003,
        4.00002,
        [2.00002, 3.5444, 5.41222],
      ])
    ).toStrictEqual([2, 3.1, 4, [2, 3.54, 5.41]]);
  });
});

describe('convertCelsiusToFahrenheit test', () => {
  test('should return correct fahrenheit from celsius degree', () => {
    expect(convertCelsiusToFahrenheit(32)).toBe(89.6);
    expect(convertCelsiusToFahrenheit(25)).toBe(77);
  });
});

describe('convertMetersPerSecondToMph test', () => {
  test('should return correct mph from meters per second', () => {
    expect(convertMetersPerSecondToMph(1).toFixed(2)).toBe('2.24');
    expect(convertMetersPerSecondToMph(2).toFixed(2)).toBe('4.47');
  });
});
