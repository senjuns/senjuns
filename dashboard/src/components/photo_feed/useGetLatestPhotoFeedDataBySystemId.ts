import { ApolloError } from '@apollo/client';
import { flatten } from 'lodash';
import { useMemo } from 'react';
import {
  GetLatestMeasurementRunWithImagesBySystemIdQuery,
  GetMeasurementsByIdsQuery,
  useGetLatestMeasurementRunWithImagesBySystemIdQuery,
  useGetMeasurementsByIdsQuery,
} from '../../graphql/generated/react_apollo';
import { ArrayElement } from '../../shared/interfaces';

export type MeasurementById = ArrayElement<
  GetMeasurementsByIdsQuery['measurement']
>;

export interface IGetLatestPhotoFeedDataProps {
  /**
   * The end range.
   */
  endTime: Date;
  /**
   * The start range.
   */
  startTime: Date;
  /**
   * The system id.
   */
  systemId: number;
}

export interface IGetLatestPhotoFeedDataReturn {
  /**
   * Error triggered while loading the measurement run and photo feed information.
   */
  error?: ApolloError;
  /**
   * Shows if the data is currently being loaded.
   */
  loading: boolean;
  /**
   * Latest measurement run information of current system.
   */
  measurementRun?: ArrayElement<
    GetLatestMeasurementRunWithImagesBySystemIdQuery['measurement_run']
  >;
  /**
   * The photo urls in grid
   */
  measurementsGrid: MeasurementById[][];
}

/**
 * Get the Latest Measurements Data By SystemId
 *
 * @param {IGetLatestPhotoFeedDataProps} props - The photo feed query
 * @returns {IGetLatestPhotoFeedDataReturn} - The photo feed data
 */
export const useGetLatestPhotoFeedDataBySystemId = ({
  endTime,
  startTime,
  systemId,
}: IGetLatestPhotoFeedDataProps): IGetLatestPhotoFeedDataReturn => {
  // Are we going to get the system image size from the resource path, or are we going to set that as metadata
  const {
    data: latestMeasurementRun,
    error: latestMeasurementRunError,
    loading: latestMeasurementRunLoading,
  } = useGetLatestMeasurementRunWithImagesBySystemIdQuery({
    variables: {
      system_id: { _eq: systemId },
      start: startTime,
      end: endTime,
    },
  });

  const measurementRun = latestMeasurementRun?.measurement_run?.[0];
  const measurementIdGrid: number[][] = measurementRun?.metadata?.image_info
    ?.grid || [[]];

  const {
    data: measurements,
    error: measurementsError,
    loading: measurementsLoading,
  } = useGetMeasurementsByIdsQuery({
    variables: { ids: flatten(measurementIdGrid) },
  });

  const measurementsById: Record<string, MeasurementById> = useMemo(() => {
    return (
      measurements?.measurement?.reduce(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (measurementsById: Record<string, MeasurementById>, measurement) => {
          measurementsById[measurement.id as string] = measurement;
          return measurementsById;
        },
        {}
      ) || {}
    );
  }, [measurements]);

  const measurementsGrid = useMemo(() => {
    return measurementIdGrid.map((measurementIdRow) =>
      measurementIdRow.map((measurementId) => measurementsById[measurementId])
    );
  }, [measurementIdGrid, measurementsById]);

  return {
    error: latestMeasurementRunError || measurementsError,
    loading: latestMeasurementRunLoading || measurementsLoading,
    measurementRun,
    measurementsGrid,
  };
};
