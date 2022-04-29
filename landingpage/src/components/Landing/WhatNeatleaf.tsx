import { FC } from 'react';
import styled from 'styled-components';

import SenjunsImageSrc from '../../assets/imgs/neatleaf.png';
import { Typography } from '../../common';
import { useScreenSize, useScreenSizeCustom } from '../../hooks/useScreenSize';
import { COLORS, SCREEN_SIZES } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';

const WhatSenjuns: FC = () => {
  const { isMobile } = useScreenSize();
  const { isBreakpoint } = useScreenSizeCustom(SCREEN_SIZES.xl);

  return (
    <WhatSenjunsContainer isMobile={isBreakpoint}>
      <img src={SenjunsImageSrc} alt="Senjuns" />
      <SenjunsDetails isMobile={isMobile}>
        <WhatIs isMobile={isMobile} variant="h4">
          What is Senjuns
        </WhatIs>
        <SenjunsDescription variant={isMobile ? 'body1' : 'h5'}>
          We are building the world&apos;s first autonomous robotic platform for
          indoor and greenhouse cultivation, empowering you to sustainably
          produce more optimal yields at a higher quality and lower cost. Our
          initial system has already been deployed with the first pilot
          customers who have observed significant improvements in crop
          production.
        </SenjunsDescription>
      </SenjunsDetails>
    </WhatSenjunsContainer>
  );
};

const WhatSenjunsContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  ${({ isMobile }) =>
    isMobile ? `flex-direction: column;` : `flex-direction:row; gap: 80px;`}
`;

const SenjunsDetails = styled.div<ResponsiveLayoutProps>`
  display: flex;
  flex-direction: column;
  ${({ isMobile }) => (isMobile ? 'padding: 50px 20px 60px;' : '')};
`;

const WhatIs = styled(Typography)<ResponsiveLayoutProps>`
  color: white;
  font-size: 40px;
  line-height: 1.2;
  margin-bottom: 20px;
  ${({ isMobile }) => (isMobile ? 'text-align: center; font-size: 30px;' : '')}
`;

const SenjunsDescription = styled(Typography)`
  color: ${COLORS.grey5};
  line-height: 1.7;
  font-weight: normal;
`;

export default WhatSenjuns;
