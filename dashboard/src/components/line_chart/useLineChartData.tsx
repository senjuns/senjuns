import {
  useGetMeasurementRunsBetweenDatesQuery,
  useGetGrowthCycleByZoneIdQuery,
  GetMeasurementRunsBetweenDatesQuery,
  GetGrowthCycleByZoneIdQuery,
} from '../../graphql/generated/react_apollo';

export interface ILineChartProps {
  /**
   * system id for line chart
   */
  systemId: number;

  /**
   * zone id for line chart
   */
  zoneId: number;

  /**
   * start date for line chart
   */
  start: Date | null;

  /**
   * end date for line chart
   */
  end: Date | null;
}

export interface ILineChartData {
  /**
   * array of measurement run
   */
  measurementRunData:
    | GetMeasurementRunsBetweenDatesQuery['measurement_run']
    | null;

  /**
   * array of growth cycle
   */
  growthCycleData: GetGrowthCycleByZoneIdQuery['growth_cycle'] | null;

  /**
   * true if still loading data, otherwise false
   */
  loading: boolean;

  /**
   * graphql error
   */
  error: { measurementRunError?: any; growthCycleError?: any } | null;
}

export const useLineChartData = ({
  systemId,
  zoneId,
  start,
  end,
}: ILineChartProps): ILineChartData => {
  const {
    data: measurementRunData,
    loading: measurementRunLoading,
    error: measurementRunError,
  } = useGetMeasurementRunsBetweenDatesQuery({
    variables: {
      system_id: systemId,
      start,
      end,
    },
  });

  const {
    data: growthCycleData,
    loading: growthCycleLoading,
    error: growthCycleError,
  } = useGetGrowthCycleByZoneIdQuery({ variables: { zone_id: zoneId } });

  return {
    measurementRunData: measurementRunData
      ? measurementRunData.measurement_run
      : null,
    growthCycleData: growthCycleData ? growthCycleData.growth_cycle : null,
    loading: !(!measurementRunLoading && !growthCycleLoading),
    error:
      measurementRunError || growthCycleError
        ? {
            measurementRunError,
            growthCycleError,
          }
        : null,
  };
};
