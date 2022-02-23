import React from 'react';
import styled from 'styled-components';
import {
  HEADER_HEIGHT,
  SIDEBAR_WIDTH,
} from '../../../components/layout/desktop_layout/constants';
import Header from '../../../components/layout/desktop_layout/Header';
import SideBar from '../../../components/layout/desktop_layout/SideBar';
import { useAuth } from '../../../contexts';
import { Colors } from '../../../shared/constants';

const DesktopLayout: React.FC = ({ children }) => {
  const { userInfo, signOut } = useAuth();

  return (
    <Container>
      <Header userName={userInfo?.username} />
      <SideBar onLogOut={signOut} />
      <MainArea>{children}</MainArea>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  background-color: ${Colors.hb5};
  flex-direction: column;
`;

const MainArea = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: ${SIDEBAR_WIDTH}px;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  width: calc(100vw - ${SIDEBAR_WIDTH}px);
`;

export default DesktopLayout;
