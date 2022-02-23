import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import clsx from 'clsx';
import { FC } from 'react';

import { Size } from '../../shared/interfaces';
import { ZOOM_LEVELS } from './constants';

const useStyles = makeStyles((theme) => ({
  controls: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  zoomButton: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    background: 'white',
    '&:hover': {
      background: 'white',
    },
    '&[disabled]': {
      background: 'white',
    },
    borderRadius: theme.spacing(1.5),
  },
  zoomIn: {
    marginBottom: theme.spacing(0.5),
  },
}));

interface PhotoZoomHandlerProps {
  /**
   * When the zoom out is disabled
   */
  isZoomOutDisabled?: boolean;
  /**
   * The zoom scale information of the Main Window.
   */
  scale: number;
  /**
   * The size of presentation layer.
   */
  presentationSize: Size;
  /**
   * Callback to be called when the scale delta changes.
   */
  onChangeScaleDelta: (delta: number) => void;
}

const PhotoZoomHandler: FC<PhotoZoomHandlerProps> = ({
  isZoomOutDisabled,
  scale,
  presentationSize,
  onChangeScaleDelta,
}) => {
  const classes = useStyles();

  const handleZoomIn = () => {
    onChangeScaleDelta(ZOOM_LEVELS.MAX);
  };

  const handleZoomOut = () => {
    onChangeScaleDelta(ZOOM_LEVELS.MIN);
  };

  return (
    <div
      id="photo-zoom-button-group"
      data-scale={scale}
      className={classes.controls}
      style={{
        top: presentationSize.height - 110,
        left: presentationSize.width - 60,
      }}
    >
      <IconButton
        id="photo-zoom-in-button"
        disabled={scale > 1}
        className={clsx(classes.zoomButton, classes.zoomIn)}
        onClick={handleZoomIn}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        id="photo-zoom-out-button"
        disabled={scale < 1 || isZoomOutDisabled}
        className={classes.zoomButton}
        onClick={handleZoomOut}
      >
        <RemoveIcon />
      </IconButton>
    </div>
  );
};

export default PhotoZoomHandler;
