import { Storage } from 'aws-amplify';
import { useCallback, useEffect, useState } from 'react';

export interface ILoadImageResult {
  /**
   * Error text while loading the image from S3.
   */
  error: string | null;
  /**
   * `true` if the loading is done, `false` still in progress.
   */
  loading: boolean;
  /**
   * Loaded Image Url.
   */
  imageUrl: string | null;
}

/**
 * Load the image from S3.
 *
 * @param {string} path - The image url on S3.
 * @returns {ILoadImageResult} - The image load result.
 */
export const useLoadImageFromS3 = (path: string): ILoadImageResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Load the image from S3.
  const loadImageFromS3 = useCallback(async () => {
    setLoading(true);

    try {
      const result = await Storage.get(path, {
        level: 'private',
      });
      setImageUrl(result);
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadImageFromS3();
  }, []);

  return {
    error,
    loading,
    imageUrl,
  };
};
