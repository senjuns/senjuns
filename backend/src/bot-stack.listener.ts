import { App, AwsLambdaReceiver } from '@slack/bolt';
import { applyEvents } from './app-events';

const { SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, WELCOME_CHANNEL_ID } =
  process.env;
if (!SLACK_SIGNING_SECRET || !SLACK_BOT_TOKEN || !WELCOME_CHANNEL_ID) {
  throw new Error('Some environment variables are empty or missing');
}

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: SLACK_SIGNING_SECRET,
});

const app = new App({
  token: SLACK_BOT_TOKEN,
  // signingSecret: SLACK_SIGNING_SECRET,
  receiver: awsLambdaReceiver,
});

applyEvents(app, {
  welcomeChannel: WELCOME_CHANNEL_ID,
});

export async function handler(event: any, context: any, callback: any) {
  const lambdaHandler = await awsLambdaReceiver.start();
  return lambdaHandler(event, context, callback);
}
