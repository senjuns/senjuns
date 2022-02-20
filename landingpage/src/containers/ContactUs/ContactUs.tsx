import axios from 'axios';
import { FC, useState } from 'react';
import styled from 'styled-components';

import ContactUsMain from '../../components/ContactUs/ContactUs';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import config from '../../config';
import { useScreenSize } from '../../hooks/useScreenSize';
import { TContactUsForm, ResponsiveLayoutProps } from '../../shared/types';

const ContactUs: FC = () => {
  const { isMobile } = useScreenSize();
  const [isMessageSentSuccess, setIsMessageSentSuccess] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const handleSubmit = async (form: TContactUsForm) => {
    try {
      setIsMessageSent(true);
      await axios.post(config.MAIL_SUBMIT_API, form, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      setIsMessageSentSuccess(true);
    } catch (error) {
      console.error(error);
      setIsMessageSentSuccess(false);
    }
  };
  const successComponent = (
    <div>Your submission has been received! Thank you for contacting us.</div>
  );
  const failComponent = (
    <div>
      Your submission has been not been delivered, please try again later.
    </div>
  );
  return (
    <ContactUsContainer>
      <Header color="black" />
      <ContactUsWrapper isMobile={isMobile}>
        {!isMessageSent && <ContactUsMain onSubmit={handleSubmit} />}
        {isMessageSent && isMessageSentSuccess && successComponent}
        {isMessageSent && !isMessageSentSuccess && failComponent}
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
