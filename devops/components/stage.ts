import 'source-map-support/register';
import * as core from '@aws-cdk/core';
import { CommonStack } from './common-stack';
import { DashboardBackendStack } from './dashboard-backend-stack';
import { SpyderStack } from './spyder-stack';

export interface StageStackProps extends core.StackProps {
  stage: string;
  enableLambdaAlarms?: boolean;
  userPoolId?: string;
}

export class Stage {

  /**
     * A stage which is a collection of stacks.
     *
     */
  constructor(scope: core.Construct, props: StageStackProps) {

    const commonStack = new CommonStack(scope, props.stage + '-CommonStack', { stage: props.stage, env: props.env });

    new DashboardBackendStack(scope, props.stage + '-DashboardBackendStack', {
      stage: props.stage,
      domainName: commonStack.domainName,
      zone: commonStack.zone,
      vpc: commonStack.vpc,
      env: props.env,
      userPoolId: props.userPoolId,
    });

    new SpyderStack(scope, props.stage + '-SpyderStack', {
      stage: props.stage,
      domainName: commonStack.domainName,
      zone: commonStack.zone,
      vpc: commonStack.vpc,
      env: props.env,
      enableAlarms: props.enableLambdaAlarms,
    });
  }
}