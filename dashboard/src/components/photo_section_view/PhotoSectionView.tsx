import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RemoveIcon from '@material-ui/icons/Remove';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styled from 'styled-components';
import { IconButton, PlayButton } from '../../components/common';
import { getPublicResourcePath } from '../../components/photo_feed/utils';
import TimeHistoryButton from '../../components/photo_section_view/TimeHistoryButton';
import TimeTracker from '../../components/photo_section_view/TimeTracker';
import { useGetSectionMeasurementsBySystemId } from '../../components/photo_section_view/useGetSectionMeasurementsBySystemId';
import { useCropCycleDetails } from '../../contexts';
import { usePlayInRange } from '../../hooks/usePlayInRange';
import { useScreenSize } from '../../hooks/useScreenSize';
import { Sizes } from '../../shared/constants';
import { IPosition, Size, SectionCaptureList } from '../../shared/interfaces';
import { getElementSize } from '../../shared/utils';

const PHOTO_CHANGE_INTERVAL_TIME = 1000;
const PHOTO_SECTION_MOBILE_PORTRAIT_EXTRA_HEIGHT = 300;
const PHOTO_SECTION_MOBILE_LANDSCAPE_EXTRA_HEIGHT = 150;
const PHOTO_SECTION_DESKTOP_EXTRA_HEIGHT = 220;

interface SectionViewProps {
  /**
   * The size of the grid.
   */
  gridSize: Size;
  /**
   * The miniMap of the system.
   */
  miniMap: JSX.Element;
  /**
   * The system that contains current section.
   */
  systemId: number;
  /**
   * The position of the section in the grid.
   */
  position: IPosition;
  /**
   * Callback to be called when the position changes.
   */
  onChangeSection: (position: IPosition) => void;
}

const SectionView: FC<SectionViewProps> = ({
  gridSize,
  miniMap,
  systemId,
  position,
  onChangeSection,
}) => {
  const carouselRef = useRef<any>(null);
  const { isMobile, isPortrait } = useScreenSize();

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { range } = useCropCycleDetails();

  const { data, measurementIDAndResolutions } =
    useGetSectionMeasurementsBySystemId({
      endTime: range.end,
      gridSize,
      position,
      startTime: range.start,
      systemId,
    });

  const captures: SectionCaptureList = useMemo(() => {
    return data
      .map((measurement, index) => ({
        systemId,
        cellX: position.x,
        cellY: position.y,
        minImageUrl: getPublicResourcePath(
          measurement.data.resource_path,
          measurementIDAndResolutions[index].minimumResolution
        ),
        maxImageUrl: getPublicResourcePath(
          measurement.data.resource_path,
          measurementIDAndResolutions[index].maximumResolution
        ),
        capturedAt: new Date(measurement.time),
      }))
      .sort((a, b) => a.capturedAt.getTime() - b.capturedAt.getTime());
  }, [data]);

  const {
    isPlaying,
    index: captureIndex,
    setIndex: setCaptureIndex,
    togglePlay,
  } = usePlayInRange(
    captures.length,
    0,
    PHOTO_CHANGE_INTERVAL_TIME,
    isImageLoaded
  );

  // Set the current capture index to the last element position.
  useEffect(() => {
    setCaptureIndex(captures.length - 1);
  }, [captures]);

  useEffect(() => {
    carouselRef.current?.goTo(captureIndex);
  }, [captureIndex]);

  const handleToggleTrackerShow = () => {
    setIsTrackerOpen((open) => !open);
  };

  const handleChangeCaptureIndex = (index: number) => {
    setCaptureIndex(index);
  };

  const directions = {
    Up: {
      dx: 0,
      dy: -1,
      IconButton: UpIconButton,
      Icon: KeyboardArrowUpIcon,
    },
    Left: {
      dx: -1,
      dy: 0,
      IconButton: LeftIconButton,
      Icon: KeyboardArrowLeftIcon,
    },
    Down: {
      dx: 0,
      dy: 1,
      IconButton: DownIconButton,
      Icon: KeyboardArrowDownIcon,
    },
    Right: {
      dx: 1,
      dy: 0,
      IconButton: RightIconButton,
      Icon: KeyboardArrowRightIcon,
    },
  };

  const handleClickArrow = (dx: number, dy: number) => {
    onChangeSection({ x: position.x + dx, y: position.y + dy });
  };

  const isValidPosition = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < gridSize.width && y < gridSize.height;

  const currentCapture = captures[captureIndex];

  useEffect(() => {
    setIsImageLoaded(() => false);
  }, [currentCapture?.maxImageUrl]);

  const handleImageLoaded = () => {
    setIsImageLoaded(() => true);
  };

  if (!captures.length || !captures[captureIndex]) return null;

  const renderArrowButtons = () => (
    <>
      {Object.values(directions).map(
        (direction) =>
          isValidPosition(
            direction.dx + position.x,
            direction.dy + position.y
          ) && (
            <direction.IconButton
              key={direction.dx + '-' + direction.dy}
              isMobile={isMobile}
              onClick={() => handleClickArrow(direction.dx, direction.dy)}
            >
              <direction.Icon fontSize={isMobile ? 'small' : 'large'} />
            </direction.IconButton>
          )
      )}
    </>
  );

  const tabContainerSize = getElementSize('#room-detail-tab-container');
  let imageHeightOffset = PHOTO_SECTION_DESKTOP_EXTRA_HEIGHT;
  if (isMobile && isPortrait) {
    imageHeightOffset = PHOTO_SECTION_MOBILE_PORTRAIT_EXTRA_HEIGHT;
  } else if (isMobile && !isPortrait) {
    imageHeightOffset = PHOTO_SECTION_MOBILE_LANDSCAPE_EXTRA_HEIGHT;
  }
  const imgHeight = tabContainerSize.height - imageHeightOffset;

  return (
    <ViewContainer>
      <ViewMainContainer>
        {!isImageLoaded && (
          <SmallImageContainer>
            <Image
              alt="Capture"
              src={currentCapture.minImageUrl}
              height={`${imgHeight}px`}
              width="100%"
            />
          </SmallImageContainer>
        )}
        {!isImageLoaded && (
          <LoadingContainer>
            <Progress />
          </LoadingContainer>
        )}
        <HiddenImage
          alt="Capture"
          src={currentCapture.maxImageUrl}
          height={`${imgHeight}px`}
          onLoad={handleImageLoaded}
        />
        {isImageLoaded && (
          <ImageContainer>
            <TransformWrapper centerOnInit>
              {({ zoomIn, zoomOut }) => (
                <>
                  <TransformComponent>
                    <Image
                      alt="Capture"
                      src={currentCapture.maxImageUrl}
                      height={`${imgHeight}px`}
                    />
                  </TransformComponent>

                  <ZoomInButton onClick={() => zoomIn()}>
                    <AddIcon />
                  </ZoomInButton>
                  <ZoomOutButton onClick={() => zoomOut()}>
                    <RemoveIcon />
                  </ZoomOutButton>
                </>
              )}
            </TransformWrapper>
          </ImageContainer>
        )}
      </ViewMainContainer>

      {renderArrowButtons()}

      <MiniMapContainer>
        {miniMap}

        <TimeHistoryButton
          isTrackerOpen={isTrackerOpen}
          capturedAt={captures[captureIndex].capturedAt}
          onClick={handleToggleTrackerShow}
        />
      </MiniMapContainer>
      {isTrackerOpen && (
        <TrackContainer>
          <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
          <TimeTrackerWrapper>
            <TimeTracker
              captures={captures}
              captureIndex={captureIndex}
              onChange={handleChangeCaptureIndex}
            />
          </TimeTrackerWrapper>
        </TrackContainer>
      )}
    </ViewContainer>
  );
};

