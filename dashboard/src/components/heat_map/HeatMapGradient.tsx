import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import { Typography } from '../../components/common/Typography';
import { MEASUREMENT_OPTION_DETAILS } from '../../shared/constants';
import {
  MeasurementTypes,
  TMeasurementStatistic,
} from '../../shared/interfaces';

interface StyleProps {
  scaleValues: [number, string][];
}

const useStyles = makeStyles((theme) =>
  createStyles({
    gradientBox: {
      width: '100%',
    },
    gradientLine: {
      width: '100%',
      height: theme.spacing(1),
      background: ({ scaleValues }: StyleProps) => {
        return `linear-gradient(90deg, ${scaleValues
          .map((value) => `${value[1]} ${value[0] * 100}%`)
          .join(', ')})`;
      },
      borderRadius: 10,
    },
  })
);

export interface HeatMapGradientProps {
  /**
   * The Measurement Option user selected.
   */
  measurementOption: MeasurementTypes;
  /**
   * The scalue values to render gradient.
   */
  scaleValues: [number, string][];
  /**
   * Measurement Run statistics information.
   */
  statistic: TMeasurementStatistic;
}

const HeatMapGradient: React.FC<HeatMapGradientProps> = ({
  measurementOption,
  scaleValues,
  statistic,
}) => {
  if (!statistic) return null;
  const classes = useStyles({ scaleValues });
  const { unit } = MEASUREMENT_OPTION_DETAILS[measurementOption];
  const staticValues = [statistic.min, statistic.mean, statistic.max];

  return (
    <Box className={classes.gradientBox}>
      <Box className={classes.gradientLine} />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {staticValues.map((value, index) => (
          <Typography key={index} variant="body1">
            {[parseFloat(value.toFixed(2)), unit].join(' ')}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default HeatMapGradient;
