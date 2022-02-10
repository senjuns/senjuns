import { FC } from 'react';
import styled from 'styled-components';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { ResponsiveLayoutProps } from 'shared/types';
import { useScreenSize } from 'hooks/useScreenSize';
import Privacy from 'components/Privacy/Privacy';

const AboutUs: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <AboutUsContainer>
      <Header color="black" />
      <WhatAndWhoWrapper isMobile={isMobile}>
        <Privacy />
      </WhatAndWhoWrapper>
      <Footer />
    </AboutUsContainer>
  );
};

const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const WhatAndWhoWrapper = styled.div<ResponsiveLayoutProps>`
  padding: ${({ isMobile }) =>
    isMobile ? '120px 0px 60px' : '190px 0px 100px'};
  display: flex;
  justify-content: center;
`;

export default AboutUs;
