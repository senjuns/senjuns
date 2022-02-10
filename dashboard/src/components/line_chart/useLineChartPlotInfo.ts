import { useCallback, useEffect, useState } from 'react';
import Plotly from 'plotly.js';
import { XAxis, YAxis, LineState } from './types';
import { plotlyDataConfig, plotlyConfig, plotlyLayoutConfig } from './config';

export interface ILineChartPlotInfo {
  config: Partial<Plotly.Config>;
  data: Partial<Plotly.PlotData>[];
  layout: Partial<Plotly.Layout>;
}

export interface ILineChartPlotParams {
  xRange: XAxis[];
  yRange: YAxis[];
  shapes: any[];
  state: LineState;
}

export const useLineChartPlotInfo = (
  params: ILineChartPlotParams
): ILineChartPlotInfo => {
  const [lineChartPlotInfo, setLineChartPlotInfo] =
    useState<ILineChartPlotInfo>({ config: {}, data: [], layout: {} });

  const { xRange, yRange, shapes, state } = params;

  const loadLineChartPlotInfo = useCallback(() => {
    const data = plotlyDataConfig(state);
    const config = plotlyConfig();
    const layout = plotlyLayoutConfig(xRange, yRange, shapes);

    setLineChartPlotInfo({
      config,
      data,
      layout,
    });
  }, [xRange, yRange, shapes, state]);

  useEffect(() => {
    loadLineChartPlotInfo();
  }, [loadLineChartPlotInfo]);

  return lineChartPlotInfo;
};
