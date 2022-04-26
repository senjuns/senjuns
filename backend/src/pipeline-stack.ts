import * as cdk from 'aws-cdk-lib';
import * as notifications from 'aws-cdk-lib/aws-codestarnotifications';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
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
        input: pipelines.CodePipelineSource.gitHub('senjuns/senjuns', 'main', {
          authentication: cdk.SecretValue.secretsManager(
            'pipelines/token/mmuller88',
          ),
        }),
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
      new BackendStage(this, 'prod', {
        env: {
          account: '981237193288',
          region: 'eu-central-1',
        },
        stage: 'prod',
      }),
    );

    // pipeline.addStage(
    //   new FrontendStage(this, 'prod-FrontendStage', {
    //     env: {
    //       account: '981237193288',
    //       region: 'eu-central-1',
    //     },
    //   }),
    // );
    //
    // const targetTopic = sns.Topic.fromTopicArn(this, 'topic', slackNotificationTopicArn);
    const topic = new sns.Topic(this, 'topic');
    topic.addSubscription(
      new subscriptions.EmailSubscription('damadden88@googlemail.com'),
    );

    new notifications.NotificationRule(this, 'Notification', {
      detailType: notifications.DetailType.BASIC,
      events: [
        'codepipeline-pipeline-pipeline-execution-failed',
        'codepipeline-pipeline-action-execution-failed',
        'codepipeline-pipeline-stage-execution-failed',
        'codepipeline-pipeline-manual-approval-failed',
        'codepipeline-pipeline-manual-approval-needed',
      ],
      source: pipeline.pipeline,
      targets: [topic],
    });
  }
}

interface BackendStageProps extends cdk.StageProps {
  stage: 'prod' | 'dev';
}

class BackendStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: BackendStageProps) {
    super(scope, id, props);

    new DashboardBackendStack(this, 'DashboardBackendStack', {
      stage: props.stage,
    });
    new LandingPageStack(this, 'LandingPageStack');
    new DashboardAppStack(this, 'DashboardAppStack');
  }
}

// class FrontendStage extends cdk.Stage {
//   constructor(scope: Construct, id: string, props?: cdk.StageProps) {
//     super(scope, id, props);

//     new LandingPageStack(this, 'LandingPageStack');
//     new DashboardAppStack(this, 'DashboardAppStack');
//   }
// }
