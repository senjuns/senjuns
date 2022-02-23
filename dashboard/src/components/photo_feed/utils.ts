import {
  MeasurementById,
  IGetLatestPhotoFeedDataReturn,
} from '../../components/photo_feed/useGetLatestPhotoFeedDataBySystemId';
import {
  IPosition,
  IMeasurementRunPoseInfo,
  HistoryInformation,
  IMeasurementRunImageInfo,
} from '../../shared/interfaces';
import { mathRoundTo2Decimals } from '../../shared/utils';

/**
 * Convert the raw pose into the grid pose
 * @param {IPosition} origin - the origin position
 * @param {IMeasurementRunPoseInfo} poseInfo - the pose info generated from metadata
 * @returns {IPosition} converted pose
 */
export const convertRawPoseIntoGridPose = (
  origin: IPosition,
  poseInfo: IMeasurementRunPoseInfo
): IPosition => {
  const lengthX = mathRoundTo2Decimals(
    (poseInfo.x_max - poseInfo.x_min) / (poseInfo.x_count - 1)
  );
  const lengthY = mathRoundTo2Decimals(
    (poseInfo.y_max - poseInfo.y_min) / (poseInfo.y_count - 1)
  );

  // Now adding 1e-5 as EPS. This is needed because of javascript floating bug.
  // Note down in JS, 0.2 + 0.1 = 0.30000000000000004
  return {
    x: Math.floor((origin.x - poseInfo.x_min + 1e-5) / lengthX),
    y:
      poseInfo.y_count -
      Math.floor((origin.y - poseInfo.y_min + 1e-5) / lengthY) -
      1,
  };
};

/**
 * Get the public resource path given the metadata url
 *
 * @param {string} path - current url
 * @param {[number, number]} rgbImageSize - the size of the image in pixels
 * @returns {string} - public url
 */
export const getPublicResourcePath = (
  path: string,
  rgbImageSize: [number, number]
): string => {
  const subPaths = path.split('/');
  return subPaths
    .map((subPath, index) =>
      index === 0
        ? `https://${subPath}.s3.eu-central-1.amazonaws.com`
        : index === subPaths.length - 2
        ? `${rgbImageSize[0]}x${rgbImageSize[1]}`
        : subPath
    )
    .join('/');
};

/**
 * Get the minimum resolution among the array.
 * Assuming that the resolution has same aspect ratio, we are using the first element in the array to compare.
 *
 * @param {[number, number][]} resolutions - the resolutions
 * @returns {[number,number]} - the minimum resolution in the array
 */
export const getMinimumResolution = (
  resolutions: [number, number][]
): [number, number] => {
  if (!resolutions.length) return [0, 0];

  return resolutions.reduce(
    (minimum, resolution) =>
      minimum[0] < resolution[0] ? minimum : resolution,
    resolutions[0]
  );
};

/**
 * Get the maximum resolution among the array.
 * Assuming that the resolution has same aspect ratio, we are using the first element in the array to compare.
 *
 * @param {[number, number][]} resolutions - the resolutions
 * @returns {[number,number]} - the maximum resolution in the array
 */
export const getMaximumResolution = (
  resolutions: [number, number][]
): [number, number] => {
  if (!resolutions.length) return [0, 0];

  return resolutions.reduce(
    (maximum, resolution) =>
      maximum[0] > resolution[0] ? maximum : resolution,
    resolutions[0]
  );
};

export const getPhotoFeedResolutionInformation = (
  measurementRun: IGetLatestPhotoFeedDataReturn['measurementRun']
) => {
  const rgbImageSizes = (
    measurementRun?.metadata?.image_info as IMeasurementRunImageInfo
  )?.resolutions;

  if (!rgbImageSizes) {
    return null;
  }

  const minimumResolution = getMinimumResolution(rgbImageSizes);
  const maximumResolution = getMaximumResolution(rgbImageSizes);
  return {
    minimumResolution,
    maximumResolution,
  };
};

const updateHistoryInformationImageSizes = (
  historyInformation: HistoryInformation,
  measurementRun: any
) => {
  const photoFeedResolutionInformation =
    getPhotoFeedResolutionInformation(measurementRun);

  if (!photoFeedResolutionInformation) {
    return null;
  }

  const { minimumResolution, maximumResolution } =
    photoFeedResolutionInformation;

  historyInformation.updateSmallImageSize({
    width: minimumResolution[0],
    height: minimumResolution[1],
  });
  historyInformation.updateLargeImageSize({
    width: maximumResolution[0],
    height: maximumResolution[1],
  });

  return {
    minimumResolution,
    maximumResolution,
  };
};

export const updateHistoryInformation = (
  historyInformation: HistoryInformation,
  measurementRun: IGetLatestPhotoFeedDataReturn['measurementRun'],
  measurementsGrid: MeasurementById[][]
): HistoryInformation => {
  if (!measurementRun) {
    return historyInformation;
  }

  const newHistoryInformation = new HistoryInformation(
    historyInformation.systemId
  );
  const captureTime = new Date(measurementRun.start_time);
  const rawPoseInfo: IMeasurementRunPoseInfo =
    measurementRun.metadata?.pose_info;

  if (!rawPoseInfo) {
    return historyInformation;
  }

  newHistoryInformation.updateSize(rawPoseInfo.x_count, rawPoseInfo.y_count);

  measurementsGrid.forEach((measurementRow, x) => {
    measurementRow.forEach((measurement, y) => {
      if (!measurement) {
        return;
      }

      const resourcePath = measurement.data.resource_path;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const measurementRun = measurement.measurement_run;

      const resolutionInformation = updateHistoryInformationImageSizes(
        historyInformation,
        measurementRun
      );
      if (!resolutionInformation) {
        return;
      }

      const { minimumResolution, maximumResolution } = resolutionInformation;

      const smallImageUrl = getPublicResourcePath(
        resourcePath,
        minimumResolution
      );
      const largeImageUrl = getPublicResourcePath(
        resourcePath,
        maximumResolution
      );

      newHistoryInformation.add({
        cellX: x,
        cellY: measurementRow.length - y - 1,
        lastCapturedAt: captureTime,
        smallImageUrl,
        largeImageUrl,
      });
    });
  });

  newHistoryInformation.markAsReady();

  return newHistoryInformation;
};
