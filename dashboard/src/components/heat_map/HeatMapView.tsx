import Plotly from 'plotly.js';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { useHeatMapPlotData } from 'components/heat_map/useHeatMapPlotData';
import { COLOR_SCALE_VALUES } from 'components/heat_map/constants';
import { IHeatMapPlotData } from 'components/heat_map/useHeatMapPlotData';
import HeatMapGradient from 'components/heat_map/HeatMapGradient';
import HeatMapViewSlider from 'components/heat_map/HeatMapViewSlider';
import { Theme } from 'theme/types/createPalette';
import { MeasurementTypes } from 'shared/interfaces';
import { IHeatMapMeasurementDataReturn } from 'components/heat_map/useHeatMapMeasurementData';
import { MEASUREMENT_OPTION_DETAILS } from 'shared/constants';
import { useScreenSize } from 'hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heatMapContainer: {
      margin: theme.spacing(0, -2),
      maxHeight: '450px',
      maxWidth: '900px',
    },
    heatMapMobileContainer: {
      margin: theme.spacing(0, -10),
      maxHeight: '450px',
      maxWidth: '900px',
    },
    currentFrameTime: {
      color: theme.palette.dark5.main,
    },
  })
);

const HEATMAP_ASPECT_RATIO = 0.5;

export interface HeatMapViewProps
  extends Pick<
      IHeatMapPlotData,
      'frames' | 'layoutImageUrl' | 'plotData' | 'frameList' | 'transition'
    >,
    Pick<IHeatMapMeasurementDataReturn, 'statistic'> {
  /**
   * The light info.
   */
  lightInfo: any;
  /**
   * The Measurement Option user selected.
   */
  measurementOption: MeasurementTypes;
}

/**
 * Render heatmap based on input data.
 *
 * @param {HeatMapViewProps} props The component props.
 * @returns {JSX.Element} rendered JSX.Element.
 */
const HeatMapView: React.FC<HeatMapViewProps> = ({
  frames,
  frameList,
  layoutImageUrl,
  lightInfo,
  measurementOption,
  statistic,
  plotData,
  transition,
}) => {
  const { isMobile } = useScreenSize();
  const [isPlaying, setIsPlaying] = useState(false);
  const playInterval = useRef<NodeJS.Timer | null>(null);

  const classes = useStyles();
  const [position, setPosition] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const { heatMapPlotInformation } = useHeatMapPlotData({
    colorScale: COLOR_SCALE_VALUES,
    frames,
    layoutImageUrl,
    transition,
    plotData,
    frameList,
  });

  const reactWithPlotly = useCallback(async () => {
    if (!heatMapPlotInformation) return;

    const { data, layout } = heatMapPlotInformation;

    const { unit } = MEASUREMENT_OPTION_DETAILS[measurementOption];
    data.hovertemplate =
      'x: %{x:.01f}<br>' +
      'y: %{y:.01f}<br>' +
      'z: %{z:.01f}' +
      unit +
      '<extra></extra>';

    try {
      await Plotly.react('heatMapPlot', [data], layout, {
        modeBarButtonsToRemove: [
          'zoom2d',
          'pan2d',
          'zoomIn2d',
          'zoomOut2d',
          'autoScale2d',
          'toImage',
        ],
        displaylogo: false,
      });
      Plotly.addFrames('heatMapPlot', frames);
      setIsMounted(true);
    } catch (error) {
      console.error('Error happened while playing plotly', error);
      setIsMounted(false);
    }
  }, [frames, heatMapPlotInformation]);

  useEffect(() => {
    reactWithPlotly();
  }, [reactWithPlotly]);

  useEffect(() => {
    const handleResize = () => {
      const heatMapPlot = document.getElementById('heatMapPlot');
      if (heatMapPlot) {
        const newHeight = heatMapPlot.clientWidth * HEATMAP_ASPECT_RATIO;
        heatMapPlot.style.height = `${newHeight}px`;
      }

      reactWithPlotly();
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setHeatMapFramePosition = useCallback(
    (frames: any) => {
      if (!isMounted) {
        return;
      }

      const heatMapPlot: any = Plotly;
      heatMapPlot.animate('heatMapPlot', frames, {
        transition,
        frame: {
          duration: transition.duration,
          redraw: true,
        },
        mode: 'immediate',
      });
    },
    [isMounted]
  );

  useEffect(() => {
    setHeatMapFramePosition(frames[position]);
  }, [position, setHeatMapFramePosition]);

  const stopPlayingHeatMap = () => {
    setIsPlaying(false);
    playInterval.current && clearInterval(playInterval.current);
    playInterval.current = null;
  };

  const startPlayingHeatMap = () => {
    setIsPlaying(true);
    playInterval.current = setInterval(() => {
      setPosition((position) => {
        if (position >= frameList.length - 1) {
          stopPlayingHeatMap();
          return position;
        } else {
          return position + 1;
        }
      });
    }, 500);
  };

  const handleTogglePlayHeatMap = () => {
    if (isPlaying) {
      stopPlayingHeatMap();
    } else {
      startPlayingHeatMap();
    }
  };

  const currentFrameTime = new Date(frameList[position]?.startTime);

  const heatMapClass = isMobile
    ? classes.heatMapMobileContainer
    : classes.heatMapContainer;

  return (
    <div>
      <div id="heatMapPlot" className={heatMapClass} />
      {isMounted && (
        <div style={{ maxWidth: 860 }}>
          <HeatMapGradient
            measurementOption={measurementOption}
            statistic={statistic}
          />
        </div>
      )}
      {isMounted && frameList.length && (
        <div style={{ maxWidth: 860 }}>
          <HeatMapViewSlider
            isPlaying={isPlaying}
            lightInfo={lightInfo}
            onTogglePlay={handleTogglePlayHeatMap}
            onChangePosition={setPosition}
            position={position}
            frameList={frameList}
          />
        </div>
      )}
      {isMounted && (
        <Box mt={3}>
          <Typography variant="body2" className={classes.currentFrameTime}>
            {format(currentFrameTime, 'MMM dd, yyyy - hh:mm a')}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default HeatMapView;
