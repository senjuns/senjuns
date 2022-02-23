import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Konva from 'konva';
import { FC, lazy, useEffect, useMemo, useState } from 'react';
import {
  MINI_MAP_HEIGHT,
  MOBILE_PLATFORM_EXTRA_HEIGHT,
  ZONE_MAP_URL,
} from '../../components/photo_feed/constants';
import MeasurementInfo from '../../components/photo_feed/MeasurementInfo';
import PhotoMain from '../../components/photo_feed/PhotoMain';
import PhotoMiniMap from '../../components/photo_feed/PhotoMiniMap';
import PhotoZoomHandler from '../../components/photo_feed/PhotoZoomHandler';
import { useGetLatestPhotoFeedDataBySystemId } from '../../components/photo_feed/useGetLatestPhotoFeedDataBySystemId';
import { updateHistoryInformation } from '../../components/photo_feed/utils';
import PhotoSectionView from '../../components/photo_section_view/PhotoSectionView';
import { useRoomDetails, useCropCycleDetails } from '../../contexts';
import { useAlert } from '../../hooks/useAlert';
import { useScreenSize } from '../../hooks/useScreenSize';
import { HistoryInformation, IPosition } from '../../shared/interfaces';
import { getElementSize } from '../../shared/utils';
import { ZOOM_LEVELS } from './constants';

const NoDataView = lazy(() => import('../../components/error/NoDataView'));

const useStyles = makeStyles((theme) =>
  createStyles({
    miniMapContainer: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(3),
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
  })
);

const PHOTO_SECTION_SCALE = 5;

/**
 * TODO(NL-1987) - Grab the images that are currently showing in the photo feed grid
 */
export interface PhotoFeedProps {
  /**
   * The system Id which we want to get the photos from.
   */
  systemId: number;
}

