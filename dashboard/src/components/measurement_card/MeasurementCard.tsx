import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import {
  Colors,
  NotificationLevel,
  Sizes,
  ScreenSize,
} from '../../shared/constants';

const colorMap = {
  [NotificationLevel.Nominal]: Colors.black,
  [NotificationLevel.Warning]: Colors.orange3,
  [NotificationLevel.Error]: Colors.orange1,
};

interface PropsType {
  icon: JSX.Element;
  title: string;
  value?: number;
  unit: string;
  notificationLevel: string;
  decimal?: number;
  onClick?: ((e: MouseEvent) => any) | null;
}

const MeasurementCard: React.FC<PropsType> = ({
  icon,
  title,
  value,
  unit,
  notificationLevel,
  decimal,
}: PropsType) => {
  const isValidValue = value !== null && value !== undefined;
  const roundedValue = value ? value.toFixed(decimal ? decimal : 0) : 0;

  return (
    <CardContainer style={{ color: colorMap[notificationLevel] }}>
      <IconContainer color={colorMap[notificationLevel]}>{icon}</IconContainer>
      <Title>{title}</Title>
      <MeasurementValueContainer>
        <MeasurementValue>
          {isValidValue ? roundedValue : 'N/A'}
        </MeasurementValue>
        {isValidValue && <Unit>{unit}</Unit>}
      </MeasurementValueContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media only screen and (min-width: ${ScreenSize.xs}px) {
    border-bottom: 1px solid ${Colors.hb4};
    padding-bottom: 16px;
  }
`;

const IconContainer = styled.div`
  width: 30px;
  text-align: center;
  path {
    fill: ${(props) => props.color};
  }
`;

const Title = styled.div`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  margin-left: ${Sizes.xLarge}px;
`;

const MeasurementValue = styled.div`
  font-family: Poppins;
  font-size: 30px;
  font-weight: 500;
  line-height: 40px;
`;

const MeasurementValueContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
`;

const Unit = styled.span`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400;
  line-height: 13px;
  word-break: break-all;
  max-width: 40px;
  line-height: 18px;
  margin-left: 2px;
  text-align: right;
`;

export default MeasurementCard;
