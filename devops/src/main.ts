import * as cdk from '@aws-cdk/core';
import { Stage } from '../components/stage';

const app = new cdk.App();

const devEnv = require('./../dev/package.json').env;
new Stage(app, { stage: 'dev', env: devEnv, userPoolId: 'us-west-2_3zgoEdJ3Z' });

const devStableEnv = require('./../devstable/package.json').env;
new Stage(app, { stage: 'devstable', env: devStableEnv, userPoolId: 'us-west-2_NZ0M4wxln' });

const sqaEnv = require('./../sqa/package.json').env;
new Stage(app, { stage: 'sqa', env: sqaEnv, userPoolId: 'us-west-2_VZb8exfdA' });

const stagingEnv = require('./../staging/package.json').env;
new Stage(app, { stage: 'staging', env: stagingEnv, userPoolId: 'us-west-2_AvvoSs7CC' });

const prodEnv = require('./../prod/package.json').env;
new Stage(app, { stage: 'prod', env: prodEnv, enableLambdaAlarms: true, userPoolId: 'us-west-2_Afxq4vqCV' });