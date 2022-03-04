import { SectionInformation, HistoryInformation } from './section';

const DEFAULT_SYSTEM_ID = 12;

const DEFAULT_INFORMATION_NULL_ERROR = 'defaultInformation is null';

const SectionInformations: SectionInformation[] = [
  {
    cellX: 0,
    cellY: 0,
    smallImageUrl: 'small-0-0',
    largeImageUrl: 'large-0-0',
    lastVisitedAt: null,
    lastCapturedAt: null,
  },
  {
    cellX: 0,
    cellY: 1,
    smallImageUrl: 'small-0-1',
    largeImageUrl: 'large-0-1',
    lastVisitedAt: new Date(),
    lastCapturedAt: null,
  },
  {
    cellX: 1,
    cellY: 0,
    smallImageUrl: 'small-1-0',
    largeImageUrl: 'large-1-0',
    lastVisitedAt: null,
    lastCapturedAt: new Date(),
  },
  {
    cellX: 1,
    cellY: 1,
    smallImageUrl: 'small-1-1',
    largeImageUrl: 'large-1-1',
    lastVisitedAt: new Date(),
    lastCapturedAt: new Date(),
  },
  {
    cellX: 0,
    cellY: 0,
    smallImageUrl: 'small-0-1',
    largeImageUrl: 'large-1-0',
    lastVisitedAt: new Date(),
    lastCapturedAt: new Date(),
  },
];

describe('HistoryInformation test', () => {
  let defaultInformation: HistoryInformation | null = null;

  beforeEach(() => {
    defaultInformation = new HistoryInformation(DEFAULT_SYSTEM_ID);
  });

  test('should set systemId, histories and historiesGrid by default', () => {
    expect(defaultInformation?.systemId).toEqual(DEFAULT_SYSTEM_ID);
    expect(defaultInformation?.historiesGrid).toEqual([[]]);
  });

  test('should be able to set the systemId using setSystemId', () => {
    if (!defaultInformation) {
      throw new Error(DEFAULT_INFORMATION_NULL_ERROR);
    }

    defaultInformation.setSystemId(2);
    expect(defaultInformation.systemId).toEqual(2);
  });

  test('should be able to update the size', () => {
    if (!defaultInformation) {
      throw new Error(DEFAULT_INFORMATION_NULL_ERROR);
    }

    defaultInformation.updateSize(2, 2);
    expect(defaultInformation.gridSize).toEqual({ width: 2, height: 2 });
  });

  test('should be able to add new SectionInformation', () => {
    if (!defaultInformation) {
      throw new Error(DEFAULT_INFORMATION_NULL_ERROR);
    }

    defaultInformation.updateSize(2, 2);

    for (let i = 0; i < 4; i++) {
      defaultInformation.add(SectionInformations[i]);
    }

    expect(defaultInformation.get(0, 1)?.lastVisitedAt).toEqual(
      SectionInformations[1].lastVisitedAt,
    );
    expect(defaultInformation.get(1, 1)?.lastVisitedAt).toEqual(
      SectionInformations[3].lastVisitedAt,
    );
    expect(defaultInformation.get(1, 1)?.lastCapturedAt).toEqual(
      SectionInformations[3].lastCapturedAt,
    );
  });

  test('should be able to get the last visited & captured cell', () => {
    if (!defaultInformation) {
      throw new Error(DEFAULT_INFORMATION_NULL_ERROR);
    }

    defaultInformation.updateSize(2, 2);
    for (let i = 0; i < SectionInformations.length; i++) {
      defaultInformation.add(SectionInformations[i]);
    }

    expect(defaultInformation.getLastVisitedCell()).toEqual(
      SectionInformations[4],
    );
    expect(defaultInformation.getLastCapturedCell()).toEqual(
      SectionInformations[4],
    );
  });

  test('should return null if there is no visited cell', () => {
    if (!defaultInformation) {
      throw new Error(DEFAULT_INFORMATION_NULL_ERROR);
    }

    defaultInformation.add(SectionInformations[0]);
    expect(defaultInformation.getLastVisitedCell()).toBe(null);
  });

  test('should return null if there is no captured cell', () => {
    if (!defaultInformation) {
      throw new Error(DEFAULT_INFORMATION_NULL_ERROR);
    }

    defaultInformation.add(SectionInformations[0]);
    expect(defaultInformation.getLastCapturedCell()).toBe(null);
  });

  test('should be able to save and load from/to localStorage', () => {
    if (!defaultInformation) {
      throw new Error(DEFAULT_INFORMATION_NULL_ERROR);
    }

    defaultInformation.updateSize(2, 2);
    for (let i = 0; i < SectionInformations.length; i++) {
      defaultInformation.add(SectionInformations[i]);
    }

    defaultInformation.save();
    const newInformation = new HistoryInformation(DEFAULT_SYSTEM_ID);
    newInformation.load();

    expect(newInformation).toEqual(defaultInformation);
  });
});
