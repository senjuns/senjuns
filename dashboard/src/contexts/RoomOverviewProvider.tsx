import MomentUtils from '@date-io/moment';
import React, { useContext, useEffect, useState } from 'react';
import { useGetLatestMeasurementRunBySystemIdQuery } from '../graphql/generated/react_apollo';
import { useCropCycleDetails } from './CropCycleProvider';
import { useRoomDetails } from './RoomProvider';

const momentUtils = new MomentUtils();

export interface RoomOverviewContextState {
  loading: boolean;
  statistics: any;
  updatedTime: string | null;
}

export const RoomOverviewContext =
  React.createContext<RoomOverviewContextState>(undefined!);

export const RoomOverviewProvider: React.FC = ({ children }) => {
  const [statistics, setStatistics] = useState<any>(null);
  const [updatedTime, setUpdatedTime] = useState<string | null>(null);

  const { currentSystemId, setCurrentDateTime } = useRoomDetails();

  const { range } = useCropCycleDetails();

  const { data, loading } = useGetLatestMeasurementRunBySystemIdQuery({
    variables: {
      system_id: { _eq: currentSystemId },
      start: range.start,
      end: range.end,
    },
  });

  useEffect(() => {
    const firstMeasurementRun = data?.measurement_run[0];
    if (firstMeasurementRun) {
      if (!firstMeasurementRun?.metadata?.statistics) {
        setCurrentDateTime(firstMeasurementRun.start_time);
      }

      setStatistics(firstMeasurementRun?.metadata?.statistics);
      const measurementRunTime = new Date(firstMeasurementRun?.start_time);
      setUpdatedTime(momentUtils.moment(measurementRunTime).from(range.start));
    } else {
      setStatistics(null);
      setUpdatedTime(null);
    }
  }, [data]);

  return (
    <RoomOverviewContext.Provider
      value={{
        loading,
        statistics,
        updatedTime,
      }}
    >
      {children}
    </RoomOverviewContext.Provider>
  );
};

export const useRoomOverview = () => {
  return useContext(RoomOverviewContext);
};
