import * as core from 'aws-cdk-lib';
import { SlackBotStack } from './bot-stack';
// import { DashboardAppStack } from './dashboard-app-stack';
// import { DashboardBackendStack } from './dashboard-backend-stack';
// import { LandingPageStack } from './landingpage-stack';
import { PipelineStack } from './pipeline-stack';
import { SlackStack } from './slack-stack';

const devEnv = {
  account: '981237193288',
  region: 'eu-central-1',
};

const app = new core.App();

new PipelineStack(app, 'senjuns-pipeline', { env: devEnv });
new SlackStack(app, 'senjuns-slack-stack');

const { SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, WELCOME_CHANNEL_ID } =
  process.env;
// if (!SLACK_SIGNING_SECRET || !SLACK_BOT_TOKEN || !WELCOME_CHANNEL_ID) {
//   throw new Error("Some environment variables are empty or missing");
// }
new SlackBotStack(app, 'SlackBotStack', {
  env: devEnv,
  slackSigningSecret: SLACK_SIGNING_SECRET ?? '',
  slackBotToken: SLACK_BOT_TOKEN ?? '',
  welcomeChannelId: WELCOME_CHANNEL_ID ?? '',
});

// new LandingPageStack(app, 'prod-LandingPageStack', { env: devEnv });
// new DashboardAppStack(app, 'prod-DashboardAppStack', { env: devEnv });
// new DashboardBackendStack(app, 'prod-DashboardBackendStack', {
//   env: devEnv,
//   stage: 'prod',
// });

app.synth();
