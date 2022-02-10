import { IGetLatestPhotoFeedDataReturn } from 'components/photo_feed/useGetLatestPhotoFeedDataBySystemId';
import { QueryResult } from '@apollo/client';
import { useGetMeasurementRunsBySystemId } from 'components/photo_section_view/useGetMeasurementRunsBySystemId';
import {
  GetMeasurementsByIdsQuery,
  useGetMeasurementsByIdsQuery,
} from 'graphql/generated/react_apollo';
import { useMemo } from 'react';
import { IPosition, Size } from 'shared/interfaces';
import { getPhotoFeedResolutionInformation } from 'components/photo_feed/utils';

export interface IMeasurementRunIDAndResolution {
  measurementId: number;
  maximumResolution: [number, number];
  minimumResolution: [number, number];
}

export interface IGetSectionMeasurementsBySystemIdProps {
  /**
   * The measurement range end time.
   */
  endTime: Date;
  /**
   * The grid size.
   */
  gridSize: Size;
  /**
   * The position of specified section.
   */
  position: IPosition;
  /**
   * The system id.
   */
  systemId: number;
  /**
   * The measurement range start time.
   */
  startTime: Date;
}

export interface ISectionMeasurementsBySystemIdReturn
  extends Pick<QueryResult, 'error' | 'loading'> {
  data: GetMeasurementsByIdsQuery['measurement'];
  measurementIDAndResolutions: IMeasurementRunIDAndResolution[];
}

/**
 * Gets the recent measurement runs that has specified section information by system Id.
 *
 * @param {IGetSectionMeasurementsBySystemId} props - The measurement run query props
 * @returns {number[]} - The measurementIds which include certain section
 */
export const useGetSectionMeasurementsBySystemId = ({
  endTime,
  gridSize,
  position,
  startTime,
  systemId,
}: IGetSectionMeasurementsBySystemIdProps): ISectionMeasurementsBySystemIdReturn => {
  const { data: recentMeasurementRuns } = useGetMeasurementRunsBySystemId({
    endTime,
    startTime,
    systemId,
  });

  const measurementIDAndResolutions: IMeasurementRunIDAndResolution[] =
    useMemo(() => {
      return recentMeasurementRuns
        .map((measurementRun) => {
          const flippedY = gridSize.height - position.y - 1;
          const measurementRunGrid = measurementRun.metadata?.image_info?.grid;
          const measurementId = measurementRunGrid?.[position.x]?.[flippedY];

          const photoFeedResolutionInformation =
            getPhotoFeedResolutionInformation(
              measurementRun as unknown as IGetLatestPhotoFeedDataReturn['measurementRun']
            );

          if (!measurementId || !photoFeedResolutionInformation) return null;

          return {
            measurementId,
            ...photoFeedResolutionInformation,
          };
        })
        .filter((each) => each) as IMeasurementRunIDAndResolution[];
    }, [recentMeasurementRuns, position]);

  const { data, loading, error } = useGetMeasurementsByIdsQuery({
    variables: {
      ids: measurementIDAndResolutions.map((each) => each?.measurementId),
    },
  });

  return {
    data: data?.measurement || [],
    measurementIDAndResolutions,
    loading,
    error,
  };
};
