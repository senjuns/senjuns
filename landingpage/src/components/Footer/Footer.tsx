import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Logo } from '../../assets/svgs/logo.svg';
import { Link, Typography } from '../../common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ROUTES } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';
import localization from '../../localization';

interface LinkGroupProps {
  title: string;
  children: React.ReactNode;
}

const LinkGroup: FC<LinkGroupProps> = ({ children, title }) => {
  return (
    <LinkGroupContainer>
      <Typography color="grey4" variant="h6" fontWeight="normal">
        {title}
      </Typography>
      {children}
    </LinkGroupContainer>
  );
};

const Footer: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <FooterContainer isMobile={isMobile}>
      <FooterMain isMobile={isMobile}>
        <LogoContainer isMobile={isMobile}>
          <RouterLink to={ROUTES.LANDING}>
            <Logo color="white" />
          </RouterLink>
        </LogoContainer>

        <LinkContainer>
          <LinkGroup title={localization['landing.footer.company']}>
            <StyledLink
              text={localization['landing.menu.about_us']}
              to={ROUTES.ABOUT_US}
            />
            <StyledLink
              text={localization['landing.menu.careers']}
              to={ROUTES.CAREERS}
            />
            <StyledLink
              text={localization['landing.menu.contact']}
              to={ROUTES.CONTACT_US}
            />
          </LinkGroup>
          <LinkGroup title={localization['landing.footer.legal']}>
            <StyledLink
              color="orange3"
              text={localization['landing.menu.privacy']}
              to={ROUTES.PRIVACY}
            />
          </LinkGroup>
        </LinkContainer>
      </FooterMain>

      <Typography variant="body1" color="grey4">
        2022 senjuns.com. {localization['landing.footer.copyright']}
      </Typography>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer<ResponsiveLayoutProps>`
  padding: ${({ isMobile }) => (isMobile ? '50px' : '100px 134px')};
  display: flex;
  align-items: space-between;
  flex-direction: column;
  width: 100%;
  background: black;
  margin-top: auto;
`;

const FooterMain = styled.div<ResponsiveLayoutProps>`
  display: flex;
  justify-content: space-between;
  ${({ isMobile }) =>
    isMobile
      ? 'flex-direction: column; margin-bottom: 40px;'
      : 'flex-direction: row;'}
`;

const LogoContainer = styled.div<ResponsiveLayoutProps>`
  ${({ isMobile }) =>
    isMobile ? 'margin-bottom: 40px; text-align: center;' : ''}
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 300px;
`;

const LinkGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledLink = styled(Link)`
  margin-right: 30px;
`;

export default Footer;
