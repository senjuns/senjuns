import { FC, FormEventHandler, useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Button, TextInput, Typography } from 'common';
import { ResponsiveLayoutProps } from 'shared/types';
import { useScreenSize } from 'hooks/useScreenSize';

const ContactUs: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [signUpChecked, setSignUpChecked] = useState(false);
  const { isMobile } = useScreenSize();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <ContactUsContainer isMobile={isMobile}>
      <Title isMobile={isMobile} variant="h5">
        CONTACT
      </Title>
      <LetsTalkLabel isMobile={isMobile} variant="h1">
        Let’s talk!
      </LetsTalkLabel>
      <GeneralDescription isMobile={isMobile} variant="body1">
        Reach out to us and we are happy to walk you through all the details of
        our system in our next conversation.
      </GeneralDescription>
      <ContactUsForm isMobile={isMobile} onSubmit={handleSubmit}>
        <TextInput label="Name" value={name} onChange={setName} />
        <TextInput label="Email" value={email} onChange={setEmail} />
        <TextInput
          label="Message"
          value={message}
          placeholder="Write your message..."
          onChange={setMessage}
        />
        <Checkbox
          label="Please sign me up for the newsletter"
          value={signUpChecked}
          onChange={setSignUpChecked}
        />
        <SubmitButton type="submit">
          <Typography color="white" variant="body1">
            SEND
          </Typography>
        </SubmitButton>
      </ContactUsForm>
    </ContactUsContainer>
  );
};

const ContactUsContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
  ${({ isMobile }) => (isMobile ? 'padding: 20px 20px 0px;' : '')}
`;

const Title = styled(Typography)<ResponsiveLayoutProps>`
  font-size: 20px;
  align-self: center;
  margin-bottom: ${({ isMobile }) => (isMobile ? '30px' : '40px')};
`;

const LetsTalkLabel = styled(Typography)<ResponsiveLayoutProps>`
  align-self: center;
  font-size: ${({ isMobile }) => (isMobile ? '36px' : '80px')};
  margin-bottom: ${({ isMobile }) => (isMobile ? '30px' : '40px')};
`;

const GeneralDescription = styled(Typography)<ResponsiveLayoutProps>`
  font-size: 20px;
  margin-bottom: ${({ isMobile }) => (isMobile ? '40px' : '60px')};
`;

const ContactUsForm = styled.form<ResponsiveLayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: ${({ isMobile }) => (isMobile ? '40px' : '60px')};
`;

const SubmitButton = styled(Button)`
  margin-top: 30px;
`;

export default ContactUs;
