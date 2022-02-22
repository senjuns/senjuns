import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RestoreIcon from '@material-ui/icons/Restore';
import { format } from 'date-fns';
import { FC } from 'react';

import { Theme } from '../../theme/types/createPalette';

interface StyleProps {
  isTrackerOpen: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: (props: StyleProps) => (props.isTrackerOpen ? 180 : 120),
      height: 40,
      background: theme.palette.hb5.main,
      borderRadius: theme.spacing(2.5),
      textTransform: 'none',
      padding: theme.spacing(1.5),
      boxShadow: 'none',

      '&:hover': {
        boxShadow: 'none',
      },
    },
    restoreIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

interface TimeHistoryButtonProps {
  /**
   * Current capture that the user is looking at.
   */
  capturedAt: Date;
  /**
   * Shows if the tracker is open or closed.
   */
  isTrackerOpen: boolean;
  /**
   * Callback to be called when the button is clicked.
   */
  onClick: () => void;
}

const TimeHistoryButton: FC<TimeHistoryButtonProps> = ({
  capturedAt,
  isTrackerOpen,
  onClick,
}) => {
  const classes = useStyles({ isTrackerOpen });

  return (
    <Button variant="contained" className={classes.button} onClick={onClick}>
      <RestoreIcon fontSize="small" className={classes.restoreIcon} />
      <Typography variant="body2">
        {isTrackerOpen
          ? format(capturedAt, 'MM/dd/yy hh:mm a')
          : format(capturedAt, 'hh:mm a')}
      </Typography>
    </Button>
  );
};

export default TimeHistoryButton;
