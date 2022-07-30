import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import PlayIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { FC } from 'react';
import styled from 'styled-components';

interface PlayButtonProps extends Pick<IconButtonProps, 'onClick'> {
  /**
   * Shows whether we are playing something or not.
   * `true` if playing, `false` otherwise.
   */
  isPlaying: boolean;
}

export const PlayButton: FC<PlayButtonProps> = ({ isPlaying, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {isPlaying ? (
        <PauseIcon fontSize="large" />
      ) : (
        <PlayIcon fontSize="large" />
      )}
    </StyledButton>
  );
};

const StyledButton = styled(IconButton)`
  padding: 0;
`;
