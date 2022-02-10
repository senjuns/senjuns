import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from 'components/common/Typography';
import { MeasurementTypes, TMeasurementStatistic } from 'shared/interfaces';
import { MEASUREMENT_OPTION_DETAILS } from 'shared/constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    gradientBox: {
      width: '100%',
    },
    gradientLine: {
      width: '100%',
      height: theme.spacing(1),
      background:
        'linear-gradient(90deg, #0046B3 0%, #6FC153 34.37%, #FFB94C 69.27%, #E86339 100%)',
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
   * Measurement Run statistics information.
   */
  statistic: TMeasurementStatistic;
}

const HeatMapGradient: React.FC<HeatMapGradientProps> = ({
  measurementOption,
  statistic,
}) => {
  if (!statistic) return null;
  const classes = useStyles();
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
