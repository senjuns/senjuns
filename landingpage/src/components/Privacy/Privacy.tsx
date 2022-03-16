import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ResponsiveLayoutProps } from '../../shared/types';

const Privacy: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <WhatAndWhoContainer isMobile={isMobile}>
      <Title isMobile={isMobile} variant="h5">
        Privacy
      </Title>
      <WhatWeDoTitle variant="h4">
        <i>senjun-teams</i>, Inc. Webpage Privacy Policy (www.senjuns.com)
      </WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        Effective Date: February 28, 2022
        <br />
        <br />
        <i>senjun-teams</i>, Inc. provides data analysis and automation
        solutions, including but not limited to sensors, actuators, and data
        processing tools, to help our customers improve farming efficiency.
        <br />
        <br />
        At <i>senjun-teams</i> one of our main priorities is the privacy of our
        visitors and customers. This Privacy Policy is designed to inform you
        about the type of information that we may gather or collect from you in
        connection with your use of our Services. It also explains the
        conditions under which we use and disclose that information, and your
        rights with respect to that information.
        <br />
        <br />
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to contact us.
      </WhatWeDoDescription>
      <WhatWeDoTitle variant="h4">
        Categories of Information and Specific Pieces of Personal Information We
        Collect
      </WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        We collect both Personal Information and Anonymous Information. We may
        combine Personal Information and Anonymous Information to create
        Aggregate Information. We collect the following categories of Personal
        Information:
        <ul>
          <ListItem>
            Registration information you provide when you create an account,
            such as first name, last name, email address, phone number, company,
            mailing address, and country.
          </ListItem>
          <ListItem>
            Information you provide when you contact us to ask a question
            regarding our Services, or that you may provide us as part of
            ongoing feedback and survey responses about the Services, or that
            you may provide when obtaining technical support.
          </ListItem>
          <ListItem>
            If you purchase products and services as part of our Services, you
            may provide us or our third-party payment processors with your
            credit card number or other billing information.
          </ListItem>
          <ListItem>
            Information you provide if you choose to participate in a
            sweepstakes or other promotion we offer.
          </ListItem>
          <ListItem>
            Usage, viewing and technical information, such as your IP Address,
            device identifier, operating system, browser type, the web pages or
            apps you review before or after reviewing our website, how much time
            you spend on each page, the frequency with which you visit various
            parts of our Services, when you visit our Services, or open emails
            we send.
          </ListItem>
        </ul>
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">
        Sources from Which Your Information is Collected
      </WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        <ul>
          <ListItem>
            We collect information you provide to us when you request or use our
            products and services, respond to surveys, or otherwise interact
            with us. For example, when you register, you will create a user
            account. Your account will contain personal information that you
            submit to us during the registration process, such as your name,
            email address, or other contact information. Please note: you may
            delete or modify personal information from your profile at any time
            via the tools available on our webpage; for any additional
            modification, please contact us as set forth in Section 10 below. A
            valid request to delete personal information will be accommodated
            within a reasonable time.
          </ListItem>
          <ListItem>
            We collect information via Cookies, such as the pages you visit each
            time you use our Site. Please note: if you do not wish to have
            cookies placed on your computer or mobile device, you should set
            your browser to refuse cookies before accessing our Site, with the
            understanding that certain features of the Site may not function
            properly without the aid of cookies. If you refuse cookies, you
            assume all responsibility for any resulting loss of functionality.
          </ListItem>
          <ListItem>
            We collect information via Web Beacons. We may place Web Beacons on
            Site pages or emails, and we collect information from them such as
            whether you have viewed a particular web page or email
            communication. Please note: you may not decline Web Beacons.
            However, they may be rendered ineffective by declining all cookies
            or modifying your browser setting to notify you each time a cookie
            is set, and permit you to accept or decline cookies on an individual
            basis.
          </ListItem>
          <ListItem>
            We collect information and use cookies from third-party partners
            such as Google (Analytics).
          </ListItem>
        </ul>
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">How We Use Your Information</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        We may use your information to:
        <ul>
          <ListItem>
            Provide you with the products and services you request.
          </ListItem>
          <ListItem>
            To identify you and associate you with the information you provide
            if you make a verifiable request that we disclose any personal
            information we previously collected about you.
          </ListItem>
          <ListItem>Personalize our products and services for you.</ListItem>
          <ListItem>
            Communicate with you about your account and send you information
            about our products and services or changes to our policies.
          </ListItem>
          <ListItem>
            Help us better understand how our Services are used so that we are
            able to improve your experiences, both in terms of content and ease
            of use. In particular, we use IP Addresses to analyze trends,
            administer the website, and gather information for aggregate use.
          </ListItem>
          <ListItem>
            We use cookies to analyze user activity in order to improve our
            website.
          </ListItem>
          <ListItem>
            Send you offers and promotions for our products or Services.
          </ListItem>
          <ListItem>
            Provide you with advertising based on your activity on our Services.
          </ListItem>
          <ListItem>
            Release anonymous information gathered from users in the aggregate,
            such as by publishing a report on trends in the usage of the
            Services.
          </ListItem>
          <ListItem>
            Detect, investigate and prevent activities that make us or others
            uncomfortable, may violate our policies, or may be illegal.
          </ListItem>
        </ul>
        By using our Services or providing personal information to us, you agree
        that we may communicate with you electronically regarding security,
        privacy, and administrative issues relating to your use of our Services.
        If we learn of a security system’s breach, we may attempt to notify you
        electronically by posting a notice on our Services, by mail or by
        sending an email to you.
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">International Data Transfers</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        When you submit personal information to us, you understand and agree
        that this information may be transferred across national boundaries, and
        it may be stored and processed in another country which may not provide
        privacy protections similar with those your country provides.
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">
        Sharing your Information with Others
      </WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        We do not share your personal information with other companies without
        your prior consent except in the following circumstances.
        <ul>
          <ListItem>
            <b>Service Providers.</b> We may share your personal information
            with our third-party vendors and service providers who use that
            information to help us provide our Services. This includes service
            providers that provide us with IT support, hosting, payment
            processing, customer service, and related services.
          </ListItem>
          <ListItem>
            <b>Business Partners.</b> We may share your personal information
            with business partners to provide you with a product or service you
            requested. We may also provide your personal information to business
            partners with whom we jointly offer products or services
          </ListItem>
          <ListItem>
            <b>APIs/SDKs.</b> We may use third-party Application Program
            Interfaces (“APIs”) and Software Development Kits (“SDKs”) as part
            of the functionality of our Services. For more information about our
            use of APIs and SDKs, please contact us as set forth below.
          </ListItem>
          <ListItem>
            <b>Disclosures to Protect Us or Others.</b> We may access, preserve,
            and disclose any information we store associated with you to
            external parties if we, in good faith, believe doing so is required
            or appropriate to: comply with law enforcement or national security
            requests and legal process, such as a court order or subpoena;
            protect your, our, or others’ rights, property, or safety; enforce
            our policies or contracts; collect amounts owed to us; or assist
            with an investigation or prosecution of suspected or actual illegal
            activity.
          </ListItem>
          <ListItem>
            <b>
              Disclosure in the Event of Merger, Sale, or Other Asset Transfers.
            </b>{' '}
            If we are involved in a merger, acquisition, financing due
            diligence, reorganization, bankruptcy, receivership, purchase or
            sale of assets, or transition of service to another provider, your
            information may be sold or transferred as part of such a
            transaction, as permitted by law and/or contract.
          </ListItem>
        </ul>
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">Data Security and Integrity</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        The security of your information is extremely important to us. We have
        put in place commercially reasonable physical, technical, and
        administrative security measures that are designed to safeguard and
        protect your information from unauthorized access. Please be aware,
        though, that despite our efforts, no security measures are impenetrable.
        To the fullest extent permitted by applicable law, we do not accept
        liability for unauthorized disclosure.
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">Online Tracking</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        We currently do not process or comply with any web browser’s “do not
        track” signal or other similar mechanism that indicates a request to
        disable online tracking of individual users who visit our Site or use
        our services.
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">Children’s Privacy</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        We do not knowingly collect personal information from users under 13
        years old. If you suspect that we have personal information from a
        Child, please contact us at the contact information provided in Section
        9 below. If we become aware that a child has provided us with personal
        information in violation of applicable law, we will delete any personal
        information we have collected, unless we have a legal obligation to keep
        it, and terminate the child’s account, as applicable.
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">Changes to this Privacy Policy</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        Because of changes in technology, industry practices, regulatory
        requirements and the growth and development of our business, or for
        other business reasons, we may need to modify this Privacy Policy from
        time to time. We will alert you by email if this policy is revised (if
        you have given us your email address), and we will post a copy of the
        new policy with its effective date on our Site. Where required by
        applicable law, we will obtain your consent to material changes to the
        Privacy Policy. It is therefore important that you register with the
        Site and notify us if you change your email address. If you do not
        provide us with a current email address, you should regularly review
        this Privacy Policy to ensure that you are informed of any changes.
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">Comments and Questions</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        If you have a comment or question about this Privacy Policy or would
        like to exercise your rights, please contact us at support@senjuns.com.
        <br />
        <br />
        Notice to California residents: If you are a California resident, you
        may have certain additional rights. California Civil Code Section
        1798.83 permits you to request information regarding the disclosure of
        our personal information by us to third parties for the third parties’
        direct marketing purposes. California Business and Professions Code
        Section 22581 permits registered users who are minors to request and
        obtain deletion of certain posted content.
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">
        Supplemental Notice for Nevada Residents
      </WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        If you are a resident of Nevada, you have the right to opt-out of the
        sale of certain Personal Information to third parties who intend to
        license or sell that Personal Information. You can exercise this right
        by contacting us at support@senjuns.com with the subject line “Nevada Do
        Not Sell Request” and providing us with your name and the email address
        associated with your account. Please note that we do not currently sell
        your Personal Information as sales are defined in Nevada Revised
        Statutes Chapter 603A.
      </WhatWeDoDescription>

      <WhatWeDoTitle variant="h2">Definitions</WhatWeDoTitle>
      <WhatWeDoDescription isMobile={isMobile} variant="body1">
        <ul>
          <ListItem>
            <b>Aggregate Information</b> means information about groups or
            categories of users that do not personally identify, and cannot
            reasonably be used to identify, an individual user
          </ListItem>
          <ListItem>
            <b>Anonymous Information</b> means information that does not
            directly or indirectly identify, and cannot reasonably be used to
            identify, an individual user.
          </ListItem>
          <ListItem>
            <b>Cookie</b> means a string of information that we store on your
            computer or other device, and your browser provides to us, each time
            you submit a query to the Site.
          </ListItem>
          <ListItem>
            <b>IP Address</b> means the address associated with the access point
            through which you enter the Internet. We do not control your IP
            address. It is typically controlled by your Internet Service
            Provider.
          </ListItem>
          <ListItem>
            <b>Our, Us, or We</b> means <i>senjun-teams</i>, Inc.
          </ListItem>
          <ListItem>
            <b>Personal Information</b> means information that identifies,
            relates to, describes, is capable of being associated with, or could
            reasonably be linked, directly or indirectly, with a particular
            individual. Personal information includes, but is not limited to the
            following: (1) a first and last name, (2) a home or other physical
            address, including street name and name of a city or town, (3) an
            e-mail address, (4) a telephone number, (5) a social security
            number, (6) any other identifier that permits the physical or online
            contacting of a specific individual, and (7) any information we
            maintain in personally identifiable form in combination with an
            identifier described above.
          </ListItem>
          <ListItem>
            <b>Site</b> means our website, located at www.senjuns.com .
          </ListItem>
          <ListItem>
            <b>Services</b> means our Site, as well as any processing activities
            we perform under our agreement with you, including collecting data
            from our physical cameras and processing said data on our cloud
            servers for you to use.
          </ListItem>
          <ListItem>
            <b>Web Beacon</b> means an object that is embedded in an email, web
            page.
          </ListItem>
          <ListItem>
            <b>You</b> means an individual who is of the age of majority in the
            state or country in which you reside.
          </ListItem>
        </ul>
      </WhatWeDoDescription>
    </WhatAndWhoContainer>
  );
};

const WhatAndWhoContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  max-width: 950px;
  ${({ isMobile }) => (isMobile ? 'padding: 20px 20px 0px;' : '')}
`;

const Title = styled(Typography)<ResponsiveLayoutProps>`
  font-size: 20px;
  align-self: center;
  margin-bottom: ${({ isMobile }) => (isMobile ? '30px' : '40px')};
`;

// const WhatAndWhoLabel = styled(Typography)<ResponsiveLayoutProps>`
//   align-self: center;
//   font-size: ${({ isMobile }) => (isMobile ? '36px' : '80px')};
//   margin-bottom: ${({ isMobile }) => (isMobile ? '30px' : '40px')};
// `;

// const GeneralDescription = styled(Typography)<ResponsiveLayoutProps>`
//   font-size: 20px;
//   display: block;
//   margin-bottom: ${({ isMobile }) => (isMobile ? '40px' : '60px')};
// `;

const WhatWeDoTitle = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const WhatWeDoDescription = styled(Typography)<ResponsiveLayoutProps>`
  font-size: 16px;
  margin-bottom: ${({ isMobile }) => (isMobile ? '40px' : '60px')};
`;

const ListItem = styled.li`
  margin-bottom: 15px;
`;

export default Privacy;
