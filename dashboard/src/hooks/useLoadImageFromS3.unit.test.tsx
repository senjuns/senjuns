// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen, waitFor } from '@testing-library/react';
import { FC } from 'react';
import { useLoadImageFromS3 } from './useLoadImageFromS3';

jest.mock('aws-amplify', () => ({
  Storage: {
    get: async (path: string) => {
      return new Promise((resolve, reject) => {
        if (path === '/path') {
          setTimeout(() => {
            resolve(path);
          }, 1000);
        } else {
          reject(new Error('Invalid path'));
        }
      });
    },
  },
}));

interface LoadImageFromS3UseProps {
  path: string;
}

const LoadImageFromS3Use: FC<LoadImageFromS3UseProps> = ({ path }) => {
  const { error, loading, imageUrl } = useLoadImageFromS3(path);

  return (
    <div>
      <div data-testid="error">{error}</div>
      <div data-testid="image-url">{imageUrl}</div>
      <div data-testid="loading">
        {loading ? 'Image Loading' : 'Image Loading Done'}
      </div>
    </div>
  );
};

describe('useLoadImageFromS3 test', () => {
  test('useLoadImageFromS3 loading success', async () => {
    render(<LoadImageFromS3Use path="/path" />);
    expect(screen.getByTestId('loading')).toHaveTextContent('Image Loading');
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent(
        'Image Loading Done'
      );
      expect(screen.getByTestId('image-url')).toHaveTextContent('/path');
    });
  });

  test('useLoadImageFromS3 loading failure', async () => {
    render(<LoadImageFromS3Use path="/invalid-path" />);
    expect(screen.getByTestId('loading')).toHaveTextContent('Image Loading');
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Invalid path');
    });
  });
});
