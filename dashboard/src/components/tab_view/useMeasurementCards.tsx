import { useMemo } from 'react';

import { ReactComponent as TemperatureIcon } from 'assets/svg/temperature-icon.svg';
import { ReactComponent as HumidityIcon } from 'assets/svg/humidity-icon.svg';
import { ReactComponent as LeafVpdIcon } from 'assets/svg/leaf-vpd-icon.svg';
import { ReactComponent as VpdIcon } from 'assets/svg/vpd-icon.svg';
import { ReactComponent as AirflowIcon } from 'assets/svg/airflow-icon.svg';
import { ReactComponent as Co2Icon } from 'assets/svg/co2-icon.svg';
import { ReactComponent as PpfdIcon } from 'assets/svg/ppfd-icon.svg';
import { ReactComponent as LeafTemperatureIcon } from 'assets/svg/leaf-temperature-icon.svg';
import { MeasurementUnit, NotificationLevel } from 'shared/constants';
import {
  convertCelsiusToFahrenheit,
  convertMetersPerSecondToMph,
} from 'shared/utils';

export const useMeasurementCards = (statistics: any) => {
  return useMemo(
    () => [
      {
        icon: <TemperatureIcon />,
        title: 'Temp',
        value: statistics?.air_temperature?.mean
          ? convertCelsiusToFahrenheit(statistics?.air_temperature?.mean)
          : undefined,
        unit: MeasurementUnit.FahrenheitDegree,
        notificationLevel: NotificationLevel.Nominal,
        decimal: 1,
      },
      {
        icon: <HumidityIcon />,
        title: 'Humidity',
        value: statistics?.relative_humidity?.mean,
        unit: MeasurementUnit.Percent,
        notificationLevel: NotificationLevel.Nominal,
        decimal: 0,
      },
      {
        icon: <LeafVpdIcon />,
        title: 'Leaf VPD',
        value: statistics?.leaf_vpd?.mean,
        unit: MeasurementUnit.KP,
        notificationLevel: NotificationLevel.Nominal,
        decimal: 2,
      },
      {
        icon: <VpdIcon />,
        title: 'Air VPD',
        value: statistics?.air_vpd?.mean,
        unit: MeasurementUnit.KP,
        notificationLevel: NotificationLevel.Nominal,
        decimal: 2,
      },
      {
        icon: <Co2Icon />,
        title: 'CO2',
        value: statistics?.air_co2?.mean,
        unit: MeasurementUnit.ppm,
        notificationLevel: NotificationLevel.Nominal,
        decimal: 0,
      },
      {
        icon: <AirflowIcon />,
        title: 'Airflow',
        value: statistics?.air_flow?.mean
          ? convertMetersPerSecondToMph(statistics?.air_flow?.mean)
          : undefined,
        unit: MeasurementUnit.mph,
        notificationLevel: NotificationLevel.Nominal,
        decimal: 2,
      },
      {
        icon: <PpfdIcon />,
        title: 'PPFD',
        value: statistics?.par?.mean,
        unit: MeasurementUnit.μMol_m2_s,
        notificationLevel: NotificationLevel.Nominal,
        decimal: 2,
      },
      {
        icon: <LeafTemperatureIcon />,
        title: 'Leaf temp',
        value: statistics?.leaf_temperature?.mean
          ? convertCelsiusToFahrenheit(statistics?.leaf_temperature?.mean)
          : undefined,
        unit: MeasurementUnit.FahrenheitDegree,
        notificationLevel: NotificationLevel.Nominal,
        decimal: 1,
      },
    ],
    [statistics]
  );
};
