import React, { useContext, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { RoomContext } from '../../contexts/RoomProvider';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ROOM_DETAIL_TABS, NULL_VALUE } from '../../shared/constants';

const RoomDetailTabView = lazy(
  () => import('../../components/tab_view/RoomDetailTabView')
);
const MobileDetailTabView = lazy(
  () => import('../../components/tab_view/MobileDetailTabView')
);

/**
 * This component represents the room details page.
 * This should show all the current measurements on the page.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
const RoomDetailsPage: React.FC = () => {
  const { currentRoomId, setCurrentTab } = useContext(RoomContext);
  const { isMobile } = useScreenSize();
  const { id: roomId, tab = ROOM_DETAIL_TABS.OVERVIEW } =
    useParams<{ id: string; tab: string }>();

  const tabView = isMobile ? (
    <Suspense fallback={<div>Loading Mobile view..</div>}>
      <MobileDetailTabView
        roomId={Number(roomId)}
        currentTab={tab}
        onChangeTab={setCurrentTab}
      />
    </Suspense>
  ) : (
    <Suspense fallback={<div>Loading Desktop view..</div>}>
      <RoomDetailTabView
        roomId={Number(roomId)}
        currentTab={tab}
        onChangeTab={setCurrentTab}
      />
    </Suspense>
  );

  return (
    <Container isMobile={isMobile}>
      {currentRoomId === NULL_VALUE ? `The room doesn't exist` : tabView}
    </Container>
  );
};

interface ContainerProps {
  isMobile: boolean;
}

const Container = styled.div<ContainerProps>`
  height: 100%;
  box-sizing: border-box;
  padding: ${(props) => (props.isMobile ? '0' : '0 20px 20px 0')};
`;

export default RoomDetailsPage;
