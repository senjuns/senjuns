import { differenceInDays } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../components/common';
import { Colors } from '../../shared/constants';

import { getCurrentDateTime } from '../../shared/utils';

interface PropsType {
  startTime: Date | null;
  endTime: Date | null;
}

const HarvestProgress: React.FC<PropsType> = ({
  startTime,
  endTime,
}: PropsType) => {
  if (!startTime || !endTime) return null;

  const totalDays = differenceInDays(endTime, startTime);
  const passedDays = differenceInDays(getCurrentDateTime(), startTime);

  if (totalDays >= passedDays) {
    const progressPercentage = (passedDays / totalDays) * 100;
    const harvestDate = endTime.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
    });

    return (
      <Container>
        <TopRow>
          <TodayLabel
            style={{ right: `${100 - (passedDays / totalDays) * 100}%` }}
          >
            Today
          </TodayLabel>
          <DateLabel color="gray" variant="body1">
            {harvestDate}
          </DateLabel>
        </TopRow>
        <ProgressBackground>
          <Progress style={{ width: `${progressPercentage}%` }}>
            <PassedDaysLabel variant="h6">Day</PassedDaysLabel>
            <PassedDaysLabel variant="h6">{passedDays}</PassedDaysLabel>
          </Progress>
        </ProgressBackground>
        <HarvestInDays color="gray" variant="body2">
          Harvest in {totalDays - passedDays} days
        </HarvestInDays>
      </Container>
    );
  } else {
    const percentage = (totalDays / passedDays) * 100;
    const overEstimatedDays = passedDays - totalDays;
    const harvestDate = endTime.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
    });

    return (
      <Container>
        <OverEstimatedHarvestDate style={{ left: `${percentage - 24}%` }}>
          <Typography color="gray" variant="body2">
            {harvestDate}
          </Typography>
        </OverEstimatedHarvestDate>
        <OverEstimatedProgressBackground>
          <Progress style={{ width: `${percentage}%` }}>
            <PassedDaysLabel variant="h6">Day</PassedDaysLabel>
            <PassedDaysLabel variant="h6">{passedDays}</PassedDaysLabel>
          </Progress>
          <OverEstimatedDaysLabel variant="h6">
            +{overEstimatedDays}
          </OverEstimatedDaysLabel>
        </OverEstimatedProgressBackground>
        <OverEstimatedHarvestAlert variant="body2">
          {overEstimatedDays} days past estimated harvest
        </OverEstimatedHarvestAlert>
      </Container>
    );
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProgressBackground = styled.div`
  width: 100%;
  height: 15px;
  background: ${Colors.hb5};
  border-radius: 10px;
  height: 40px;
`;

const OverEstimatedProgressBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 15px;
  background: linear-gradient(90deg, #2bb138 77.82%, #31ca71 100%);
  border-radius: 10px;
  height: 40px;
  margin-top: 24px;
`;

const TopRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const HarvestInDays = styled(Typography)`
  margin-top: 10px;
  text-align: right;
`;

const TodayLabel = styled.div`
  position: absolute;
  bottom: 0;
  font-family: Poppins;
  font-size: 14px;
  color: ${Colors.dark7};
`;

const DateLabel = styled(Typography)`
  margin-left: auto;
  margin-bottom: 20px;
`;

const Progress = styled.div`
  background: ${Colors.linearGradientedOrange};
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
`;

const PassedDaysLabel = styled(Typography)`
  color: white;
`;

const OverEstimatedHarvestDate = styled.div`
  position: absolute;
  width: 40%;
  display: flex;
  justify-content: center;
`;

const OverEstimatedDaysLabel = styled(Typography)`
  color: white;
  margin-right: 10px;
`;

const OverEstimatedHarvestAlert = styled(Typography)`
  color: ${Colors.orange2};
  margin-top: 10px;
  text-align: right;
`;

export default HarvestProgress;
