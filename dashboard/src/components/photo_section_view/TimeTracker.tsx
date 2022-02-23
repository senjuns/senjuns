import { addSeconds, differenceInSeconds, format, startOfDay } from 'date-fns';
import { ChangeEvent, FC, useMemo } from 'react';

import Slider, { MAX_SLIDER_VALUE } from '../../components/common/Slider';
import { SectionCaptureList } from '../../shared/interfaces';
import { findNearestIndex } from '../../shared/utils';

interface TimeTrackerProps {
  /**
   * The list of captures in the section.
   */
  captures: SectionCaptureList;
  /**
   * The index of current capture.
   */
  captureIndex: number;
  /**
   * Callback to be called when the capture index changes.
   */
  onChange: (index: number) => void;
}

const TimeTracker: FC<TimeTrackerProps> = ({
  captures,
  captureIndex,
  onChange,
}) => {
  const lastCapture = captures[captures.length - 1];
  const currentCapture = captures[captureIndex];
  const dayStart = startOfDay(captures[0].capturedAt);
  const lastCaptureDurationFromDayStart =
    differenceInSeconds(lastCapture.capturedAt, dayStart) || 1;
  const currentCaptureDurationFromDayStart =
    differenceInSeconds(currentCapture.capturedAt, dayStart) || 1;
  // prettier-ignore
  const positionInSlider = currentCaptureDurationFromDayStart / lastCaptureDurationFromDayStart * MAX_SLIDER_VALUE;

  const valueLabelFormat = (value: number) => {
    const currentDay = addSeconds(
      dayStart,
      (value / MAX_SLIDER_VALUE) * lastCaptureDurationFromDayStart
    );
    return format(currentDay, 'hh:mm a');
  };

  const marks = useMemo(() => {
    return captures.map((capture) => ({
      // prettier-ignore
      value: MAX_SLIDER_VALUE * differenceInSeconds(capture.capturedAt, dayStart) / lastCaptureDurationFromDayStart,
    }));
  }, [captures]);

  const handleChangeSlider = (
    _event: ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      return;
    }

    onChange(findNearestIndex(marks, value));
  };

  return (
    <Slider
      aria-label="time tracker"
      value={positionInSlider}
      marks={marks}
      valueLabelDisplay="on"
      valueLabelFormat={valueLabelFormat}
      onChange={handleChangeSlider}
    />
  );
};

export default TimeTracker;
