import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AirflowIcon } from '../../assets/svg/airflow-icon.svg';
import { ReactComponent as Co2Icon } from '../../assets/svg/co2-icon.svg';
import { ReactComponent as HumidityIcon } from '../../assets/svg/humidity-icon.svg';
import { ReactComponent as LeafTemperatureIcon } from '../../assets/svg/leaf-temperature-icon.svg';
import { ReactComponent as LeafVpdIcon } from '../../assets/svg/leaf-vpd-icon.svg';
import { ReactComponent as PpfdIcon } from '../../assets/svg/ppfd-icon.svg';
import { ReactComponent as TemperatureIcon } from '../../assets/svg/temperature-icon.svg';
import { ReactComponent as VpdIcon } from '../../assets/svg/vpd-icon.svg';
import { Colors } from '../../shared/constants';
import { MeasurementTypes } from '../../shared/interfaces';

interface MeasurementOptionBarProps {
  airflowSensorFlag: boolean;
  value: MeasurementTypes;
  onOptionChange: (option: MeasurementTypes) => void;
}

const MeasurementTypeBar: React.FC<MeasurementOptionBarProps> = ({
  airflowSensorFlag,
  value,
  onOptionChange,
}) => {
  const MEASUREMENT_OPTIONS = [
    {
      type: MeasurementTypes.Temperature,
      Icon: TemperatureIcon,
      enabled: true,
    },
    { type: MeasurementTypes.Humidity, Icon: HumidityIcon, enabled: true },
    { type: MeasurementTypes.LeafVpd, Icon: LeafVpdIcon, enabled: true },
    { type: MeasurementTypes.Vpd, Icon: VpdIcon, enabled: true },
    { type: MeasurementTypes.Co2, Icon: Co2Icon, enabled: true },
    {
      type: MeasurementTypes.Airflow,
      Icon: AirflowIcon,
      enabled: airflowSensorFlag,
    },
    { type: MeasurementTypes.Ppfd, Icon: PpfdIcon, enabled: true },
    {
      type: MeasurementTypes.LeafTemperature,
      Icon: LeafTemperatureIcon,
      enabled: true,
    },
  ];

  return (
    <Container>
      {MEASUREMENT_OPTIONS.map(
        (option) =>
          option.enabled && (
            <OptionItem
              key={option.type}
              selected={value === option.type}
              onClick={() => onOptionChange(option.type)}
            >
              <option.Icon />
            </OptionItem>
          )
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  overflow: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface OptionItemProps {
  selected: boolean;
}

const OptionItem = styled.div<OptionItemProps>`
  width: 50px;
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.selected ? `2px solid ${Colors.orange3}` : 'none'};
  border-radius: 10px;
  box-sizing: border-box;
`;

export default MeasurementTypeBar;
