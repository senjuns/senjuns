import { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as CalendarDropDownIcon } from '../../assets/svg/calendar-dropdown.svg';
import { ReactComponent as WarningIcon } from '../../assets/svg/warning.svg';
import { Typography } from '../../components/common';
import { CropCycleMenu } from '../../components/common/CropCycleMenu';
import { useCropCycleDetails } from '../../contexts/CropCycleProvider';
import { getCurrentDateTime } from '../../shared/utils';

const DEFAULT_MESSAGE =
  'There is no data available for this time range. Please, select a different one to continue.';

interface NoDataViewProps {
  message?: string;
}

const NoDataView: FC<NoDataViewProps> = ({ message = DEFAULT_MESSAGE }) => {
  const {
    startTime,
    range: cropCycleRange,
    onChange: onChangeCropCycleRange,
  } = useCropCycleDetails();

  return (
    <NoDataContainer>
      <View>
        <WarningIconContainer>
          <WarningIcon />
        </WarningIconContainer>

        <NoDataLabel variant="h5" fontWeight="bold">
          No data available
        </NoDataLabel>

        <Description color="gray" variant="body2">
          {message}
        </Description>

        {startTime && (
          <CropCycleMenu
            current={cropCycleRange}
            isInvalid={false}
            defaultLabel={<CalendarDropDownIcon />}
            whole={{
              start: startTime || getCurrentDateTime(),
              end: getCurrentDateTime(),
            }}
            onSelectRange={onChangeCropCycleRange}
          />
        )}
      </View>
    </NoDataContainer>
  );
};

export default NoDataView;

const NoDataContainer = styled.div`
  min-height: 300px;
  height: 100%;
  width: 100%;
  padding: 40px;
  background: #f8f8fc;
  box-sizing: border-box;
  border-radius: 40px;
  display: flex;
  justify-content: center;
`;

const View = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WarningIconContainer = styled.div`
  margin-bottom: 28px;
`;

const NoDataLabel = styled(Typography)`
  margin-bottom: 10px;
`;

const Description = styled(Typography)`
  margin-bottom: 20px;
  text-align: center;
`;
