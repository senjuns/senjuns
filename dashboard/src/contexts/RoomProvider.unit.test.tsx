import { FC } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { RoomProvider, useRoomDetails } from './RoomProvider';
import { ROOM_DETAIL_TABS } from 'shared/constants';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: (url: string) => mockHistoryPush(url),
  }),
}));

const mockZonesData = {
  data: {
    zone: [
      {
        id: 1,
        location_id: 1,
        name_id: 1,
        enumeration: { description: 'Test-Room-1' },
      },
      {
        id: 2,
        location_id: 2,
        name_id: 2,
        enumeration: { description: 'Test-Room-2' },
      },
    ],
  },
};

const mockValidSystemsData = { data: { system: [{ id: 1 }, { id: 2 }] } };

const mockInvalidSystemsData = { data: { system: null } };

let mockIsMobile = false;

jest.mock('graphql/generated/react_apollo', () => ({
  useGetZonesByOrganizationCodeQuery: () => mockZonesData,
  useGetSystemsByZoneIdQuery: (zoneFilter: any) => {
    {
      if (zoneFilter.variables.zone_id === -1) {
        return mockInvalidSystemsData;
      } else {
        return mockValidSystemsData;
      }
    }
  },
}));

jest.mock('hooks', () => ({
  useScreenSize: () => {
    return { isMobile: mockIsMobile };
  },
}));

const RoomProviderUse: FC = () => {
  const {
    roomOptions,
    currentRoomId,
    currentSystemId,
    currentTab,
    isPhotoSectionView,
  } = useRoomDetails();

  return (
    <div data-testid="auth-use">
      <div data-testid="rooms-length">{roomOptions?.length}</div>
      <div data-testid="current-room-id">{currentRoomId}</div>
      <div data-testid="current-system-id">{currentSystemId}</div>
      <div data-testid="current-tab">{currentTab}</div>
      <div data-testid="is-photo-section-view">
        {isPhotoSectionView ? 'true' : 'false'}
      </div>
    </div>
  );
};

describe('<RoomProvider />', () => {
  test('should be able to get the correct data provided in Mobile', async () => {
    mockIsMobile = true;

    render(
      <RoomProvider>
        <RoomProviderUse />
      </RoomProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('rooms-length')).toHaveTextContent('2');
      expect(screen.getByTestId('current-room-id')).toHaveTextContent('1');
      expect(screen.getByTestId('current-system-id')).toHaveTextContent('1');
      expect(screen.getByTestId('current-tab')).toHaveTextContent(
        ROOM_DETAIL_TABS.OVERVIEW
      );
      expect(screen.getByTestId('is-photo-section-view')).toHaveTextContent(
        'false'
      );
    });
  });

  test('should be able to get the correct data provided in Web', async () => {
    mockIsMobile = false;

    render(
      <RoomProvider>
        <RoomProviderUse />
      </RoomProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('rooms-length')).toHaveTextContent('2');
      expect(screen.getByTestId('current-room-id')).toHaveTextContent('1');
      expect(screen.getByTestId('current-system-id')).toHaveTextContent('1');
      expect(screen.getByTestId('current-tab')).toHaveTextContent(
        ROOM_DETAIL_TABS.HEAT_MAP
      );
      expect(screen.getByTestId('is-photo-section-view')).toHaveTextContent(
        'false'
      );
    });
  });
});
