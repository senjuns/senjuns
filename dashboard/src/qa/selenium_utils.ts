import { WebDriver, WebElement, until, By } from 'selenium-webdriver';
import {
  QA_ROOT_URL,
  QA_USER_NAME,
  QA_USER_PASSWORD,
  TIMEOUT_MILLISECONDS,
} from '../qa/selenium_constants';
import { ScreenSize } from '../shared/constants';
import { IDriverOptions } from './common/interface';

export const getElementByXpath = async (
  driver: WebDriver,
  xpath: string,
  timeout = TIMEOUT_MILLISECONDS
): Promise<WebElement> => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return driver.wait(until.elementIsVisible(el), timeout);
};

export const getElementByName = async (
  driver: WebDriver,
  name: string,
  timeout = TIMEOUT_MILLISECONDS
): Promise<WebElement> => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return driver.wait(until.elementIsVisible(el), timeout);
};

export const getElementById = async (
  driver: WebDriver,
  id: string,
  timeout = TIMEOUT_MILLISECONDS
): Promise<WebElement> => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return driver.wait(until.elementIsVisible(el), timeout);
};

export const logIn = async (driver: WebDriver) => {
  await driver.get(QA_ROOT_URL);
  const emailElement = await getElementByName(driver, 'email');
  await emailElement.sendKeys(QA_USER_NAME);
  const passwordElement = await getElementByName(driver, 'password');
  await passwordElement.sendKeys(QA_USER_PASSWORD);
  const signInElemenet = await getElementById(driver, 'sign_in_button');
  await signInElemenet.click();
};

export const isMobileScreen = (size: IDriverOptions['size']) => {
  return size.width <= ScreenSize.xs;
};
