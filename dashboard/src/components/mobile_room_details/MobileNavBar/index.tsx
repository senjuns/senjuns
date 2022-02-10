import React, { lazy } from 'react';
import styled from 'styled-components';
import { ROOM_DETAIL_TABS } from 'shared/constants';
import { useFeatureFlags } from 'contexts/FeatureFlagsProvider';
import { useRoomDetails } from 'contexts';

const Tab = lazy(() => import('components/common/Tab'));

const MobileNavBar: React.FunctionComponent = () => {
  const { currentTab, setCurrentTab } = useRoomDetails();
  const { heatMapViewFlag, lineChartFlag } = useFeatureFlags();

  const tabs = [
    { label: 'Overview', flag: true, id: ROOM_DETAIL_TABS.OVERVIEW },
    {
      label: 'Heat map',
      flag: heatMapViewFlag,
      id: ROOM_DETAIL_TABS.HEAT_MAP,
    },
    { label: 'Photo feed', flag: true, id: ROOM_DETAIL_TABS.PHOTO_FEED },
    {
      label: 'Line chart',
      flag: lineChartFlag,
      id: ROOM_DETAIL_TABS.LINE_CHART,
    },
  ].filter((tab) => tab.flag);

  return (
    <ScrollableContainer>
      <TabGroup>
        {tabs.map((tab) => (
          <Tab
            id={tab.id}
            key={tab.id}
            selected={currentTab === tab.id}
            label={tab.label}
            onClick={() => setCurrentTab(tab.id)}
          />
        ))}
      </TabGroup>
    </ScrollableContainer>
  );
};

const ScrollableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabGroup = styled.div`
  display: flex;
  gap: 24px;
  min-width: 360px;
`;

export default MobileNavBar;
