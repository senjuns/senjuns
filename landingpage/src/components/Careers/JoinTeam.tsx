import { FC } from 'react';
import styled from 'styled-components';
import { Link, Typography } from '../../common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { SIZES } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';

// const CAREERS_LINK = 'https://apply.workable.com/neatleaf/?lng=en';
const CAREERS_LINK = 'https://martinmueller.dev';

const JoinTeam: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <JoinTeamContainer isMobile={isMobile}>
      <Title isMobile={isMobile} variant="h5">
        CAREER
      </Title>
      <JoinTeamLabel isMobile={isMobile} variant="h1">
        Join the team!
      </JoinTeamLabel>
      <GeneralDescription isMobile={isMobile} variant="body1">
        We are always eager to learn about talent interested in strengthening
        our team.
      </GeneralDescription>
      <ViewButtonContainer isMobile={isMobile}>
        <Link
          color="white"
          target="_blank"
          text="VIEW CURRENT OPENINGS"
          to={{ pathname: CAREERS_LINK }}
          variant="contained"
        />
      </ViewButtonContainer>
      <Typography variant="body2">Don’t see your role listed?</Typography>
      <ReachOutUs isMobile={isMobile} variant="body2">
        Reach out to us through the contact form or write us at&nbsp;
        <b>career@senjuns.com</b>
      </ReachOutUs>
    </JoinTeamContainer>
  );
};

const JoinTeamContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
  ${({ isMobile }) => (isMobile ? 'padding: 20px 20px 0px;' : '')}
`;

const Title = styled(Typography)<ResponsiveLayoutProps>`
  font-size: 20px;
  align-self: center;
  margin-bottom: ${({ isMobile }) => (isMobile ? '30px' : '40px')};
`;

const JoinTeamLabel = styled(Typography)<ResponsiveLayoutProps>`
  font-size: ${({ isMobile }) => (isMobile ? '36px' : '80px')};
  margin-bottom: ${({ isMobile }) => (isMobile ? '30px' : '40px')};
  align-self: center;
`;

const GeneralDescription = styled(Typography)<ResponsiveLayoutProps>`
  font-size: 20px;
  margin-bottom: ${({ isMobile }) => (isMobile ? '40px' : '60px')};
`;

const ViewButtonContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  gap: ${SIZES.xSmall}px;
  margin-bottom: ${({ isMobile }) => (isMobile ? '40px' : '60px')};
`;

const ReachOutUs = styled(Typography)<ResponsiveLayoutProps>`
  ${({ isMobile }) => (isMobile ? 'text-align: center;' : '')}
`;

export default JoinTeam;
