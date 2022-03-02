import { FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Logo } from '../../assets/svgs/logo.svg';
import { Link } from '../../common';
import HamburgerMenu from '../../components/Header/HamburgerMenu';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ROUTES } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';

interface HeaderProps {
  color: 'black' | 'white';
}

const Header: FC<HeaderProps> = ({ color }) => {
  const { isMobile } = useScreenSize();
  const location = useLocation();

  return (
    <HeaderContainer isMobile={isMobile}>
      <LinkContainer>
        <RouterLink to={ROUTES.LANDING}>
          <StyledLogo color={color} />
        </RouterLink>
        {!isMobile && (
          <>
            <StyledLink color={color} text="About Us" to={ROUTES.ABOUT_US} />
            <StyledLink color={color} text="Careers" to={ROUTES.CAREERS} />
            <StyledLink
              color={color}
              text="Contact Us"
              to={ROUTES.CONTACT_US}
            />
          </>
        )}
      </LinkContainer>

      {isMobile && <HamburgerMenu color={color} current={location.pathname} />}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header<ResponsiveLayoutProps>`
  padding: ${({ isMobile }) => (isMobile ? `50px 20px 20px` : `40px 120px`)};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledLogo = styled(Logo)`
  margin-right: 100px;
`;

const StyledLink = styled(Link)`
  margin-right: 30px;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

// const ButtonContainer = styled.div`
//   display: flex;
//   gap: ${SIZES.xSmall}px;
// `;

export default Header;
