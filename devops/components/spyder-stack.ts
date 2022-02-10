import * as core from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { ApplicationLoadBalancedEc2Service } from '@aws-cdk/aws-ecs-patterns';
import { PythonFunction, PythonLayerVersion } from "@aws-cdk/aws-lambda-python";
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';
import * as cognito from '@aws-cdk/aws-cognito';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as ecs from '@aws-cdk/aws-ecs';
import * as s3 from '@aws-cdk/aws-s3';
import * as sns from '@aws-cdk/aws-sns';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';
import * as sources from '@aws-cdk/aws-lambda-event-sources';
import * as s3n from '@aws-cdk/aws-s3-notifications';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as actions from '@aws-cdk/aws-cloudwatch-actions';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as apigateway from '@aws-cdk/aws-apigateway';

export interface SpyderStackProps extends core.StackProps {
  vpc: ec2.Vpc,
  stage: string;
  enableAlarms?: boolean;
  domainName: string;
  zone: route53.IHostedZone;
}

/**
 * Lambda CDK Stack
 */
export class SpyderStack extends core.Stack {
  /**
   * Creates a new Lambda Stack.
   *
   * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
   * @param id The construct ID of this stack.
   * @param props Stack properties including specific Lambda properties.
   */
  constructor(scope: core.Construct, id: string, props: SpyderStackProps) {
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

    // Configure the spyder user pool.
    let userPool = new cognito.UserPool(this, `${props.stage}SpyderUserPool`, {
      customAttributes: {
        organization_id: new cognito.NumberAttribute({ min: 0, max: 2000000000 }),
      },
      removalPolicy: core.RemovalPolicy.RETAIN,
      signInCaseSensitive: false,
      passwordPolicy: {
        minLength: 8,
        requireLowercase: false,
        requireUppercase: false,
        requireDigits: false,
        requireSymbols: false,
      },
      selfSignUpEnabled: false,
      autoVerify: {
        email: false,
      },
      standardAttributes: {
        email: { // TODO(sydney): can we make the user pool without the email requirement?
          mutable: true,
          required: false,
        }
      },
      signInAliases: {
        username: true,
      },
      lambdaTriggers: {
        preTokenGeneration: claimsLambda,
      },
    });

    new core.CfnOutput(this, 'userPoolId', {
      value: userPool.userPoolId,
    });

    const userPoolClient = new cognito.UserPoolClient(this, 'userPoolClient', {
      userPool: userPool,
      generateSecret: false,
      preventUserExistenceErrors: true,
      authFlows: {
        userPassword: true,
        adminUserPassword: true,
      }
    });

    new core.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });

    const identityPool = new cognito.CfnIdentityPool(this, 'SpyderIdentityPool', {
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName
        },
      ],
      allowUnauthenticatedIdentities: true,
    });

    new core.CfnOutput(this, 'IdentityPoolId', {
      value: identityPool.ref,
    });

    const unauthenticatedRole = new iam.Role(this, 'unauthenticatedRole', {
      description: 'Unauthenticated role for spyder devices',
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
      description: 'Authenticated role for spyder devices',
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
      // roleMappings: {
      //   mapping: {
      //     type: 'Token',
      //     ambiguousRoleResolution: 'AuthenticatedRole',
      //     identityProvider: userPool.userPoolProviderUrl,
      //   },
      // },
    });

    // Configure the backup lambda.
    const userBackupBucket = new s3.Bucket(this, 'userBackupBucket');

    const backupLambda = new lambdajs.NodejsFunction(this, 'backupLambda', {
      environment: {
        BUCKET_NAME: userBackupBucket.bucketName,
        SPYDER_USERPOOL_ID: userPool.userPoolId,
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

    const hasuraSpyderAdminSecret = new secretsmanager.Secret(this, 'HasuraSpyderAdminSecret');

    new core.CfnOutput(this, 'HasuraSpyderAdminSecretArn', {
      value: hasuraSpyderAdminSecret.secretArn,
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

    const recordName = 'spyder-hasura';

    const certificate = new certificatemanager.DnsValidatedCertificate(this, 'Certificate', {
      domainName: `${recordName}.${props.domainName}`,
      hostedZone: props.zone,
    });

    const DBConnectionString = 'DBConnectionString'

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
          // TimeScale database url which is mandatory for the image
          HASURA_GRAPHQL_DATABASE_URL: ecs.Secret.fromSecretsManager(secretsmanager.Secret.fromSecretNameV2(this, 'dbUrlSecretArn', DBConnectionString)),
          HASURA_GRAPHQL_ADMIN_SECRET: ecs.Secret.fromSecretsManager(hasuraSpyderAdminSecret),
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

    const awsClientsLayer = new PythonLayerVersion(this, 'awsClientsLayer', {
      entry: '../data_pipeline/aws_clients_layer/source',
    });

    const postgresLayer = new PythonLayerVersion(this, 'postgresLayer1', {
      entry: '../databases/postgres_layer/source',
    });

    const data2Topic = new sns.Topic(this, 'data2Topic',);

    const dataBucketName = `${props.stage}-spyder-v1-databucket`;

    const dataBucket = s3.Bucket.fromBucketName(this, 'dataBucket', dataBucketName);

    const data2ProcessingDlq = new sqs.Queue(this, 'data2ProcessingDlq');
    const data2ProcessingQueue = new sqs.Queue(this, 'data2ProcessingQueue', {
      visibilityTimeout: core.Duration.seconds(900),
      deadLetterQueue: { queue: data2ProcessingDlq, maxReceiveCount: 10 }
    });

    // if we need to create the bucket again comment that in!
    // const dataBucket = new s3.Bucket(this, 'dataBucket', {
    //   bucketName: dataBucketName,
    // });
    dataBucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.SqsDestination(data2ProcessingQueue), { prefix: 'upload/' });

    const imageBucketName = `${props.stage}-spyder-v1-imagebucket`;

    const imageBucket = s3.Bucket.fromBucketName(this, 'imageBucket', imageBucketName);

    // if we need to create the bucket again comment that in!
    // const imageBucket = new s3.Bucket(this, 'imageBucket', {
    //   bucketName: imageBucketName,
    //   cors: [
    //     {
    //       allowedMethods: [
    //         s3.HttpMethods.GET,
    //         s3.HttpMethods.HEAD,
    //         s3.HttpMethods.POST,
    //         s3.HttpMethods.PUT,
    //         s3.HttpMethods.DELETE,
    //       ],
    //       // allowedOrigins: ['http://localhost:3000'],
    //       allowedOrigins: ['*'],
    //       allowedHeaders: ['*'],
    //       exposedHeaders: [
    //         'x-amz-server-side-encryption',
    //         'x-amz-request-id',
    //         'x-amz-id-2',
    //         'ETag',
    //       ],
    //       maxAge: 3000,
    //     },
    //   ],
    // });

    authenticatedRole.addToPolicy(new iam.PolicyStatement({
      actions: [
        's3:GetObject',
        's3:ListBucket',
      ],
      resources: [
        imageBucket.bucketArn + '/*',
        imageBucket.bucketArn,
      ],
    }));
    const softwareBucket = new s3.Bucket(this, 'softwareBucket');

    new core.CfnOutput(this, 'imageBucketName', {
      value: imageBucket.bucketName,
    });

    imageBucket.addToResourcePolicy(new iam.PolicyStatement({
      principals: [new iam.ArnPrincipal(authenticatedRole.roleArn)],
      actions: [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      resources: [
        imageBucket.bucketArn + '/*',
        imageBucket.bucketArn,
      ],
    }));

    new core.CfnOutput(this, 'dataBucketName', {
      value: dataBucket.bucketName,
    });

    new core.CfnOutput(this, 'softwareBucketName', {
      value: softwareBucket.bucketName,
    });

    authenticatedRole.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: [
        's3:GetObject',
        's3:ListBucket',
      ],
      resources: [
        softwareBucket.bucketArn,
        softwareBucket.bucketArn + '/*',
      ],
    }));

    authenticatedRole.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: [
        's3:PutObject',
      ],
      resources: [
        dataBucket.bucketArn + '/upload/*',
        dataBucket.bucketArn + '/test_upload/*',
        dataBucket.bucketArn + '/test/*',
      ],
    }));

    const email = 'cloud-notifications@neatleaf.com';

    if (props.enableAlarms) {
      const data2ProcessingDlqFailedAlarm = new cloudwatch.Alarm(this, 'data2ProcessingDlqFailedAlarm', {
        metric: data2ProcessingDlq.metricNumberOfMessagesReceived(),
        threshold: 1,
        evaluationPeriods: 1,
      });
      const data2ProcessingDlqFailedTopic = new sns.Topic(this, 'data2ProcessingDlqFailedTopic');
      data2ProcessingDlqFailedTopic.addSubscription(
        new subscriptions.EmailSubscription(email),
      );
      data2ProcessingDlqFailedAlarm.addAlarmAction(new actions.SnsAction(data2ProcessingDlqFailedTopic));
    }

    // Create Data2ProtoProcessing Function.
    const data2 = new PythonFunction(this, 'Data2ProtoProcessing', {
      entry: '../data_pipeline/data2_proto_processing_lambda/source',
      runtime: lambda.Runtime.PYTHON_3_7,
      index: 'lambda_handler.py',
      handler: 'lambda_handler',
      layers: [awsClientsLayer, postgresLayer],
      memorySize: 10240,
      deadLetterQueueEnabled: true,
      timeout: core.Duration.minutes(15),
      reservedConcurrentExecutions: 10,
      environment: {
        IMAGES_BUCKET: imageBucket.bucketName,
        SNS_TOPIC_ARN: data2Topic.topicArn,
        RELATIONAL_DATABASE_ENDPOINT: core.SecretValue.secretsManager(DBConnectionString).toString(),
      },
      events: [new sources.SqsEventSource(data2ProcessingQueue)],
    });
    // Set Data2ProtoProcessing permissions.
    const data2Policy = new iam.Policy(this, 'data2ProtoProcessingPolicy', {
      statements: [
        new iam.PolicyStatement({
          resources: [
            imageBucket.bucketArn,
            imageBucket.bucketArn + "/*",
          ],
          actions: [
            "s3:PutObject",
            "s3:GetObjectAcl",
            "s3:PutObjectAcl"
          ]
        }),
        new iam.PolicyStatement({
          resources: [
            dataBucket.bucketArn,
            dataBucket.bucketArn + "/*",
          ],
          actions: [
            "s3:DeleteObject",
            "s3:GetObject",
            "s3:PutObject",
          ]
        }),
        new iam.PolicyStatement({
          resources: [
            data2.functionArn,
          ],
          actions: [
            "lambda:ListTags",
          ]
        }),
        new iam.PolicyStatement({
          resources: [
            data2Topic.topicArn,
          ],
          actions: [
            'SNS:Publish',
          ]
        })
      ]
    });
    data2.role?.attachInlinePolicy(data2Policy);

    imageBucket.grantReadWrite(data2);

    core.Tags.of(data2).add('commit_url', `https://bitbucket.org/neatleaf/neatleaf/commits/${process.env.COMMIT_ID}`);
    new core.CfnOutput(this, 'commit_url', {
      value: `https://bitbucket.org/neatleaf/neatleaf/commits/${process.env.COMMIT_ID}`,
    });

    if (props.enableAlarms) {
      if (data2.deadLetterQueue) {
        const data2DlqFailedAlarm = new cloudwatch.Alarm(this, 'data2DlqFailedAlarm', {
          metric: data2.deadLetterQueue.metricNumberOfMessagesReceived(),
          threshold: 1,
          evaluationPeriods: 1,
        });
        const data2DlqFailedTopic = new sns.Topic(this, 'data2DlqFailedTopic');
        data2DlqFailedTopic.addSubscription(
          new subscriptions.EmailSubscription(email),
        );
        data2DlqFailedAlarm.addAlarmAction(new actions.SnsAction(data2DlqFailedTopic));
      }

      const data2FailedAlarm = new cloudwatch.Alarm(this, 'data2FailedAlarm', {
        metric: data2.metricErrors(),
        threshold: 1,
        evaluationPeriods: 1,
      });
      const data2FailedTopic = new sns.Topic(this, 'data2FailedTopic');
      data2FailedTopic.addSubscription(
        new subscriptions.EmailSubscription(email),
      );
      data2FailedAlarm.addAlarmAction(new actions.SnsAction(data2FailedTopic));
    }


    const heatmapProcessingQueue = new sqs.Queue(this, 'heatmapProcessingQueue', {
      visibilityTimeout: core.Duration.seconds(900),
      deadLetterQueue: { queue: new sqs.Queue(this, 'heatmapProcessingDlq'), maxReceiveCount: 10 }
    });
    data2Topic.addSubscription(new subscriptions.SqsSubscription(heatmapProcessingQueue));

    const heatmap = new PythonFunction(this, 'HeatmapsAndStatistics', {
      entry: '../data_pipeline/generate_heatmap_and_statistics/source',
      runtime: lambda.Runtime.PYTHON_3_7,
      index: 'lambda_handler.py',
      handler: 'lambda_handler',
      layers: [awsClientsLayer, postgresLayer],
      memorySize: 256,
      deadLetterQueueEnabled: true,
      timeout: core.Duration.minutes(15),
      environment: {
        SNS_TOPIC_ARN: data2Topic.topicArn,
        RELATIONAL_DATABASE_ENDPOINT: core.SecretValue.secretsManager(DBConnectionString).toString(),
      },
      events: [new sources.SqsEventSource(heatmapProcessingQueue)],
    });

    // Create policy for heatmap and statistics lambda to retrieve its own tags.
    const heatmapPolicy = new iam.Policy(this, 'heatmapAndStatisticsPolicy', {
      statements: [
        new iam.PolicyStatement({
          resources: [
            heatmap.functionArn,
          ],
          actions: [
            "lambda:ListTags",
          ]
        }),
      ]
    });
    heatmap.role?.attachInlinePolicy(heatmapPolicy);

    core.Tags.of(heatmap).add('commit_url', `https://bitbucket.org/neatleaf/neatleaf/commits/${process.env.COMMIT_ID}`);

    if (props.enableAlarms) {
      if (heatmap.deadLetterQueue) {
        const heatmapDlqFailedAlarm = new cloudwatch.Alarm(this, 'heatmapDlqFailedAlarm', {
          metric: heatmap.deadLetterQueue.metricNumberOfMessagesReceived(),
          threshold: 1,
          evaluationPeriods: 1,
        });
        const heatmapDlqFailedTopic = new sns.Topic(this, 'heatmapDlqFailedTopic');
        heatmapDlqFailedTopic.addSubscription(
          new subscriptions.EmailSubscription(email),
        );
        heatmapDlqFailedAlarm.addAlarmAction(new actions.SnsAction(heatmapDlqFailedTopic));
      }

      const heatmapFailedAlarm = new cloudwatch.Alarm(this, 'heatmapFailedAlarm', {
        metric: heatmap.metricErrors(),
        threshold: 1,
        evaluationPeriods: 1,
      });
      const heatmapFailedTopic = new sns.Topic(this, 'heatmapFailedTopic');
      heatmapFailedTopic.addSubscription(
        new subscriptions.EmailSubscription(email),
      );
      heatmapFailedAlarm.addAlarmAction(new actions.SnsAction(heatmapFailedTopic));
    }

    const table = new ddb.Table(this, 'SpyderV1Logs', {
      partitionKey: { name: 'systemId', type: ddb.AttributeType.NUMBER },
      sortKey: { name: 'timestamp', type: ddb.AttributeType.NUMBER },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
    });

    table.addLocalSecondaryIndex({
      indexName: 'SystemIdModuleIndex',
      sortKey: { name: 'module', type: ddb.AttributeType.STRING },
    });

    table.addLocalSecondaryIndex({
      indexName: 'SystemIdLevelIndex',
      sortKey: { name: 'level', type: ddb.AttributeType.NUMBER },
    });

    new core.CfnOutput(this, 'tableArn', {
      value: table.tableArn,
    });

    new core.CfnOutput(this, 'tableName', {
      value: table.tableName,
    });

    authenticatedRole.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: [
        'dynamodb:BatchWriteItem',
        'dynamodb:PutItem'
      ],
      resources: [
        table.tableArn,
      ],
    }));

    const infoLambda = new lambdajs.NodejsFunction(this, 'info', {
      environment: {
        account_id: this.account,
        login_client_id: userPoolClient.userPoolClientId,
        cognito_user_pool: userPool.userPoolId,
        cognito_pool_address: `cognito-idp.${this.region}.amazonaws.com/${userPool.userPoolId}`,
        identity_pool_id: identityPool.ref,
        proto_bucket: dataBucket.bucketName,
        software_bucket: softwareBucket.bucketName,
        logging_table: table.tableName,
      },
    });
    
    const spyderInfoRecordName = 'spyder-info';

    const infoCertificate = new certificatemanager.DnsValidatedCertificate(this, 'infoCertificate', {
      domainName: `${spyderInfoRecordName}.${props.domainName}`,
      hostedZone: props.zone,
    });
    // use this
    const infoApi = new apigateway.LambdaRestApi(this, 'infoApi', {
      handler: infoLambda,
      proxy: true,
      domainName: {
        domainName: `${spyderInfoRecordName}.${props.domainName}`,
        certificate: infoCertificate,
      },
    });

    const infoRecord = new route53.ARecord(this, 'infoRecord', {
      recordName: spyderInfoRecordName,
      target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(infoApi)),
      zone: props.zone,
    });

    new core.CfnOutput(this, 'InfoUrl', {
      value: infoRecord.domainName,
    });
  }
}
