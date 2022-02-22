import { Size } from '../../shared/interfaces';
import { getLocalStorageJSONItem } from '../../shared/utils';

/**
 * An interface that has the section capture information.
 */
export interface SectionCapture {
  /**
   * Current system that has section information.
   */
  systemId: number;
  /**
   * The x position of section.
   */
  cellX: number;
  /**
   * The y position of section.
   */
  cellY: number;
  /**
   * The captured section maximum image url.
   */
  maxImageUrl: string;
  /**
   * The captured section minimum image url.
   */
  minImageUrl: string;
  /**
   * The time when the image was captured.
   */
  capturedAt: Date;
}

/**
 * The list of SectionCapture.
 */
export type SectionCaptureList = SectionCapture[];

export interface SectionPoseInformation {
  /**
   * The X position of the section in the room
   */
  cellX: number;
  /**
   * The Y position of the section in the room
   */
  cellY: number;
}

/**
 * An interface that represents the cell position and visit/capture information.
 */
export interface SectionInformation extends SectionPoseInformation {
  /**
   * The small captured section image url.
   */
  smallImageUrl: string;
  /**
   * The small captured section image url.
   */
  largeImageUrl: string;
  /**
   * Shows when the section is last visited by the user.
   */
  lastVisitedAt: Date | null;
  /**
   * Shows when the section is captured lastly.
   */
  lastCapturedAt: Date | null;
}

export interface SectionUpdater
  extends SectionPoseInformation,
    Partial<Omit<SectionInformation, 'cellX' | 'cellY'>> {}

/**
 * A wrapper to process the image grid history data.
 */
export class HistoryInformation {
  /** Shows whether the history information is ready to use or not */
  isReady: boolean;
  /** The current systemId */
  systemId: number;
  /** The histories of section in a grid */
  historiesGrid: Array<Array<SectionInformation>>;
  /** The size of grid by xCount and yCount */
  gridSize: Size;
  /** The size of small image */
  smallImageSize: Size;
  /** The size of large image */
  largeImageSize: Size;

  /**
   * @param {number} systemId current systemId
   * Constructor of HistoryInformation class.
   */
  constructor(systemId: number) {
    this.systemId = systemId;
    this.historiesGrid = [[]];
    this.isReady = false;
    this.gridSize = { width: 0, height: 0 };
    this.smallImageSize = { width: 130, height: 130 };
    this.largeImageSize = { width: 4032, height: 3024 };
    this.load();
  }

  /**
   * @param {number} systemId current systemId
   */
  setSystemId(systemId: number): void {
    this.systemId = systemId;
  }

  /** @returns {string} - The local storage key when we are persisting/getting the data */
  getLocalStorageKey(): string {
    return `system-${this.systemId}-photo-feed`;
  }

  /**
   * Loads the history information from the local storage.
   */
  load(): void {
    const storageItem = getLocalStorageJSONItem(this.getLocalStorageKey());
    if (!storageItem) return;

    try {
      const {
        historiesGrid,
        isReady,
        gridSize,
        smallImageSize,
        largeImageSize,
      } = getLocalStorageJSONItem(this.getLocalStorageKey()) as any;

      this.historiesGrid = [[]];
      this.isReady = isReady;
      this.updateSize(gridSize.width, gridSize.height);
      this.updateSmallImageSize(smallImageSize);
      this.updateLargeImageSize(largeImageSize);
      this.historiesGrid = historiesGrid;

      if (!historiesGrid || !Array.isArray(historiesGrid)) {
        return;
      }

      this.historiesGrid.forEach((historyRow) => {
        historyRow.forEach((history) => {
          history.lastVisitedAt = history.lastVisitedAt
            ? new Date(history.lastVisitedAt)
            : null;
          history.lastCapturedAt = history.lastCapturedAt
            ? new Date(history.lastCapturedAt)
            : null;
        });
      });
    } catch (error) {
      console.error('The stored history information got malformed');
    }
  }

