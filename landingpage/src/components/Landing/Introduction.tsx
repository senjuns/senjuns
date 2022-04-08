import { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as PeopleIcon } from '../../assets/svgs/people-icon.svg';
import { Typography } from '../../common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { COLORS, SIZES } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';
import localization from '../../localization';

const Introduction: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <IntroductionContainer isMobile={isMobile}>
      <FrontPageTitle isMobile={isMobile}>
        {localization['landing.introduction.title']}
      </FrontPageTitle>
      <StyledPeopleIcon></StyledPeopleIcon>
      <Title variant={isMobile ? 'h5' : 'h2'} color="white">
        {localization['landing.introduction.subtitle']}
      </Title>
      <Description>
        {localization['landing.introduction.description']}
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
  background: linear-gradient(to right, #60c3e3, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  height: 228px;
  display: flex;
  align-items: center;
`;

const StyledPeopleIcon = styled(PeopleIcon)``;
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
