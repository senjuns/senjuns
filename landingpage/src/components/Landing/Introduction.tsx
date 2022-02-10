import { FC } from 'react';
import styled from 'styled-components';

import { Typography } from 'common';
import { COLORS, SIZES } from 'shared/constants';
import { ReactComponent as Together } from 'assets/svgs/together.svg';
import { ReactComponent as NeatleafShape } from 'assets/svgs/neatleaf-shape.svg';
import { ResponsiveLayoutProps } from 'shared/types';
import { useScreenSize } from 'hooks/useScreenSize';

const Introduction: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <IntroductionContainer isMobile={isMobile}>
      <StyledTogether height={isMobile ? '100px' : '100%'} width="100%" />

      <StyledNeatleafShape height={isMobile ? '180px' : '100%'} width="100%" />

      <Title variant={isMobile ? 'h5' : 'h2'} color="white">
        {"World's first autonomous robotic platform for indoor cultivation"}
      </Title>
      <Description>
        We are building a completely novel and first-of-its-kind robotic
        platform for indoor and greenhouse cultivation environments. Our
        technology operates 24/7, 365 days of the year, empowering you to
        sustainably produce more optimal yields at a higher quality.
      </Description>
      {/* <Description>
        {"Interested? Reach out today and let's grow together!"}
      </Description> */}

      {/* <Link
        color="white"
        text="LEARN MORE"
        to={ROUTES.CONTACT_US}
        variant="contained"
      /> */}
    </IntroductionContainer>
  );
};

const IntroductionContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1030px;
  text-align: center;
  margin-bottom: ${({ isMobile }) => (isMobile ? '64px' : '100px')};
  width: 100%;
`;

const StyledTogether = styled(Together)`
  margin-bottom: ${SIZES.xxLarge}px;
`;

const StyledNeatleafShape = styled(NeatleafShape)`
  margin-bottom: ${SIZES.xLarge}px;
`;

const Title = styled(Typography)`
  margin-bottom: ${SIZES.xLarge}px;
`;

const Description = styled(Typography)`
  color: ${COLORS.grey5};
  font-weight: normal;
  font-size: 20px;
  line-height: 150%;
  margin-bottom: ${SIZES.xLarge}px;
`;

export default Introduction;
