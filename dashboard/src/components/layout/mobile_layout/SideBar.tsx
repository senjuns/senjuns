import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as DashboardIcon } from '../../../assets/svg/dashboard-icon.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/svg/logout-icon.svg';
import { ReactComponent as SettingsIcon } from '../../../assets/svg/settings-icon.svg';
import Profile from '../../../components/common/Profile';
import { useAuth } from '../../../contexts';
import { useFeatureFlags } from '../../../contexts/FeatureFlagsProvider';
import { Colors } from '../../../shared/constants';
import SideBarMenuItem from './SideBarMenuItem';

/**
 * Represents side bar.
 *
 * @returns {JSX.Element} SideBar component
 */
const SideBar: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { signOut, userInfo } = useAuth();
  const { settingsFlag, dashboardFlag } = useFeatureFlags();

  const handleDashboardClick = () => {
    console.log('Dashboard Clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings Clicked');
  };

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Container>
      <Profile imageUrl={null} userName={userInfo?.username} size={70} />
      <WelcomeText>
        <div>Welcome back,</div>
        <div>{userInfo?.username}!</div>
      </WelcomeText>
      {dashboardFlag && (
        <SideBarMenuItem
          icon={<DashboardIcon />}
          title={'Dashboard'}
          onClick={handleDashboardClick}
        />
      )}
      {settingsFlag && (
        <SideBarMenuItem
          icon={<SettingsIcon />}
          title={'Settings'}
          onClick={handleSettingsClick}
        />
      )}
      <div style={{ marginTop: 'auto' }}>
        <SideBarMenuItem
          icon={<LogoutIcon />}
          title={'Logout'}
          onClick={handleLogoutClick}
        />
      </div>
      {isLoggingOut && (
        <ProgressBarContainer>
          <CircularProgress />
        </ProgressBarContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding-left: 40px;
  padding-top: 60px;
  padding-bottom: 60px;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  background-color: ${Colors.hb6};
  display: flex;
  flex-direction: column;
`;

const WelcomeText = styled.div`
  font-family: Poppins;
  font-weight: 400;
  font-size: 26px;
  line-height: 36px;
  margin-top: 20px;
  margin-bottom: 20px;

  div {
    max-width: 250px;
    word-break: break-all;
  }

  div:first-child {
  }

  div:nth-child(2) {
    font-weight: bold;
  }
`;

const ProgressBarContainer = styled.div`
  z-index: 1;
  background: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SideBar;
