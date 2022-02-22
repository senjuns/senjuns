import React, { useState } from 'react';
import styled from 'styled-components';
import { useScreenSize } from '../../../hooks/useScreenSize';
import { ScreenSize } from '../../../shared/constants';
import NavigationBar from './NavigationBar';
import SideBar from './SideBar';

const MobileLayout: React.FC = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { isMobile } = useScreenSize();
  const handleMenuClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <Container isMobile={isMobile}>
      {isSideBarOpen && <SideBar />}
      <PageContainer isSideBarOpen={isSideBarOpen}>
        <NavigationBar
          isSideBarOpen={isSideBarOpen}
          onMenuClick={handleMenuClick}
        />
        <MainArea>{children}</MainArea>
      </PageContainer>
    </Container>
  );
};

interface ContainerProps {
  isMobile: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  ${(props) => (props.isMobile ? `max-width: ${ScreenSize.md}px;` : '')}
  overflow: hidden;
`;

const PageContainer = styled.div<{ isSideBarOpen: boolean }>`
  width: 100%;
  ${(props) => (!props.isSideBarOpen ? 'height: 100vh;' : '')}
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: white;

  @keyframes sliding-down {
    from {
      top: 0;
      bottom: 0;
      left: 0;
      border-radius: 0;
    }
    to {
      top: 10%;
      bottom: 10%;
      left: 300px;
      border-radius: 38px;
    }
  }

  @keyframes sliding-up {
    from {
      top: 10%;
      bottom: 10%;
      left: 300px;
      border-radius: 38px;
    }
    to {
      top: 0;
      bottom: 0;
      left: 0;
      border-radius: 0;
    }
  }

  ${(props) => (props.isSideBarOpen ? 'position: absolute;' : '')}
  left: ${(props) => (props.isSideBarOpen ? '300px' : '0')};
  top: ${(props) => (props.isSideBarOpen ? '10%' : '0')};
  right: 0;
  bottom: ${(props) => (props.isSideBarOpen ? '10%' : '0')};
  border-radius: ${(props) => (props.isSideBarOpen ? '38px' : '0')};
  ${(props) =>
    props.isSideBarOpen
      ? 'box-shadow: -10px 4px 40px rgba(0, 0, 0, 0.08);'
      : ''}
  animation-name: ${(props) =>
    props.isSideBarOpen ? 'sliding-down' : 'sliding-up'};
  animation-duration: 0.3s;
`;

const MainArea = styled.div`
  flex: 1;
  min-width: 0;
  overflow: auto;
`;

export default MobileLayout;
