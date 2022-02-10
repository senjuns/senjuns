import * as cdk from '@aws-cdk/core';
import { DashboardAppStack } from '../components/dashboard-app-stack';

const app = new cdk.App();

for (const stage of ['dev', 'devstable', 'sqa', 'staging', 'prod']) {
  const env = require(`./../${stage}/package.json`).env;
  new DashboardAppStack(app, `${stage}-DashboardAppStack`, {
    stage,
    env,
  });
}