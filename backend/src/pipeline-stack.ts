import * as cdk from 'aws-cdk-lib';
import * as notifications from 'aws-cdk-lib/aws-codestarnotifications';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { BotStack } from './bot-stack';
import { DashboardAppStack } from './dashboard-app-stack';
import { DashboardBackendStack } from './dashboard-backend-stack';
import { LandingPageStack } from './landingpage-stack';
// import { DashboardAppStack } from './dashboard-app-stack';
// import { DashboardBackendStack } from './dashboard-backend-stack';
// import { LandingPageStack } from './landingpage-stack';

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
          'cd backend && yarn buildReactApps',
          // 'cd dashboard && yarn build',
          // 'cd ../landingpage && yarn build',
          'cd ../backend && yarn synth',
          'mv cdk.out ../',
        ],
      }),
    });

    pipeline.addStage(
      new BackendStage(this, 'prod', {
        env: {
          account: '456906467194',
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
    // .
    // const targetTopic = sns.Topic.fromTopicArn(this, 'topic', slackNotificationTopicArn);
    const topic = new sns.Topic(this, 'topic');
    topic.addSubscription(
      new subscriptions.EmailSubscription('damadden88@googlemail.com'),
    );

    pipeline.buildPipeline();

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

    const { SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, WELCOME_CHANNEL_ID } =
      process.env;
    // if (!SLACK_SIGNING_SECRET || !SLACK_BOT_TOKEN || !WELCOME_CHANNEL_ID) {
    //   throw new Error('Some environment variables are empty or missing');
    // }

    new BotStack(this, 'BotStack', {
      slackSigningSecret: SLACK_SIGNING_SECRET ?? '',
      slackBotToken: SLACK_BOT_TOKEN ?? '0',
      welcomeChannelId: WELCOME_CHANNEL_ID ?? '',
    });

    // new LandingPageStack(app, 'prod-LandingPageStack', { env: devEnv });
    // new DashboardAppStack(app, 'prod-DashboardAppStack', { env: devEnv });
    // new DashboardBackendStack(app, 'prod-DashboardBackendStack', {
    //   env: devEnv,
    //   stage: 'prod',
    // });
  }
}

// class FrontendStage extends cdk.Stage {
//   constructor(scope: Construct, id: string, props?: cdk.StageProps) {
//     super(scope, id, props);

//     new LandingPageStack(this, 'LandingPageStack');
//     new DashboardAppStack(this, 'DashboardAppStack');
//   }
// }
