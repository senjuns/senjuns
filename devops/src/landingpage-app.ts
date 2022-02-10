import * as cdk from '@aws-cdk/core';
import { LandingPageAppStack } from '../components/landingpage-app-stack';

const app = new cdk.App();

for (const stage of ['dev', 'prod']) {
  const env = require(`./../${stage}/package.json`).env;
  new LandingPageAppStack(app, `${stage}-LandingPageAppStack`, {
    stage,
    env,
  });
}