  /**
   * Save the history information to the local storage.
   */
  save(): void {
    localStorage.setItem(
      this.getLocalStorageKey(),
      JSON.stringify({
        isReady: this.isReady,
        historiesGrid: this.historiesGrid,
        systemId: this.systemId,
        gridSize: this.gridSize,
        smallImageSize: this.smallImageSize,
        largeImageSize: this.largeImageSize,
      })
    );
  }

  /**
   * Add new history to the histories storage.
   * @param {SectionUpdater} history - the new SectionInformation to be added
   * @returns {void}
   */
  add(history: SectionUpdater) {
    if (
      history.cellY < 0 ||
      history.cellY >= this.gridSize.height ||
      history.cellX < 0 ||
      history.cellX >= this.gridSize.width
    ) {
      return;
    }

    this.historiesGrid[history.cellY][history.cellX] = {
      ...(this.historiesGrid[history.cellY][history.cellX] || {}),
      ...history,
    };
  }

  /**
   * Retrieve the history of certain section.
   * @param {number} cellX - the x position
   * @param {number} cellY - the y position
   * @returns {SectionInformation|null} the information of certain section.
   */
  get(cellX: number, cellY: number): SectionInformation | null {
    return this.historiesGrid?.[cellY]?.[cellX] || null;
  }

  /**
   * Returns the last visited cell by current user in the grid.
   * @returns {SectionInformation|null} The last visited cell.
   */
  getLastVisitedCell(): SectionInformation | null {
    return this.historiesGrid
      .flat()
      .reduce((lastCell: SectionInformation | null, currentCell) => {
        if (!currentCell.lastVisitedAt) return lastCell;
        if (!lastCell?.lastVisitedAt) return currentCell;
        return lastCell.lastVisitedAt >= currentCell.lastVisitedAt
          ? lastCell
          : currentCell;
      }, null);
  }

  /**
   * Returns the last captured cell by spyder in the grid.
   * @returns {SectionInformation|null} The last captured cell.
   */
  getLastCapturedCell(): SectionInformation | null {
    return this.historiesGrid
      .flat()
      .reduce((lastCell: SectionInformation | null, currentCell) => {
        if (!currentCell.lastCapturedAt) return lastCell;
        if (!lastCell?.lastCapturedAt) return currentCell;
        return lastCell.lastCapturedAt >= currentCell.lastCapturedAt
          ? lastCell
          : currentCell;
      }, null);
  }

  /**
   * Update the size of histories grid
   * @param {number} width - The new width of histories grid
   * @param {number} height - The new height of histories grid
   */
  updateSize(width: number, height: number): void {
    const currentHeight = this.historiesGrid.length;
    const currentWidth = this.historiesGrid[0]?.length || 0;
    this.gridSize = { width, height };

    if (currentHeight < height || currentWidth < width) {
      this.historiesGrid = new Array(height).fill(0).map((_row, yIndex) =>
        new Array(width).fill(0).map((_col, xIndex) => ({
          cellX: xIndex,
          cellY: yIndex,
          smallImageUrl: '',
          largeImageUrl: '',
          lastVisitedAt: null,
          lastCapturedAt: null,
        }))
      );
    }
  }

  /**
   * Mark the history as ready
   * @returns {void}
   */
  markAsReady(): void {
    this.isReady = true;
  }

  /**
   * Returns the total image size
   * @returns {Size} - total image size
   */
  getTotalImageSize(): Size {
    return {
      height: this.gridSize.height * this.smallImageSize.height,
      width: this.gridSize.width * this.smallImageSize.width,
    };
  }

  /**
   * Updage the small image size
   * @param {Size} size - new size information
   */
  updateSmallImageSize(size: Size): void {
    this.smallImageSize = size;
  }

  /**
   * Updage the large image size
   * @param {Size} size - new size information
   */
  updateLargeImageSize(size: Size): void {
    this.largeImageSize = size;
  }
}
