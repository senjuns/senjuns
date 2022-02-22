import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FC, HTMLAttributes } from 'react';
import TimeHistoryButton from '../../components/photo_section_view/TimeHistoryButton';

const useStyles = makeStyles(() =>
  createStyles({
    infoBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      textTransform: 'uppercase',
    },
  })
);

interface MeasurementInfoProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The last time when the system has been captured.
   */
  lastCapturedTime?: Date | null;
}

const MeasurementInfo: FC<MeasurementInfoProps> = ({
  lastCapturedTime,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.infoBox} {...props}>
      {lastCapturedTime ? (
        <TimeHistoryButton
          capturedAt={lastCapturedTime}
          isTrackerOpen={true}
          onClick={() => {}}
        />
      ) : (
        <Typography>No Capture Yet</Typography>
      )}
    </Box>
  );
};

export default MeasurementInfo;
