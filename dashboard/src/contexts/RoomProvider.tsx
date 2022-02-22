import React, { FC, useEffect, useMemo, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DropdownOption } from '../components/common';
import {
  GetZonesByOrganizationCodeQuery,
  useGetSystemsByZoneIdQuery,
  useGetZonesByOrganizationCodeQuery,
} from '../graphql/generated/react_apollo';
import { useScreenSize } from '../hooks';
import { ROOM_DETAIL_TABS, NULL_VALUE } from '../shared/constants';
import { getCurrentDateTime } from '../shared/utils';

export interface RoomContextState {
  roomOptions: DropdownOption[];
  currentRoomId: number;
  setCurrentRoomId: (id: number) => void;
  currentTab: ROOM_DETAIL_TABS;
  setCurrentTab: (tab: ROOM_DETAIL_TABS) => void;
  currentSystemId: number;
  setCurrentSystemId: (id: number) => void;
  currentDateTime: Date;
  setCurrentDateTime: (date: Date) => void;
  isPhotoSectionView: boolean;
  setIsPhotoSectionView: (isView: boolean) => void;
}

export const RoomContext = React.createContext<RoomContextState>(undefined!);

/**
 * This component represents a provider that provides data fetched from the backend.
 * This is essentially global state used in the application.
 * *
 * @param {FC} props The props
 * @returns {JSX.Element} global state
 */
export const RoomProvider: FC = (props) => {
  const history = useHistory();
  const { isMobile } = useScreenSize();
  const [rooms, setRooms] = useState<
    GetZonesByOrganizationCodeQuery['zone'] | null
  >(null);

  // TODO: get org code from user
  const organizationCode = 'NEATLEAF';
  const organizationFilter = {
    variables: { code: { _eq: organizationCode } },
  };
  const { data } = useGetZonesByOrganizationCodeQuery(organizationFilter);

  useEffect(() => {
    setRooms(data?.zone || null);
  }, [data]);

  const [currentRoomId, setCurrentRoomId] = useState(NULL_VALUE);
  const [currentTab, setCurrentTab] = useState(ROOM_DETAIL_TABS.OVERVIEW);
  const [isPhotoSectionView, setIsPhotoSectionView] = useState(false);
  const [currentSystemId, setCurrentSystemId] = useState(NULL_VALUE);
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    if (isMobile) {
      setCurrentTab(ROOM_DETAIL_TABS.OVERVIEW);
    } else {
      setCurrentTab(ROOM_DETAIL_TABS.HEAT_MAP);
    }
  }, [isMobile]);

  const zoneFilter = {
    variables: {
      zone_id: currentRoomId,
    },
  };
  const { data: systemData } = useGetSystemsByZoneIdQuery(zoneFilter);

  useEffect(() => {
    setCurrentSystemId(systemData?.system?.[0]?.id || NULL_VALUE);
    setCurrentDateTime(getCurrentDateTime());
  }, [systemData?.system?.[0]]);

  useEffect(() => {
    setCurrentRoomId(rooms?.[0].id || NULL_VALUE);
  }, [rooms]);

  useEffect(() => {
    if (currentRoomId === NULL_VALUE) return;
    history.push(`/room-details/${currentRoomId}/${currentTab}`);
  }, [history, currentTab, currentRoomId]);

  const roomOptions: DropdownOption[] = useMemo(
    () =>
      (rooms || []).map((room) => ({
        id: room.id,
        label: room.enumeration.description,
      })),
    [rooms]
  );

  return (
    <RoomContext.Provider
      {...props}
      value={{
        roomOptions,
        currentRoomId,
        setCurrentRoomId,
        currentSystemId,
        setCurrentSystemId,
        currentTab,
        setCurrentTab,
        currentDateTime,
        setCurrentDateTime,
        isPhotoSectionView,
        setIsPhotoSectionView,
      }}
    />
  );
};

export const useRoomDetails = () => {
  return useContext(RoomContext);
};
