import React from 'react';
import styled from 'styled-components';

interface SideBarMenuItemProps {
  /**
   * Menu icon
   */
  icon: JSX.Element;
  /**
   * Menu title
   */
  title: string;
  /**
   * Callback function triggered when clicking menu item
   */
  onClick: () => void;
}

/**
 * Represents menu item on side bar.
 *
 * @param {SideBarMenuItemProps} props icon, title, onClick
 * @returns {JSX.Element} SideBarMenuItem component
 */
const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({
  icon,
  title,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      {icon}
      <p>{title}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: Poppins;
  font-weight: 500;
  font-size: 14px;
  height: 50px;
`;

export default SideBarMenuItem;
