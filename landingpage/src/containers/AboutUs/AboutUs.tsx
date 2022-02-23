import { FC } from 'react';
import styled from 'styled-components';
import WhatAndWho from '../../components/AboutUs/WhatAndWho';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ResponsiveLayoutProps } from '../../shared/types';

const AboutUs: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <AboutUsContainer>
      <Header color="black" />
      <WhatAndWhoWrapper isMobile={isMobile}>
        <WhatAndWho />
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
