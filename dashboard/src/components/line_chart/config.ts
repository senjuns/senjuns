import { Config, Layout, PlotData } from 'plotly.js';
import { XAxis, YAxis, LineState } from './types';

const PLOTLY_LINE_CHART_AXIS_AND_TABLE_COLOR = 'rgba(0,0,0,0.1)';

/**
 * Rgba colors for the Line chart shapes.
 */
export enum ChartColors {
  RED_LOW = 'rgba(221, 56, 47, 0.15)',
  RED_HIGH = 'rgba(221, 56, 47, 0.15)',
  YELLOW_LOW = 'rgba(255, 185, 76, 0.1)',
  YELLOW_HIGH = 'rgba(255, 185, 76, 0.1)',
  GREEN = 'rgba(49, 202, 113, 0.1)',
  GREEN_LINE = '#159199',
  RED_LINE = '#dd382f',
}

/**
 * Configuration for the Plotly Line chart.
 *
 * @returns {Partial<Config>} - The Plotly line configuration.
 */
export const plotlyConfig = (): Partial<Config> => {
  return {
    scrollZoom: true,
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: [
      'toggleSpikelines',
      'lasso2d',
      'select2d',
      'pan2d',
      'zoom2d',
      'zoomIn2d',
      'zoomOut2d',
      'hoverCompareCartesian',
      'hoverClosestCartesian',
      'autoScale2d',
    ],
  };
};

/**
 * Configuration of the Plotly chart layout.
 * @param {XAxis[]} xRange - Range which will be shown in chart for X axis.
 * @param {YAxis[]} yRange - Range which will be shown in chart for Y axis.
 * @param {any[]} shapes - Shapes that will be shown in chart, this is being used for horizontal and vertical shapes.
 * @returns {Partial<Layout>} - The Plotly layout configuration.
 */
export const plotlyLayoutConfig = (
  xRange: XAxis[],
  yRange: YAxis[],
  shapes: any[]
): Partial<Layout> => {
  return {
    yaxis: {
      fixedrange: true,
      range: yRange,
      tickcolor: PLOTLY_LINE_CHART_AXIS_AND_TABLE_COLOR,
      gridcolor: PLOTLY_LINE_CHART_AXIS_AND_TABLE_COLOR,
      zerolinecolor: PLOTLY_LINE_CHART_AXIS_AND_TABLE_COLOR,
    },
    xaxis: {
      constraintoward: 'right',
      type: 'date',
      range: xRange,
      tickcolor: PLOTLY_LINE_CHART_AXIS_AND_TABLE_COLOR,
      gridcolor: PLOTLY_LINE_CHART_AXIS_AND_TABLE_COLOR,
      tickangle: 0,
      showgrid: false,
    },
    dragmode: 'pan',
    hovermode: 'closest',
    margin: { t: 0, b: 50, r: 0, l: 50 },
    font: {
      family: 'Poppins',
      size: 13,
    },
    shapes,
    autosize: true,
  };
};

/**
 * Plotly configuration for the Line chart lines.
 * @param {LineState} state - State of the Line chart widget.
 * @returns {Partial<PlotData>[]} - The Plotly data configuration.
 */
export const plotlyDataConfig = (state: LineState): Partial<PlotData>[] => {
  return [
    {
      name: 'in range',
      x: state.xNorm,
      y: state.yNorm,
      type: 'scatter',
      hoverinfo: 'x+y',
      marker: { color: ChartColors.GREEN_LINE },
      connectgaps: false,
      showlegend: false,
    },
    {
      name: 'out of range',
      x: state.xAbnormal,
      y: state.yAbnormal,
      type: 'scatter',
      hoverinfo: 'x+y',
      marker: { color: ChartColors.RED_LINE },
      connectgaps: false,
      showlegend: false,
    },
  ];
};

/**
 * Returns configuration for the Plotly line chart horizontal shape.
 * @param {number} yAxisStartPoint - Start of shape on y axis.
 * @param {number} yAxisEndPoint - End of shape on y axis.
 * @param {string} backgroundColor - Color for the the shape and its body.
 * @param {Date | number} xAxisStartPoint - Start of shape on x axis.
 * @param {Date | number} xAxisEndPoint - End of shape on x axis.
 * @returns {any} - Configuration of the shape.
 */
export const getHorizontalShapeConfig = (
  yAxisStartPoint: number,
  yAxisEndPoint: number,
  backgroundColor: string,
  xAxisStartPoint: Date | number = 0,
  xAxisEndPoint: Date | number = 1
): any => {
  return {
    type: 'rect',
    layer: 'below',
    fillcolor: backgroundColor,
    line: {
      width: 0,
    },
    xsizemode: 'scaled',
    ysizemode: 'scaled',
    xref: 'x',
    x0: xAxisStartPoint,
    x1: xAxisEndPoint,
    yref: 'y',
    y0: yAxisStartPoint,
    y1: yAxisEndPoint,
  };
};

/**
 * Returns configuration for the Plotly line chart vertical shape.
 * @param {Date | number} xAxisStartPoint - Start of shape on x axis.
 * @param {Date | number} xAxisEndPoint - End of shape on y axis.
 * @param {string} backgroundColor - Color for the the shape and its body.
 * @param {Date | number} yAxisStartPoint - Start of shape on y axis.
 * @param {Date | number} yAxisEndPoint - End of shape on y axis.
 * @returns {any} - Configuration of the shape.
 */
export const getVerticalShapeConfig = (
  xAxisStartPoint: Date | number,
  xAxisEndPoint: Date | number,
  backgroundColor: string,
  yAxisStartPoint: number = 0,
  yAxisEndPoint: number = 1
): any => {
  return {
    type: 'rect',
    layer: 'below',
    fillcolor: backgroundColor,
    line: {
      width: 0,
    },
    xsizemode: 'scaled',
    ysizemode: 'scaled',
    xref: 'x',
    x0: xAxisStartPoint,
    x1: xAxisEndPoint,
    yref: 'paper',
    y0: yAxisStartPoint,
    y1: yAxisEndPoint,
  };
};
