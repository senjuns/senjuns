import { FC, useEffect } from 'react';
// import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts';

const RouteChangeTracker: FC = () => {
  const history = useHistory();
  const { userInfo } = useAuth();

  useEffect(() => {
    history.listen((_location) => {
      // ReactGA.set({
      //   email: userInfo?.username,
      //   page: location.pathname,
      // });
      // ReactGA.pageview(location.pathname);
    });
  }, [userInfo]);

  return null;
};

export default RouteChangeTracker;
