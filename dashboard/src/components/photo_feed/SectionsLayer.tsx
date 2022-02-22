import { FC } from 'react';
import { Group, Image, Rect } from 'react-konva';
import useImage from 'use-image';

import { UNVISITED_SECTION_OPACITY } from '../../components/photo_feed/constants';
import {
  SectionInformation,
  Size,
  HistoryInformation,
} from '../../shared/interfaces';

interface SectionProps {
  /**
   * The individual section size information.
   */
  sectionSize: Size;
  /**
   * Current section information
   */
  sectionInformation: SectionInformation;
  /**
   * Callback to be called when the section is clicked
   */
  onClick: () => void;
}

const Section: FC<SectionProps> = ({
  sectionSize,
  sectionInformation,
  onClick,
}) => {
  const { cellX, cellY } = sectionInformation;
  const { height, width } = sectionSize;
  const [image] = useImage(sectionInformation.smallImageUrl);

  const hasUnvisitedHistory = !!(
    sectionInformation.lastCapturedAt &&
    (!sectionInformation.lastVisitedAt ||
      sectionInformation.lastCapturedAt > sectionInformation.lastVisitedAt)
  );
  const startPositionX = cellX * sectionSize.width;
  const startPositionY = cellY * sectionSize.height;

  return (
    <>
      <Image
        image={image}
        height={height}
        width={width}
        x={startPositionX}
        y={startPositionY}
      />
      <Rect
        key={cellY}
        height={height}
        width={width}
        x={startPositionX}
        y={startPositionY}
        fill={`rgba(255, 255, 255, ${
          hasUnvisitedHistory ? 0 : UNVISITED_SECTION_OPACITY
        })`}
        stroke="#FFFFFF"
        strokeWidth={1}
        onClick={onClick}
        onTap={onClick}
      />
    </>
  );
};

interface SectionsLayerProps {
  /**
   * The individual section size information.
   */
  sectionSize: Size;
  /**
   * The history information of current system.
   */
  historyInformation: HistoryInformation;
  /**
   * Callback to be called when the section is clicked.
   */
  onClick: (x: number, y: number) => void;
}

const SectionsLayer: FC<SectionsLayerProps> = ({
  historyInformation,
  onClick,
}) => {
  const yLines = new Array(historyInformation.historiesGrid.length)
    .fill(0)
    .map((_value, index) => index);
  const xLines = new Array(historyInformation.historiesGrid[0].length)
    .fill(0)
    .map((_value, index) => index);

  const renderSectionRow = (lineX: number) => {
    return yLines.map((lineY) => (
      <Section
        key={lineY}
        sectionSize={historyInformation.smallImageSize}
        sectionInformation={historyInformation.historiesGrid[lineY]?.[lineX]}
        onClick={() => onClick(lineX, lineY)}
      />
    ));
  };

  return (
    <Group>
      {xLines.map((lineX) => (
        <Group key={lineX}>{renderSectionRow(lineX)}</Group>
      ))}
    </Group>
  );
};

export default SectionsLayer;