const PhotoFeed: FC<PhotoFeedProps> = ({ systemId }) => {
  const classes = useStyles();
  const { isMobile } = useScreenSize();
  const { render: renderNoHistoryAlert, open: handleOpenNoHistoryAlert } =
    useAlert('No history is available in that section!');

  const { isPhotoSectionView, setIsPhotoSectionView } = useRoomDetails();

  const { range } = useCropCycleDetails();

  const {
    loading: photoFeedLoading,
    measurementRun,
    measurementsGrid,
  } = useGetLatestPhotoFeedDataBySystemId({
    systemId,
    startTime: range.start,
    endTime: range.end,
  });

  const hasNoData = !photoFeedLoading && !measurementsGrid.length;

  const [scale, setScale] = useState(ZOOM_LEVELS.NORMAL);
  const [scaleDelta, setScaleDelta] = useState(0);
  const [cursorPosition, setCursorPosition] = useState<Konva.Vector2d>({
    x: 0,
    y: 0,
  });
  const [sectionPosition, setSectionPosition] = useState<IPosition | null>(
    null
  );
  const [miniMapPosition, setMiniMapPosition] = useState<Konva.Vector2d>({
    x: 0,
    y: 0,
  });
  const [historyInformation, setHistoryInformation] =
    useState<HistoryInformation>(new HistoryInformation(systemId));

  // TODO(NL-1391): improve the logic to remove the hardcode
  const [presentationSize, setPresentationSize] = useState({
    height: 0,
    width: 0,
  });

  const systemImageSize = historyInformation.getTotalImageSize();
  const minimapSize = {
    height: MINI_MAP_HEIGHT,
    width:
      (MINI_MAP_HEIGHT / historyInformation.gridSize.height) *
      historyInformation.gridSize.width,
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const checkIsOutOfScale = (scale: number) =>
    scale < ZOOM_LEVELS.MIN ||
    scale > ZOOM_LEVELS.MAX ||
    (scale === ZOOM_LEVELS.MIN &&
      (presentationSize.height >= systemImageSize.height * scale ||
        presentationSize.width >= systemImageSize.width * scale));

  useEffect(() => {
    const systemHistory = new HistoryInformation(systemId);
    setHistoryInformation(systemHistory);
  }, [systemId]);

  useEffect(() => {
    if (photoFeedLoading) return;

    const updatedHistoryInformation = updateHistoryInformation(
      historyInformation,
      measurementRun,
      measurementsGrid
    );
    setHistoryInformation(updatedHistoryInformation);
  }, [photoFeedLoading, measurementRun, measurementsGrid]);

  useEffect(() => {
    const handleResize = () => {
      const tabContainerSize = getElementSize('#room-detail-tab-container');
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const presentationSize = {
        height: isMobile
          ? window.innerHeight - MOBILE_PLATFORM_EXTRA_HEIGHT
          : tabContainerSize.height - MOBILE_PLATFORM_EXTRA_HEIGHT,
        width: isMobile ? window.innerWidth : tabContainerSize.width,
      };

      // prettier-ignore
      if (historyInformation) {
        presentationSize.height = Math.min(
          presentationSize.height, historyInformation.smallImageSize.height * historyInformation.gridSize.height
        );
        presentationSize.width = Math.min(
          presentationSize.width, historyInformation.smallImageSize.width * historyInformation.gridSize.width
        );
      }

      setPresentationSize(presentationSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [historyInformation]);

  /**
   * Update the cursor position when sectionPosition changes accordingly to be reflected in the mini map.
   */
  useEffect(() => {
    if (!sectionPosition) {
      return;
    }

    setCursorPosition({
      x:
        ((-systemImageSize.width * scale + presentationSize.width) /
          (historyInformation.gridSize.width - 1)) *
        sectionPosition.x,
      y:
        ((-systemImageSize.height * scale + presentationSize.height) /
          (historyInformation.gridSize.height - 1)) *
        sectionPosition.y,
    });
  }, [sectionPosition]);

  const photoSectionCursorPosition = useMemo(() => {
    if (!sectionPosition) {
      return { x: 0, y: 0 };
    }

    return {
      x:
        ((-systemImageSize.width * PHOTO_SECTION_SCALE +
          presentationSize.width) /
          (historyInformation.gridSize.width - 1)) *
        sectionPosition.x,
      y:
        ((-systemImageSize.height * PHOTO_SECTION_SCALE +
          presentationSize.height) /
          (historyInformation.gridSize.height - 1)) *
        sectionPosition.y,
    };
  }, [sectionPosition]);

  const lastCapturedTime = measurementRun
    ? new Date(measurementRun.start_time)
    : null;

  const isZoomOutDisabled = checkIsOutOfScale(scale * ZOOM_LEVELS.MIN);

  const handleClickSection = (x: number, y: number) => {
    const history = historyInformation.historiesGrid[y]?.[x];
    if (!history) {
      handleOpenNoHistoryAlert();
    } else {
      setIsPhotoSectionView(true);
      setSectionPosition({ x, y });

      historyInformation.add({
        ...history,
        lastVisitedAt: new Date(),
      });
      historyInformation.save();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleScaleDelta = (scaleDelta: number) => {
    const newScale = scale * scaleDelta;
    if (checkIsOutOfScale(newScale)) {
      setScaleDelta(0);
    } else {
      setScaleDelta(scaleDelta);
    }
  };

  if (photoFeedLoading || !historyInformation.isReady) {
    return <CircularProgress />;
  }

  if (hasNoData) {
    return <NoDataView />;
  }

  if (isPhotoSectionView && sectionPosition) {
    return (
      <PhotoSectionView
        systemId={systemId}
        miniMap={
          <PhotoMiniMap
            scale={PHOTO_SECTION_SCALE}
            draggable={false}
            imageSize={systemImageSize}
            miniMapSize={minimapSize}
            miniMapImageUrl={ZONE_MAP_URL}
            cursorPosition={photoSectionCursorPosition}
            presentationSize={presentationSize}
            onChangeMiniMapPosition={setMiniMapPosition}
          />
        }
        gridSize={historyInformation.gridSize}
        position={sectionPosition}
        onChangeSection={setSectionPosition}
      />
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <PhotoMain
        imageSize={systemImageSize}
        historyInformation={historyInformation}
        miniMapPosition={miniMapPosition}
        presentationSize={presentationSize}
        scale={scale}
        scaleDelta={scaleDelta}
        checkIsOutOfScale={checkIsOutOfScale}
        onChangePosition={setCursorPosition}
        onChangeScale={setScale}
        onChangeScaleDelta={handleScaleDelta}
        onClick={handleClickSection}
      />

      <PhotoZoomHandler
        isZoomOutDisabled={isZoomOutDisabled}
        scale={scale}
        presentationSize={presentationSize}
        onChangeScaleDelta={handleScaleDelta}
      />

      <Box className={classes.miniMapContainer}>
        <Box id="photo-mini-map-container">
          <PhotoMiniMap
            scale={scale}
            imageSize={systemImageSize}
            miniMapSize={minimapSize}
            miniMapImageUrl={ZONE_MAP_URL}
            cursorPosition={cursorPosition}
            presentationSize={presentationSize}
            onChangeMiniMapPosition={setMiniMapPosition}
          />
        </Box>

        <MeasurementInfo
          id="measurement-time-info"
          lastCapturedTime={lastCapturedTime}
        />
      </Box>

      {renderNoHistoryAlert()}
    </Box>
  );
};

export default PhotoFeed;
