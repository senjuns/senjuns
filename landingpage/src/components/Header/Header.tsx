import { FC } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { Link } from 'common';
import { ROUTES } from 'shared/constants';
import { ReactComponent as Logo } from 'assets/svgs/logo.svg';
import { ResponsiveLayoutProps } from 'shared/types';
import { useScreenSize } from 'hooks/useScreenSize';

interface HeaderProps {
  color: 'black' | 'white';
}

const Header: FC<HeaderProps> = ({ color }) => {
  const { isMobile } = useScreenSize();

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
            {/* <StyledLink
              color={color}
              text="Contact Us"
              to={ROUTES.CONTACT_US}
            /> */}
          </>
        )}
      </LinkContainer>

      {/* {!isMobile && (
        <ButtonContainer>
          <StyledLink
            color="white"
            text="LEARN MORE"
            to={ROUTES.CONTACT_US}
            variant="contained"
          />
        </ButtonContainer>
      )} */}
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
