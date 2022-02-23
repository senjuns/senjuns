import Cookies from 'js-cookie';
import config from '../../shared/config';
import {
  mathRoundTo2Decimals,
  getLocalStorageJSONItem,
  getCurrentDateTime,
  createDateTimeFromObject,
  IDateTime,
} from '../../shared/utils/getters';

describe('getLocalStorageJSONItem test', () => {
  test('should return empty object if nothing is stored', () => {
    expect(getLocalStorageJSONItem('key')).toStrictEqual({});
  });

  test('should return object if valid object is stored in localStorage', () => {
    localStorage.setItem('key', JSON.stringify({ value: true }));
    expect(getLocalStorageJSONItem('key')).toStrictEqual({ value: true });
  });

  test('should return null if invalid object is stored in localStorage', () => {
    localStorage.setItem('key', '{ value: invalid');
    expect(getLocalStorageJSONItem('key')).toBeNull();
  });
});

describe('mathRoundTo2Decimals function', () => {
  test('should return correct number', () => {
    return expect(mathRoundTo2Decimals(20.0123)).toEqual(20.01);
  });
});

describe('createDateTimeFromObject function', () => {
  test('should return date object 00', () => {
    const testDateData: IDateTime = {
      year: 1970,
      month: 0,
      date: 1,
      hour: 12,
      minute: 13,
      second: 14,
    };
    const testDate = createDateTimeFromObject(testDateData);
    const controlDate = new Date(Date.parse('01 Jan 1970 12:13:14 GMT'));
    return expect(testDate.toDateString()).toBe(controlDate.toDateString());
  });

  test('should return date object 01', () => {
    const testDateData: IDateTime = {
      year: 1970,
      month: 0,
      date: 1,
    };
    const testDate = createDateTimeFromObject(testDateData);
    const controlDate = new Date(Date.parse('01 Jan 1970 00:00:00 GMT'));
    return expect(testDate.toDateString()).toBe(controlDate.toDateString());
  });
});

describe('getCurrentDateTime function', () => {
  test('should return date object using no cookie no config', () => {
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('1970-01-01').getTime());

    const testDate = getCurrentDateTime();
    const controlDate = new Date(Date.parse('01 Jan 1970 00:00:00 GMT'));
    jest.useRealTimers();
    return expect(testDate.toDateString()).toBe(controlDate.toDateString());
  });

  test('should return date object using no cookie yes config', () => {
    config.anchorDateTime = {
      year: 1970,
      month: 0,
      date: 1,
    };
    const testDate = getCurrentDateTime();
    const controlDate = new Date(Date.parse('01 Jan 1970 00:00:00 GMT'));
    return expect(testDate.toDateString()).toBe(controlDate.toDateString());
  });

  test('should return date object using yes cookie yes config', () => {
    Cookies.get = jest
      .fn()
      .mockName('Mock cookie get')
      .mockImplementation(() => {
        return JSON.stringify({
          year: 1999,
          month: 0,
          date: 1,
        });
      });
    config.anchorDateTime = {
      year: 1970,
      month: 0,
      date: 1,
    };
    const testDate = getCurrentDateTime();
    const controlDate = new Date(Date.parse('01 Jan 1999 00:00:00 GMT'));
    return expect(testDate.toDateString()).toBe(controlDate.toDateString());
  });

  test('should return date object using yes cookie (with flag true) yes config', () => {
    Cookies.get = jest
      .fn()
      .mockName('Mock cookie get')
      .mockImplementation(() => {
        return JSON.stringify({
          year: 1999,
          month: 0,
          date: 1,
          useNow: true,
        });
      });
    config.anchorDateTime = {
      year: 1970,
      month: 0,
      date: 1,
    };
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2020-01-01').getTime());
    const testDate = getCurrentDateTime();
    const controlDate = new Date(Date.parse('01 Jan 2020 00:00:00 GMT'));
    jest.useRealTimers();
    return expect(testDate.toDateString()).toBe(controlDate.toDateString());
  });

  test('should return date object using yes cookie (with only flag true) yes config', () => {
    Cookies.get = jest
      .fn()
      .mockName('Mock cookie get')
      .mockImplementation(() => {
        return JSON.stringify({
          useNow: true,
        });
      });
    config.anchorDateTime = {
      year: 1970,
      month: 0,
      date: 1,
    };
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2020-01-01').getTime());
    const testDate = getCurrentDateTime();
    const controlDate = new Date(Date.parse('01 Jan 2020 00:00:00 GMT'));
    jest.useRealTimers();
    return expect(testDate.toDateString()).toBe(controlDate.toDateString());
  });

  test('should return date object using yes cookie (broken) yes config', () => {
    Cookies.get = jest
      .fn()
      .mockName('Mock cookie get')
      .mockImplementation(() => {
        return '-1';
      });
    config.anchorDateTime = {
      year: 1970,
      month: 0,
      date: 1,
    };
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2020-01-01').getTime());
    const testDate = getCurrentDateTime();
    const controlDate = new Date(Date.parse('01 Jan 2020 00:00:00 GMT'));
    jest.useRealTimers();
    return expect(testDate.toDateString()).toBe(controlDate.toDateString());
  });
});
