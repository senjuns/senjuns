import * as core from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { ApplicationLoadBalancedEc2Service } from '@aws-cdk/aws-ecs-patterns';
import * as ecs from '@aws-cdk/aws-ecs';
import { Credentials, DatabaseInstance, DatabaseInstanceEngine, DatabaseSecret, PostgresEngineVersion } from '@aws-cdk/aws-rds';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';
import * as cognito from '@aws-cdk/aws-cognito';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import * as sns from '@aws-cdk/aws-sns';
import * as actions from '@aws-cdk/aws-cloudwatch-actions';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import * as cr from '@aws-cdk/custom-resources';
import * as logs from '@aws-cdk/aws-logs';
import * as s3 from '@aws-cdk/aws-s3';
import * as apigateway from '@aws-cdk/aws-apigateway';

export interface DashboardBackendStackProps extends core.StackProps {
  stage: string;

  /**
   * VPC where the cluster will be deployed into
   */
  vpc: ec2.Vpc,

  userPoolId?: string;

  /**
   * If you want to use an RDS rather than providing an external DB
   */
  useRdsDb?: boolean,

  domainName: string;

  zone: route53.IHostedZone;

}

/**
 * Hasura Stack for using ECS to run Hasura as a Container in Ec2.
 */
export class DashboardBackendStack extends core.Stack {
  /**
   * Creates a new Hasura Stack.
   *
   * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
   * @param id The construct ID of this stack.
   * @param props Stack properties including specific Hasura properties.
   */
  constructor(scope: core.Construct, id: string, props: DashboardBackendStackProps) {
    super(scope, id, props);

    const claimsLambda = new lambda.Function(this, 'claimsLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
      exports.handler = (event, context, callback) => {
        event.response = {
            "claimsOverrideDetails": {
                "claimsToAddOrOverride": {
                    "https://hasura.io/jwt/claims": JSON.stringify({
                        "x-hasura-user-id": event.request.userAttributes.sub,
                        "x-hasura-default-role": "admin",
                        // do some custom logic to decide allowed roles
                        "x-hasura-allowed-roles": ["admin"],
                    })
                }
            }
        }
        callback(null, event)
      }`)
    });

    let userPool = cognito.UserPool.fromUserPoolId(this, `${props.stage}DashboardUserPool`, props.userPoolId || '');
    if (!props.userPoolId) {
      userPool = new cognito.UserPool(this, `${props.stage}DashboardUserPool`, {
        customAttributes: {
          organization_id: new cognito.NumberAttribute({ min: 0, max: 2000000000 }),
        },
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
        lambdaTriggers: {
          preTokenGeneration: claimsLambda,
        },
      });
    } else {
      new cr.AwsCustomResource(this, "UpdateUserPool", {
        resourceType: "Custom::UpdateUserPool",
        onCreate: {
          region: this.region,
          service: "CognitoIdentityServiceProvider",
          action: "updateUserPool",
          parameters: {
            UserPoolId: userPool.userPoolId,
            LambdaConfig: {
              PreTokenGeneration: claimsLambda.functionArn,
            },
          },
          physicalResourceId: cr.PhysicalResourceId.of(userPool.userPoolId),
        },
        policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE }),
      });

      const invokeCognitoTriggerPermission = {
        principal: new iam.ServicePrincipal('cognito-idp.amazonaws.com'),
        sourceArn: userPool.userPoolArn
      }
      claimsLambda.addPermission('InvokePreTokenGenerationHandlerPermission', invokeCognitoTriggerPermission)
    }

    new core.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    });

    const userPoolWebClient = new cognito.UserPoolClient(this, 'userPoolWebClient', {
      userPool: userPool,
      generateSecret: false,
      preventUserExistenceErrors: true,
      oAuth: {
        flows: {
          authorizationCodeGrant: false,
          implicitCodeGrant: true,
        },
      }
    });

    new core.CfnOutput(this, 'UserPoolWebClientId', {
      value: userPoolWebClient.userPoolClientId,
    });

    const identityPool = new cognito.CfnIdentityPool(this, 'DashboardIdentityPool', {
      cognitoIdentityProviders: [
        {
          clientId: userPoolWebClient.userPoolClientId,
          providerName: `cognito-idp.${this.region}.amazonaws.com/${userPool.userPoolId}`,
        },
      ],
      allowUnauthenticatedIdentities: true,
    });

    new core.CfnOutput(this, 'identityPoolId', {
      value: identityPool.ref,
    });

    const unauthenticatedRole = new iam.Role(this, 'unauthenticatedRole', {
      description: 'Unauthenticated role for users',
      assumedBy: new iam.FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
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

    const authenticatedRole = new iam.Role(this, 'authenticatedRole', {
      description: 'Default role for authenticated users',
      assumedBy: new iam.FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          'StringEquals': {
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
          identityProvider: `cognito-idp.${core.Stack.of(this).region}.amazonaws.com/${userPool.userPoolId}:${userPoolWebClient.userPoolClientId}`,
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
        actions: [
          "s3:PutObject",
          "s3:PutObjectTagging"
        ]
      })
    );

    backupLambda.addToRolePolicy(
      new iam.PolicyStatement({
        resources: [
          userPool.userPoolArn,
        ],
        actions: [
          'cognito-idp:ListUsers',
          'cognito-idp:ListGroups',
          'cognito-idp:ListUsersInGroup',
        ]
      })
    );

    const userImportRole = new iam.Role(this, 'userImportRole', { assumedBy: new iam.ServicePrincipal('cognito-idp.amazonaws.com') });

    userImportRole.addToPolicy(new iam.PolicyStatement({
      resources: [
        `arn:aws:logs:${this.region}:${this.account}:log-group:/aws/cognito/*`,
      ],
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:DescribeLogStreams",
        "logs:PutLogEvents"
      ],
    }));

    new events.Rule(this, 'Rule', {
      description: 'A schedule for the Lambda function that triggers Prowler in CodeBuild.',
      targets: [new targets.LambdaFunction(backupLambda)],
      schedule: events.Schedule.expression('cron(0 22 * * ? *)'), // every day at 10pm
    });

    const provider = new cr.Provider(this, 'provider', {
      onEventHandler: backupLambda,
      logRetention: logs.RetentionDays.THREE_DAYS,
      role: new iam.Role(this, 'role', { assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com') }),
    });

    new core.CustomResource(this, 'customResource', {
      serviceToken: provider.serviceToken,
      properties: {
        UPDATE: Date.now(),
      }
    });

    const hasuraDashboardAdminSecret = new secretsmanager.Secret(this, 'HasuraDashboardAdminSecret');

    new core.CfnOutput(this, 'HasuraDashboardAdminSecretArn', {
      value: hasuraDashboardAdminSecret.secretArn,
    });

    const cluster = new ecs.Cluster(this, 'EcsCluster', { vpc: props.vpc });
    // not working
    // cluster.addAsgCapacityProvider(new AsgCapacityProvider(this, 'AsgCapacityProvider', {
    //   enableManagedTerminationProtection: false,
    //   machineImageType: MachineImageType.BOTTLEROCKET,
    //   autoScalingGroup: new AutoScalingGroup(this, 'AutoScalingGroup', {
    //     vpc: props.vpc,
    //     instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
    //     machineImage: EcsOptimizedImage.amazonLinux2(),
    //     minCapacity: 1,
    //     maxCapacity: 3,
    //   })
    // }), {
    //   machineImageType: MachineImageType.BOTTLEROCKET,
    // });

    // I couldn't get addAsgCapacityProvider to work so we still will rely on addCapacity
    cluster.addCapacity('AsgCapacityProvider', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      minCapacity: 1,
      maxCapacity: 3,
    });

    const recordName = 'dashboard-hasura';

    const certificate = new certificatemanager.DnsValidatedCertificate(this, 'Certificate', {
      domainName: `${recordName}.${props.domainName}`,
      hostedZone: props.zone,
    });

    // Create a load-balanced Ec2 service and make it public
    const albEc2Service = new ApplicationLoadBalancedEc2Service(this, 'ApplicationLoadBalancedEc2Service', {
      cluster,
      certificate,
      memoryReservationMiB: 400,
      desiredCount: 1,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('hasura/graphql-engine:v2.1.1'),
        containerPort: 8080,
        enableLogging: true,
        environment: {
          HASURA_GRAPHQL_ENABLE_CONSOLE: 'true',
          HASURA_GRAPHQL_PG_CONNECTIONS: '100',
          HASURA_GRAPHQL_LOG_LEVEL: 'debug',
          HASURA_GRAPHQL_JWT_SECRET: JSON.stringify({
            type: 'RS256',
            jwk_url: `https://cognito-idp.us-west-2.amazonaws.com/${userPool.userPoolId ?? ''}/.well-known/jwks.json`,
            claims_format: 'stringified_json',
          }),
        },
        secrets: {
          HASURA_GRAPHQL_DATABASE_URL: ecs.Secret.fromSecretsManager(secretsmanager.Secret.fromSecretNameV2(this, 'dbUrlSecretArn', 'DBConnectionString')),
          HASURA_GRAPHQL_ADMIN_SECRET: ecs.Secret.fromSecretsManager(hasuraDashboardAdminSecret),
        },
      },
      publicLoadBalancer: true,
    });

    const hasuraRecord = new route53.ARecord(this, 'hasuraRecord', {
      recordName,
      target: route53.RecordTarget.fromAlias(new route53Targets.LoadBalancerTarget(albEc2Service.loadBalancer)),
      zone: props.zone,
    });

    new core.CfnOutput(this, 'HasuraUrl', {
      value: hasuraRecord.domainName,
    });

    albEc2Service.targetGroup.configureHealthCheck({
      enabled: true,
      path: '/healthz',
      healthyHttpCodes: '200',
    });

    const alarm = new cloudwatch.Alarm(this, 'hasuraAlarm', {
      metric: albEc2Service.targetGroup.metricHealthyHostCount(),
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.BREACHING,
      threshold: 0,
      evaluationPeriods: 1,
    });
    const topic = new sns.Topic(this, 'hasuraAlarmTopic');
    topic.addSubscription(
      new subscriptions.EmailSubscription('cloud-notifications@neatleaf.com'),
    )
    alarm.addAlarmAction(new actions.SnsAction(topic));

    const infoLambda = new lambdajs.NodejsFunction(this, 'info', {
      environment: {
        login_client_id: userPoolWebClient.userPoolClientId,
        cognito_user_pool: userPool.userPoolId,
        cognito_pool_address: `cognito-idp.${this.region}.amazonaws.com/${userPool.userPoolId}`,
        identity_pool_id: identityPool.ref,
      },
    });

    const dashboardInfoRecordName = 'dashboard-info';

    const infoCertificate = new certificatemanager.DnsValidatedCertificate(this, 'infoCertificate', {
      domainName: `${dashboardInfoRecordName}.${props.domainName}`,
      hostedZone: props.zone,
    });

    const infoApi = new apigateway.LambdaRestApi(this, 'infoApi', {
      handler: infoLambda,
      proxy: true,
      domainName: {
        domainName: `${dashboardInfoRecordName}.${props.domainName}`,
        certificate: infoCertificate,
      },
    });

    const infoRecord = new route53.ARecord(this, 'infoRecord', {
      recordName: dashboardInfoRecordName,
      target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(infoApi)),
      zone: props.zone,
    });

    new core.CfnOutput(this, 'InfoUrl', {
      value: infoRecord.domainName,
    });

    if (props.useRdsDb) {
      const vpc = new ec2.Vpc(this, 'vpc', {
        maxAzs: 2,
        subnetConfiguration: [{
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
        }],
      });

      const hasuraDatabase = new DatabaseInstance(this, 'HasuraDatabase', {
        engine: DatabaseInstanceEngine.postgres({
          version: PostgresEngineVersion.VER_13_3,
        }),
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
        credentials: Credentials.fromGeneratedSecret('tsdbadmin'),
        storageEncrypted: true,
        allocatedStorage: 20,
        maxAllocatedStorage: 100,
        vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PUBLIC,
        },
        deletionProtection: false,
        removalPolicy: core.RemovalPolicy.DESTROY,
      });

      const hasuraUsername = 'hasura';

      const hasuraUserSecret = new DatabaseSecret(this, 'HasuraDatabaseUser', {
        username: hasuraUsername,
        masterSecret: hasuraDatabase.secret,
      });
      hasuraUserSecret.attach(hasuraDatabase); // Adds DB connections information in the secret

      // Output the Endpoint Address so it can be used in post-deploy
      new core.CfnOutput(this, 'HasuraDatabaseUserSecretArn', {
        value: hasuraUserSecret.secretArn,
      });

      new core.CfnOutput(this, 'HasuraDatabaseMasterSecretArn', {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value: hasuraDatabase.secret!.secretArn,
      });

      hasuraDatabase.connections.allowFrom(albEc2Service.service, new ec2.Port({
        protocol: ec2.Protocol.TCP,
        stringRepresentation: 'Postgres Port',
        fromPort: 5432,
        toPort: 5432,
      }));
    }
  }
}
