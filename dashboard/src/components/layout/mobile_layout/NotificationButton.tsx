import React from 'react';
import styled from 'styled-components';
import notificationIcon from '../../../assets/svg/notification-button.svg';

interface NotificationButtonProps {}

const NotificationButton: React.FC<NotificationButtonProps> = () => {
  return (
    <Container>
      <img src={notificationIcon} />
      <NotificationNumber>{12}</NotificationNumber>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const NotificationNumber = styled.div`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  color: white;
  background-color: #e86339;
  border-radius: 10px;
  right: calc(-1rem + 3px);
  top: -3px;
  padding: 2px;
`;

export default NotificationButton;
