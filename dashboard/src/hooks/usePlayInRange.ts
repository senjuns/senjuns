import {
  useCallback,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';

interface IPlayInRangeResult {
  /**
   * `true` if it's currently in play mode, `false` otherwise.
   */
  isPlaying: boolean;
  /**
   * The current index.
   */
  index: number;
  /**
   * Toggle playing state.
   */
  togglePlay: () => void;
  /**
   * The index can be controlled outside of this hook.
   */
  setIndex: Dispatch<SetStateAction<number>>;
}

/**
 * Use play function in range.
 *
 * @param {number} max - The range max.
 * @param {number} min - The range min.
 * @param {number} interval - The time interval.
 * @param {boolean} isLoaded - The state if the frame is loaded.
 * @returns {IPlayInRangeResult} Return the range status.
 */
export const usePlayInRange = (
  max: number,
  min: number = 0,
  interval: number = 500,
  isLoaded: boolean = true
): IPlayInRangeResult => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(min);
  const playInterval = useRef<NodeJS.Timer | null>(null);

  const stopPlaying = () => {
    setIsPlaying(false);
    playInterval.current && clearTimeout(playInterval.current);
    playInterval.current = null;
  };

  const playFrame = useCallback(() => {
    if (!isLoaded || !isPlaying) {
      return;
    }

    playInterval.current = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setIndex((index) => {
        // istanbul ignore if
        if (index >= max - 1) {
          stopPlaying();
          return index;
        } else {
          return index + 1;
        }
      });
    }, interval);
  }, [isLoaded, isPlaying]);

  useEffect(() => {
    playFrame();
  }, [playFrame]);

  const startPlaying = () => {
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPlaying();
    } else {
      startPlaying();
    }
  };

  return { isPlaying, index, setIndex, togglePlay };
};
