import { FC } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography } from 'common';
import { COLORS, FONTS, ROUTES } from 'shared/constants';
import { ReactComponent as Logo } from 'assets/svgs/logo.svg';
import { ResponsiveLayoutProps } from 'shared/types';
import { useScreenSize } from 'hooks/useScreenSize';

interface LinkGroupProps {
  title: string;
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
          <LinkGroup title="Company">
            <StyledLink text="About Us" to={ROUTES.ABOUT_US} />
            <StyledLink text="Careers" to={ROUTES.CAREERS} />
            <EmailLink href="mailto:contact@neatleaf.com">
              Email us at contact@neatleaf.com
            </EmailLink>
          </LinkGroup>
          <LinkGroup title="Legal">
            <StyledLink color="orange3" text="Privacy" to={ROUTES.PRIVACY} />
          </LinkGroup>
        </LinkContainer>
      </FooterMain>

      <Typography variant="body1" color="grey4">
        2022 Neatleaf.com. All rights reserved.
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

const EmailLink = styled.a`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-weight: 600;
  text-decoration: none;
  font-size: ${FONTS.body1.size}px;
  color: ${COLORS['white']};

  &:hover {
    color: ${COLORS['grey2']};
  }
`;

const StyledLink = styled(Link)`
  margin-right: 30px;
`;

export default Footer;
