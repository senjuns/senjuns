import Slider from '@material-ui/core/Slider';
import { styled } from '@material-ui/core/styles';
import { Theme } from 'theme/types/createPalette';

export const MAX_SLIDER_VALUE = 100;

export interface SliderMark {
  value: number;
}

const StyledSlider = styled(Slider)<Theme>(({ theme }) => ({
  color: theme.palette.orange3.main,
  height: 4,
  borderRadius: theme.spacing(2.5),

  padding: '15px 0',
  '& .MuiSlider-thumb': {
    border: `4px solid ${theme.palette.orange3.main}`,
    backgroundColor: 'white',
    height: theme.spacing(2),
    width: theme.spacing(2),
    marginTop: -6,
    marginLeft: -8,
  },
  '& .MuiSlider-valueLabel': {
    top: -28,
    left: -28,
    fontSize: 14,
    fontWeight: 'normal',
    color: 'black',
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: 'black',
    },
    '&>span': {
      width: 64,
      '&>span': {
        textAlign: 'center',
      },
    },
  },
  '& .MuiSlider-track': {
    height: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    height: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.hb5.main,
  },
  '& .MuiSlider-mark': {
    height: theme.spacing(1),
    width: theme.spacing(1),
    marginTop: -2,
    marginLeft: -4,
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.orange3.main,
  },
  '& .MuiSlider-markLabel': {
    top: theme.spacing(-2.5),
  },
  '&.MuiSlider-marked': {
    marginBottom: 0,
    marginTop: theme.spacing(4),
  },
}));

export default StyledSlider;
