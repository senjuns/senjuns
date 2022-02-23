import Popover from '@material-ui/core/Popover';
import { forwardRef, useState, MouseEvent } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import styled from 'styled-components';
import { Typography } from '../../components/common/Typography';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorInput = forwardRef<HTMLDivElement, ColorInputProps>(
  ({ label, value, onChange }, ref) => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChangeColor = (color: ColorResult) => {
      onChange(color.hex);
    };

    const open = Boolean(anchorEl);

    return (
      <>
        <Typography variant="body2">{label}</Typography>
        <ColorBackground ref={ref} background={value} onClick={handleClick}>
          {value}
        </ColorBackground>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <SketchPicker color={value} onChangeComplete={handleChangeColor} />
        </Popover>
      </>
    );
  }
);

ColorInput.displayName = 'ColorInput';

interface ColorBackgroundProps {
  background: string;
}

const ColorBackground = styled.div<ColorBackgroundProps>`
  background: ${({ background }) => background};
  cursor: pointer;
  width: 100%;
  padding: 8px;
`;
