import * as core from 'aws-cdk-lib';
import { PipelineStack } from './pipeline-stack';
import { SlackStack } from './slack-stack';

const devEnv = {
  account: '456906467194',
  region: 'eu-central-1',
};

const app = new core.App();

new PipelineStack(app, 'senjuns-pipeline', { env: devEnv });
new SlackStack(app, 'senjuns-slack-stack');

app.synth();
