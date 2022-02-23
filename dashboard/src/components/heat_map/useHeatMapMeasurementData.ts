import { ApolloError } from '@apollo/client';
import Plotly from 'plotly.js';
import { useMemo } from 'react';
import { useGetRecentHeatMapsBySystemIdQuery } from '../../graphql/generated/react_apollo';
import {
  EnumerationTypes,
  ISystemFrame,
  TMeasurementStatistic,
} from '../../shared/interfaces';
import {
  convertCelsiusToFahrenheit,
  convertMetersPerSecondToMph,
  convertNumbersToHaveFixedFloatingPoints,
} from '../../shared/utils';
import { unshiftImmutableArray } from './utils';

export interface IHeatMapMeasurementDataProps {
  /**
   * The System Id.
   */
  systemId: number;
  /**
   * From the specific date.
   */
  start: Date;
  /**
   * To the specific date.
   */
  end: Date;
  /**
   * The type of measurement
   */
  enumeration: string;
}

export interface IHeatMapMeasurementDataReturn {
  /**
   * `true` if the data is still being loaded, `false` otherwise.
   */
  loading: boolean;
  /**
   * Error text while manipulating measurmenet data.
   */
  error?: ApolloError;
  /**
   * Frames that need to be displayed in the heatmap player.
   */
  frames: Partial<Plotly.Frame>[];
  /**
   * Frame poisitons captured by the system.
   */
  frameList: Array<ISystemFrame>;
  /**
   * PlotData generated by HeatMap.
   */
  plotData?: Partial<Plotly.PlotData>;
  /**
   * General statistic data for all frames.
   */
  statistic: TMeasurementStatistic;
}

/**
 * Get the measurmenet data from the given system.
 *
 * @param {IHeatMapMeasurementDataProps} - Get Measurement by given conditions.
 * @returns {IHeatMapMeasurementDataReturn} - Measurement Data Return details.
 */
export const useHeatMapMeasurementData = ({
  systemId,
  start,
  end,
  enumeration,
}: IHeatMapMeasurementDataProps): IHeatMapMeasurementDataReturn => {
  const { data, loading, error } = useGetRecentHeatMapsBySystemIdQuery({
    variables: { system_id: systemId, start, end, enumeration },
  });

  const getUpdatedValue = (value: number): number => {
    switch (enumeration) {
      case EnumerationTypes.AIR_TEMPERATURE_MOBILE_RESOLUTION:
      case EnumerationTypes.AIR_TEMPERATURE_DESKTOP_RESOLUTION:
      case EnumerationTypes.LEAF_TEMPERATURE_MOBILE_RESOLUTION:
      case EnumerationTypes.LEAF_TEMPERATURE_DESKTOP_RESOLUTION:
        return convertCelsiusToFahrenheit(value);
      case EnumerationTypes.AIR_FLOW_DESKTOP_RESOLUTION:
      case EnumerationTypes.AIR_FLOW_MOBILE_RESOLUTION:
        return convertMetersPerSecondToMph(value);
      default:
        return value;
    }
  };

  const addPaddingData = (results: any[]) => {
    for (let i = 0; i < results.length; i++) {
      if (results[i]?.x) {
        results[i].x = unshiftImmutableArray(results[i].x, 0);
      }

      if (results[i]?.y) {
        results[i].y = unshiftImmutableArray(results[i].y, 0);
      }

      if (results[i]?.z) {
        results[i].z = unshiftImmutableArray(results[i].z, results[i].z[0]);
        for (let j = 0; j < results[i].z.length; j++) {
          results[i].z[j] = unshiftImmutableArray(
            results[i].z[j],
            results[i].z[j][0]
          );
        }
      }
    }
  };

  const frameList: ISystemFrame[] = useMemo(() => {
    return (
      data?.heat_map?.map(({ measurement_run: measurementRun, id }) => ({
        systemId: id,
        startTime: measurementRun.start_time,
        statistics: measurementRun.metadata?.derived_data?.statistics,
      })) || []
    );
  }, [data]);

  const { results, statistic } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const results =
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data?.heat_map?.map(({ data: { data }, id }) => ({
        ...data,
        id,
      })) || [];

    // add padding data
    addPaddingData(results);

    let minValue = Number.POSITIVE_INFINITY;
    let maxValue = Number.NEGATIVE_INFINITY;

    // convert celsius to fahrenheit
    results.forEach((frame, frameIndex) => {
      frame.z.forEach((row: Array<any>, rowIndex: number) => {
        row.forEach((value, valueIndex) => {
          const newValue = getUpdatedValue(value);

          results[frameIndex].z[rowIndex][valueIndex] = newValue;
          minValue = Math.min(minValue, newValue);
          maxValue = Math.max(maxValue, newValue);
        });
      });
    });

    for (let i = 0; i < results.length; i++) {
      results[i]?.z[0]?.push(minValue);
      results[i]?.z[0]?.push(maxValue);
    }

    return {
      statistic: {
        min: minValue,
        mean: (minValue + maxValue) / 2,
        max: maxValue,
      },
      results,
    };
  }, [data]);

  const frames = useMemo(() => {
    return results.map((item) => ({
      name: item.id,
      data: [
        {
          x: convertNumbersToHaveFixedFloatingPoints(item.x),
          y: convertNumbersToHaveFixedFloatingPoints(item.y),
          z: convertNumbersToHaveFixedFloatingPoints(item.z),
        },
      ],
    }));
  }, [results]);

  return { loading, error, frameList, frames, statistic, plotData: results[0] };
};
