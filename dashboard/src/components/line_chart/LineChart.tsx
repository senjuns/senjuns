import MomentUtils from '@date-io/moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { lazy, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar.svg';
import { ReactComponent as DropdownArrowIcon } from '../../assets/svg/dropdown-arrow.svg';
import { Typography } from '../../components/common/Typography';
import { useCropCycleDetails } from '../../contexts';
import { useFeatureFlags } from '../../contexts/FeatureFlagsProvider';
import { useGetLatestMeasurementRunBySystemIdQuery } from '../../graphql/generated/react_apollo';
import { Colors } from '../../shared/constants';
import { MeasurementTypes } from '../../shared/interfaces';
import { getCurrentDateTime } from '../../shared/utils';
import {
  ChartColors,
  getHorizontalShapeConfig,
  getVerticalShapeConfig,
} from './config';
import { useLineChartData } from './useLineChartData';
import { ILineChartPlotParams } from './useLineChartPlotInfo';
import { getMeasurementSpecificData, splitIntoRedAndGreenLines } from './utils';

const LineChartView = lazy(() => import('./LineChartView'));
const MeasurementTypeBar = lazy(
  () => import('../../components/measurement_type_bar/MeasurementTypeBar')
);
const NoDataView = lazy(() => import('../../components/error/NoDataView'));

const momentUtils = new MomentUtils();

interface LineChartProps {
  systemId: number;
}

