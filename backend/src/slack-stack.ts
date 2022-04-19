import * as core from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { SlackApp, SlackAppManifestDefinition } from './construcs/slack-app';

export class SlackStack extends core.Stack {
  constructor(scope: Construct, id: string, props: core.StackProps = {}) {
    super(scope, id, props);

    new secretsmanager.Secret(this, 'slackSecret', {
      secretName: 'slack-app-config-token',
    });

    new SlackApp(this, 'senjunsSlackApp', {
      configurationTokenSecret: secretsmanager.Secret.fromSecretNameV2(
        this,
        'Secret',
        'slack-app-config-token',
      ),
      manifest: SlackAppManifestDefinition.fromManifest({
        name: 'Senjuns',
        description: 'A very cool Slack App deployed with CDK for Senjuns.com',
        // interactivity: {
        //   requestUrl: myApi.url, // reference other construct's properties
        // },
      }),
    });
  }
}
