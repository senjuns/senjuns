import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as core from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambdajs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cr from 'aws-cdk-lib/custom-resources';
import { AppSyncTransformer } from 'cdk-appsync-transformer';
import { MonitoringFacade } from 'cdk-monitoring-constructs';
import * as constructs from 'constructs';
import { StaticWebsite } from './construcs/static-website';

export interface DashboardStackProps extends core.StackProps {
  stage: string;

  userPoolId?: string;

  domainName: string;
}

export class DashboardStack extends core.Stack {
  constructor(
    scope: constructs.Construct,
    id: string,
    props: DashboardStackProps,
  ) {
    super(scope, id, props);

    let userPool;
    if (!props.userPoolId) {
      userPool = new cognito.UserPool(this, `${props.stage}DashboardUserPool`, {
        removalPolicy: core.RemovalPolicy.RETAIN,
        signInCaseSensitive: false,
        passwordPolicy: {
          minLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireDigits: true,
          requireSymbols: true,
        },
        selfSignUpEnabled: true,
        autoVerify: {
          email: true,
        },
        standardAttributes: {
          familyName: {
            mutable: true,
            required: true,
          },
          givenName: {
            mutable: true,
            required: true,
          },
          email: {
            mutable: true,
            required: true,
          },
          phoneNumber: {
            mutable: true,
            required: true,
          },
        },
        signInAliases: {
          username: true,
        },
      });
    } else {
      userPool = cognito.UserPool.fromUserPoolId(
        this,
        `${props.stage}DashboardUserPool`,
        props.userPoolId,
      );
    }

    new core.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    });

    const userPoolWebClient = new cognito.UserPoolClient(
      this,
      'userPoolWebClient',
      {
        userPool: userPool,
        generateSecret: false,
        preventUserExistenceErrors: true,
        oAuth: {
          flows: {
            authorizationCodeGrant: false,
            implicitCodeGrant: true,
          },
        },
      },
    );

    new core.CfnOutput(this, 'UserPoolWebClientId', {
      value: userPoolWebClient.userPoolClientId,
    });

    const identityPool = new cognito.CfnIdentityPool(
      this,
      'DashboardIdentityPool',
      {
        cognitoIdentityProviders: [
          {
            clientId: userPoolWebClient.userPoolClientId,
            providerName: `cognito-idp.${this.region}.amazonaws.com/${userPool.userPoolId}`,
          },
        ],
        allowUnauthenticatedIdentities: true,
      },
    );

    new core.CfnOutput(this, 'identityPoolId', {
      value: identityPool.ref,
    });

    const unauthenticatedRole = new iam.Role(this, 'unauthenticatedRole', {
      description: 'Unauthenticated role for users',
      assumedBy: new iam.FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          // eslint-disable-next-line quote-props
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'unauthenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity',
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
      ],
    });

    // const unAuthPrincipal = new iam.WebIdentityPrincipal(
    //   'cognito-identity.amazonaws.com',
    // ).withConditions({
    //   // eslint-disable-next-line quote-props
    //   StringEquals: {
    //     'cognito-identity.amazonaws.com:aud': `${identityPool.ref}`,
    //   },
    //   'ForAnyValue:StringLike': {
    //     'cognito-identity.amazonaws.com:amr': 'unauthenticated',
    //   },
    // });

    // const unauthRole = new iam.Role(this, 'demo-identity-unauth-role', {
    //   assumedBy: unAuthPrincipal,
    // });

    const authenticatedRole = new iam.Role(this, 'authenticatedRole', {
      description: 'Default role for authenticated users',
      assumedBy: new iam.FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          // eslint-disable-next-line quote-props
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity',
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
      ],
    });

    new core.CfnOutput(this, 'AuthenticatedRoleArn', {
      value: authenticatedRole.roleArn,
    });

    new cognito.CfnIdentityPoolRoleAttachment(this, 'identityRole', {
      identityPoolId: identityPool.ref,
      roles: {
        unauthenticated: unauthenticatedRole.roleArn,
        authenticated: authenticatedRole.roleArn,
      },
      roleMappings: {
        mapping: {
          type: 'Token',
          ambiguousRoleResolution: 'AuthenticatedRole',
          identityProvider: `cognito-idp.${
            core.Stack.of(this).region
          }.amazonaws.com/${userPool.userPoolId}:${
            userPoolWebClient.userPoolClientId
          }`,
        },
      },
    });

    // Configure the backup lambda.
    const userBackupBucket = new s3.Bucket(this, 'userBackupBucket');

    const backupLambda = new lambdajs.NodejsFunction(this, 'backupLambda', {
      environment: {
        BUCKET_NAME: userBackupBucket.bucketName,
        DASHBOARD_USERPOOL_ID: userPool.userPoolId,
      },
    });

    backupLambda.addToRolePolicy(
      new iam.PolicyStatement({
        resources: [
          userBackupBucket.bucketArn,
          userBackupBucket.bucketArn + '/*',
        ],
        actions: ['s3:PutObject', 's3:PutObjectTagging'],
      }),
    );

    backupLambda.addToRolePolicy(
      new iam.PolicyStatement({
        resources: [userPool.userPoolArn],
        actions: [
          'cognito-idp:ListUsers',
          'cognito-idp:ListGroups',
          'cognito-idp:ListUsersInGroup',
        ],
      }),
    );

    const userImportRole = new iam.Role(this, 'userImportRole', {
      assumedBy: new iam.ServicePrincipal('cognito-idp.amazonaws.com'),
    });

    userImportRole.addToPolicy(
      new iam.PolicyStatement({
        resources: [
          `arn:aws:logs:${this.region}:${this.account}:log-group:/aws/cognito/*`,
        ],
        actions: [
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:DescribeLogStreams',
          'logs:PutLogEvents',
        ],
      }),
    );

    new events.Rule(this, 'Rule', {
      description:
        'A schedule for the Lambda function that triggers Prowler in CodeBuild.',
      targets: [new targets.LambdaFunction(backupLambda)],
      schedule: events.Schedule.expression('cron(0 22 * * ? *)'), // every day at 10pm
    });

    const provider = new cr.Provider(this, 'provider', {
      onEventHandler: backupLambda,
      logRetention: logs.RetentionDays.THREE_DAYS,
      role: new iam.Role(this, 'role', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      }),
    });

    new core.CustomResource(this, 'customResource', {
      serviceToken: provider.serviceToken,
      properties: {
        UPDATE: Date.now(),
      },
    });

    const appSyncTransformer = new AppSyncTransformer(this, 'senjun-graphql', {
      schemaPath: 'schema.graphql',
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: userPool,
            defaultAction: appsync.UserPoolDefaultAction.ALLOW,
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.IAM,
          },
          // {
          //   authorizationType: appsync.AuthorizationType.API_KEY,
          //   apiKeyConfig: {
          //     expires: cdk.Expiration.after(cdk.Duration.days(365)),
          //   },
          // },
        ],
      },
    });
    appSyncTransformer;

    const monitoring = new MonitoringFacade(this, 'Monitoring', {});
    monitoring;

    monitoring.monitorAppSyncApi({
      api: appSyncTransformer.appsyncAPI,
      alarmFriendlyName: 'appsyncAlarm',
      add4XXErrorCountAlarm: { add4XXErrorCountAlarm: { maxErrorCount: 1 } },
      add4XXErrorRateAlarm: { add4XXErrorRateAlarm: { maxErrorRate: 1 } },
      add5XXFaultCountAlarm: { add5XXFaultCountAlarm: { maxErrorCount: 1 } },
      add5XXFaultRateAlarm: { add5XXFaultRateAlarm: { maxErrorRate: 1 } },
      addLatencyP50Alarm: {
        addLatencyP50Alarm: { maxLatency: core.Duration.seconds(1) },
      },
      // addLowTpsAlarm: { addLowTpsAlarm: { minTps: 1 } },
      addHighTpsAlarm: { addHighTpsAlarm: { maxTps: 1 } },
    });

    Object.entries(appSyncTransformer.tableMap).forEach((table) => {
      table[1].applyRemovalPolicy(core.RemovalPolicy.DESTROY);
      monitoring.monitorDynamoTable({
        table: table[1],
        alarmFriendlyName: `${table[1].tableName}Alarm`,
      });
    });
    const graphqlUrl = new ssm.StringParameter(this, 'GraphqlUrl', {
      parameterName: 'GraphqlUrl',
      stringValue: appSyncTransformer.appsyncAPI.graphqlUrl,
    });
    // const publicRole = new iam.Role(this, 'public-role', {
    //   assumedBy: new iam.WebIdentityPrincipal(
    //     'cognito-identity.amazonaws.com',
    //   ).withConditions({
    //     // eslint-disable-next-line quote-props
    //     StringEquals: {
    //       'cognito-identity.amazonaws.com:aud': `${identityPool.ref}`,
    //     },
    //     'ForAnyValue:StringLike': {
    //       'cognito-identity.amazonaws.com:amr': 'unauthenticated',
    //     },
    //   }),
    // });
    // publicRole;
    // appSyncTransformer.grantPublic(publicRole);

    // const nestedStack = new core.NestedStack(this, 'appsync-nested-stack');
    // const app = new appsync.GraphqlApi(nestedStack, 'api', { name: 'blub' });

    const dashboard = new StaticWebsite(this, 'dashboard', {
      build: '../dashboard/build',
      recordName: 'dashboard',
      domainName: props.domainName,
      runtimeOptions: {
        jsonPayload: {
          region: core.Stack.of(this).region,
          identityPoolId: identityPool.ref,
          userPoolId: userPool.userPoolId,
          userPoolWebClientId: userPoolWebClient.userPoolClientId,
          appSyncGraphqlEndpoint: graphqlUrl.stringValue,
        },
      },
    });

    new core.CfnOutput(this, 'BucketWebsiteUrl', {
      value: dashboard.bucketWebsiteUrl,
    });

    new core.CfnOutput(this, 'CustomDomainWebsiteUrl', {
      value: dashboard.recordDomainName,
    });

    new core.CfnOutput(this, 'WebsiteCloudfrontDomainName', {
      value: dashboard.distributionDomainName,
    });

    // Add allowed queries to the unauthorized identity pool role
    authenticatedRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['appsync:GraphQL'],
        resources: [
          // Queries
          `arn:aws:appsync:${this.region}:${this.account}:apis/${appSyncTransformer.appsyncAPI.apiId}/types/*`,
        ],
      }),
    );

    unauthenticatedRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['appsync:GraphQL'],
        resources: [
          // Queries
          `arn:aws:appsync:${this.region}:${this.account}:apis/${appSyncTransformer.appsyncAPI.apiId}/types/*`,
        ],
      }),
    );
  }
}
