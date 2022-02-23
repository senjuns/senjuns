import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import PauseIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import { differenceInSeconds } from 'date-fns';
import React, { ChangeEvent, useMemo } from 'react';

import Slider from '../../components/common/Slider';
import { Colors } from '../../shared/constants';
import { formatRecentDate, findNearestIndex } from '../../shared/utils';
import { IHeatMapPlotData } from './useHeatMapPlotData';

const useStyles = makeStyles((theme) =>
  createStyles({
    iconButton: {
      padding: theme.spacing(0),
    },
  })
);

export interface HeatMapViewSliderProps
  extends Pick<IHeatMapPlotData, 'frameList'> {
  /**
   * `true` if it's playing, `false` otherwise.
   */
  isPlaying: boolean;
  /**
   * Light information in the cycle.
   */
  lightInfo: any;
  /**
   * Callback to be called when the play/pause button clicks.
   */
  onTogglePlay: () => void;
  /**
   * Callback to be called when the position changes.
   */
  onChangePosition: (position: number) => void;
  /**
   * Current slider position.
   */
  position: number;
}

/**
 * Render Heat Map View Slider
 *
 * @param {HeatMapViewSliderProps} props The component props.
 * @returns {JSX.Element} rendered JSX.Element.
 */
const HeatMapViewSlider: React.FC<HeatMapViewSliderProps> = ({
  isPlaying,
  onTogglePlay,
  onChangePosition,
  lightInfo,
  position,
  frameList,
}) => {
  const classes = useStyles();

  // TODO: (JOE) use standard time notation https://neatleaf.atlassian.net/browse/NL-2391
  const dayStartTime = new Date();
  dayStartTime.setHours(lightInfo?.[0]?.light_on_start_time?.hour || null);
  dayStartTime.setMinutes(lightInfo?.[0]?.light_on_start_time?.minute || null);

  const dayEndTime = new Date(dayStartTime);
  dayEndTime.setMinutes(
    dayEndTime.getMinutes() + lightInfo
      ? lightInfo[0]?.light_on_duration_minutes
      : 0
  );

  if (!frameList.length || position < 0) return null;

  const marks = useMemo(() => {
    const firstStartTime = new Date(frameList[0].startTime);
    const lastStartTime = new Date(frameList[frameList.length - 1].startTime);
    const totalDifference = differenceInSeconds(firstStartTime, lastStartTime);
    let previousLabel = '';

    // Only show the label when the day changes.
    return frameList.map((label) => {
      const currentTime = new Date(label.startTime);
      const dayLabel = formatRecentDate(currentTime);
      const currentLabel = previousLabel === dayLabel ? '' : dayLabel;
      previousLabel = dayLabel;

      return {
        value:
          (differenceInSeconds(firstStartTime, currentTime) * 100) /
          totalDifference,
        label: currentLabel,
      };
    });
  }, [frameList]);

  const nightCycles = useMemo(() => {
    if (!lightInfo) return null;

    const firstStartTime = new Date(frameList[0].startTime);
    const lastStartTime = new Date(frameList[frameList.length - 1].startTime);
    const totalDifference = differenceInSeconds(firstStartTime, lastStartTime);

    const result = [];

    result.push({ value: 0, lightOn: false });

    let loop = new Date(firstStartTime);
    const endLoop = new Date(lastStartTime);
    endLoop.setDate(endLoop.getDate() + 1);

    do {
      const currentDayStartTime = new Date(loop);
      currentDayStartTime.setHours(dayStartTime.getHours());
      currentDayStartTime.setMinutes(dayStartTime.getMinutes());
      if (
        firstStartTime < currentDayStartTime &&
        currentDayStartTime < lastStartTime
      ) {
        result.push({
          value:
            (differenceInSeconds(firstStartTime, currentDayStartTime) * 100) /
            totalDifference,
          lightOn: true,
        });
      }

      const currentDayEndTime = new Date(loop);
      currentDayEndTime.setHours(dayEndTime.getHours());
      currentDayEndTime.setMinutes(dayEndTime.getMinutes());
      if (
        firstStartTime < currentDayEndTime &&
        currentDayEndTime < lastStartTime
      ) {
        result.push({
          value:
            (differenceInSeconds(firstStartTime, currentDayEndTime) * 100) /
            totalDifference,
          lightOn: false,
        });
      }
      loop = new Date(loop.setDate(loop.getDate() + 1));
    } while (loop <= endLoop);

    result[0].lightOn = !result?.[1]?.lightOn;
    result.push({
      value: 100,
      lightOn: !result[result.length - 1].lightOn,
    });

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const nightCycles = [];
    for (let i = 0; i < result.length - 1; i++) {
      if (result[i].lightOn === false && result[i + 1].lightOn === true) {
        nightCycles.push({
          startValue: result[i].value,
          endValue: result[i + 1].value,
        });
      }
    }

    return nightCycles;
  }, [frameList]);

  const handleChangePosition = (
    _event: ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      return;
    }

    onChangePosition(findNearestIndex(marks, value));
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-end">
      <Box sx={{ mr: 3 }}>
        <IconButton className={classes.iconButton} onClick={onTogglePlay}>
          {isPlaying ? (
            <PauseIcon fontSize="large" />
          ) : (
            <PlayIcon fontSize="large" />
          )}
        </IconButton>
      </Box>
      <div style={{ width: '100%', position: 'relative' }}>
        {nightCycles?.map((cycle, index) => {
          return (
            <div
              style={{
                position: 'absolute',
                left: `${cycle.startValue}%`,
                right: `${100 - cycle.endValue}%`,
                top: 0,
                bottom: 0,
                background: Colors.hb5,
                borderRadius: '4px',
              }}
              key={index}
            ></div>
          );
        })}
        <Slider
          aria-label="heatmap tracker"
          value={marks[position].value}
          marks={marks}
          onChange={handleChangePosition}
        />
      </div>
    </Box>
  );
};

export default HeatMapViewSlider;
