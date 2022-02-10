import { FC } from 'react';
import styled from 'styled-components';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import ContactUsMain from 'components/ContactUs/ContactUs';
import { ResponsiveLayoutProps } from 'shared/types';
import { useScreenSize } from 'hooks/useScreenSize';

const ContactUs: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <ContactUsContainer>
      <Header color="black" />
      <ContactUsWrapper isMobile={isMobile}>
        <ContactUsMain />
      </ContactUsWrapper>
      <Footer />
    </ContactUsContainer>
  );
};

const ContactUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContactUsWrapper = styled.div<ResponsiveLayoutProps>`
  padding: ${({ isMobile }) =>
    isMobile ? '120px 0px 60px' : '190px 0px 100px'};

  display: flex;
  justify-content: center;
`;

export default ContactUs;
