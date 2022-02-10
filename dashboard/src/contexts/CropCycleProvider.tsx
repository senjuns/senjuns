import { subDays } from 'date-fns';
import {
  createContext,
  FC,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

import { useRoomDetails } from 'contexts/RoomProvider';
import { TimeRange } from 'shared/interfaces/general';
import { IGrowCycleInfo, useGrowCycle } from 'hooks/useGrowCycle';

export interface CropCycleState extends IGrowCycleInfo {
  range: TimeRange;
  onChange: (range: TimeRange) => void;
}

export const CropCycleContext = createContext<CropCycleState>(undefined!);

export const CropCycleProvider: FC = (props) => {
  const { currentRoomId, currentDateTime } = useRoomDetails();

  const {
    startTime,
    endTime,
    lightInfo,
    loading,
    monitoringParams,
    plantInfo,
  } = useGrowCycle(currentRoomId, currentDateTime);

  const defaultRange = useMemo(
    () => ({
      start: subDays(currentDateTime, 3),
      end: currentDateTime,
    }),
    [currentDateTime]
  );

  const [range, setRange] = useState<TimeRange>(defaultRange);

  useEffect(() => {
    setRange(defaultRange);
  }, [defaultRange]);

  return (
    <CropCycleContext.Provider
      {...props}
      value={{
        startTime,
        endTime,
        plantInfo,
        lightInfo,
        loading,
        monitoringParams,
        range,
        onChange: setRange,
      }}
    />
  );
};

export const useCropCycleDetails = () => {
  return useContext(CropCycleContext);
};