const ViewContainer = styled.div`
  position: relative;
  max-width: 100%;
`;

const ViewMainContainer = styled.div`
  position: relative;
  min-height: 300px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  & .react-transform-wrapper {
    width: 100%;
    height: 100%;

    & .react-transform-component {
      width: fit-content;
      height: 100%;
    }
  }
`;

const Image = styled.img`
  object-fit: contain;
`;

const SmallImageContainer = styled.div``;

const TrackContainer = styled.div`
  padding: 0px ${Sizes.xxLarge}px;
  display: flex;
  align-items: center;
  gap: ${Sizes.large}px;
`;

const TimeTrackerWrapper = styled.div`
  flex: 1;
`;

const Progress = styled(CircularProgress)`
  z-index: 1;
`;

const MiniMapContainer = styled.div`
  padding: ${Sizes.xxLarge}px;
  padding-top: ${Sizes.xLarge}px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

interface ArrowButtonProps {
  isMobile: boolean;
}

const ArrowButton = styled(IconButton)<ArrowButtonProps>`
  position: absolute;
  color: white;
  background-color: rgba(200, 200, 200, 0.7);
  border-radius: 8px;
  padding: ${({ isMobile }) => (isMobile ? 8 : 16)}px;
`;

const UpIconButton = styled(ArrowButton)<ArrowButtonProps>`
  top: ${Sizes.small}px;
  left: calc(
    50% - ${({ isMobile }) => (isMobile ? Sizes.xLarge : Sizes.xxLarge)}px
  );
`;

const LeftIconButton = styled(ArrowButton)<ArrowButtonProps>`
  left: ${Sizes.small}px;
  top: calc(
    50% - ${({ isMobile }) => (isMobile ? Sizes.xLarge : Sizes.xxLarge) * 2.5}px
  );
`;

const DownIconButton = styled(ArrowButton)<ArrowButtonProps>`
  bottom: ${Sizes.xxLarge * 4}px;
  left: calc(
    50% - ${({ isMobile }) => (isMobile ? Sizes.xLarge : Sizes.xxLarge)}px
  );
`;

const RightIconButton = styled(ArrowButton)<ArrowButtonProps>`
  right: ${Sizes.small}px;
  top: calc(
    50% - ${({ isMobile }) => (isMobile ? Sizes.xLarge : Sizes.xxLarge) * 2.5}px
  );
`;

const ZoomButton = styled(IconButton)`
  position: absolute;
  background-color: white;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  color: black;
`;

const ZoomInButton = styled(ZoomButton)`
  right: ${Sizes.small}px;
  bottom: ${Sizes.xxLarge * 2.5}px;
`;

const ZoomOutButton = styled(ZoomButton)`
  right: ${Sizes.small}px;
  bottom: ${Sizes.xxLarge * 1}px;
`;

const HiddenImage = styled.img`
  display: none;
`;

export default SectionView;
