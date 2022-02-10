import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const NOT_SET = "NOT_SET"
const SES_EMAIL_TO = process.env.SES_EMAIL_TO || NOT_SET;
const SES_EMAIL_FROM = process.env.SES_EMAIL_FROM || NOT_SET;
const SES_REGION = process.env.SES_REGION || NOT_SET;


if (SES_EMAIL_TO === NOT_SET) {
  throw new Error(
    'Please set SES_EMAIL_TO in landingpage-app-stack.ts',
  );
}
if (SES_EMAIL_FROM === NOT_SET) {
  throw new Error(
    'Please set SES_EMAIL_FROM in landingpage-app-stack.ts',
  );
}
if (SES_REGION === NOT_SET) {
  throw new Error(
    'Please set SES_REGION in landingpage-app-stack.ts',
  );
}

export type ContactDetails = {
  name: string;
  email: string;
  message: string;
};

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    if (!event.body)
      throw new Error('Properties name, email and message are required.');

    const { name, email, message } = JSON.parse(event.body) as ContactDetails;
    if (!name || !email || !message)
      throw new Error('Properties name, email and message are required');

    return await sendEmail({ name, email, message });
  } catch (error: unknown) {
    console.log('ERROR is: ', error);
    if (error instanceof Error) {
      return { body: JSON.stringify({ error: error.message }), statusCode: 400 };
    }
    return {
      body: JSON.stringify({ error: error }),
      statusCode: 400,
    };
  }
}

async function sendEmail({
  name,
  email,
  message,
}: ContactDetails): Promise<APIGatewayProxyResult> {
  const ses = new AWS.SES({ region: SES_REGION });
  await ses.sendEmail(sendEmailParams({ name, email, message })).promise();

  return {
    body: JSON.stringify({ message: 'Email sent successfully 🎉🎉🎉' }),
    statusCode: 200,
  };
}

function sendEmailParams({ name, email, message }: ContactDetails) {
  return {
    Destination: {
      ToAddresses: [SES_EMAIL_TO],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: getHtmlContent({ name, email, message }),
        },
        Text: {
          Charset: 'UTF-8',
          Data: getTextContent({ name, email, message }),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Email from example ses app.`,
      },
    },
    Source: SES_EMAIL_FROM,
  };
}

function getHtmlContent({ name, email, message }: ContactDetails) {
  return `
    <html>
      <body>
        <h1>Received an Email. 📬</h1>
        <h2>Sent from: </h2>
        <ul>
          <li style="font-size:18px">👤 <b>${name}</b></li>
          <li style="font-size:18px">✉️ <b>${email}</b></li>
        </ul>
        <p style="font-size:18px">${message}</p>
      </body>
    </html> 
  `;
}

function getTextContent({ name, email, message }: ContactDetails) {
  return `
    Received an Email. 📬
    Sent from:
        👤 ${name}
        ✉️ ${email}
    ${message}
  `;
}