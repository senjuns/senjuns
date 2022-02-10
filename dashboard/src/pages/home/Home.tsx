import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { RoomContext } from 'contexts/RoomProvider';
import { useScreenSize } from 'hooks/useScreenSize';
import { APP_URL } from 'shared/constants';

const Home: React.FC = () => {
  const { isMobile } = useScreenSize();
  const { roomOptions } = useContext(RoomContext);

  return (
    <>
      {roomOptions && roomOptions.length > 0 ? (
        <Redirect
          to={{
            pathname: isMobile
              ? APP_URL.roomDetailsOverview(Number(roomOptions[0].id))
              : APP_URL.roomDetails(Number(roomOptions[0].id)),
          }}
        />
      ) : (
        'No rooms'
      )}
    </>
  );
};

export default Home;
