// ~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

/**
 * Props for ProviderFunction
 */
export interface ProviderFunctionProps extends lambda.FunctionOptions {
}

/**
 * An AWS Lambda function which executes src/construcs/slack-app/provider.
 */
export class ProviderFunction extends lambda.Function {
  constructor(scope: Construct, id: string, props?: ProviderFunctionProps) {
    super(scope, id, {
      description: 'src/construcs/slack-app/provider.lambda.ts',
      ...props,
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../assets/construcs/slack-app/provider.lambda')),
    });
    this.addEnvironment('AWS_NODEJS_CONNECTION_REUSE_ENABLED', '1', { removeInEdge: true });
  }
}