import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import background from '../../assets/image/background.png';
import backgroundMobile from '../../assets/image/background_mobile.jpg';
import facebookIcon from '../../assets/svg/facebook.svg';
import instagramIcon from '../../assets/svg/instagram.svg';
import linkedinIcon from '../../assets/svg/linkedin.svg';
import logo from '../../assets/svg/logo.svg';
import twitterIcon from '../../assets/svg/twitter.svg';
import { Typography } from '../../components/common/Typography';

import { useScreenSize } from '../../hooks/useScreenSize';
import { APP_URL, ScreenSize } from '../../shared/constants';

interface NonAuthLayoutProps {
  /**
   * Minimum height of the NonAuthLayout Form
   */
  minHeight?: number;
}

/**
 * The NonAuthLayout component.
 *  - will be used as a container of Login, ForgotPassword, ResetPassword pages.
 *
 * @param {NonAuthLayoutProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
export const NonAuthLayout: React.FC<NonAuthLayoutProps> = ({
  children,
  minHeight,
}) => {
  const location = useLocation();
  const formContainerRef = useRef<HTMLInputElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    if (formContainerRef?.current) {
      const marginTop = 150;
      setContainerHeight(formContainerRef.current.clientHeight + marginTop);
    }
  });

  return (
    <Container
      height={
        location.pathname.includes(APP_URL.reset) ? containerHeight : null
      }
    >
      <BackgroundContainer>
        <BackgroundImageWrapper>
          <BackgroundImage
            isMobile={isMobile}
            src={isMobile ? backgroundMobile : background}
            alt="background"
          />
        </BackgroundImageWrapper>

        <Logo src={logo} />
        <Title>
          {isMobile ? (
            <Typography variant="h2">Let&rsquo;s grow together</Typography>
          ) : (
            <TitleText>Let&rsquo;s grow together</TitleText>
          )}
        </Title>
        {!isMobile && (
          <>
            <SocialIconGroup>
              <img src={facebookIcon} />
              <img src={twitterIcon} />
              <img src={linkedinIcon} />
              <img src={instagramIcon} />
            </SocialIconGroup>
            <WaterMark>{`© ${new Date().getFullYear()} Neatleaf.`}</WaterMark>
          </>
        )}
      </BackgroundContainer>
      <FormContainer ref={formContainerRef} minHeight={minHeight}>
        {children}
      </FormContainer>
    </Container>
  );
};

const Container = styled.div<{ height: number | null }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 800px;
  position: relative;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${ScreenSize.xs}px) {
    display: block;
    min-width: auto;
    min-height: 820px;
    height: ${(props) => (props.height ? props.height + 'px' : '100vh')};
  }
`;

const Logo = styled.img`
  position: absolute;
  left: 100px;
  top: 100px;
  width: 220px;
  height: 40px;

  @media only screen and (max-width: ${ScreenSize.xs}px) {
    left: 40px;
    top: 60px;
    width: 167px;
    height: 30px;
  }
`;

const Title = styled.div`
  position: absolute;
  left: 100px;
  top: 350px;
  color: white;
  width: calc(520 / ${ScreenSize.xl} * 100vw);

  @media only screen and (max-width: ${ScreenSize.xl}px) {
    width: 520px;
  }

  @media only screen and (max-width: ${ScreenSize.xs}px) {
    left: 40px;
    top: 204px;
    width: 300px;
  }
`;

const TitleText = styled.div`
  font-family: Poppins;
  font-size: calc(70 / ${ScreenSize.xl} * 100vw);
  font-weight: 600;
  line-height: 1.28;

  @media only screen and (max-width: ${ScreenSize.xl}px) {
    font-size: 70px;
  }
`;

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
`;

const BackgroundImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const BackgroundImage = styled.img<{ isMobile: boolean }>`
  width: 100%;
  height: 100%;

  ${(props) => (props.isMobile ? 'width: auto;' : '')}
`;

interface FormContainerProps {
  minHeight?: number;
}

const FormContainer = styled.div<FormContainerProps>`
  width: 600px;
  background: white;
  padding: 100px;
  box-sizing: border-box;

  @media only screen and (max-width: ${ScreenSize.xs}px) {
    position: absolute;
    width: 100%;
    min-height: ${(props) => props.minHeight || 492}px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 40px;
    border-radius: 30px 30px 0 0;
  }
`;

const SocialIconGroup = styled.div`
  position: absolute;
  left: 100px;
  bottom: 50px;
  display: flex;
  gap: 20px;
`;

const WaterMark = styled.div`
  position: absolute;
  right: 100px;
  bottom: 50px;
  font-size: 14px;
  color: white;
`;
