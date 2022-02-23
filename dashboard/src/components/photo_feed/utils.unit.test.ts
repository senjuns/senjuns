import {
  convertRawPoseIntoGridPose,
  getPublicResourcePath,
  getMaximumResolution,
  getMinimumResolution,
} from './utils';

describe('convertRawPoseIntoGridPose function', () => {
  test('should return correct converted pose', () => {
    expect(
      convertRawPoseIntoGridPose(
        { x: 1.3, y: 1.3 },
        {
          x_min: 0.1,
          y_min: 0.1,
          x_max: 5.5,
          y_max: 4.3,
          x_count: 9,
          y_count: 7,
        }
      )
    ).toEqual({ x: 1, y: 5 });
  });
});

describe('getPublicResourcePath function', () => {
  test('should return correct public path', () => {
    expect(
      getPublicResourcePath('neatleaf/130*130/index.png', [400, 400])
    ).toEqual(
      'https://neatleaf.s3.eu-central-1.amazonaws.com/400x400/index.png'
    );
  });
});

describe('getMinimumResolution function', () => {
  test('should return minimum resoluton', () => {
    expect(
      getMinimumResolution([
        [400, 400],
        [170, 120],
        [2000, 3000],
      ])
    ).toEqual([170, 120]);
  });
});

describe('getMaximumResolution function', () => {
  test('should return minimum resoluton', () => {
    expect(
      getMaximumResolution([
        [400, 400],
        [170, 120],
        [2000, 3000],
      ])
    ).toEqual([2000, 3000]);
  });
});
