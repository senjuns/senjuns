import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';
import Plotly from 'plotly.js';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { COLOR_SCALE_VALUES } from '../../components/heat_map/constants';
import HeatMapGradient from '../../components/heat_map/HeatMapGradient';
import HeatMapStylingTool from '../../components/heat_map/HeatMapStylingTool';
import HeatMapViewSlider from '../../components/heat_map/HeatMapViewSlider';
import { IHeatMapMeasurementDataReturn } from '../../components/heat_map/useHeatMapMeasurementData';
import {
  IHeatMapPlotData,
  useHeatMapPlotData,
} from '../../components/heat_map/useHeatMapPlotData';
import { useFeatureFlags } from '../../contexts';
import { useScreenSize } from '../../hooks';
import { Colors, MEASUREMENT_OPTION_DETAILS } from '../../shared/constants';
import { MeasurementTypes } from '../../shared/interfaces';
import { HeatMapStylings } from '../../shared/interfaces/heatmap';
import { Theme } from '../../theme/types/createPalette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heatMapContainer: {
      margin: theme.spacing(0, -2),
      maxHeight: '385px',
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

  const { internalHeatmapToolFlag } = useFeatureFlags();
  const [heatMapColorings, setHeatMapColorings] = useState<HeatMapStylings>({
    low: { color: '#0046B3', max: 20 },
    mediumLow: { color: '#6FC153', max: 40 },
    medium: { color: '#E83339', max: 60 },
    mediumHigh: { color: '#6FC153', max: 80 },
    high: { color: '#0046B3', max: 1e10 },
  });

  const heatmapScaleValues = useMemo(() => {
    const { min, max } = statistic;
    const values = ['low', 'mediumLow', 'medium', 'mediumHigh']
      .map((key) => heatMapColorings[key as keyof typeof heatMapColorings])
      .filter((value) => value.max >= min && value.max < max)
      .map(
        (value) =>
          [(value.max - min) / (max - min), value.color] as [number, string]
      );
    values.push([1, heatMapColorings.high.color]);
    values.unshift([0, values[0][1]]);
    return values;
  }, [heatMapColorings, statistic]);

  const scaleValues = internalHeatmapToolFlag
    ? heatmapScaleValues
    : COLOR_SCALE_VALUES;

  const { heatMapPlotInformation } = useHeatMapPlotData({
    colorScale: scaleValues,
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
      `<span> </span><br>` +
      `<span style="color: ${Colors.orange2}; font-size: 20px; font-weight: 600;">     %{z:.01f} ${unit}</span><br>` +
      `<span style="color: ${Colors.black}; font-weight: 14px;">      %{x:.01f} </span>` +
      `<span style="color: ${Colors.orange2}">X</span>   ` +
      `<span style="color: ${Colors.black}; font-weight: 14px;">%{y:.01f} ` +
      `<span style="color: ${Colors.orange2}">Y</span></span>      ` +
      '<br><span> </span><extra></extra>';
    data.hoverlabel = {
      bgcolor: 'white',
      font: { family: 'Poppins' },
      bordercolor: 'white',
    };

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
      await Plotly.addFrames('heatMapPlot', frames);
      setIsMounted(true);
    } catch (error) {
      console.error('Error happened while playing plotly', error);
      setIsMounted(false);
    }
  }, [frames, heatMapPlotInformation]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reactWithPlotly();
  }, [reactWithPlotly]);

  useEffect(() => {
    const handleResize = () => {
      const heatMapPlot = document.getElementById('heatMapPlot');
      if (heatMapPlot) {
        const newHeight = heatMapPlot.clientWidth * HEATMAP_ASPECT_RATIO;
        heatMapPlot.style.height = `${newHeight}px`;
      }

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      reactWithPlotly();
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setHeatMapFramePosition = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
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
      // eslint-disable-next-line @typescript-eslint/no-shadow
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
      {internalHeatmapToolFlag && (
        <HeatMapStylingTool
          value={heatMapColorings}
          onChange={setHeatMapColorings}
        />
      )}
      <div id="heatMapPlot" className={heatMapClass} />
      {isMounted && (
        <div style={{ maxWidth: 860 }}>
          <HeatMapGradient
            measurementOption={measurementOption}
            scaleValues={scaleValues}
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
