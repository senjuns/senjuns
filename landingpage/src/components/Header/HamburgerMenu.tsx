import { FC, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../../assets/svgs/close.svg';
import { ReactComponent as HamburgerIcon } from '../../assets/svgs/hamburger.svg';
import { Link } from '../../common';
import { ROUTES } from '../../shared/constants';

interface HamburgerMenuProps {
  color: 'black' | 'white';
  current: string;
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ color, current }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    {
      text: 'HOME',
      to: ROUTES.LANDING,
    },
    {
      text: 'ABOUT US',
      to: ROUTES.ABOUT_US,
    },
    {
      text: 'CAREERS',
      to: ROUTES.CAREERS,
    },
    {
      text: 'CONTACT US',
      to: ROUTES.CONTACT_US,
    },
  ];

  if (!isOpen) {
    return (
      <IconButton role="button" onClick={handleOpenMenu}>
        <HamburgerIcon color={color} />
      </IconButton>
    );
  }

  return (
    <MenuContainer>
      <IconButton role="button" onClick={handleCloseMenu}>
        <CloseIcon color={color} />
      </IconButton>

      <Menu color={color} onClick={handleCloseMenu}>
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem.to}>
            <MenuLink
              color={current === menuItem.to ? 'orange3' : color}
              text={menuItem.text}
              to={menuItem.to}
            />
          </MenuItem>
        ))}
      </Menu>
    </MenuContainer>
  );
};

export default HamburgerMenu;

const MenuContainer = styled.div`
  position: relative;
`;

const IconButton = styled.div`
  background: transparent;
  cursor: pointer;
`;

interface MenuProps {
  color: 'black' | 'white';
}

const Menu = styled.ul<MenuProps>`
  position: absolute;
  right: -20px;
  width: 100vw;
  background: ${({ color }) => (color === 'black' ? 'white' : 'black')};
  margin: 0;
  list-style: none;
  padding: 40px;
  height: 100vh;
`;

const MenuItem = styled.li`
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
`;

const MenuLink = styled(Link)`
  font-size: 30px;
  font-weight: bold;
`;
