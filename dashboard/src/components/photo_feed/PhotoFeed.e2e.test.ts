import { IDriverOptions } from '../../qa/common/interface';
import {
  DRIVER_OPTIONS_LIST,
  TIMEOUT_MILLISECONDS,
} from '../../qa/selenium_constants';
import { getElementById, logIn } from '../../qa/selenium_utils';
import { ROOM_DETAIL_TABS } from '../../shared/constants';

jest.setTimeout(TIMEOUT_MILLISECONDS);

/**
 * Add the zoom aspect ratio to the PhotoFeedGrid as data-element
 */

describe('PhotoFeed grid tests', () => {
  test.each(DRIVER_OPTIONS_LIST)(
    'PhotoFeed Grid -%p',
    async ({ builder, size }: IDriverOptions) => {
      const driver = await builder.build();
      await driver.manage().window().setRect(size);

      // Logins to the dashboard.
      await logIn(driver);

      // Go to the photo feed tab.
      const photoFeedTab = await getElementById(
        driver,
        ROOM_DETAIL_TABS.PHOTO_FEED
      );
      expect(photoFeedTab).not.toBeNull();
      await photoFeedTab.click();

      // Check whether the icons for measurements are clickable.
      const zoomButtonGroup = await getElementById(
        driver,
        'photo-zoom-button-group'
      );
      const zoomInButton = await getElementById(driver, 'photo-zoom-in-button');
      const zoomOutButton = await getElementById(
        driver,
        'photo-zoom-out-button'
      );
      expect(zoomButtonGroup).not.toBeNull();
      expect(zoomInButton).not.toBeNull();
      expect(zoomOutButton).not.toBeNull();
      expect(await zoomButtonGroup.getAttribute('data-scale')).toEqual('1');

      // Check zoom in button.
      await zoomInButton.click();
      expect(await zoomButtonGroup.getAttribute('data-scale')).toEqual('2');

      // Check zoom out button.
      await zoomOutButton.click();
      expect(await zoomButtonGroup.getAttribute('data-scale')).toEqual('1');

      // Check timestamp. should see when the latest photo was captured.
      const measurementTimeInfo = await getElementById(
        driver,
        'measurement-time-info'
      );
      expect(await measurementTimeInfo.getText()).toMatch(/\d+\/\d+\/\d+/i);

      // Check photo mini map displayed.
      const photoMiniMapContainer = await getElementById(
        driver,
        'photo-mini-map-container"'
      );
      expect(photoMiniMapContainer).not.toBeNull();
    }
  );
});
