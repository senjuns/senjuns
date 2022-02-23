import { ApolloError } from '@apollo/client';
import { useGetGrowthCycleByZoneIdAndDateQuery } from '../graphql/generated/react_apollo';
import { IPlantInfo } from '../shared/interfaces';

export interface IGrowCycleProps {
  /**
   * Zone Id
   */
  zoneId: number | null;
  /**
   * Time
   */
  time: string | Date | null;
}

export interface IGrowCycleInfo {
  /**
   * `true` if the data is still being loaded, `false` otherwise.
   */
  loading: boolean;
  /**
   * Error text while manipulating measurmenet data.
   */
  error?: ApolloError | string | null;
  /**
   * Start time
   */
  startTime: Date | null;
  /**
   * End time
   */
  endTime: Date | null;
  /**
   * Plant Information
   */
  plantInfo: IPlantInfo[] | null;
  /**
   * Light Information
   */
  lightInfo: any;
  /**
   * Monitoring Parameters
   */
  monitoringParams: any;
}

/**
 * Get grow cycle by zone id and data.
 *
 * @param {number|null} zoneId - zone id
 * @param {Date|null} start - date
 * @returns {IGrowCycleInfo} - grow cycle information
 */
export const useGrowCycle = (
  zoneId: number | null,
  start: Date | null
): IGrowCycleInfo => {
  const { data, loading, error } = useGetGrowthCycleByZoneIdAndDateQuery({
    variables: { zone_id: zoneId, start },
  });

  if (!zoneId || !data?.growth_cycle?.[0]) {
    return {
      loading: false,
      error: zoneId ? null : 'invalid parameters',
      startTime: null,
      endTime: null,
      plantInfo: null,
      lightInfo: null,
      monitoringParams: null,
    };
  }

  const growthCycle = data.growth_cycle[0];
  const startTime = new Date(growthCycle.start_time);
  const endTime = new Date(growthCycle.end_time);

  const plantInfo: IPlantInfo[] = (growthCycle.metadata.plant_info || []).map(
    (value: any) => ({ strainName: value.strain_name, count: value.count })
  );
  const lightInfo = growthCycle.metadata.light_info;
  const monitoringParams = growthCycle.metadata.monitoring_parameters;

  return {
    loading,
    error,
    startTime,
    endTime,
    plantInfo,
    lightInfo,
    monitoringParams,
  };
};
