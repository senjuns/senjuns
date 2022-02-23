import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import safari from 'selenium-webdriver/safari';

export interface IDriverOptions {
  browser: string;
  builder: Builder;
  options: chrome.Options | firefox.Options | safari.Options;
  size: {
    width: number;
    height: number;
  };
}
