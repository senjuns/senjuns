import React from 'react';
import styled from 'styled-components';
import { SIDEBAR_WIDTH } from '../../../components/layout/desktop_layout/constants';

const SideBar: React.FC = () => {
  return <StyledSideBar></StyledSideBar>;
};

export default SideBar;

const StyledSideBar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${SIDEBAR_WIDTH}px;
  padding-bottom: 64px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
