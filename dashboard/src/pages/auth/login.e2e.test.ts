import { IDriverOptions } from '../../qa/common/interface';
import {
  DRIVER_OPTIONS_LIST,
  QA_USER_NAME,
  TIMEOUT_MILLISECONDS,
} from '../../qa/selenium_constants';
import { getElementById, logIn, isMobileScreen } from '../../qa/selenium_utils';

jest.setTimeout(TIMEOUT_MILLISECONDS);
describe('Auth tests', () => {
  test.each(DRIVER_OPTIONS_LIST)(
    'Login Scenario - %p',
    async ({ builder, size }: IDriverOptions) => {
      const driver = await builder.build();
      await driver.manage().window().setRect(size);

      const testDesktopOverview = async () => {
        const desktopHeader = await getElementById(driver, 'desktop_header');
        const desktopHeaderText = await desktopHeader.getText();
        expect(desktopHeaderText).toBe(`Hey, ${QA_USER_NAME}`);
      };

      const testMobileOverview = async () => {
        const overviewElement = await getElementById(driver, 'overview');
        const overviewElementText = await overviewElement.getText();
        expect(overviewElementText).toBe('Overview');
      };

      const isMobile = isMobileScreen(size);

      try {
        void logIn(driver);
        if (isMobile) {
          await testMobileOverview();
        } else {
          await testDesktopOverview();
        }
      } finally {
        await driver.quit();
      }
    }
  );
});
