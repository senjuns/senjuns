import React from 'react';
import Plot from 'react-plotly.js';
import { XAxis, YAxis, LineState } from './types';
import { useLineChartPlotInfo } from './useLineChartPlotInfo';

interface LineChartViewProps {
  xRange: XAxis[];
  yRange: YAxis[];
  shapes: any[];
  state: LineState;
}

const LineChartView: React.FC<LineChartViewProps> = ({
  xRange,
  yRange,
  shapes,
  state,
}) => {
  const lineChartPlotInfo = useLineChartPlotInfo({
    xRange,
    yRange,
    shapes,
    state,
  });

  return (
    <Plot
      data={lineChartPlotInfo.data}
      layout={lineChartPlotInfo.layout}
      config={lineChartPlotInfo.config}
      useResizeHandler={true}
      style={{ width: '100%', height: '294px' }}
    />
  );
};

export default LineChartView;
