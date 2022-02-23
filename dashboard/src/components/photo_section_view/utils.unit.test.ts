import { getPublicPath } from './utils';

describe('getPublicPath function', () => {
  test('should return correct public path', () => {
    expect(getPublicPath('neatleaf/130x130/index.png')).toEqual(
      'https://neatleaf.s3.eu-central-1.amazonaws.com/130x130/index.png'
    );
  });
});
