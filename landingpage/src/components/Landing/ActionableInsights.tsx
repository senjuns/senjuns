import { FC } from 'react';
import styled from 'styled-components';

import ScreensImageSrc from '../../assets/imgs/screens.png';
import { Link, Typography } from '../../common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ROUTES } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';

const ActionableInsights: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <ActionableInsightsContainer isMobile={isMobile}>
      <img
        src={ScreensImageSrc}
        alt="Neatleaf Screens"
        width={isMobile ? '100%' : 540}
      />
      <InsightDetails isMobile={isMobile}>
        <Description isMobile={isMobile}>
          Actionable insights provided via intuitive and powerful interfaces
        </Description>
        <Link
          color="white"
          text="LEARN MORE"
          to={ROUTES.CONTACT_US}
          variant="contained"
        />
      </InsightDetails>
    </ActionableInsightsContainer>
  );
};

const ActionableInsightsContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  align-items: center;
  ${({ isMobile }) =>
    isMobile
      ? 'flex-direction: column; gap: 30px;'
      : 'flex-direction: row; gap: 120px;'}
  max-width: 1440px;
  margin: auto;
`;

const InsightDetails = styled.div<ResponsiveLayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMobile }) => (isMobile ? 'center' : 'flex-start')};
`;

const Description = styled(Typography)<ResponsiveLayoutProps>`
  color: black;
  line-height: 1.2;
  margin-bottom: 20px;
  ${({ isMobile }) =>
    isMobile ? 'font-size: 24px; text-align: center;' : 'font-size: 40px;'}
`;

export default ActionableInsights;
