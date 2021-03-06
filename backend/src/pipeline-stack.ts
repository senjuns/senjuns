import * as cdk from 'aws-cdk-lib';
import * as notifications from 'aws-cdk-lib/aws-codestarnotifications';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { BotStack } from './bot-stack';
// import { CostAndUsageReportStack } from './cost-and-usage-report-stack';
// import { DashboardAppStack } from './dashboard-app-stack';
import { DashboardStack } from './dashboard-stack';
import { LandingPageStack } from './landingpage-stack';
// import { DashboardAppStack } from './dashboard-app-stack';
// import { DashboardBackendStack } from './dashboard-backend-stack';
// import { LandingPageStack } from './landingpage-stack';
export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      crossAccountKeys: true,
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

    // pipeline.addStage(
    //   new UtilStage(this, 'util', {
    //     env: {
    //       account: '240818873559',
    //       region: 'us-east-1',
    //     },
    //     stage: 'dev',
    //   }),
    // );

    pipeline.addStage(
      new BackendStage(this, 'dev', {
        env: {
          account: '240818873559',
          region: 'eu-central-1',
        },
        stage: 'dev',
      }),
    );

    pipeline.addStage(
      new BackendStage(this, 'prod', {
        env: {
          account: '768874568263',
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
      new subscriptions.EmailSubscription('martinmueller@senjuns.com'),
    );

    pipeline.buildPipeline();

    new notifications.NotificationRule(this, 'Notification', {
      detailType: notifications.DetailType.BASIC,
      events: [
        'codepipeline-pipeline-pipeline-execution-failed',
        // 'codepipeline-pipeline-action-execution-failed',
        // 'codepipeline-pipeline-stage-execution-failed',
        // 'codepipeline-pipeline-manual-approval-failed',
        // 'codepipeline-pipeline-manual-approval-needed',
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

    const domainName = `${
      props.stage === 'prod' ? '' : props.stage + '.'
    }senjuns.com`;

    new DashboardStack(this, 'DashboardStack', {
      stage: props.stage,
      domainName,
    });

    new LandingPageStack(this, 'LandingPageStack', { domainName });
    // new DashboardAppStack(this, 'DashboardAppStack', { domainName });
    // new CostAndUsageReportStack(this, 'CostAndUsageReportStack');

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

// class UtilStage extends cdk.Stage {
//   constructor(scope: Construct, id: string, props: BackendStageProps) {
//     super(scope, id, props);

//     new CostAndUsageReportStack(this, 'CostAndUsageReportStack');
//   }
// }

// class FrontendStage extends cdk.Stage {
//   constructor(scope: Construct, id: string, props?: cdk.StageProps) {
//     super(scope, id, props);

//     new LandingPageStack(this, 'LandingPageStack');
//     new DashboardAppStack(this, 'DashboardAppStack');
//   }
// }
