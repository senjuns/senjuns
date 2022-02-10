import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from 'common';
import { ResponsiveLayoutProps } from 'shared/types';
import { useScreenSize } from 'hooks/useScreenSize';

const WhatAndWho: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <WhatAndWhoContainer isMobile={isMobile}>
      <Title isMobile={isMobile} variant="h5">
        ABOUT US
      </Title>
      <WhatAndWhoLabel isMobile={isMobile} variant="h1">
        What &amp; Who
      </WhatAndWhoLabel>
      <GeneralDescription isMobile={isMobile} variant="body1">
        Neatleaf was founded to be a driving force for the next generation of
        technologies in agriculture and to create a positive impact for us and
        our planet.
      </GeneralDescription>
      <WhatWeDoTitle variant="h4">What we do</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        Neatleaf is building a completely novel and first-of-its-kind robotic
        platform for indoor and greenhouse cultivation, empowering you to
        sustainably produce more optimal yields at a higher quality and lower
        cost. Our initial system has already been deployed with the first pilot
        customers who have observed significant improvements in crop production.
      </WhatWeDoDescription>
      <WhoWeAreTitle variant="h4">Who we are</WhoWeAreTitle>
      <WhoWeAreDescription variant="body1">
        We are a diverse group of roboticists, engineers and machine learning
        experts coming from some of the world&apos;s leading technology
        companies and research institutions.
      </WhoWeAreDescription>
    </WhatAndWhoContainer>
  );
};

const WhatAndWhoContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  max-width: 600px;
  ${({ isMobile }) => (isMobile ? 'padding: 20px 20px 0px;' : '')}
`;

const Title = styled(Typography)<ResponsiveLayoutProps>`
  font-size: 20px;
  align-self: center;
  margin-bottom: ${({ isMobile }) => (isMobile ? '30px' : '40px')};
`;

const WhatAndWhoLabel = styled(Typography)<ResponsiveLayoutProps>`
  align-self: center;
  font-size: ${({ isMobile }) => (isMobile ? '36px' : '80px')};
  margin-bottom: ${({ isMobile }) => (isMobile ? '30px' : '40px')};
`;

const GeneralDescription = styled(Typography)<ResponsiveLayoutProps>`
  font-size: 20px;
  margin-bottom: ${({ isMobile }) => (isMobile ? '40px' : '60px')};
`;

const WhatWeDoTitle = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const WhatWeDoDescription = styled(Typography)<ResponsiveLayoutProps>`
  font-size: 16px;
  margin-bottom: ${({ isMobile }) => (isMobile ? '40px' : '60px')};
`;

const WhoWeAreTitle = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const WhoWeAreDescription = styled(Typography)`
  font-size: 16px;
`;

export default WhatAndWho;
