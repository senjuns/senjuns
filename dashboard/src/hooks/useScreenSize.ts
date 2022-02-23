import { useMediaQuery } from 'react-responsive';
import { ScreenSize } from '../shared/constants';

interface ScreenSizeInterface {
  /**
   * Shows if the current screen is mobile one.
   */
  isMobile: boolean;
  /**
   * tells if the screenis landscape or portrait
   */
  isPortrait: boolean;
}

/**
 * Custom hook to see if the screen is mobile/desktop based on the screen width.
 * @returns {ScreenSizeInterface} shows the current platform.
 */
export const useScreenSize = (): ScreenSizeInterface => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${ScreenSize.md}px)`,
  });

  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  return { isMobile, isPortrait };
};
