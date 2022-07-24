import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { forwardRef, useState } from 'react';
import styled from 'styled-components';

import { Colors, Sizes } from '../../shared/constants';

type TextInputProps = TextFieldProps & {};

/**
 * TextInput presentation component
 * Currently it's using mui TextField under the hood.
 */
export const TextInput = forwardRef<HTMLDivElement, TextInputProps>(
  ({ type, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordShow = () => setShowPassword((show) => !show);

    const endAdornment =
      type === 'password' ? (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleTogglePasswordShow}
            edge="end"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      ) : null;

    return (
      <StyledTextField
        ref={ref}
        variant="standard"
        InputProps={{
          endAdornment,
        }}
        type={type === 'password' && showPassword ? 'default' : type}
        {...rest}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

const StyledTextField = styled(TextField)`
  label {
    font-size: 14px;
  }

  input {
    padding: ${Sizes.small}px 0;
    font-size: 18px;
  }

  & .MuiInput-underline::before {
    border-bottom: 1px solid ${Colors.brightBlue100};
  }

  & .MuiInput-underline::after {
    border-bottom: 2px solid ${Colors.brightBlue100};
  }
`;
