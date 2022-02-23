import { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as NotificationIcon } from '../../assets/svg/notification.svg';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Typography,
} from '../../components/common';

import { Sizes } from '../../shared/constants';

interface PasswordChangedDialogProps extends DialogProps {
  /**
   * Callback to be called when the dialog closes.
   */
  onClose: () => void;
}

export const PasswordChangedDialog: FC<PasswordChangedDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose} aria-label="Password Changed">
      <Content>
        <NotificationIcon />
        <Typography variant="h6">Password changed!</Typography>
      </Content>
      <Actions>
        <Button color="secondary" fullWidth onClick={onClose}>
          Continue
        </Button>
      </Actions>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: ${Sizes.xxLarge}px;
  }
`;

const Content = styled(DialogContent)`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${Sizes.small}px;
  margin-top: ${Sizes.xxLarge}px;
  padding: 0 ${Sizes.xxLarge}px;
`;

const Actions = styled(DialogActions)`
  display: flex;
  align-items: stretch;
  padding: ${Sizes.xxLarge}px;
`;
