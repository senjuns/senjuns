import { QueryResult } from '@apollo/client';
import {
  GetMeasurementRunsBySystemIdQuery,
  useGetMeasurementRunsBySystemIdQuery,
} from '../../graphql/generated/react_apollo';

export interface IGetMeasurementRunsBySystemIdReturn
  extends Pick<QueryResult, 'error' | 'loading'> {
  data: GetMeasurementRunsBySystemIdQuery['measurement_run'];
}

export interface IGetMeasurementRunsBySystemIdProps {
  /**
   * The measurement range start time.
   */
  startTime: Date;
  /**
   * The system id.
   */
  systemId: number;
  /**
   * The measurement range end time.
   */
  endTime: Date;
}

/**
 * For now, this function will filter the measurement runs that has the correct photo_feed_info grid
 *
 * @param {number} systemId - The system id
 * @param {Date} startTime - when to start searching
 * @param {number} daysEarlier - The number of days that we would like to get the measurement runs.
 * @returns {IMeasurementRunsBySystemId} - The measurement run data
 */
export const useGetMeasurementRunsBySystemId = ({
  endTime,
  systemId,
  startTime,
}: IGetMeasurementRunsBySystemIdProps): IGetMeasurementRunsBySystemIdReturn => {
  const { loading, error, data } = useGetMeasurementRunsBySystemIdQuery({
    variables: { system_id: systemId, start: startTime, end: endTime },
  });

  const measurementData =
    data?.measurement_run?.filter((each) => each.metadata?.image_info?.grid) ||
    [];

  return { data: measurementData, loading, error };
};
