import React, { lazy } from 'react';

import { CropCycleProvider } from '../../contexts/CropCycleProvider';
import { RoomOverviewProvider } from '../../contexts/RoomOverviewProvider';
import { useScreenSize } from '../../hooks';

const DesktopLayout = lazy(
  () => import('../../components/layout/desktop_layout/DesktopLayout')
);
const MobileLayout = lazy(
  () => import('../../components/layout/mobile_layout/MobileLayout')
);

const MainLayout: React.FC = ({ children }) => {
  const { isMobile } = useScreenSize();

  return (
    <CropCycleProvider>
      <RoomOverviewProvider>
        {isMobile ? (
          <MobileLayout>{children}</MobileLayout>
        ) : (
          <DesktopLayout>{children}</DesktopLayout>
        )}
      </RoomOverviewProvider>
    </CropCycleProvider>
  );
};

export default MainLayout;
