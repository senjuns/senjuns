import { FC } from 'react';
import styled from 'styled-components';
import { ReactComponent as DashNavIcon } from '../../../assets/svg/dash-nav-icon.svg';
import { Typography, IconButton } from '../../../components/common';
import { ReactComponent as LogoutIcon } from '../../../assets/svg/logout-icon.svg';
import { HEADER_HEIGHT } from '../../../components/layout/desktop_layout/constants';
import { Sizes } from '../../../shared/constants';

interface HeaderProps {
  userName?: string;
  onLogOut: () => {};
}

const Header: FC<HeaderProps> = ({ userName, onLogOut }: HeaderProps) => {
  return (
    <StyledHeader id="desktop_header">
      <NeatleafIcon
        src="/ms-icon-70x70.png"
        alt="Neatleaf Icon"
        // height={40}
        // width={40}
      />

      <StyledDashNavIcon height={24} width={24} />

      <UserWelcome color="gray" variant="h4">
        Hey, <b>{userName}</b>
      </UserWelcome>
      <RightMenu>
        <IconButton onClick={onLogOut}>
          <LogoutIcon />
        </IconButton>
      </RightMenu>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
`;

const NeatleafIcon = styled.img`
  margin-right: 90px;
`;

const StyledDashNavIcon = styled(DashNavIcon)`
  margin-right: ${Sizes.xLarge}px;
`;

const UserWelcome = styled(Typography)`
  font-size: 30px;
  line-height: 40px;
  font-family: Poppins;
  font-weight: normal;
`;

const RightMenu = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
