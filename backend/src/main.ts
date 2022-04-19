import * as core from 'aws-cdk-lib';
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

// new LandingPageStack(app, 'prod-LandingPageStack', { env: devEnv });
// new DashboardAppStack(app, 'prod-DashboardAppStack', { env: devEnv });
// new DashboardBackendStack(app, 'prod-DashboardBackendStack', {
//   env: devEnv,
//   stage: 'prod',
// });

app.synth();
