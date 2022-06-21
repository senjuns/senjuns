import 'dotenv/config';
import { App } from '@slack/bolt';
import { applyEvents } from './app-events';

const { SLACK_BOT_TOKEN, SLACK_APP_TOKEN, WELCOME_CHANNEL_ID } = process.env;
if (!SLACK_BOT_TOKEN || !SLACK_APP_TOKEN || !WELCOME_CHANNEL_ID) {
  throw new Error('Some environment variables are empty or missing');
}

const app = new App({
  token: SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
});

applyEvents(app, {
  welcomeChannel: WELCOME_CHANNEL_ID,
});

void (async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