const LineChart: React.FC<LineChartProps> = ({ systemId }) => {
  const { airflowSensorFlag, calendarFlag } = useFeatureFlags();
  const { range } = useCropCycleDetails();
  const [measurementOption, setMeasurementOption] = useState(
    MeasurementTypes.Temperature
  );

  const { data: latestMeasurementRun } =
    useGetLatestMeasurementRunBySystemIdQuery({
      variables: {
        system_id: { _eq: systemId },
        start: range.start,
        end: range.end,
      },
    });

  useEffect(() => {
    if (!latestMeasurementRun || !latestMeasurementRun.measurement_run?.[0])
      return;

    const latestMeasurementRunDate = new Date(
      latestMeasurementRun.measurement_run[0].start_time
    );
    const delta = 3;
    const startDate = new Date(latestMeasurementRunDate);
    startDate.setDate(startDate.getDate() - delta);

    setSelectedDate(momentUtils.date(latestMeasurementRunDate).format('lll'));
  }, [latestMeasurementRun]);

  const { measurementRunData, growthCycleData, loading, error } =
    useLineChartData({
      zoneId: 1,
      systemId,
      start: range.start,
      end: range.end,
    });

  const hasNoData = !loading && !measurementRunData?.length;

  const currentFormattedDateString = momentUtils
    .date(getCurrentDateTime())
    .format('lll');
  const [selectedDate, setSelectedDate] = useState<string | null>(
    currentFormattedDateString
  );

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [lineChartViewParams, setLineChartViewParams] =
    useState<ILineChartPlotParams>({
      xRange: [],
      yRange: [],
      shapes: [],
      state: {
        data: { timestamps: [], values: [] },
        xNorm: [],
        yNorm: [],
        xAbnormal: [],
        yAbnormal: [],
      },
    });

  useEffect(() => {
    if (!measurementRunData || !growthCycleData) return;

    const data = getMeasurementSpecificData(
      measurementRunData,
      growthCycleData,
      measurementOption
    );

    if (!data) return;

    const { xNorm, yNorm, xAbnormal, yAbnormal } = splitIntoRedAndGreenLines(
      data.data,
      (data.monitoringParams?.light.yellow as any)?.min,
      (data.monitoringParams?.light.yellow as any)?.max
    );

    const shapes = [];
    // add day & night cycle area

    for (
      let date = new Date(range.start);
      date <= range.end;
      date.setDate(date.getDate() + 1)
    ) {
      // previous night
      const prevNightEndTime = new Date(date);
      prevNightEndTime.setHours(6);
      prevNightEndTime.setMinutes(0);
      prevNightEndTime.setSeconds(0);
      const prevNightStartTime = new Date(prevNightEndTime);
      prevNightStartTime.setDate(prevNightStartTime.getDate() - 1);
      prevNightStartTime.setHours(18);
      prevNightStartTime.setMinutes(0);
      prevNightStartTime.setSeconds(0);

      shapes.push(
        getVerticalShapeConfig(prevNightStartTime, prevNightEndTime, Colors.hb6)
      );

      // next night
      const nextNightStartTime = new Date(prevNightStartTime);
      nextNightStartTime.setDate(prevNightStartTime.getDate() + 1);
      const nextNightEndTime = new Date(prevNightEndTime);
      nextNightEndTime.setDate(prevNightEndTime.getDate() + 1);
      shapes.push(
        getVerticalShapeConfig(nextNightStartTime, nextNightEndTime, Colors.hb6)
      );

      // dark cycle
      // add green rectangle area
      shapes.push(
        getHorizontalShapeConfig(
          (data.monitoringParams?.dark.green as any)?.min,
          (data.monitoringParams?.dark.green as any)?.max,
          ChartColors.GREEN,
          prevNightStartTime,
          prevNightEndTime
        )
      );
      if (date === range.end) {
        shapes.push(
          getHorizontalShapeConfig(
            (data.monitoringParams?.dark.green as any)?.min,
            (data.monitoringParams?.dark.green as any)?.max,
            ChartColors.GREEN,
            nextNightStartTime,
            nextNightEndTime
          )
        );
      }

      // add yellow rectangle area
      shapes.push(
        getHorizontalShapeConfig(
          (data.monitoringParams?.dark.yellow as any)?.min,
          (data.monitoringParams?.dark.green as any)?.min,
          ChartColors.YELLOW_LOW,
          prevNightStartTime,
          prevNightEndTime
        )
      );
      shapes.push(
        getHorizontalShapeConfig(
          (data.monitoringParams?.dark.yellow as any)?.max,
          (data.monitoringParams?.dark.green as any)?.max,
          ChartColors.YELLOW_LOW,
          prevNightStartTime,
          prevNightEndTime
        )
      );
      if (date === range.end) {
        shapes.push(
          getHorizontalShapeConfig(
            (data.monitoringParams?.dark.yellow as any)?.min,
            (data.monitoringParams?.dark.green as any)?.min,
            ChartColors.YELLOW_LOW,
            nextNightStartTime,
            nextNightEndTime
          )
        );
        shapes.push(
          getHorizontalShapeConfig(
            (data.monitoringParams?.dark.green as any)?.max,
            (data.monitoringParams?.dark.yellow as any)?.max,
            ChartColors.YELLOW_HIGH,
            nextNightStartTime,
            nextNightEndTime
          )
        );
      }

      // light cycle
      // add green rectangle area
      shapes.push(
        getHorizontalShapeConfig(
          (data.monitoringParams?.light.green as any)?.min,
          (data.monitoringParams?.light.green as any)?.max,
          ChartColors.GREEN,
          prevNightEndTime,
          nextNightStartTime
        )
      );

      // add yellow rectangle area
      shapes.push(
        getHorizontalShapeConfig(
          (data.monitoringParams?.light.yellow as any)?.min,
          (data.monitoringParams?.light.green as any)?.min,
          ChartColors.YELLOW_LOW,
          prevNightEndTime,
          nextNightStartTime
        )
      );
      shapes.push(
        getHorizontalShapeConfig(
          (data.monitoringParams?.light.yellow as any)?.max,
          (data.monitoringParams?.light.green as any)?.max,
          ChartColors.YELLOW_LOW,
          prevNightEndTime,
          nextNightStartTime
        )
      );
    }

    setLineChartViewParams({
      xRange: [range.start, range.end],
      yRange: [data.min.toString(), data.max.toString()],
      shapes,
      state: { data: data.data, xNorm, yNorm, xAbnormal, yAbnormal },
    });
  }, [measurementOption, loading]);

  const handleDateChange = (date: any) => {
    setSelectedDate(date.format('lll'));
    setDatePickerVisible(false);
  };

  const handleCalendarClick = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  if (error) {
    return <Typography variant="h6">{JSON.stringify(error)}</Typography>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (hasNoData) {
    return <NoDataView />;
  }

  return (
    <Container>
      <MeasurementTypeBar
        airflowSensorFlag={airflowSensorFlag}
        value={measurementOption}
        onOptionChange={setMeasurementOption}
      />
      <Typography variant="h6">{measurementOption}</Typography>
      <DateRow>
        <MeasurementDate>{selectedDate}</MeasurementDate>
        {calendarFlag && (
          <CalendarDropdown>
            <CalendarButton onClick={handleCalendarClick}>
              <CalendarIcon />
              <DropdownArrowIcon />
            </CalendarButton>

            <DatePickerContainer visible={isDatePickerVisible}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  disableToolbar
                  variant="static"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </DatePickerContainer>
          </CalendarDropdown>
        )}
      </DateRow>
      <LineChartView
        xRange={lineChartViewParams.xRange}
        yRange={lineChartViewParams.yRange}
        shapes={lineChartViewParams.shapes}
        state={lineChartViewParams.state}
      />
      <Legend>
        <InRange>
          <GreenCircle />
          <LegendTitle>In range</LegendTitle>
        </InRange>
        <OutOfRange>
          <RedCircle />
          <LegendTitle>Out of range</LegendTitle>
        </OutOfRange>
      </Legend>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MeasurementDate = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
`;

const Legend = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const InRange = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const OutOfRange = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const GreenCircle = styled.div`
  background: ${ChartColors.GREEN_LINE};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;

const RedCircle = styled.div`
  background: ${ChartColors.RED_LINE};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;

const LegendTitle = styled.p`
  font-size: 12px;
`;

const CalendarDropdown = styled.div`
  position: relative;
`;

const CalendarButton = styled.div`
  cursor: pointer;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 16px;
  background-color: ${Colors.hb6};
  border-radius: 20px;
`;

const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const DatePickerContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  right: 0;
  z-index: 10;
  border: 1px solid black;
`;

export default LineChart;
