import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as ErrorOccuredLogo } from '../../assets/svg/error-occured.svg';
import { ReactComponent as LogoIcon } from '../../assets/svg/small-logo.svg';
import { Button, Typography } from '../../components/common';
import { useAuth } from '../../contexts/AuthProvider';
import { useScreenSize } from '../../hooks/useScreenSize';
import { APP_URL, ScreenSize, Sizes } from '../../shared/constants';

const MOBILE_ERROR_LOGO_SIZE = 375;
const DESKTOP_ERROR_LOGO_SIZE = 500;

const NotFoundPage: FC = () => {
  const history = useHistory();
  const { isMobile } = useScreenSize();
  const { signOut } = useAuth();

  const handleBackToLogin = async () => {
    await signOut();
    history.push(APP_URL.login);
  };

  return (
    <Container>
      <PageCenter>
        <LogoIconWrapper>
          <LogoIcon />
        </LogoIconWrapper>

        <ErrorLogoContainer>
          <ErrorOccuredLogo
            width={isMobile ? MOBILE_ERROR_LOGO_SIZE : DESKTOP_ERROR_LOGO_SIZE}
            height={isMobile ? MOBILE_ERROR_LOGO_SIZE : DESKTOP_ERROR_LOGO_SIZE}
          />
        </ErrorLogoContainer>

        <ErrorDetailSection>
          <Typography variant="h2" fontWeight="bold">
            An error occurred
          </Typography>
          <Typography variant="h6" fontWeight="light">
            It seems like something went wrong. Please go back to the homepage
            or contact us at support@neatleaf.com
          </Typography>
          <Button color="primary" onClick={handleBackToLogin}>
            Back to login
          </Button>
        </ErrorDetailSection>
      </PageCenter>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageCenter = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;

  * {
    box-sizing: border-box;
  }

  @media only screen and (max-width: ${ScreenSize.sm}px) {
    flex-direction: column;
  }
`;

const LogoIconWrapper = styled.div`
  position: absolute;
  left: ${Sizes.xxLarge}px;
  top: ${Sizes.xxLarge}px;
`;

const ErrorLogoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${ScreenSize.sm}px) {
    width: 100%;
  }
`;

const ErrorDetailSection = styled.div`
  flex: 1;
  padding: ${Sizes.xxLarge}px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  gap: ${Sizes.small}px;

  @media only screen and (max-width: ${ScreenSize.sm}px) {
    width: 100%;
    align-items: center;
    padding: ${Sizes.xxLarge}px;
  }
`;
