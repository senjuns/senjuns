import Konva from 'konva';
import { FC, useCallback, useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';

import SectionsLayer from '../../components/photo_feed/SectionsLayer';
import { Size, HistoryInformation } from '../../shared/interfaces';

interface PhotoMainProps {
  /**
   * Size of the images grid.
   */
  imageSize: Size;
  /**
   * The history information of the system.
   */
  historyInformation: HistoryInformation;
  /**
   * Current miniMap cursor position.
   */
  miniMapPosition: Konva.Vector2d;
  /**
   * Check if the scale is available.
   */
  checkIsOutOfScale: (scale: number) => boolean;
  /**
   * Callback to be called when the cursor position changes.
   */
  onChangePosition: (value: Konva.Vector2d) => void;
  /**
   * Callback to be called when the zoom scale changes.
   */
  onChangeScale: (value: number) => void;
  /**
   * Callback to be called when the zoom scale delta changes.
   */
  onChangeScaleDelta: (delta: number) => void;
  /**
   * Callback to be called when the section in x,y is clicked.
   */
  onClick: (x: number, y: number) => void;
  /**
   * The size of presentation layer to be displayed in a window.
   */
  presentationSize: Size;
  /**
   * The current scale.
   */
  scale: number;
  /**
   * The scale delta that is updated outside of this component.
   * ie) Zoom In/Out clicking -/+ will update this prop to control scale.
   */
  scaleDelta: number;
}

const PhotoMain: FC<PhotoMainProps> = ({
  imageSize,
  historyInformation,
  miniMapPosition,
  checkIsOutOfScale,
  onChangePosition,
  onChangeScale,
  onChangeScaleDelta,
  onClick,
  presentationSize,
  scale,
  scaleDelta,
}) => {
  const stageRef = useRef<Konva.Stage>(null);

  const changePosition = (x: number, y: number) => {
    const stage = stageRef.current;
    if (!stage) return null;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const scale = stage.scaleX();
    const newPosition = {
      x: Math.max(
        Math.min(0, x),
        presentationSize.width - imageSize.width * scale
      ),
      y: Math.max(
        Math.min(0, y),
        presentationSize.height - imageSize.height * scale
      ),
    };

    stage.position(newPosition);
    stage.batchDraw();
    onChangePosition(newPosition);
    return null;
  };

  const handleChangeScaleDelta = useCallback(() => {
    if (!scaleDelta || !stageRef.current) {
      return;
    }

    const newScale = scale * scaleDelta;

    const stage = stageRef.current;
    const center = {
      x: stage.width() / 2,
      y: stage.height() / 2,
    };
    const relatedTo = {
      x: (center.x - stage.x()) / scale,
      y: (center.y - stage.y()) / scale,
    };

    stage.scale({ x: newScale, y: newScale });
    changePosition(
      center.x - relatedTo.x * newScale,
      center.y - relatedTo.y * newScale
    );
    onChangeScale(newScale); // needed to ensure mini-map is updated
    onChangeScaleDelta(0); // reset the scale delta so can handle another click
  }, [scaleDelta]);

  const handleChangeMiniMapPosition = useCallback(() => {
    if (!stageRef.current) return;

    const stage = stageRef.current;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const scale = stage.scaleX();
    const newXPos = miniMapPosition.x * scale;
    const newYPos = miniMapPosition.y * scale;
    changePosition(newXPos, newYPos);
  }, [miniMapPosition]);

  useEffect(() => {
    handleChangeMiniMapPosition();
  }, [handleChangeMiniMapPosition]);

  useEffect(() => {
    handleChangeScaleDelta();
  }, [handleChangeScaleDelta]);

  const handleZoomStage = (event: Konva.KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault();
    if (!stageRef.current) {
      return;
    }

    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) {
      return;
    }

    const { x: pointerX, y: pointerY } = pointerPosition;
    const mousePointTo = {
      x: (pointerX - stage.x()) / oldScale,
      y: (pointerY - stage.y()) / oldScale,
    };

    const scaleBy = 2;
    const newScale =
      event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (checkIsOutOfScale(newScale)) return;

    stage.scale({ x: newScale, y: newScale });

    changePosition(
      pointerX - mousePointTo.x * newScale,
      pointerY - mousePointTo.y * newScale
    );
    onChangeScale(newScale);
  };

  const handleDragMove = () => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    const position = stage.getPosition();
    changePosition(position.x, position.y);
  };

  return (
    <Stage
      width={presentationSize.width}
      height={presentationSize.height}
      draggable={true}
      onWheel={handleZoomStage}
      onDragMove={handleDragMove}
      ref={stageRef}
      style={{
        cursor: 'pointer',
        borderRadius: 50,
        overflow: 'hidden',
        width: presentationSize.width,
      }}
    >
      <Layer id="sections-layer">
        <SectionsLayer
          sectionSize={historyInformation.smallImageSize}
          historyInformation={historyInformation}
          onClick={onClick}
        />
      </Layer>
    </Stage>
  );
};

export default PhotoMain;
