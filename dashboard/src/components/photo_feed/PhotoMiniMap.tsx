import Konva from 'konva';
import { FC, useRef } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';

import { Size } from 'shared/interfaces';

interface PhotoMiniMapProps {
  /**
   * The current cursor position in the Main Window.
   */
  cursorPosition: Konva.Vector2d;
  /**
   * `true` if the minimap is draggable, `false` otherwise.
   */
  draggable?: boolean;
  /**
   * Size of the image to be displayed as a background image.
   */
  imageSize: Size;
  /**
   * The size of image to be displayed in minimap.
   */
  miniMapSize: Size;
  /**
   * The image url that will be used as a background of minimap.
   */
  miniMapImageUrl: string;
  /**
   * The size of the presentation layer.
   */
  presentationSize: Size;
  /**
   * The current zoom scale in Main Window.
   */
  scale: number;
  /**
   * Callback to be called when the position of minimap changes.
   */
  onChangeMiniMapPosition: (position: Konva.Vector2d) => void;
}

const PhotoMiniMap: FC<PhotoMiniMapProps> = ({
  cursorPosition,
  draggable = true,
  imageSize,
  miniMapSize,
  miniMapImageUrl,
  presentationSize,
  scale,
  onChangeMiniMapPosition,
}) => {
  const [image] = useImage(miniMapImageUrl);

  const stageRef = useRef<Konva.Stage>(null);
  const viewBoxRef = useRef<Konva.Rect>(null);
  const viewScaleX = miniMapSize.width / imageSize.width;
  const viewScaleY = miniMapSize.height / imageSize.height;
  const viewDimensions = {
    width: presentationSize.width / scale,
    height: presentationSize.height / scale,
  };
  const viewXPosition = -cursorPosition.x / scale;
  const viewYPosition = -cursorPosition.y / scale;

  const handleDragMove = () => {
    const viewBox = viewBoxRef.current;
    const stage = stageRef.current;
    if (!viewBox || !stage) return;

    const { x, y } = viewBox.getPosition();
    const scale = stage.scaleX();

    const newPosition = {
      x: Math.min(
        Math.max(0, x),
        miniMapSize.width / scale - viewDimensions.width
      ),
      y: Math.min(
        Math.max(0, y),
        miniMapSize.height / scale - viewDimensions.height
      ),
    };

    viewBox.position(newPosition);
    onChangeMiniMapPosition({ x: newPosition.x * -1, y: newPosition.y * -1 });
  };

  return (
    <Stage
      ref={stageRef}
      width={miniMapSize.width}
      height={miniMapSize.height}
      scaleX={viewScaleX}
      scaleY={viewScaleY}
      style={{
        width: miniMapSize.width,
      }}
    >
      <Layer id="viewbox">
        <Image
          image={image}
          height={miniMapSize.height / viewScaleY}
          width={miniMapSize.width / viewScaleX}
          x={0}
          y={0}
        />

        <Rect
          draggable={draggable}
          x={viewXPosition}
          y={viewYPosition}
          width={viewDimensions.width}
          height={viewDimensions.height}
          fill="#E86339"
          opacity={0.5}
          cornerRadius={80}
          ref={viewBoxRef}
          onDragMove={handleDragMove}
        />
      </Layer>
    </Stage>
  );
};

export default PhotoMiniMap;
