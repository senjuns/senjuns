import { FC } from 'react';
import styled from 'styled-components';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseIcon from '@material-ui/icons/PauseCircleOutlineOutlined';

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
