import { useMemo } from 'react';
import Plotly from 'plotly.js';

import { IHeatMapMeasurementDataReturn } from './useHeatMapMeasurementData';

export interface IHeatMapPlotInformation {
  data: Partial<Plotly.PlotData>;
  layout: Partial<Plotly.Layout>;
}

export interface IHeatMapPlotData
  extends Pick<
    IHeatMapMeasurementDataReturn,
    'frames' | 'frameList' | 'plotData'
  > {
  /**
   * Color scale to be used as a heatmap gradient base.
   */
  colorScale: Array<[number, string]>;
  /**
   * Image to be used as a layout of Plotly.
   */
  layoutImageUrl: string;
  /**
   * Transition information to be consumed in Plotly.
   */
  transition: Plotly.Transition;
}

export interface IHeatMapPlotDataResult {
  heatMapPlotInformation: IHeatMapPlotInformation | null;
}

/**
 * Manipulates and organizes and combines the given data to the information.
 *
 * @param {IHeatMapPlotData} props The hook props.
 * @returns {IHeatMapPlotDataResult} The heatMapPlot Result.
 */
export const useHeatMapPlotData = ({
  colorScale,
  frames,
  plotData,
  frameList,
  transition,
  layoutImageUrl,
}: IHeatMapPlotData): IHeatMapPlotDataResult => {
  const heatMapPlotInformation: IHeatMapPlotInformation | null = useMemo(() => {
    if (!plotData || !frames.length) return null;

    const heatMapPlotData: Partial<Plotly.PlotData> = {
      ...plotData,
      type: 'heatmap',
      zsmooth: 'best',
      opacity: 0.6,
      marker: { color: '#dd382f' },
      showlegend: false,
      colorscale: colorScale,
      showscale: false,
    };

    const xMax = plotData.x ? plotData.x[plotData.x.length - 1] : 0;
    const yMax = plotData.y ? plotData.y[plotData.y.length - 1] : 0;
    const maxXPlot = (plotData.x as number[]).reduce(
      (max, x) => (max > x ? max : x),
      Number.NEGATIVE_INFINITY
    );
    const maxYPlot = (plotData.y as number[]).reduce(
      (max, y) => (max > y ? max : y),
      Number.NEGATIVE_INFINITY
    );

    const layout: Partial<Plotly.Layout> = {
      autosize: true,
      images: [
        {
          source: layoutImageUrl,
          xref: 'x',
          yref: 'y',
          x: 0,
          y: maxYPlot,
          sizex: maxXPlot,
          sizey: maxYPlot,
          sizing: 'stretch',
          opacity: 0.5,
          layer: 'below',
        },
      ],
      xaxis: { range: [0, xMax] },
      yaxis: { range: [0, yMax] },
      transition,
    };

    return {
      data: heatMapPlotData,
      layout,
    };
  }, [transition, plotData, layoutImageUrl, frames, frameList]);

  return {
    heatMapPlotInformation,
  };
};
