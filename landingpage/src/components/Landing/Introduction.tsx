import { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as PeopleIcon } from '../../assets/svgs/people-icon.svg';
import { Typography } from '../../common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { COLORS, FONTS, SIZES } from '../../shared/constants';
import { ResponsiveLayoutProps, StyledHrefLinkProps } from '../../shared/types';
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
        <br></br>
        <br></br>
        <StyledHrefLink
          href={
            'https://join.slack.com/t/senjuns/shared_invite/zt-16tt3cwp3-Vj~wa1un63ohc6rKQ36H_w'
          }
          target="_blank"
        >
          Join our senjuns Slack
        </StyledHrefLink>
        {/* <a
          color="white"
          href="https://join.slack.com/t/senjuns/shared_invite/zt-16tt3cwp3-Vj~wa1un63ohc6rKQ36H_w"
        >
          blub
        </a> */}
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

const StyledHrefLink = styled.a<StyledHrefLinkProps>`
  font-weight: 600;
  font-size: ${FONTS.body1.size}px;
  text-decoration: none;
  /* color: ${COLORS.white}; */
  color: ${COLORS.white};
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    color: ${COLORS.grey5};
  }
`;

export default Introduction;
