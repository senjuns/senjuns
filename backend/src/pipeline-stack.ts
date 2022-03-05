import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { DashboardAppStack } from './dashboard-app-stack';
import { DashboardBackendStack } from './dashboard-backend-stack';
import { LandingPageStack } from './landingpage-stack';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub(
          'senjun-teams/senjun-teams',
          'main',
          {
            authentication: cdk.SecretValue.secretsManager(
              'pipelines/token/mmuller88',
            ),
          },
        ),
        commands: [
          'yarn install && npx projen',
          'cd dashboard && yarn build',
          'cd ../landingpage && yarn build',
          'cd ../backend && yarn synth',
          'mv cdk.out ../',
        ],
      }),
    });

    pipeline.addStage(
      new BackendStage(this, 'backendStage', {
        env: {
          account: '981237193288',
          region: 'eu-central-1',
        },
      }),
      {
        post: [
          new pipelines.ShellStep('Update Amplify config', {
            commands: [
              'export STAGE=prod',
              'chmod +x ./dashboard/scripts/create_config.sh && ./dashboard/scripts/create_config.sh',
            ],
          }),
        ],
      },
    );

    pipeline.addStage(
      new FrontendStage(this, 'FrontendStage', {
        env: {
          account: '981237193288',
          region: 'eu-central-1',
        },
      }),
    );
  }
}

class BackendStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new DashboardBackendStack(this, 'DashboardBackendStack', {
      stage: 'prod',
    });
  }
}

class FrontendStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new LandingPageStack(this, 'LandingPageStack');
    new DashboardAppStack(this, 'DashboardAppStack');
  }
}
