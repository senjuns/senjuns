import { FC } from 'react';
import styled from 'styled-components';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Introduction from 'components/Landing/Introduction';
import Benefits from 'components/Landing/Benefits';
import WhatNeatleaf from 'components/Landing/WhatNeatleaf';
import UniqueValueProposition from 'components/Landing/UniqueValueProposition';
import ActionableInsights from 'components/Landing/ActionableInsights';

import { BENEFITS, UNIQUE_VALUES } from 'containers/Landing/constants';
import { ResponsiveLayoutProps } from 'shared/types';
import { useScreenSize } from 'hooks/useScreenSize';

const Landing: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <LandingContainer>
      <Header color="white" />
      <IntroductionWrapper isMobile={isMobile}>
        <Introduction />
      </IntroductionWrapper>
      <BenefitsWrapper isMobile={isMobile}>
        <Benefits benefits={BENEFITS} />
      </BenefitsWrapper>
      <WhatNeatleafWrapper isMobile={isMobile}>
        <WhatNeatleaf />
      </WhatNeatleafWrapper>
      <UniqueValuePropositionWrapper isMobile={isMobile}>
        <UniqueValueProposition uniqueValues={UNIQUE_VALUES} />
      </UniqueValuePropositionWrapper>
      <ActionableInsightsWrapper isMobile={isMobile}>
        <ActionableInsights />
      </ActionableInsightsWrapper>
      <Footer />
    </LandingContainer>
  );
};

const LandingContainer = styled.div``;

const IntroductionWrapper = styled.div<ResponsiveLayoutProps>`
  display: flex;
  background: black;
  justify-content: center;
  padding: ${({ isMobile }) => (isMobile ? '120px 20px 0' : '190px 0 0')};
`;

const BenefitsWrapper = styled.div<ResponsiveLayoutProps>`
  background: #f8f8f8;
  padding: ${({ isMobile }) => (isMobile ? '90px 20px 60px' : '120px 134px')};
`;

const WhatNeatleafWrapper = styled.div<ResponsiveLayoutProps>`
  background: black;
  ${({ isMobile }) => (isMobile ? '' : 'padding: 124px 134px')};
`;

const UniqueValuePropositionWrapper = styled.div<ResponsiveLayoutProps>`
  background: white;
  padding: ${({ isMobile }) => (isMobile ? '60px 20px 20px' : '124px 134px')};
`;

const ActionableInsightsWrapper = styled.div<ResponsiveLayoutProps>`
  background: #f8f8f8;
  padding: ${({ isMobile }) => (isMobile ? '50px 20px' : '50px 134px')};
`;

export default Landing;
