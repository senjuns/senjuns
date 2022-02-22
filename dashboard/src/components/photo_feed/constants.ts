/**
 * TODO(NL-1391): improve the logic to remove the hardcode
 * These constants regarding platform specific need to be updated/removed sometime later in NL-1391.
 *
 * When the app is rendered on the mobile users, there are some headers and footers which need to be displayed.
 * And 280 seems to be the correct size for the mobile platform in order to display the photo feed in the whole device.
 */
export const MOBILE_PLATFORM_EXTRA_HEIGHT = 180;
/**
 * The height and width are just placeholders for non-mobile app users and we need to match this with the figma.
 */
export const NON_MOBILE_PLATFORM_PRESENTATION_HEIGHT = 400;
export const NON_MOBILE_PLATFORM_PRESENTATION_WIDTH = 400;

export const ZONE_MAP_URL = '/zone_map.png';
/**
 * The mini map height to be rendered on the screen.
 */
export const MINI_MAP_HEIGHT = 40;

/**
 * The zoom level limitations of the photo feed.
 */
export const ZOOM_LEVELS = {
  MAX: 2,
  NORMAL: 1,
  MIN: 0.5,
};

/**
 * When the section is unvisited, there needs to be opacity applied on it.
 */
export const UNVISITED_SECTION_OPACITY = 0.3;
