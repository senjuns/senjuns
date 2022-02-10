import { FC } from 'react';
import styled from 'styled-components';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import JoinTeam from 'components/Careers/JoinTeam';
import { ResponsiveLayoutProps } from 'shared/types';
import { useScreenSize } from 'hooks/useScreenSize';

const Careers: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <CareerContainer>
      <Header color="black" />
      <JoinTeamWrapper isMobile={isMobile}>
        <JoinTeam />
      </JoinTeamWrapper>
      <Footer />
    </CareerContainer>
  );
};

const CareerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const JoinTeamWrapper = styled.div<ResponsiveLayoutProps>`
  padding: ${({ isMobile }) =>
    isMobile ? '120px 0px 60px' : '190px 0px 100px'};
  display: flex;
  justify-content: center;
`;

export default Careers;
