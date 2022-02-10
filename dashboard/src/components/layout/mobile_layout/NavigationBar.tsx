import React from 'react';
import styled from 'styled-components';
import hamburgerIcon from 'assets/svg/hamburger.svg';
import logoIcon from 'assets/svg/small-logo.svg';
import backIcon from 'assets/svg/back-icon.svg';
import closeIcon from 'assets/svg/close-icon.svg';
import NotificationButton from './NotificationButton';
import { ImageButton } from 'components/common';
import { useFeatureFlags } from 'contexts/FeatureFlagsProvider';
import { useRoomDetails } from 'contexts/RoomProvider';
import { ROOM_DETAIL_TABS } from 'shared/constants';

interface NavigationBarProps {
  /**
   * Flag: true if side bar is open.
   */
  isSideBarOpen: boolean;
  /**
   * Callback function: triggered when clicking on hamburger menu.
   */
  onMenuClick: () => void;
}

/**
 * Represents navigation bar.
 *
 * @param {ProfileProps} props isSideBarOpen, onMenuClick
 * @returns {JSX.Element} NavigationBar component
 */
const NavigationBar: React.FC<NavigationBarProps> = ({
  isSideBarOpen,
  onMenuClick,
}) => {
  const { notificationFlag } = useFeatureFlags();
  const {
    isPhotoSectionView,
    setIsPhotoSectionView,
    currentTab,
    setCurrentTab,
  } = useRoomDetails();

  const handleBackClick = () => {
    if (isPhotoSectionView) {
      setIsPhotoSectionView(false);
    } else {
      setCurrentTab(ROOM_DETAIL_TABS.OVERVIEW);
    }
  };

  return (
    <Container>
      {currentTab === ROOM_DETAIL_TABS.PHOTO_FEED ? (
        <ImageButton onClick={handleBackClick} icon={backIcon} />
      ) : (
        <ImageButton
          onClick={onMenuClick}
          icon={isSideBarOpen ? closeIcon : hamburgerIcon}
        />
      )}
      <img src={logoIcon} />
      {notificationFlag ? <NotificationButton /> : <div></div>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
`;

export default NavigationBar;
