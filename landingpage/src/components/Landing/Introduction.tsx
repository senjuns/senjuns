import { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as NeatleafShape } from '../../assets/svgs/neatleaf-shape.svg';
import { ReactComponent as Together } from '../../assets/svgs/together.svg';
import { ReactComponent as PeopleIco } from '../../assets/svgs/people-ico.svg';
import { Typography } from '../../common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { COLORS, SIZES } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';

const Introduction: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <IntroductionContainer isMobile={isMobile}>
      <FrontPageTitle>Seniors and Juniors Together</FrontPageTitle>
      {/* image */ }
      <StyledPeopleIco></StyledPeopleIco>
      <Title variant={isMobile ? 'h5' : 'h2'} color="white">
        {"Let's get stuff done with fun!"}
      </Title>
      <Description>
        As you know seniors in IT and engineering are less available and expensive. That trend doesn’t seem to change at all. Let’s stop that madness and put seniors and juniors together as teams.Senjun teams are eager to learn and to help you with your compelx IT problems.
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
const FrontPageTitle = styled.div<ResponsiveLayoutProps>`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: ${({ isMobile }) => (isMobile ? '64px' : '100px')};
  line-height: 95px;
  text-align: center;
  background: linear-gradient(to right, #60C3E3 , #FFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  height: 228px;
  display: flex;
  align-items: center;

`
const StyledTogether = styled(Together)`
  margin-bottom: ${SIZES.xxLarge}px;
`;
const StyledPeopleIco = styled(PeopleIco)`
`

const StyledNeatleafShape = styled(NeatleafShape)`
  margin-bottom: ${SIZES.xLarge}px;
`;

const Title = styled(Typography)`
  margin-bottom: ${SIZES.xLarge}px;
  font-weight: 400;
`;

const Description = styled(Typography)`
  color: ${COLORS.grey5};
  font-weight: normal;
  font-size: 20px;
  line-height: 150%;
  margin-bottom: ${SIZES.xLarge}px;
`;

export default Introduction;
