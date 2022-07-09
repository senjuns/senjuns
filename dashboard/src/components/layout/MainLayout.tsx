import React, { lazy } from 'react';

// import { CropCycleProvider } from '../../contexts/CropCycleProvider';
// import { RoomOverviewProvider } from '../../contexts/RoomOverviewProvider';
import { useScreenSize } from '../../hooks';

const DesktopLayout = lazy(
  () => import('../../components/layout/desktop_layout/DesktopLayout'),
);
const MobileLayout = lazy(
  () => import('../../components/layout/mobile_layout/MobileLayout'),
);

const MainLayout: React.FC<any> = ({ children }) => {
  const { isMobile } = useScreenSize();

  return (
    // <DesktopLayout>{children}</DesktopLayout>
    // <CropCycleProvider>
    <div>
      {/* <RoomOverviewProvider> */}
      {isMobile ? (
        <MobileLayout>{children}</MobileLayout>
      ) : (
        <DesktopLayout>{children}</DesktopLayout>
      )}
      {/* </RoomOverviewProvider> */}
    </div>
    // </CropCycleProvider>
  );
};

export default MainLayout;
