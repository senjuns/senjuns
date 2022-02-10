import { IDriverOptions } from './common/interface';
import { Builder, Capabilities } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';

export const MOBILE_SIZE_PORTRAIT = {
  description: 'mobile portrait',
  width: 576,
  height: 1080,
};
export const DESKTOP_SIZE = {
  description: 'desktop',
  width: 1920,
  height: 1080,
};
export const SIZE_LIST = [MOBILE_SIZE_PORTRAIT, DESKTOP_SIZE];

/**
 * DRIVER_LIST - These are a list of drivers for the various browsers and their options.
 * Builder is used to setup a driver for a browser.
 * Options at momement are to run headless (ie no gui for browser).
 * Safari has yet to implment the headless feature (https://github.com/SeleniumHQ/selenium/issues/5985)
 */
export const DRIVER_LIST = [
  {
    browser: 'safari',
    builder: new Builder().withCapabilities(Capabilities.safari()),
  },
  {
    browser: 'chrome',
    builder: new Builder()
      .setChromeOptions(new chrome.Options().addArguments('--headless'))
      .withCapabilities(Capabilities.chrome()),
  },
  {
    browser: 'firefox',
    builder: new Builder()
      .setFirefoxOptions(new firefox.Options().addArguments('--headless'))
      .withCapabilities(Capabilities.firefox()),
  },
];

/**
 * DRIVER_OPTIONS_LIST is a composition of browsers and screen sizes
 */
export const DRIVER_OPTIONS_LIST = SIZE_LIST.reduce(
  (driverOptionsList, size) => {
    const driverOptions = DRIVER_LIST.reduce((driverSizeLIst, driver) => {
      const newDriver = { ...driver };
      newDriver.browser = `${newDriver.browser} - ${size.description}:  ${size.width} x ${size.height}`;
      driverSizeLIst.push({ ...newDriver, size });
      return driverSizeLIst;
    }, [] as any[]);
    driverOptionsList = driverOptionsList.concat(...driverOptions);
    return driverOptionsList;
  },
  [] as IDriverOptions[]
);

export const TIMEOUT_MILLISECONDS = 20 * 1000;

export const QA_ROOT_URL = process.env.QA_ROOT_URL || '';
export const QA_USER_NAME = process.env.QA_USER_NAME || '';
export const QA_USER_PASSWORD = process.env.QA_USER_PASSWORD || '';
