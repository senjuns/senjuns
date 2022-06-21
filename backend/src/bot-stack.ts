import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface BotStackProps extends StackProps {
  slackSigningSecret: string;
  slackBotToken: string;
  welcomeChannelId: string;
}

export class BotStack extends Stack {
  constructor(scope: Construct, id: string, props: BotStackProps) {
    super(scope, id, props);

    const listener = new lambdaNodejs.NodejsFunction(this, 'listener', {
      runtime: lambda.Runtime.NODEJS_16_X,
      architecture: lambda.Architecture.ARM_64,
      environment: {
        SLACK_SIGNING_SECRET: props.slackSigningSecret,
        SLACK_BOT_TOKEN: props.slackBotToken,
        WELCOME_CHANNEL_ID: props.welcomeChannelId,
      },
    });

    const listenerUrl = listener.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, 'FunctionUrl', {
      value: listenerUrl.url,
    });
  }
}
