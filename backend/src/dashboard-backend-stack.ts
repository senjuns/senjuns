import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as core from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambdajs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cr from 'aws-cdk-lib/custom-resources';
// import { StaticWebsite } from './construcs/static-website';
import { AppSyncTransformer } from 'cdk-appsync-transformer';
import * as constructs from 'constructs';

export interface DashboardBackendStackProps extends core.StackProps {
  stage: string;

  userPoolId?: string;

  domainName?: string;
}

export class DashboardBackendStack extends core.Stack {
  constructor(
    scope: constructs.Construct,
    id: string,
    props: DashboardBackendStackProps,
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

    // const dashboard = new StaticWebsite(this, 'dashboard', {
    //   build: '../dashboard/build',
    //   recordName: 'dashboard',
    //   domainName: props.domainName,
    //   runtimeOptions: {
    //     jsonPayload: {
    //       region: core.Stack.of(this).region,
    //       identityPoolId: identityPool.ref,
    //       userPoolId: userPool.userPoolId,
    //       userPoolWebClientId: userPoolWebClient.userPoolClientId,
    //     },
    //   },
    // });

    // new core.CfnOutput(this, 'BucketWebsiteUrl', {
    //   value: dashboard.bucketWebsiteUrl,
    // });

    // new core.CfnOutput(this, 'CustomDomainWebsiteUrl', {
    //   value: dashboard.recordDomainName,
    // });

    // new core.CfnOutput(this, 'WebsiteCloudfrontDomainName', {
    //   value: dashboard.distributionDomainName,
    // });

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

    const infoLambda = new lambdajs.NodejsFunction(this, 'info', {
      environment: {
        login_client_id: userPoolWebClient.userPoolClientId,
        cognito_user_pool: userPool.userPoolId,
        cognito_pool_address: `cognito-idp.${this.region}.amazonaws.com/${userPool.userPoolId}`,
        identity_pool_id: identityPool.ref,
        aws_appsync_graphqlEndpoint: appSyncTransformer.appsyncAPI.graphqlUrl,
      },
    });
    infoLambda;

    const domainName = `${
      props.stage === 'prod' ? '' : props.stage + '.'
    }senjuns.com`;
    const infoSubDomain = 'dashboard-info';
    const infoDomain = `${infoSubDomain}.${domainName}`;

    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName });

    const infoCertificate = new certificatemanager.DnsValidatedCertificate(
      this,
      'infoCertificate',
      {
        domainName: infoDomain,
        hostedZone: zone,
      },
    );
    infoCertificate;

    const infoApi = new apigateway.LambdaRestApi(this, 'infoApi', {
      handler: infoLambda,
      proxy: true,
      domainName: {
        domainName: infoDomain,
        certificate: infoCertificate,
      },
    });

    const infoRecord = new route53.ARecord(this, 'infoRecord', {
      recordName: infoSubDomain,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.ApiGateway(infoApi),
      ),
      zone: zone,
    });

    new core.CfnOutput(this, 'InfoUrl', {
      value: infoRecord.domainName,
    });
  }
}
