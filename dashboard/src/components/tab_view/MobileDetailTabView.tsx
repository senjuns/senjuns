import { FC, lazy, Suspense, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { Dropdown } from '../../components/common';
import { CropCycleMenu } from '../../components/common/CropCycleMenu';
import { useLightHours } from '../../components/tab_view/useLightHours';
import { useMeasurementCards } from '../../components/tab_view/useMeasurementCards';
import { useFeatureFlags } from '../../contexts';
import { useCropCycleDetails } from '../../contexts/CropCycleProvider';
import { useRoomOverview } from '../../contexts/RoomOverviewProvider';
import { useRoomDetails } from '../../contexts/RoomProvider';
import { Colors, ROOM_DETAIL_TABS } from '../../shared/constants';
import { getCurrentDateTime } from '../../shared/utils';
import PlatnStrainTooltip from './PlantStrainTooltip';

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
const MobileNavBar = lazy(
  () => import('../../components/mobile_room_details/MobileNavBar')
);
const PhotoFeed = lazy(() => import('../../components/photo_feed/PhotoFeed'));
const NoDataView = lazy(() => import('../../components/error/NoDataView'));

interface MobileDetailTabViewProps {
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

const MobileDetailTabView: FC<MobileDetailTabViewProps> = ({
  currentTab,
  onChangeTab,
}) => {
  const overviewRef = useRef<HTMLInputElement>(null);

  const [isOverviewGoingDown, setIsOverviewGoingDown] = useState(false);

  const handlers = useSwipeable({
    onSwipedDown: () => {
      setIsOverviewGoingDown(true);
      setTimeout(() => {
        setIsOverviewGoingDown(false);
        onChangeTab(ROOM_DETAIL_TABS.PHOTO_FEED);
      }, 300);
    },
  });

  const { airflowSensorFlag } = useFeatureFlags();

  const { loading, statistics, updatedTime } = useRoomOverview();

  const { roomOptions, currentRoomId, currentSystemId, setCurrentRoomId } =
    useRoomDetails();

  const {
    startTime,
    endTime,
    plantInfo,
    lightInfo,
    range: cropCycleRange,
    onChange: onChangeCropCycleRange,
  } = useCropCycleDetails();

  const measurementCards = useMeasurementCards(statistics, airflowSensorFlag);

  const isOverviewPage = currentTab === ROOM_DETAIL_TABS.OVERVIEW;
  const isPhotoFeedPage = currentTab === ROOM_DETAIL_TABS.PHOTO_FEED;
  const isShowPhotoFeed = isOverviewPage && currentSystemId != -1;
  const hasData = statistics && !loading;
  const hasNoData = !statistics && !loading;

  const handlePhotoFeedClick = () => {
    onChangeTab(ROOM_DETAIL_TABS.PHOTO_FEED);
  };

  const { lightHours, currentTimeOffsetInHours } = useLightHours(lightInfo);

  let tabPanel = null;
  switch (currentTab) {
    case ROOM_DETAIL_TABS.HEAT_MAP:
      tabPanel = <HeatMap systemId={currentSystemId} />;
      break;
    case ROOM_DETAIL_TABS.LINE_CHART:
      tabPanel = <LineChart systemId={currentSystemId} />;
      break;
    case ROOM_DETAIL_TABS.OVERVIEW:
      tabPanel = (
        <>
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
        </>
      );
      break;
    default:
      tabPanel = <h1>default</h1>;
      break;
  }

  const commonInformation = (
    <>
      <Header>
        <RoomSelectorWrapper>
          <StyledMobileRoomSelector
            options={roomOptions}
            value={currentRoomId}
            onChange={(roomId) => setCurrentRoomId(Number(roomId))}
          />
          <PlatnStrainTooltip strainInfo={plantInfo} />
        </RoomSelectorWrapper>
        {hasData && (
          <CropCycleMenu
            current={cropCycleRange}
            isInvalid={!startTime}
            defaultLabel={
              updatedTime ? 'Updated ' + updatedTime : 'Not updated'
            }
            whole={{
              start: startTime || getCurrentDateTime(),
              end: getCurrentDateTime(),
            }}
            onSelectRange={onChangeCropCycleRange}
          />
        )}
      </Header>
      {hasData && (
        <Suspense fallback={<Container>Loading MobileNavBar..</Container>}>
          <MobileNavBar />
        </Suspense>
      )}
      {hasData && (
        <Suspense fallback={<Container>Loading Tabs..</Container>}>
          <TabPanel>{tabPanel}</TabPanel>
        </Suspense>
      )}
    </>
  );

  let photoFeedComponent = <></>;
  let mainComponent = <></>;

  if (isShowPhotoFeed && !hasNoData) {
    photoFeedComponent = (
      <div onClick={handlePhotoFeedClick}>
        <PhotoFeedContainer>
          <PhotoFeed systemId={currentSystemId} />
        </PhotoFeedContainer>
      </div>
    );
  }

  if (hasNoData) {
    mainComponent = (
      <>
        {commonInformation}
        <NoDataView message="There is no data available for this room. Please, select a different one to continue." />
      </>
    );
  } else if (isOverviewPage) {
    mainComponent = (
      <OverviewContainer ref={overviewRef} goingDown={isOverviewGoingDown}>
        <OverviewSeparator {...handlers}></OverviewSeparator>
        {commonInformation}
      </OverviewContainer>
    );
  } else if (isPhotoFeedPage) {
    mainComponent = <PhotoFeed systemId={currentSystemId} />;
  } else {
    mainComponent = (
      <NonOverviewContainer>{commonInformation}</NonOverviewContainer>
    );
  }

  return (
    <Container id="room-detail-tab-container">
      {photoFeedComponent}
      {mainComponent}
    </Container>
  );
};

export default MobileDetailTabView;

const Container = styled.div<{ height?: number }>`
  position: relative;
  width: 100%;
  height: calc(100vh - 120px);
`;

const PhotoFeedContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
`;

const OverviewContainer = styled.div<{ goingDown: boolean }>`
  position: absolute;
  left: 0;
  top: 100px;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 14px 30px 30px 30px;
  background: white;
  border-radius: 50px 50px 0 0;

  @keyframes "going-down" {
    0% {
      transform: translatey(0);
    }
    100% {
      transform: translatey(100%);
    }
  }

  ${(props) => props.goingDown && `animation: going-down 0.5s linear;`}
`;

const OverviewSeparator = styled.div`
  width: 50px;
  height: 5px;
  margin-left: auto;
  margin-right: auto;
  background: #ecedf1;
  border-radius: 10px;
  margin-bottom: 29px;
`;

const NonOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;

  & > p {
    color: ${Colors.dark7};
    flex-shrink: 1;
  }
`;

const TabPanel = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledMobileRoomSelector = styled(Dropdown)`
  flex-shrink: 10000;
`;

const RoomSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
