import React, { lazy } from 'react';
import { useScreenSize } from 'hooks';

const DesktopLayout = lazy(
  () => import('components/layout/desktop_layout/DesktopLayout')
);
const MobileLayout = lazy(
  () => import('components/layout/mobile_layout/MobileLayout')
);

const MainLayout: React.FC = ({ children }) => {
  const { isMobile } = useScreenSize();

  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  } else {
    return <DesktopLayout>{children}</DesktopLayout>;
  }
};

export default MainLayout;
