import React from 'react';
import styled from 'styled-components';
import { IconButton } from 'components/common';
import { ReactComponent as LogoutIcon } from 'assets/svg/logout-icon.svg';
import { SIDEBAR_WIDTH } from 'components/layout/desktop_layout/constants';

interface SideBarProps {
  onLogOut: () => {};
}

const SideBar: React.FC<SideBarProps> = ({ onLogOut }: SideBarProps) => {
  return (
    <StyledSideBar>
      <IconButton onClick={onLogOut}>
        <LogoutIcon />
      </IconButton>
    </StyledSideBar>
  );
};

export default SideBar;

const StyledSideBar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${SIDEBAR_WIDTH}px;
  padding-bottom: 64px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
