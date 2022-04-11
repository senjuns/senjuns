import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ResponsiveLayoutProps } from '../../shared/types';

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
        senjuns was founded to be a driving force for ...
      </GeneralDescription>
      <WhatWeDoTitle variant="h4">What we do</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        ...
      </WhatWeDoDescription>
      <WhoWeAreTitle variant="h4">Who we are</WhoWeAreTitle>
      <WhoWeAreDescription variant="body1">...</WhoWeAreDescription>
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
