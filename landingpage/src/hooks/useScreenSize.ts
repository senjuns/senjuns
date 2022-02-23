import { useMediaQuery } from 'react-responsive';
import { SCREEN_SIZES } from '../shared/constants';

interface ScreenSizeInterface {
  /**
   * Shows if the current screen is mobile one.
   */
  isMobile: boolean;
}

interface CustomScreenSizeInterface {
  /**
   * Shows if the current screen is mobile one.
   */
  isBreakpoint: boolean;
}

/**
 * Custom hook to see if the screen is mobile/desktop based on the screen width.
 * @returns {ScreenSizeInterface} shows the current platform.
 */
export const useScreenSize = (): ScreenSizeInterface => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${SCREEN_SIZES.md}px)`,
  });

  return { isMobile };
};

/**
 *
 * Custom hook to see if the screen is a certain screen width.
 * @param {number} screenSize what pixel size to break at
 * @returns {CustomScreenSizeInterface}  {CustomScreenSizeInterface}
 */
export const useScreenSizeCustom = (
  screenSize: number
): CustomScreenSizeInterface => {
  const isBreakpoint = useMediaQuery({
    query: `(max-width: ${screenSize}px)`,
  });

  return { isBreakpoint };
};
