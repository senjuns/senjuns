import { getPublicPath } from './utils';

describe('getPublicPath function', () => {
  test('should return correct public path', () => {
    expect(getPublicPath('neatleaf/130x130/index.png')).toEqual(
      'https://neatleaf.s3.us-west-2.amazonaws.com/130x130/index.png'
    );
  });
});
