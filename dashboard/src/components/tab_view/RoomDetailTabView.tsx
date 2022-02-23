import React, { lazy } from 'react';
import styled from 'styled-components';

import { ReactComponent as BackButtonIcon } from '../../assets/svg/back-button.svg';
import { Dropdown } from '../../components/common';
import { CropCycleMenu } from '../../components/common/CropCycleMenu';
import { useLightHours } from '../../components/tab_view/useLightHours';
import { useMeasurementCards } from '../../components/tab_view/useMeasurementCards';
import { useCropCycleDetails } from '../../contexts/CropCycleProvider';
import { useFeatureFlags } from '../../contexts/FeatureFlagsProvider';
import { useRoomOverview } from '../../contexts/RoomOverviewProvider';
import { useRoomDetails } from '../../contexts/RoomProvider';
import { Colors, ROOM_DETAIL_TABS, Sizes } from '../../shared/constants';
import { getCurrentDateTime } from '../../shared/utils';

const PlantStrainTooltip = lazy(() => import('./PlantStrainTooltip'));
const Tab = lazy(() => import('../../components/common/Tab'));
const HarvestProgress = lazy(
  () => import('../../components/harvest_progress/HarvestProgress')
);
const HeatMap = lazy(() => import('../../components/heat_map/HeatMap'));
const LightStatusPanel = lazy(
  () => import('../../components/light_status_panel/LightStatusPanel')
);
const LineChart = lazy(() => import('../../components/line_chart/LineChart'));
const MeasurementCard = lazy(
  () => import('../../components/measurement_card/MeasurementCard')
);
const PhotoFeed = lazy(() => import('../../components/photo_feed/PhotoFeed'));
const NoDataView = lazy(() => import('../../components/error/NoDataView'));

interface RoomDetailTabViewProps {
  /**
   * Current room
   */
  roomId: number;
  /**
   * Current tab that the user selected.
   */
  currentTab: string;
  /**
   * Callback to be called when the user changes the tab.
   */
  onChangeTab: (tab: ROOM_DETAIL_TABS) => void;
}

const RoomDetailTabView: React.FC<RoomDetailTabViewProps> = ({
  currentTab,
  onChangeTab,
}) => {
  const { airflowSensorFlag, heatMapViewFlag, lineChartFlag } =
    useFeatureFlags();

  const {
    roomOptions,
    currentRoomId,
    currentSystemId,
    isPhotoSectionView,
    setCurrentRoomId,
    setIsPhotoSectionView,
  } = useRoomDetails();

  const {
    lightInfo,
    plantInfo,
    startTime,
    endTime,
    range: cropCycleRange,
    onChange: onChangeCropCycleRange,
  } = useCropCycleDetails();

  const { loading, statistics, updatedTime } = useRoomOverview();

  const measurementCards = useMeasurementCards(statistics, airflowSensorFlag);

  const { lightHours, currentTimeOffsetInHours } = useLightHours(lightInfo);

  const hasData = statistics && !loading;
  const hasNoData = !statistics && !loading;

  const tabs = [
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

  const handlePhotoFeedBack = () => {
    setIsPhotoSectionView(false);
  };

  return (
    <Container>
      <Header id="room-detail-header">
        <RoomSelectorWrapper id="room-selector">
          <RoomSelector>
            <Dropdown
              options={roomOptions}
              value={currentRoomId}
              onChange={(roomId) => setCurrentRoomId(Number(roomId))}
            />
            <PlantStrainTooltip strainInfo={plantInfo} />
          </RoomSelector>
        </RoomSelectorWrapper>

        {hasData && (
          <RoomMetaDetail id="room-meta-detail">
            <CropCycleMenu
              current={cropCycleRange}
              isInvalid={!startTime}
              defaultLabel={
                updatedTime ? 'Updated ' + updatedTime : 'Not updated'
              }
              whole={{ start: startTime!, end: getCurrentDateTime() }}
              onSelectRange={onChangeCropCycleRange}
            />
          </RoomMetaDetail>
        )}
      </Header>

      {hasData && (
        <MainSection>
          <OverviewPanel id="overview-panel">
            <HarvestProgress startTime={startTime} endTime={endTime} />

            <LightStatusPanel
              lightHours={lightHours}
              currentTimeInHours={currentTimeOffsetInHours}
            />
            {measurementCards.map((measurementCard, index) => (
              <MeasurementCard
                icon={measurementCard.icon}
                title={measurementCard.title}
                value={measurementCard.value}
                unit={measurementCard.unit}
                notificationLevel={measurementCard.notificationLevel}
                decimal={measurementCard.decimal}
                key={index}
              />
            ))}
          </OverviewPanel>

          <TabContainer id="room-detail-tab-container">
            <TabHeader>
              <TabGroup>
                {tabs.map((tab) => (
                  <Tab
                    id={tab.id}
                    key={tab.id}
                    selected={currentTab === tab.id}
                    label={tab.label}
                    onClick={() => onChangeTab(tab.id)}
                  />
                ))}
              </TabGroup>
              {isPhotoSectionView &&
                currentTab === ROOM_DETAIL_TABS.PHOTO_FEED && (
                  <BackButton role="button" onClick={handlePhotoFeedBack}>
                    <BackButtonIcon />
                    <span>Back</span>
                  </BackButton>
                )}
            </TabHeader>

            {currentTab === ROOM_DETAIL_TABS.HEAT_MAP && (
              <TabPanel>
                <HeatMap systemId={currentSystemId} />
              </TabPanel>
            )}
            {currentTab === ROOM_DETAIL_TABS.LINE_CHART && (
              <TabPanel>{<LineChart systemId={currentSystemId} />}</TabPanel>
            )}
            {currentTab === ROOM_DETAIL_TABS.PHOTO_FEED && (
              <TabPanel>
                <PhotoFeed systemId={currentSystemId} />
              </TabPanel>
            )}
          </TabContainer>
        </MainSection>
      )}

      {hasNoData && (
        <NoDataView message="There is no data available for this room. Please, select a different one to continue." />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background: white;
  border-radius: 40px;
  flex-direction: column;
  padding: 40px;
  height: 100%;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-family: Poppins;
  font-weight: 600;
  font-size: 26px;
  margin-bottom: ${Sizes.xxLarge}px;

  & > p {
    color: ${Colors.dark7};
    width: fit-content;
    white-space: nowrap;
  }
`;

const RoomSelector = styled.div`
  width: 300px;
  display: flex;
  margin-right: 80px;
`;

const RoomMetaDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
`;

const OverviewPanel = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-right: 20px;
  margin-right: 80px;
  width: 300px;
  min-width: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 380px);
  overflow-x: hidden;
  overflow-y: auto;
`;

const TabPanel = styled.div`
  flex: 1;

  padding: 20px 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TabGroup = styled.div`
  display: flex;
  gap: 24px;
  min-width: 360px;
`;

const BackButton = styled.div`
  background: #f0f1f4;
  border-radius: 20px;
  padding: 15px 14px 15px 14px;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

const RoomSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RoomDetailTabView;
