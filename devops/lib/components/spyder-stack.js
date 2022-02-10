"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpyderStack = void 0;
const core = require("@aws-cdk/core");
const ec2 = require("@aws-cdk/aws-ec2");
const aws_ecs_patterns_1 = require("@aws-cdk/aws-ecs-patterns");
const aws_lambda_python_1 = require("@aws-cdk/aws-lambda-python");
const secretsmanager = require("@aws-cdk/aws-secretsmanager");
const certificatemanager = require("@aws-cdk/aws-certificatemanager");
const cognito = require("@aws-cdk/aws-cognito");
const route53 = require("@aws-cdk/aws-route53");
const route53Targets = require("@aws-cdk/aws-route53-targets");
const ecs = require("@aws-cdk/aws-ecs");
const s3 = require("@aws-cdk/aws-s3");
const sns = require("@aws-cdk/aws-sns");
const subscriptions = require("@aws-cdk/aws-sns-subscriptions");
const lambda = require("@aws-cdk/aws-lambda");
const lambdajs = require("@aws-cdk/aws-lambda-nodejs");
const sqs = require("@aws-cdk/aws-sqs");
const iam = require("@aws-cdk/aws-iam");
const sources = require("@aws-cdk/aws-lambda-event-sources");
const s3n = require("@aws-cdk/aws-s3-notifications");
const cloudwatch = require("@aws-cdk/aws-cloudwatch");
const actions = require("@aws-cdk/aws-cloudwatch-actions");
const ddb = require("@aws-cdk/aws-dynamodb");
const apigateway = require("@aws-cdk/aws-apigateway");
/**
 * Lambda CDK Stack
 */
class SpyderStack extends core.Stack {
    /**
     * Creates a new Lambda Stack.
     *
     * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
     * @param id The construct ID of this stack.
     * @param props Stack properties including specific Lambda properties.
     */
    constructor(scope, id, props) {
        var _a, _b, _c;
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
                email: {
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
            assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': identityPool.ref,
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'unauthenticated',
                },
            }, 'sts:AssumeRoleWithWebIdentity'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
            ],
        });
        const authenticatedRole = new iam.Role(this, 'authenticatedRole', {
            description: 'Authenticated role for spyder devices',
            assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
                'StringEquals': {
                    'cognito-identity.amazonaws.com:aud': identityPool.ref,
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated',
                },
            }, 'sts:AssumeRoleWithWebIdentity'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
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
        backupLambda.addToRolePolicy(new iam.PolicyStatement({
            resources: [
                userBackupBucket.bucketArn,
                userBackupBucket.bucketArn + '/*',
            ],
            actions: [
                "s3:PutObject",
                "s3:PutObjectTagging"
            ]
        }));
        backupLambda.addToRolePolicy(new iam.PolicyStatement({
            resources: [
                userPool.userPoolArn,
            ],
            actions: [
                'cognito-idp:ListUsers',
                'cognito-idp:ListGroups',
                'cognito-idp:ListUsersInGroup',
            ]
        }));
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
        const DBConnectionString = 'DBConnectionString';
        // Create a load-balanced Ec2 service and make it public
        const albEc2Service = new aws_ecs_patterns_1.ApplicationLoadBalancedEc2Service(this, 'ApplicationLoadBalancedEc2Service', {
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
                        jwk_url: `https://cognito-idp.us-west-2.amazonaws.com/${(_a = userPool.userPoolId) !== null && _a !== void 0 ? _a : ''}/.well-known/jwks.json`,
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
        topic.addSubscription(new subscriptions.EmailSubscription('cloud-notifications@neatleaf.com'));
        alarm.addAlarmAction(new actions.SnsAction(topic));
        const awsClientsLayer = new aws_lambda_python_1.PythonLayerVersion(this, 'awsClientsLayer', {
            entry: '../data_pipeline/aws_clients_layer/source',
        });
        const postgresLayer = new aws_lambda_python_1.PythonLayerVersion(this, 'postgresLayer1', {
            entry: '../databases/postgres_layer/source',
        });
        const data2Topic = new sns.Topic(this, 'data2Topic');
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
        const imageBucketTest = new s3.Bucket(this, 'imageBucketTest', {
            bucketName: imageBucketName + 'test',
            cors: [
                {
                    allowedMethods: [
                        s3.HttpMethods.GET,
                        s3.HttpMethods.HEAD,
                        s3.HttpMethods.POST,
                        s3.HttpMethods.PUT,
                        s3.HttpMethods.DELETE,
                    ],
                    // allowedOrigins: ['http://localhost:3000'],
                    allowedOrigins: ['*'],
                    allowedHeaders: ['*'],
                    exposedHeaders: [
                        'x-amz-server-side-encryption',
                        'x-amz-request-id',
                        'x-amz-id-2',
                        'ETag',
                    ],
                    maxAge: 3000,
                },
            ],
        });
        authenticatedRole.addToPolicy(new iam.PolicyStatement({
            actions: [
                's3:GetObject',
                's3:ListBucket',
            ],
            resources: [
                imageBucket.bucketArn + '/*',
                imageBucket.bucketArn,
                imageBucketTest.bucketArn + '/*',
                imageBucketTest.bucketArn,
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
        imageBucketTest.addToResourcePolicy(new iam.PolicyStatement({
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
            data2ProcessingDlqFailedTopic.addSubscription(new subscriptions.EmailSubscription(email));
            data2ProcessingDlqFailedAlarm.addAlarmAction(new actions.SnsAction(data2ProcessingDlqFailedTopic));
        }
        // Create Data2ProtoProcessing Function.
        const data2 = new aws_lambda_python_1.PythonFunction(this, 'Data2ProtoProcessing', {
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
                        imageBucketTest.bucketArn,
                        imageBucketTest.bucketArn + "/*",
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
        (_b = data2.role) === null || _b === void 0 ? void 0 : _b.attachInlinePolicy(data2Policy);
        imageBucket.grantReadWrite(data2);
        imageBucketTest.grantReadWrite(data2);
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
                data2DlqFailedTopic.addSubscription(new subscriptions.EmailSubscription(email));
                data2DlqFailedAlarm.addAlarmAction(new actions.SnsAction(data2DlqFailedTopic));
            }
            const data2FailedAlarm = new cloudwatch.Alarm(this, 'data2FailedAlarm', {
                metric: data2.metricErrors(),
                threshold: 1,
                evaluationPeriods: 1,
            });
            const data2FailedTopic = new sns.Topic(this, 'data2FailedTopic');
            data2FailedTopic.addSubscription(new subscriptions.EmailSubscription(email));
            data2FailedAlarm.addAlarmAction(new actions.SnsAction(data2FailedTopic));
        }
        const heatmapProcessingQueue = new sqs.Queue(this, 'heatmapProcessingQueue', {
            visibilityTimeout: core.Duration.seconds(900),
            deadLetterQueue: { queue: new sqs.Queue(this, 'heatmapProcessingDlq'), maxReceiveCount: 10 }
        });
        data2Topic.addSubscription(new subscriptions.SqsSubscription(heatmapProcessingQueue));
        const heatmap = new aws_lambda_python_1.PythonFunction(this, 'HeatmapsAndStatistics', {
            entry: '../data_pipeline/generate_heatmap_and_statistics/source',
            runtime: lambda.Runtime.PYTHON_3_7,
            index: 'lambda_handler.py',
            handler: 'lambda_handler',
            layers: [awsClientsLayer, postgresLayer],
            memorySize: 256,
            reservedConcurrentExecutions: 10,
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
        (_c = heatmap.role) === null || _c === void 0 ? void 0 : _c.attachInlinePolicy(heatmapPolicy);
        core.Tags.of(heatmap).add('commit_url', `https://bitbucket.org/neatleaf/neatleaf/commits/${process.env.COMMIT_ID}`);
        if (props.enableAlarms) {
            if (heatmap.deadLetterQueue) {
                const heatmapDlqFailedAlarm = new cloudwatch.Alarm(this, 'heatmapDlqFailedAlarm', {
                    metric: heatmap.deadLetterQueue.metricNumberOfMessagesReceived(),
                    threshold: 1,
                    evaluationPeriods: 1,
                });
                const heatmapDlqFailedTopic = new sns.Topic(this, 'heatmapDlqFailedTopic');
                heatmapDlqFailedTopic.addSubscription(new subscriptions.EmailSubscription(email));
                heatmapDlqFailedAlarm.addAlarmAction(new actions.SnsAction(heatmapDlqFailedTopic));
            }
            const heatmapFailedAlarm = new cloudwatch.Alarm(this, 'heatmapFailedAlarm', {
                metric: heatmap.metricErrors(),
                threshold: 1,
                evaluationPeriods: 1,
            });
            const heatmapFailedTopic = new sns.Topic(this, 'heatmapFailedTopic');
            heatmapFailedTopic.addSubscription(new subscriptions.EmailSubscription(email));
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
exports.SpyderStack = SpyderStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3B5ZGVyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9zcHlkZXItc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXNDO0FBQ3RDLHdDQUF3QztBQUN4QyxnRUFBOEU7QUFDOUUsa0VBQWdGO0FBQ2hGLDhEQUE4RDtBQUM5RCxzRUFBc0U7QUFDdEUsZ0RBQWdEO0FBQ2hELGdEQUFnRDtBQUNoRCwrREFBK0Q7QUFDL0Qsd0NBQXdDO0FBQ3hDLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMsZ0VBQWdFO0FBQ2hFLDhDQUE4QztBQUM5Qyx1REFBdUQ7QUFDdkQsd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4Qyw2REFBNkQ7QUFDN0QscURBQXFEO0FBQ3JELHNEQUFzRDtBQUN0RCwyREFBMkQ7QUFDM0QsNkNBQTZDO0FBQzdDLHNEQUFzRDtBQVV0RDs7R0FFRztBQUNILE1BQWEsV0FBWSxTQUFRLElBQUksQ0FBQyxLQUFLO0lBQ3pDOzs7Ozs7T0FNRztJQUNILFlBQVksS0FBcUIsRUFBRSxFQUFVLEVBQUUsS0FBdUI7O1FBQ3BFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzdELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7UUFlM0IsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILGtDQUFrQztRQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7WUFDeEUsZ0JB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QUF1QixDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUM5RixVQUFVLEVBQUUsR0FBRyxvQkFBb0IsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ3pELFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSTtTQUN2QixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUM1RCxPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRTtnQkFDVixVQUFVLEVBQUUsR0FBRyxvQkFBb0IsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUN6RCxXQUFXLEVBQUUsZUFBZTthQUM3QjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3pELFVBQVUsRUFBRSxvQkFBb0I7WUFDaEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5RSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbEMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxVQUFVO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQS9wQkQsa0NBK3BCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnQGF3cy1jZGsvYXdzLWVjMic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbkxvYWRCYWxhbmNlZEVjMlNlcnZpY2UgfSBmcm9tICdAYXdzLWNkay9hd3MtZWNzLXBhdHRlcm5zJztcbmltcG9ydCB7IFB5dGhvbkZ1bmN0aW9uLCBQeXRob25MYXllclZlcnNpb24gfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYS1weXRob25cIjtcbmltcG9ydCAqIGFzIHNlY3JldHNtYW5hZ2VyIGZyb20gJ0Bhd3MtY2RrL2F3cy1zZWNyZXRzbWFuYWdlcic7XG5pbXBvcnQgKiBhcyBjZXJ0aWZpY2F0ZW1hbmFnZXIgZnJvbSAnQGF3cy1jZGsvYXdzLWNlcnRpZmljYXRlbWFuYWdlcic7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2duaXRvJztcbmltcG9ydCAqIGFzIHJvdXRlNTMgZnJvbSAnQGF3cy1jZGsvYXdzLXJvdXRlNTMnO1xuaW1wb3J0ICogYXMgcm91dGU1M1RhcmdldHMgZnJvbSAnQGF3cy1jZGsvYXdzLXJvdXRlNTMtdGFyZ2V0cyc7XG5pbXBvcnQgKiBhcyBlY3MgZnJvbSAnQGF3cy1jZGsvYXdzLWVjcyc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xuaW1wb3J0ICogYXMgc25zIGZyb20gJ0Bhd3MtY2RrL2F3cy1zbnMnO1xuaW1wb3J0ICogYXMgc3Vic2NyaXB0aW9ucyBmcm9tICdAYXdzLWNkay9hd3Mtc25zLXN1YnNjcmlwdGlvbnMnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgbGFtYmRhanMgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYS1ub2RlanMnO1xuaW1wb3J0ICogYXMgc3FzIGZyb20gJ0Bhd3MtY2RrL2F3cy1zcXMnO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ0Bhd3MtY2RrL2F3cy1pYW0nO1xuaW1wb3J0ICogYXMgc291cmNlcyBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhLWV2ZW50LXNvdXJjZXMnO1xuaW1wb3J0ICogYXMgczNuIGZyb20gJ0Bhd3MtY2RrL2F3cy1zMy1ub3RpZmljYXRpb25zJztcbmltcG9ydCAqIGFzIGNsb3Vkd2F0Y2ggZnJvbSAnQGF3cy1jZGsvYXdzLWNsb3Vkd2F0Y2gnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdAYXdzLWNkay9hd3MtY2xvdWR3YXRjaC1hY3Rpb25zJztcbmltcG9ydCAqIGFzIGRkYiBmcm9tICdAYXdzLWNkay9hd3MtZHluYW1vZGInO1xuaW1wb3J0ICogYXMgYXBpZ2F0ZXdheSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3B5ZGVyU3RhY2tQcm9wcyBleHRlbmRzIGNvcmUuU3RhY2tQcm9wcyB7XG4gIHZwYzogZWMyLlZwYyxcbiAgc3RhZ2U6IHN0cmluZztcbiAgZW5hYmxlQWxhcm1zPzogYm9vbGVhbjtcbiAgZG9tYWluTmFtZTogc3RyaW5nO1xuICB6b25lOiByb3V0ZTUzLklIb3N0ZWRab25lO1xufVxuXG4vKipcbiAqIExhbWJkYSBDREsgU3RhY2tcbiAqL1xuZXhwb3J0IGNsYXNzIFNweWRlclN0YWNrIGV4dGVuZHMgY29yZS5TdGFjayB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IExhbWJkYSBTdGFjay5cbiAgICpcbiAgICogQHBhcmFtIHNjb3BlIFBhcmVudCBvZiB0aGlzIHN0YWNrLCB1c3VhbGx5IGFuIGBBcHBgIG9yIGEgYFN0YWdlYCwgYnV0IGNvdWxkIGJlIGFueSBjb25zdHJ1Y3QuXG4gICAqIEBwYXJhbSBpZCBUaGUgY29uc3RydWN0IElEIG9mIHRoaXMgc3RhY2suXG4gICAqIEBwYXJhbSBwcm9wcyBTdGFjayBwcm9wZXJ0aWVzIGluY2x1ZGluZyBzcGVjaWZpYyBMYW1iZGEgcHJvcGVydGllcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjb3JlLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFNweWRlclN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGNsYWltc0xhbWJkYSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ2NsYWltc0xhbWJkYScsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUlubGluZShgXG4gICAgICBleHBvcnRzLmhhbmRsZXIgPSAoZXZlbnQsIGNvbnRleHQsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGV2ZW50LnJlc3BvbnNlID0ge1xuICAgICAgICAgICAgXCJjbGFpbXNPdmVycmlkZURldGFpbHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xhaW1zVG9BZGRPck92ZXJyaWRlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zXCI6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieC1oYXN1cmEtdXNlci1pZFwiOiBldmVudC5yZXF1ZXN0LnVzZXJBdHRyaWJ1dGVzLnN1YixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieC1oYXN1cmEtZGVmYXVsdC1yb2xlXCI6IFwiYWRtaW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIHNvbWUgY3VzdG9tIGxvZ2ljIHRvIGRlY2lkZSBhbGxvd2VkIHJvbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICBcIngtaGFzdXJhLWFsbG93ZWQtcm9sZXNcIjogW1wiYWRtaW5cIl0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIGV2ZW50KVxuICAgICAgfWApXG4gICAgfSk7XG5cbiAgICAvLyBDb25maWd1cmUgdGhlIHNweWRlciB1c2VyIHBvb2wuXG4gICAgbGV0IHVzZXJQb29sID0gbmV3IGNvZ25pdG8uVXNlclBvb2wodGhpcywgYCR7cHJvcHMuc3RhZ2V9U3B5ZGVyVXNlclBvb2xgLCB7XG4gICAgICBjdXN0b21BdHRyaWJ1dGVzOiB7XG4gICAgICAgIG9yZ2FuaXphdGlvbl9pZDogbmV3IGNvZ25pdG8uTnVtYmVyQXR0cmlidXRlKHsgbWluOiAwLCBtYXg6IDIwMDAwMDAwMDAgfSksXG4gICAgICB9LFxuICAgICAgcmVtb3ZhbFBvbGljeTogY29yZS5SZW1vdmFsUG9saWN5LlJFVEFJTixcbiAgICAgIHNpZ25JbkNhc2VTZW5zaXRpdmU6IGZhbHNlLFxuICAgICAgcGFzc3dvcmRQb2xpY3k6IHtcbiAgICAgICAgbWluTGVuZ3RoOiA4LFxuICAgICAgICByZXF1aXJlTG93ZXJjYXNlOiBmYWxzZSxcbiAgICAgICAgcmVxdWlyZVVwcGVyY2FzZTogZmFsc2UsXG4gICAgICAgIHJlcXVpcmVEaWdpdHM6IGZhbHNlLFxuICAgICAgICByZXF1aXJlU3ltYm9sczogZmFsc2UsXG4gICAgICB9LFxuICAgICAgc2VsZlNpZ25VcEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgYXV0b1ZlcmlmeToge1xuICAgICAgICBlbWFpbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgc3RhbmRhcmRBdHRyaWJ1dGVzOiB7XG4gICAgICAgIGVtYWlsOiB7IC8vIFRPRE8oc3lkbmV5KTogY2FuIHdlIG1ha2UgdGhlIHVzZXIgcG9vbCB3aXRob3V0IHRoZSBlbWFpbCByZXF1aXJlbWVudD9cbiAgICAgICAgICBtdXRhYmxlOiB0cnVlLFxuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNpZ25JbkFsaWFzZXM6IHtcbiAgICAgICAgdXNlcm5hbWU6IHRydWUsXG4gICAgICB9LFxuICAgICAgbGFtYmRhVHJpZ2dlcnM6IHtcbiAgICAgICAgcHJlVG9rZW5HZW5lcmF0aW9uOiBjbGFpbXNMYW1iZGEsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgbmV3IGNvcmUuQ2ZuT3V0cHV0KHRoaXMsICd1c2VyUG9vbElkJywge1xuICAgICAgdmFsdWU6IHVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VyUG9vbENsaWVudCA9IG5ldyBjb2duaXRvLlVzZXJQb29sQ2xpZW50KHRoaXMsICd1c2VyUG9vbENsaWVudCcsIHtcbiAgICAgIHVzZXJQb29sOiB1c2VyUG9vbCxcbiAgICAgIGdlbmVyYXRlU2VjcmV0OiBmYWxzZSxcbiAgICAgIHByZXZlbnRVc2VyRXhpc3RlbmNlRXJyb3JzOiB0cnVlLFxuICAgICAgYXV0aEZsb3dzOiB7XG4gICAgICAgIHVzZXJQYXNzd29yZDogdHJ1ZSxcbiAgICAgICAgYWRtaW5Vc2VyUGFzc3dvcmQ6IHRydWUsXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBuZXcgY29yZS5DZm5PdXRwdXQodGhpcywgJ1VzZXJQb29sQ2xpZW50SWQnLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGlkZW50aXR5UG9vbCA9IG5ldyBjb2duaXRvLkNmbklkZW50aXR5UG9vbCh0aGlzLCAnU3B5ZGVySWRlbnRpdHlQb29sJywge1xuICAgICAgY29nbml0b0lkZW50aXR5UHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBjbGllbnRJZDogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICAgICAgICBwcm92aWRlck5hbWU6IHVzZXJQb29sLnVzZXJQb29sUHJvdmlkZXJOYW1lXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgYWxsb3dVbmF1dGhlbnRpY2F0ZWRJZGVudGl0aWVzOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgbmV3IGNvcmUuQ2ZuT3V0cHV0KHRoaXMsICdJZGVudGl0eVBvb2xJZCcsIHtcbiAgICAgIHZhbHVlOiBpZGVudGl0eVBvb2wucmVmLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdW5hdXRoZW50aWNhdGVkUm9sZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCAndW5hdXRoZW50aWNhdGVkUm9sZScsIHtcbiAgICAgIGRlc2NyaXB0aW9uOiAnVW5hdXRoZW50aWNhdGVkIHJvbGUgZm9yIHNweWRlciBkZXZpY2VzJyxcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5GZWRlcmF0ZWRQcmluY2lwYWwoXG4gICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb20nLFxuICAgICAgICB7XG4gICAgICAgICAgU3RyaW5nRXF1YWxzOiB7XG4gICAgICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tOmF1ZCc6IGlkZW50aXR5UG9vbC5yZWYsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnRm9yQW55VmFsdWU6U3RyaW5nTGlrZSc6IHtcbiAgICAgICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YW1yJzogJ3VuYXV0aGVudGljYXRlZCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgJ3N0czpBc3N1bWVSb2xlV2l0aFdlYklkZW50aXR5JyxcbiAgICAgICksXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKFxuICAgICAgICAgICdzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhQmFzaWNFeGVjdXRpb25Sb2xlJyxcbiAgICAgICAgKSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBhdXRoZW50aWNhdGVkUm9sZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnYXV0aGVudGljYXRlZFJvbGUnLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0F1dGhlbnRpY2F0ZWQgcm9sZSBmb3Igc3B5ZGVyIGRldmljZXMnLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLkZlZGVyYXRlZFByaW5jaXBhbChcbiAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbScsXG4gICAgICAgIHtcbiAgICAgICAgICAnU3RyaW5nRXF1YWxzJzoge1xuICAgICAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphdWQnOiBpZGVudGl0eVBvb2wucmVmLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ0ZvckFueVZhbHVlOlN0cmluZ0xpa2UnOiB7XG4gICAgICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tOmFtcic6ICdhdXRoZW50aWNhdGVkJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICAnc3RzOkFzc3VtZVJvbGVXaXRoV2ViSWRlbnRpdHknLFxuICAgICAgKSxcbiAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4gICAgICAgICAgJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnLFxuICAgICAgICApLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIG5ldyBjb3JlLkNmbk91dHB1dCh0aGlzLCAnQXV0aGVudGljYXRlZFJvbGVBcm4nLCB7XG4gICAgICB2YWx1ZTogYXV0aGVudGljYXRlZFJvbGUucm9sZUFybixcbiAgICB9KTtcblxuICAgIG5ldyBjb2duaXRvLkNmbklkZW50aXR5UG9vbFJvbGVBdHRhY2htZW50KHRoaXMsICdpZGVudGl0eVJvbGUnLCB7XG4gICAgICBpZGVudGl0eVBvb2xJZDogaWRlbnRpdHlQb29sLnJlZixcbiAgICAgIHJvbGVzOiB7XG4gICAgICAgIHVuYXV0aGVudGljYXRlZDogdW5hdXRoZW50aWNhdGVkUm9sZS5yb2xlQXJuLFxuICAgICAgICBhdXRoZW50aWNhdGVkOiBhdXRoZW50aWNhdGVkUm9sZS5yb2xlQXJuLFxuICAgICAgfSxcbiAgICAgIC8vIHJvbGVNYXBwaW5nczoge1xuICAgICAgLy8gICBtYXBwaW5nOiB7XG4gICAgICAvLyAgICAgdHlwZTogJ1Rva2VuJyxcbiAgICAgIC8vICAgICBhbWJpZ3VvdXNSb2xlUmVzb2x1dGlvbjogJ0F1dGhlbnRpY2F0ZWRSb2xlJyxcbiAgICAgIC8vICAgICBpZGVudGl0eVByb3ZpZGVyOiB1c2VyUG9vbC51c2VyUG9vbFByb3ZpZGVyVXJsLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICB9KTtcblxuICAgIC8vIENvbmZpZ3VyZSB0aGUgYmFja3VwIGxhbWJkYS5cbiAgICBjb25zdCB1c2VyQmFja3VwQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAndXNlckJhY2t1cEJ1Y2tldCcpO1xuXG4gICAgY29uc3QgYmFja3VwTGFtYmRhID0gbmV3IGxhbWJkYWpzLk5vZGVqc0Z1bmN0aW9uKHRoaXMsICdiYWNrdXBMYW1iZGEnLCB7XG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBCVUNLRVRfTkFNRTogdXNlckJhY2t1cEJ1Y2tldC5idWNrZXROYW1lLFxuICAgICAgICBTUFlERVJfVVNFUlBPT0xfSUQ6IHVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgYmFja3VwTGFtYmRhLmFkZFRvUm9sZVBvbGljeShcbiAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgICAgdXNlckJhY2t1cEJ1Y2tldC5idWNrZXRBcm4sXG4gICAgICAgICAgdXNlckJhY2t1cEJ1Y2tldC5idWNrZXRBcm4gKyAnLyonLFxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgXCJzMzpQdXRPYmplY3RcIixcbiAgICAgICAgICBcInMzOlB1dE9iamVjdFRhZ2dpbmdcIlxuICAgICAgICBdXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBiYWNrdXBMYW1iZGEuYWRkVG9Sb2xlUG9saWN5KFxuICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgICB1c2VyUG9vbC51c2VyUG9vbEFybixcbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICdjb2duaXRvLWlkcDpMaXN0VXNlcnMnLFxuICAgICAgICAgICdjb2duaXRvLWlkcDpMaXN0R3JvdXBzJyxcbiAgICAgICAgICAnY29nbml0by1pZHA6TGlzdFVzZXJzSW5Hcm91cCcsXG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc3VyYVNweWRlckFkbWluU2VjcmV0ID0gbmV3IHNlY3JldHNtYW5hZ2VyLlNlY3JldCh0aGlzLCAnSGFzdXJhU3B5ZGVyQWRtaW5TZWNyZXQnKTtcblxuICAgIG5ldyBjb3JlLkNmbk91dHB1dCh0aGlzLCAnSGFzdXJhU3B5ZGVyQWRtaW5TZWNyZXRBcm4nLCB7XG4gICAgICB2YWx1ZTogaGFzdXJhU3B5ZGVyQWRtaW5TZWNyZXQuc2VjcmV0QXJuLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2x1c3RlciA9IG5ldyBlY3MuQ2x1c3Rlcih0aGlzLCAnRWNzQ2x1c3RlcicsIHsgdnBjOiBwcm9wcy52cGMgfSk7XG4gICAgLy8gbm90IHdvcmtpbmdcbiAgICAvLyBjbHVzdGVyLmFkZEFzZ0NhcGFjaXR5UHJvdmlkZXIobmV3IEFzZ0NhcGFjaXR5UHJvdmlkZXIodGhpcywgJ0FzZ0NhcGFjaXR5UHJvdmlkZXInLCB7XG4gICAgLy8gICBlbmFibGVNYW5hZ2VkVGVybWluYXRpb25Qcm90ZWN0aW9uOiBmYWxzZSxcbiAgICAvLyAgIG1hY2hpbmVJbWFnZVR5cGU6IE1hY2hpbmVJbWFnZVR5cGUuQk9UVExFUk9DS0VULFxuICAgIC8vICAgYXV0b1NjYWxpbmdHcm91cDogbmV3IEF1dG9TY2FsaW5nR3JvdXAodGhpcywgJ0F1dG9TY2FsaW5nR3JvdXAnLCB7XG4gICAgLy8gICAgIHZwYzogcHJvcHMudnBjLFxuICAgIC8vICAgICBpbnN0YW5jZVR5cGU6IEluc3RhbmNlVHlwZS5vZihJbnN0YW5jZUNsYXNzLlQyLCBJbnN0YW5jZVNpemUuU01BTEwpLFxuICAgIC8vICAgICBtYWNoaW5lSW1hZ2U6IEVjc09wdGltaXplZEltYWdlLmFtYXpvbkxpbnV4MigpLFxuICAgIC8vICAgICBtaW5DYXBhY2l0eTogMSxcbiAgICAvLyAgICAgbWF4Q2FwYWNpdHk6IDMsXG4gICAgLy8gICB9KVxuICAgIC8vIH0pLCB7XG4gICAgLy8gICBtYWNoaW5lSW1hZ2VUeXBlOiBNYWNoaW5lSW1hZ2VUeXBlLkJPVFRMRVJPQ0tFVCxcbiAgICAvLyB9KTtcblxuICAgIC8vIEkgY291bGRuJ3QgZ2V0IGFkZEFzZ0NhcGFjaXR5UHJvdmlkZXIgdG8gd29yayBzbyB3ZSBzdGlsbCB3aWxsIHJlbHkgb24gYWRkQ2FwYWNpdHlcbiAgICBjbHVzdGVyLmFkZENhcGFjaXR5KCdBc2dDYXBhY2l0eVByb3ZpZGVyJywge1xuICAgICAgaW5zdGFuY2VUeXBlOiBlYzIuSW5zdGFuY2VUeXBlLm9mKGVjMi5JbnN0YW5jZUNsYXNzLlQyLCBlYzIuSW5zdGFuY2VTaXplLk1JQ1JPKSxcbiAgICAgIG1pbkNhcGFjaXR5OiAxLFxuICAgICAgbWF4Q2FwYWNpdHk6IDMsXG4gICAgfSk7XG5cbiAgICBjb25zdCByZWNvcmROYW1lID0gJ3NweWRlci1oYXN1cmEnO1xuXG4gICAgY29uc3QgY2VydGlmaWNhdGUgPSBuZXcgY2VydGlmaWNhdGVtYW5hZ2VyLkRuc1ZhbGlkYXRlZENlcnRpZmljYXRlKHRoaXMsICdDZXJ0aWZpY2F0ZScsIHtcbiAgICAgIGRvbWFpbk5hbWU6IGAke3JlY29yZE5hbWV9LiR7cHJvcHMuZG9tYWluTmFtZX1gLFxuICAgICAgaG9zdGVkWm9uZTogcHJvcHMuem9uZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IERCQ29ubmVjdGlvblN0cmluZyA9ICdEQkNvbm5lY3Rpb25TdHJpbmcnXG5cbiAgICAvLyBDcmVhdGUgYSBsb2FkLWJhbGFuY2VkIEVjMiBzZXJ2aWNlIGFuZCBtYWtlIGl0IHB1YmxpY1xuICAgIGNvbnN0IGFsYkVjMlNlcnZpY2UgPSBuZXcgQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRFYzJTZXJ2aWNlKHRoaXMsICdBcHBsaWNhdGlvbkxvYWRCYWxhbmNlZEVjMlNlcnZpY2UnLCB7XG4gICAgICBjbHVzdGVyLFxuICAgICAgY2VydGlmaWNhdGUsXG4gICAgICBtZW1vcnlSZXNlcnZhdGlvbk1pQjogNDAwLFxuICAgICAgZGVzaXJlZENvdW50OiAxLFxuICAgICAgdGFza0ltYWdlT3B0aW9uczoge1xuICAgICAgICBpbWFnZTogZWNzLkNvbnRhaW5lckltYWdlLmZyb21SZWdpc3RyeSgnaGFzdXJhL2dyYXBocWwtZW5naW5lOnYyLjEuMScpLFxuICAgICAgICBjb250YWluZXJQb3J0OiA4MDgwLFxuICAgICAgICBlbmFibGVMb2dnaW5nOiB0cnVlLFxuICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgIEhBU1VSQV9HUkFQSFFMX0VOQUJMRV9DT05TT0xFOiAndHJ1ZScsXG4gICAgICAgICAgSEFTVVJBX0dSQVBIUUxfUEdfQ09OTkVDVElPTlM6ICcxMDAnLFxuICAgICAgICAgIEhBU1VSQV9HUkFQSFFMX0xPR19MRVZFTDogJ2RlYnVnJyxcbiAgICAgICAgICBIQVNVUkFfR1JBUEhRTF9KV1RfU0VDUkVUOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICB0eXBlOiAnUlMyNTYnLFxuICAgICAgICAgICAgandrX3VybDogYGh0dHBzOi8vY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vJHt1c2VyUG9vbC51c2VyUG9vbElkID8/ICcnfS8ud2VsbC1rbm93bi9qd2tzLmpzb25gLFxuICAgICAgICAgICAgY2xhaW1zX2Zvcm1hdDogJ3N0cmluZ2lmaWVkX2pzb24nLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBzZWNyZXRzOiB7XG4gICAgICAgICAgLy8gVGltZVNjYWxlIGRhdGFiYXNlIHVybCB3aGljaCBpcyBtYW5kYXRvcnkgZm9yIHRoZSBpbWFnZVxuICAgICAgICAgIEhBU1VSQV9HUkFQSFFMX0RBVEFCQVNFX1VSTDogZWNzLlNlY3JldC5mcm9tU2VjcmV0c01hbmFnZXIoc2VjcmV0c21hbmFnZXIuU2VjcmV0LmZyb21TZWNyZXROYW1lVjIodGhpcywgJ2RiVXJsU2VjcmV0QXJuJywgREJDb25uZWN0aW9uU3RyaW5nKSksXG4gICAgICAgICAgSEFTVVJBX0dSQVBIUUxfQURNSU5fU0VDUkVUOiBlY3MuU2VjcmV0LmZyb21TZWNyZXRzTWFuYWdlcihoYXN1cmFTcHlkZXJBZG1pblNlY3JldCksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcHVibGljTG9hZEJhbGFuY2VyOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgaGFzdXJhUmVjb3JkID0gbmV3IHJvdXRlNTMuQVJlY29yZCh0aGlzLCAnaGFzdXJhUmVjb3JkJywge1xuICAgICAgcmVjb3JkTmFtZSxcbiAgICAgIHRhcmdldDogcm91dGU1My5SZWNvcmRUYXJnZXQuZnJvbUFsaWFzKG5ldyByb3V0ZTUzVGFyZ2V0cy5Mb2FkQmFsYW5jZXJUYXJnZXQoYWxiRWMyU2VydmljZS5sb2FkQmFsYW5jZXIpKSxcbiAgICAgIHpvbmU6IHByb3BzLnpvbmUsXG4gICAgfSk7XG5cbiAgICBuZXcgY29yZS5DZm5PdXRwdXQodGhpcywgJ0hhc3VyYVVybCcsIHtcbiAgICAgIHZhbHVlOiBoYXN1cmFSZWNvcmQuZG9tYWluTmFtZSxcbiAgICB9KTtcblxuICAgIGFsYkVjMlNlcnZpY2UudGFyZ2V0R3JvdXAuY29uZmlndXJlSGVhbHRoQ2hlY2soe1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIHBhdGg6ICcvaGVhbHRoeicsXG4gICAgICBoZWFsdGh5SHR0cENvZGVzOiAnMjAwJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGFsYXJtID0gbmV3IGNsb3Vkd2F0Y2guQWxhcm0odGhpcywgJ2hhc3VyYUFsYXJtJywge1xuICAgICAgbWV0cmljOiBhbGJFYzJTZXJ2aWNlLnRhcmdldEdyb3VwLm1ldHJpY0hlYWx0aHlIb3N0Q291bnQoKSxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjogY2xvdWR3YXRjaC5Db21wYXJpc29uT3BlcmF0b3IuTEVTU19USEFOX09SX0VRVUFMX1RPX1RIUkVTSE9MRCxcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6IGNsb3Vkd2F0Y2guVHJlYXRNaXNzaW5nRGF0YS5CUkVBQ0hJTkcsXG4gICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICBldmFsdWF0aW9uUGVyaW9kczogMSxcbiAgICB9KTtcbiAgICBjb25zdCB0b3BpYyA9IG5ldyBzbnMuVG9waWModGhpcywgJ2hhc3VyYUFsYXJtVG9waWMnKTtcbiAgICB0b3BpYy5hZGRTdWJzY3JpcHRpb24oXG4gICAgICBuZXcgc3Vic2NyaXB0aW9ucy5FbWFpbFN1YnNjcmlwdGlvbignY2xvdWQtbm90aWZpY2F0aW9uc0BuZWF0bGVhZi5jb20nKSxcbiAgICApXG4gICAgYWxhcm0uYWRkQWxhcm1BY3Rpb24obmV3IGFjdGlvbnMuU25zQWN0aW9uKHRvcGljKSk7XG5cbiAgICBjb25zdCBhd3NDbGllbnRzTGF5ZXIgPSBuZXcgUHl0aG9uTGF5ZXJWZXJzaW9uKHRoaXMsICdhd3NDbGllbnRzTGF5ZXInLCB7XG4gICAgICBlbnRyeTogJy4uL2RhdGFfcGlwZWxpbmUvYXdzX2NsaWVudHNfbGF5ZXIvc291cmNlJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHBvc3RncmVzTGF5ZXIgPSBuZXcgUHl0aG9uTGF5ZXJWZXJzaW9uKHRoaXMsICdwb3N0Z3Jlc0xheWVyMScsIHtcbiAgICAgIGVudHJ5OiAnLi4vZGF0YWJhc2VzL3Bvc3RncmVzX2xheWVyL3NvdXJjZScsXG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXRhMlRvcGljID0gbmV3IHNucy5Ub3BpYyh0aGlzLCAnZGF0YTJUb3BpYycsKTtcblxuICAgIGNvbnN0IGRhdGFCdWNrZXROYW1lID0gYCR7cHJvcHMuc3RhZ2V9LXNweWRlci12MS1kYXRhYnVja2V0YDtcblxuICAgIGNvbnN0IGRhdGFCdWNrZXQgPSBzMy5CdWNrZXQuZnJvbUJ1Y2tldE5hbWUodGhpcywgJ2RhdGFCdWNrZXQnLCBkYXRhQnVja2V0TmFtZSk7XG5cbiAgICBjb25zdCBkYXRhMlByb2Nlc3NpbmdEbHEgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsICdkYXRhMlByb2Nlc3NpbmdEbHEnKTtcbiAgICBjb25zdCBkYXRhMlByb2Nlc3NpbmdRdWV1ZSA9IG5ldyBzcXMuUXVldWUodGhpcywgJ2RhdGEyUHJvY2Vzc2luZ1F1ZXVlJywge1xuICAgICAgdmlzaWJpbGl0eVRpbWVvdXQ6IGNvcmUuRHVyYXRpb24uc2Vjb25kcyg5MDApLFxuICAgICAgZGVhZExldHRlclF1ZXVlOiB7IHF1ZXVlOiBkYXRhMlByb2Nlc3NpbmdEbHEsIG1heFJlY2VpdmVDb3VudDogMTAgfVxuICAgIH0pO1xuXG4gICAgLy8gaWYgd2UgbmVlZCB0byBjcmVhdGUgdGhlIGJ1Y2tldCBhZ2FpbiBjb21tZW50IHRoYXQgaW4hXG4gICAgLy8gY29uc3QgZGF0YUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ2RhdGFCdWNrZXQnLCB7XG4gICAgLy8gICBidWNrZXROYW1lOiBkYXRhQnVja2V0TmFtZSxcbiAgICAvLyB9KTtcbiAgICBkYXRhQnVja2V0LmFkZEV2ZW50Tm90aWZpY2F0aW9uKHMzLkV2ZW50VHlwZS5PQkpFQ1RfQ1JFQVRFRCwgbmV3IHMzbi5TcXNEZXN0aW5hdGlvbihkYXRhMlByb2Nlc3NpbmdRdWV1ZSksIHsgcHJlZml4OiAndXBsb2FkLycgfSk7XG5cbiAgICBjb25zdCBpbWFnZUJ1Y2tldE5hbWUgPSBgJHtwcm9wcy5zdGFnZX0tc3B5ZGVyLXYxLWltYWdlYnVja2V0YDtcblxuICAgIGNvbnN0IGltYWdlQnVja2V0ID0gczMuQnVja2V0LmZyb21CdWNrZXROYW1lKHRoaXMsICdpbWFnZUJ1Y2tldCcsIGltYWdlQnVja2V0TmFtZSk7XG5cbiAgICAvLyBpZiB3ZSBuZWVkIHRvIGNyZWF0ZSB0aGUgYnVja2V0IGFnYWluIGNvbW1lbnQgdGhhdCBpbiFcbiAgICBjb25zdCBpbWFnZUJ1Y2tldFRlc3QgPSBuZXcgczMuQnVja2V0KHRoaXMsICdpbWFnZUJ1Y2tldFRlc3QnLCB7XG4gICAgICBidWNrZXROYW1lOiBpbWFnZUJ1Y2tldE5hbWUgKyAndGVzdCcsXG4gICAgICBjb3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBhbGxvd2VkTWV0aG9kczogW1xuICAgICAgICAgICAgczMuSHR0cE1ldGhvZHMuR0VULFxuICAgICAgICAgICAgczMuSHR0cE1ldGhvZHMuSEVBRCxcbiAgICAgICAgICAgIHMzLkh0dHBNZXRob2RzLlBPU1QsXG4gICAgICAgICAgICBzMy5IdHRwTWV0aG9kcy5QVVQsXG4gICAgICAgICAgICBzMy5IdHRwTWV0aG9kcy5ERUxFVEUsXG4gICAgICAgICAgXSxcbiAgICAgICAgICAvLyBhbGxvd2VkT3JpZ2luczogWydodHRwOi8vbG9jYWxob3N0OjMwMDAnXSxcbiAgICAgICAgICBhbGxvd2VkT3JpZ2luczogWycqJ10sXG4gICAgICAgICAgYWxsb3dlZEhlYWRlcnM6IFsnKiddLFxuICAgICAgICAgIGV4cG9zZWRIZWFkZXJzOiBbXG4gICAgICAgICAgICAneC1hbXotc2VydmVyLXNpZGUtZW5jcnlwdGlvbicsXG4gICAgICAgICAgICAneC1hbXotcmVxdWVzdC1pZCcsXG4gICAgICAgICAgICAneC1hbXotaWQtMicsXG4gICAgICAgICAgICAnRVRhZycsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBtYXhBZ2U6IDMwMDAsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgYXV0aGVudGljYXRlZFJvbGUuYWRkVG9Qb2xpY3kobmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogW1xuICAgICAgICAnczM6R2V0T2JqZWN0JyxcbiAgICAgICAgJ3MzOkxpc3RCdWNrZXQnLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBpbWFnZUJ1Y2tldC5idWNrZXRBcm4gKyAnLyonLFxuICAgICAgICBpbWFnZUJ1Y2tldC5idWNrZXRBcm4sXG4gICAgICAgIGltYWdlQnVja2V0VGVzdC5idWNrZXRBcm4gKyAnLyonLFxuICAgICAgICBpbWFnZUJ1Y2tldFRlc3QuYnVja2V0QXJuLFxuICAgICAgXSxcbiAgICB9KSk7XG4gICAgY29uc3Qgc29mdHdhcmVCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdzb2Z0d2FyZUJ1Y2tldCcpO1xuXG4gICAgbmV3IGNvcmUuQ2ZuT3V0cHV0KHRoaXMsICdpbWFnZUJ1Y2tldE5hbWUnLCB7XG4gICAgICB2YWx1ZTogaW1hZ2VCdWNrZXQuYnVja2V0TmFtZSxcbiAgICB9KTtcblxuICAgIGltYWdlQnVja2V0LmFkZFRvUmVzb3VyY2VQb2xpY3kobmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgcHJpbmNpcGFsczogW25ldyBpYW0uQXJuUHJpbmNpcGFsKGF1dGhlbnRpY2F0ZWRSb2xlLnJvbGVBcm4pXSxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgXCJzMzpHZXRPYmplY3RcIixcbiAgICAgICAgXCJzMzpMaXN0QnVja2V0XCJcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgaW1hZ2VCdWNrZXQuYnVja2V0QXJuICsgJy8qJyxcbiAgICAgICAgaW1hZ2VCdWNrZXQuYnVja2V0QXJuLFxuICAgICAgXSxcbiAgICB9KSk7XG5cbiAgICBpbWFnZUJ1Y2tldFRlc3QuYWRkVG9SZXNvdXJjZVBvbGljeShuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBwcmluY2lwYWxzOiBbbmV3IGlhbS5Bcm5QcmluY2lwYWwoYXV0aGVudGljYXRlZFJvbGUucm9sZUFybildLFxuICAgICAgYWN0aW9uczogW1xuICAgICAgICBcInMzOkdldE9iamVjdFwiLFxuICAgICAgICBcInMzOkxpc3RCdWNrZXRcIlxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBpbWFnZUJ1Y2tldC5idWNrZXRBcm4gKyAnLyonLFxuICAgICAgICBpbWFnZUJ1Y2tldC5idWNrZXRBcm4sXG4gICAgICBdLFxuICAgIH0pKTtcblxuICAgIG5ldyBjb3JlLkNmbk91dHB1dCh0aGlzLCAnZGF0YUJ1Y2tldE5hbWUnLCB7XG4gICAgICB2YWx1ZTogZGF0YUJ1Y2tldC5idWNrZXROYW1lLFxuICAgIH0pO1xuXG4gICAgbmV3IGNvcmUuQ2ZuT3V0cHV0KHRoaXMsICdzb2Z0d2FyZUJ1Y2tldE5hbWUnLCB7XG4gICAgICB2YWx1ZTogc29mdHdhcmVCdWNrZXQuYnVja2V0TmFtZSxcbiAgICB9KTtcblxuICAgIGF1dGhlbnRpY2F0ZWRSb2xlLmFkZFRvUHJpbmNpcGFsUG9saWN5KG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgJ3MzOkdldE9iamVjdCcsXG4gICAgICAgICdzMzpMaXN0QnVja2V0JyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgc29mdHdhcmVCdWNrZXQuYnVja2V0QXJuLFxuICAgICAgICBzb2Z0d2FyZUJ1Y2tldC5idWNrZXRBcm4gKyAnLyonLFxuICAgICAgXSxcbiAgICB9KSk7XG5cbiAgICBhdXRoZW50aWNhdGVkUm9sZS5hZGRUb1ByaW5jaXBhbFBvbGljeShuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdzMzpQdXRPYmplY3QnLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBkYXRhQnVja2V0LmJ1Y2tldEFybiArICcvdXBsb2FkLyonLFxuICAgICAgICBkYXRhQnVja2V0LmJ1Y2tldEFybiArICcvdGVzdF91cGxvYWQvKicsXG4gICAgICAgIGRhdGFCdWNrZXQuYnVja2V0QXJuICsgJy90ZXN0LyonLFxuICAgICAgXSxcbiAgICB9KSk7XG5cbiAgICBjb25zdCBlbWFpbCA9ICdjbG91ZC1ub3RpZmljYXRpb25zQG5lYXRsZWFmLmNvbSc7XG5cbiAgICBpZiAocHJvcHMuZW5hYmxlQWxhcm1zKSB7XG4gICAgICBjb25zdCBkYXRhMlByb2Nlc3NpbmdEbHFGYWlsZWRBbGFybSA9IG5ldyBjbG91ZHdhdGNoLkFsYXJtKHRoaXMsICdkYXRhMlByb2Nlc3NpbmdEbHFGYWlsZWRBbGFybScsIHtcbiAgICAgICAgbWV0cmljOiBkYXRhMlByb2Nlc3NpbmdEbHEubWV0cmljTnVtYmVyT2ZNZXNzYWdlc1JlY2VpdmVkKCksXG4gICAgICAgIHRocmVzaG9sZDogMSxcbiAgICAgICAgZXZhbHVhdGlvblBlcmlvZHM6IDEsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEyUHJvY2Vzc2luZ0RscUZhaWxlZFRvcGljID0gbmV3IHNucy5Ub3BpYyh0aGlzLCAnZGF0YTJQcm9jZXNzaW5nRGxxRmFpbGVkVG9waWMnKTtcbiAgICAgIGRhdGEyUHJvY2Vzc2luZ0RscUZhaWxlZFRvcGljLmFkZFN1YnNjcmlwdGlvbihcbiAgICAgICAgbmV3IHN1YnNjcmlwdGlvbnMuRW1haWxTdWJzY3JpcHRpb24oZW1haWwpLFxuICAgICAgKTtcbiAgICAgIGRhdGEyUHJvY2Vzc2luZ0RscUZhaWxlZEFsYXJtLmFkZEFsYXJtQWN0aW9uKG5ldyBhY3Rpb25zLlNuc0FjdGlvbihkYXRhMlByb2Nlc3NpbmdEbHFGYWlsZWRUb3BpYykpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBEYXRhMlByb3RvUHJvY2Vzc2luZyBGdW5jdGlvbi5cbiAgICBjb25zdCBkYXRhMiA9IG5ldyBQeXRob25GdW5jdGlvbih0aGlzLCAnRGF0YTJQcm90b1Byb2Nlc3NpbmcnLCB7XG4gICAgICBlbnRyeTogJy4uL2RhdGFfcGlwZWxpbmUvZGF0YTJfcHJvdG9fcHJvY2Vzc2luZ19sYW1iZGEvc291cmNlJyxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLlBZVEhPTl8zXzcsXG4gICAgICBpbmRleDogJ2xhbWJkYV9oYW5kbGVyLnB5JyxcbiAgICAgIGhhbmRsZXI6ICdsYW1iZGFfaGFuZGxlcicsXG4gICAgICBsYXllcnM6IFthd3NDbGllbnRzTGF5ZXIsIHBvc3RncmVzTGF5ZXJdLFxuICAgICAgbWVtb3J5U2l6ZTogMTAyNDAsXG4gICAgICBkZWFkTGV0dGVyUXVldWVFbmFibGVkOiB0cnVlLFxuICAgICAgdGltZW91dDogY29yZS5EdXJhdGlvbi5taW51dGVzKDE1KSxcbiAgICAgIHJlc2VydmVkQ29uY3VycmVudEV4ZWN1dGlvbnM6IDEwLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgSU1BR0VTX0JVQ0tFVDogaW1hZ2VCdWNrZXQuYnVja2V0TmFtZSxcbiAgICAgICAgU05TX1RPUElDX0FSTjogZGF0YTJUb3BpYy50b3BpY0FybixcbiAgICAgICAgUkVMQVRJT05BTF9EQVRBQkFTRV9FTkRQT0lOVDogY29yZS5TZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcihEQkNvbm5lY3Rpb25TdHJpbmcpLnRvU3RyaW5nKCksXG4gICAgICB9LFxuICAgICAgZXZlbnRzOiBbbmV3IHNvdXJjZXMuU3FzRXZlbnRTb3VyY2UoZGF0YTJQcm9jZXNzaW5nUXVldWUpXSxcbiAgICB9KTtcbiAgICAvLyBTZXQgRGF0YTJQcm90b1Byb2Nlc3NpbmcgcGVybWlzc2lvbnMuXG4gICAgY29uc3QgZGF0YTJQb2xpY3kgPSBuZXcgaWFtLlBvbGljeSh0aGlzLCAnZGF0YTJQcm90b1Byb2Nlc3NpbmdQb2xpY3knLCB7XG4gICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgICAgIGltYWdlQnVja2V0LmJ1Y2tldEFybixcbiAgICAgICAgICAgIGltYWdlQnVja2V0LmJ1Y2tldEFybiArIFwiLypcIixcbiAgICAgICAgICAgIGltYWdlQnVja2V0VGVzdC5idWNrZXRBcm4sXG4gICAgICAgICAgICBpbWFnZUJ1Y2tldFRlc3QuYnVja2V0QXJuICsgXCIvKlwiLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgXCJzMzpQdXRPYmplY3RcIixcbiAgICAgICAgICAgIFwiczM6R2V0T2JqZWN0QWNsXCIsXG4gICAgICAgICAgICBcInMzOlB1dE9iamVjdEFjbFwiXG4gICAgICAgICAgXVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgIHJlc291cmNlczogW1xuICAgICAgICAgICAgZGF0YUJ1Y2tldC5idWNrZXRBcm4sXG4gICAgICAgICAgICBkYXRhQnVja2V0LmJ1Y2tldEFybiArIFwiLypcIixcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIFwiczM6RGVsZXRlT2JqZWN0XCIsXG4gICAgICAgICAgICBcInMzOkdldE9iamVjdFwiLFxuICAgICAgICAgICAgXCJzMzpQdXRPYmplY3RcIixcbiAgICAgICAgICBdXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgICAgICBkYXRhMi5mdW5jdGlvbkFybixcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIFwibGFtYmRhOkxpc3RUYWdzXCIsXG4gICAgICAgICAgXVxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgIHJlc291cmNlczogW1xuICAgICAgICAgICAgZGF0YTJUb3BpYy50b3BpY0FybixcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgICdTTlM6UHVibGlzaCcsXG4gICAgICAgICAgXVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0pO1xuICAgIGRhdGEyLnJvbGU/LmF0dGFjaElubGluZVBvbGljeShkYXRhMlBvbGljeSk7XG5cbiAgICBpbWFnZUJ1Y2tldC5ncmFudFJlYWRXcml0ZShkYXRhMik7XG4gICAgaW1hZ2VCdWNrZXRUZXN0LmdyYW50UmVhZFdyaXRlKGRhdGEyKTtcblxuICAgIGNvcmUuVGFncy5vZihkYXRhMikuYWRkKCdjb21taXRfdXJsJywgYGh0dHBzOi8vYml0YnVja2V0Lm9yZy9uZWF0bGVhZi9uZWF0bGVhZi9jb21taXRzLyR7cHJvY2Vzcy5lbnYuQ09NTUlUX0lEfWApO1xuICAgIG5ldyBjb3JlLkNmbk91dHB1dCh0aGlzLCAnY29tbWl0X3VybCcsIHtcbiAgICAgIHZhbHVlOiBgaHR0cHM6Ly9iaXRidWNrZXQub3JnL25lYXRsZWFmL25lYXRsZWFmL2NvbW1pdHMvJHtwcm9jZXNzLmVudi5DT01NSVRfSUR9YCxcbiAgICB9KTtcblxuICAgIGlmIChwcm9wcy5lbmFibGVBbGFybXMpIHtcbiAgICAgIGlmIChkYXRhMi5kZWFkTGV0dGVyUXVldWUpIHtcbiAgICAgICAgY29uc3QgZGF0YTJEbHFGYWlsZWRBbGFybSA9IG5ldyBjbG91ZHdhdGNoLkFsYXJtKHRoaXMsICdkYXRhMkRscUZhaWxlZEFsYXJtJywge1xuICAgICAgICAgIG1ldHJpYzogZGF0YTIuZGVhZExldHRlclF1ZXVlLm1ldHJpY051bWJlck9mTWVzc2FnZXNSZWNlaXZlZCgpLFxuICAgICAgICAgIHRocmVzaG9sZDogMSxcbiAgICAgICAgICBldmFsdWF0aW9uUGVyaW9kczogMSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGRhdGEyRGxxRmFpbGVkVG9waWMgPSBuZXcgc25zLlRvcGljKHRoaXMsICdkYXRhMkRscUZhaWxlZFRvcGljJyk7XG4gICAgICAgIGRhdGEyRGxxRmFpbGVkVG9waWMuYWRkU3Vic2NyaXB0aW9uKFxuICAgICAgICAgIG5ldyBzdWJzY3JpcHRpb25zLkVtYWlsU3Vic2NyaXB0aW9uKGVtYWlsKSxcbiAgICAgICAgKTtcbiAgICAgICAgZGF0YTJEbHFGYWlsZWRBbGFybS5hZGRBbGFybUFjdGlvbihuZXcgYWN0aW9ucy5TbnNBY3Rpb24oZGF0YTJEbHFGYWlsZWRUb3BpYykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhMkZhaWxlZEFsYXJtID0gbmV3IGNsb3Vkd2F0Y2guQWxhcm0odGhpcywgJ2RhdGEyRmFpbGVkQWxhcm0nLCB7XG4gICAgICAgIG1ldHJpYzogZGF0YTIubWV0cmljRXJyb3JzKCksXG4gICAgICAgIHRocmVzaG9sZDogMSxcbiAgICAgICAgZXZhbHVhdGlvblBlcmlvZHM6IDEsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEyRmFpbGVkVG9waWMgPSBuZXcgc25zLlRvcGljKHRoaXMsICdkYXRhMkZhaWxlZFRvcGljJyk7XG4gICAgICBkYXRhMkZhaWxlZFRvcGljLmFkZFN1YnNjcmlwdGlvbihcbiAgICAgICAgbmV3IHN1YnNjcmlwdGlvbnMuRW1haWxTdWJzY3JpcHRpb24oZW1haWwpLFxuICAgICAgKTtcbiAgICAgIGRhdGEyRmFpbGVkQWxhcm0uYWRkQWxhcm1BY3Rpb24obmV3IGFjdGlvbnMuU25zQWN0aW9uKGRhdGEyRmFpbGVkVG9waWMpKTtcbiAgICB9XG5cblxuICAgIGNvbnN0IGhlYXRtYXBQcm9jZXNzaW5nUXVldWUgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsICdoZWF0bWFwUHJvY2Vzc2luZ1F1ZXVlJywge1xuICAgICAgdmlzaWJpbGl0eVRpbWVvdXQ6IGNvcmUuRHVyYXRpb24uc2Vjb25kcyg5MDApLFxuICAgICAgZGVhZExldHRlclF1ZXVlOiB7IHF1ZXVlOiBuZXcgc3FzLlF1ZXVlKHRoaXMsICdoZWF0bWFwUHJvY2Vzc2luZ0RscScpLCBtYXhSZWNlaXZlQ291bnQ6IDEwIH1cbiAgICB9KTtcbiAgICBkYXRhMlRvcGljLmFkZFN1YnNjcmlwdGlvbihuZXcgc3Vic2NyaXB0aW9ucy5TcXNTdWJzY3JpcHRpb24oaGVhdG1hcFByb2Nlc3NpbmdRdWV1ZSkpO1xuXG4gICAgY29uc3QgaGVhdG1hcCA9IG5ldyBQeXRob25GdW5jdGlvbih0aGlzLCAnSGVhdG1hcHNBbmRTdGF0aXN0aWNzJywge1xuICAgICAgZW50cnk6ICcuLi9kYXRhX3BpcGVsaW5lL2dlbmVyYXRlX2hlYXRtYXBfYW5kX3N0YXRpc3RpY3Mvc291cmNlJyxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLlBZVEhPTl8zXzcsXG4gICAgICBpbmRleDogJ2xhbWJkYV9oYW5kbGVyLnB5JyxcbiAgICAgIGhhbmRsZXI6ICdsYW1iZGFfaGFuZGxlcicsXG4gICAgICBsYXllcnM6IFthd3NDbGllbnRzTGF5ZXIsIHBvc3RncmVzTGF5ZXJdLFxuICAgICAgbWVtb3J5U2l6ZTogMjU2LFxuICAgICAgcmVzZXJ2ZWRDb25jdXJyZW50RXhlY3V0aW9uczogMTAsXG4gICAgICBkZWFkTGV0dGVyUXVldWVFbmFibGVkOiB0cnVlLFxuICAgICAgdGltZW91dDogY29yZS5EdXJhdGlvbi5taW51dGVzKDE1KSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFNOU19UT1BJQ19BUk46IGRhdGEyVG9waWMudG9waWNBcm4sXG4gICAgICAgIFJFTEFUSU9OQUxfREFUQUJBU0VfRU5EUE9JTlQ6IGNvcmUuU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoREJDb25uZWN0aW9uU3RyaW5nKS50b1N0cmluZygpLFxuICAgICAgfSxcbiAgICAgIGV2ZW50czogW25ldyBzb3VyY2VzLlNxc0V2ZW50U291cmNlKGhlYXRtYXBQcm9jZXNzaW5nUXVldWUpXSxcbiAgICB9KTtcblxuICAgIC8vIENyZWF0ZSBwb2xpY3kgZm9yIGhlYXRtYXAgYW5kIHN0YXRpc3RpY3MgbGFtYmRhIHRvIHJldHJpZXZlIGl0cyBvd24gdGFncy5cbiAgICBjb25zdCBoZWF0bWFwUG9saWN5ID0gbmV3IGlhbS5Qb2xpY3kodGhpcywgJ2hlYXRtYXBBbmRTdGF0aXN0aWNzUG9saWN5Jywge1xuICAgICAgc3RhdGVtZW50czogW1xuICAgICAgICBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgICAgICBoZWF0bWFwLmZ1bmN0aW9uQXJuLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgXCJsYW1iZGE6TGlzdFRhZ3NcIixcbiAgICAgICAgICBdXG4gICAgICAgIH0pLFxuICAgICAgXVxuICAgIH0pO1xuICAgIGhlYXRtYXAucm9sZT8uYXR0YWNoSW5saW5lUG9saWN5KGhlYXRtYXBQb2xpY3kpO1xuXG4gICAgY29yZS5UYWdzLm9mKGhlYXRtYXApLmFkZCgnY29tbWl0X3VybCcsIGBodHRwczovL2JpdGJ1Y2tldC5vcmcvbmVhdGxlYWYvbmVhdGxlYWYvY29tbWl0cy8ke3Byb2Nlc3MuZW52LkNPTU1JVF9JRH1gKTtcblxuICAgIGlmIChwcm9wcy5lbmFibGVBbGFybXMpIHtcbiAgICAgIGlmIChoZWF0bWFwLmRlYWRMZXR0ZXJRdWV1ZSkge1xuICAgICAgICBjb25zdCBoZWF0bWFwRGxxRmFpbGVkQWxhcm0gPSBuZXcgY2xvdWR3YXRjaC5BbGFybSh0aGlzLCAnaGVhdG1hcERscUZhaWxlZEFsYXJtJywge1xuICAgICAgICAgIG1ldHJpYzogaGVhdG1hcC5kZWFkTGV0dGVyUXVldWUubWV0cmljTnVtYmVyT2ZNZXNzYWdlc1JlY2VpdmVkKCksXG4gICAgICAgICAgdGhyZXNob2xkOiAxLFxuICAgICAgICAgIGV2YWx1YXRpb25QZXJpb2RzOiAxLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgaGVhdG1hcERscUZhaWxlZFRvcGljID0gbmV3IHNucy5Ub3BpYyh0aGlzLCAnaGVhdG1hcERscUZhaWxlZFRvcGljJyk7XG4gICAgICAgIGhlYXRtYXBEbHFGYWlsZWRUb3BpYy5hZGRTdWJzY3JpcHRpb24oXG4gICAgICAgICAgbmV3IHN1YnNjcmlwdGlvbnMuRW1haWxTdWJzY3JpcHRpb24oZW1haWwpLFxuICAgICAgICApO1xuICAgICAgICBoZWF0bWFwRGxxRmFpbGVkQWxhcm0uYWRkQWxhcm1BY3Rpb24obmV3IGFjdGlvbnMuU25zQWN0aW9uKGhlYXRtYXBEbHFGYWlsZWRUb3BpYykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBoZWF0bWFwRmFpbGVkQWxhcm0gPSBuZXcgY2xvdWR3YXRjaC5BbGFybSh0aGlzLCAnaGVhdG1hcEZhaWxlZEFsYXJtJywge1xuICAgICAgICBtZXRyaWM6IGhlYXRtYXAubWV0cmljRXJyb3JzKCksXG4gICAgICAgIHRocmVzaG9sZDogMSxcbiAgICAgICAgZXZhbHVhdGlvblBlcmlvZHM6IDEsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGhlYXRtYXBGYWlsZWRUb3BpYyA9IG5ldyBzbnMuVG9waWModGhpcywgJ2hlYXRtYXBGYWlsZWRUb3BpYycpO1xuICAgICAgaGVhdG1hcEZhaWxlZFRvcGljLmFkZFN1YnNjcmlwdGlvbihcbiAgICAgICAgbmV3IHN1YnNjcmlwdGlvbnMuRW1haWxTdWJzY3JpcHRpb24oZW1haWwpLFxuICAgICAgKTtcbiAgICAgIGhlYXRtYXBGYWlsZWRBbGFybS5hZGRBbGFybUFjdGlvbihuZXcgYWN0aW9ucy5TbnNBY3Rpb24oaGVhdG1hcEZhaWxlZFRvcGljKSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgZGRiLlRhYmxlKHRoaXMsICdTcHlkZXJWMUxvZ3MnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ3N5c3RlbUlkJywgdHlwZTogZGRiLkF0dHJpYnV0ZVR5cGUuTlVNQkVSIH0sXG4gICAgICBzb3J0S2V5OiB7IG5hbWU6ICd0aW1lc3RhbXAnLCB0eXBlOiBkZGIuQXR0cmlidXRlVHlwZS5OVU1CRVIgfSxcbiAgICAgIGJpbGxpbmdNb2RlOiBkZGIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgIH0pO1xuXG4gICAgdGFibGUuYWRkTG9jYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdTeXN0ZW1JZE1vZHVsZUluZGV4JyxcbiAgICAgIHNvcnRLZXk6IHsgbmFtZTogJ21vZHVsZScsIHR5cGU6IGRkYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgIH0pO1xuXG4gICAgdGFibGUuYWRkTG9jYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdTeXN0ZW1JZExldmVsSW5kZXgnLFxuICAgICAgc29ydEtleTogeyBuYW1lOiAnbGV2ZWwnLCB0eXBlOiBkZGIuQXR0cmlidXRlVHlwZS5OVU1CRVIgfSxcbiAgICB9KTtcblxuICAgIG5ldyBjb3JlLkNmbk91dHB1dCh0aGlzLCAndGFibGVBcm4nLCB7XG4gICAgICB2YWx1ZTogdGFibGUudGFibGVBcm4sXG4gICAgfSk7XG5cbiAgICBuZXcgY29yZS5DZm5PdXRwdXQodGhpcywgJ3RhYmxlTmFtZScsIHtcbiAgICAgIHZhbHVlOiB0YWJsZS50YWJsZU5hbWUsXG4gICAgfSk7XG5cbiAgICBhdXRoZW50aWNhdGVkUm9sZS5hZGRUb1ByaW5jaXBhbFBvbGljeShuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdkeW5hbW9kYjpCYXRjaFdyaXRlSXRlbScsXG4gICAgICAgICdkeW5hbW9kYjpQdXRJdGVtJ1xuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICB0YWJsZS50YWJsZUFybixcbiAgICAgIF0sXG4gICAgfSkpO1xuXG4gICAgY29uc3QgaW5mb0xhbWJkYSA9IG5ldyBsYW1iZGFqcy5Ob2RlanNGdW5jdGlvbih0aGlzLCAnaW5mbycsIHtcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIGFjY291bnRfaWQ6IHRoaXMuYWNjb3VudCxcbiAgICAgICAgbG9naW5fY2xpZW50X2lkOiB1c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkLFxuICAgICAgICBjb2duaXRvX3VzZXJfcG9vbDogdXNlclBvb2wudXNlclBvb2xJZCxcbiAgICAgICAgY29nbml0b19wb29sX2FkZHJlc3M6IGBjb2duaXRvLWlkcC4ke3RoaXMucmVnaW9ufS5hbWF6b25hd3MuY29tLyR7dXNlclBvb2wudXNlclBvb2xJZH1gLFxuICAgICAgICBpZGVudGl0eV9wb29sX2lkOiBpZGVudGl0eVBvb2wucmVmLFxuICAgICAgICBwcm90b19idWNrZXQ6IGRhdGFCdWNrZXQuYnVja2V0TmFtZSxcbiAgICAgICAgc29mdHdhcmVfYnVja2V0OiBzb2Z0d2FyZUJ1Y2tldC5idWNrZXROYW1lLFxuICAgICAgICBsb2dnaW5nX3RhYmxlOiB0YWJsZS50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3B5ZGVySW5mb1JlY29yZE5hbWUgPSAnc3B5ZGVyLWluZm8nO1xuXG4gICAgY29uc3QgaW5mb0NlcnRpZmljYXRlID0gbmV3IGNlcnRpZmljYXRlbWFuYWdlci5EbnNWYWxpZGF0ZWRDZXJ0aWZpY2F0ZSh0aGlzLCAnaW5mb0NlcnRpZmljYXRlJywge1xuICAgICAgZG9tYWluTmFtZTogYCR7c3B5ZGVySW5mb1JlY29yZE5hbWV9LiR7cHJvcHMuZG9tYWluTmFtZX1gLFxuICAgICAgaG9zdGVkWm9uZTogcHJvcHMuem9uZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGluZm9BcGkgPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFSZXN0QXBpKHRoaXMsICdpbmZvQXBpJywge1xuICAgICAgaGFuZGxlcjogaW5mb0xhbWJkYSxcbiAgICAgIHByb3h5OiB0cnVlLFxuICAgICAgZG9tYWluTmFtZToge1xuICAgICAgICBkb21haW5OYW1lOiBgJHtzcHlkZXJJbmZvUmVjb3JkTmFtZX0uJHtwcm9wcy5kb21haW5OYW1lfWAsXG4gICAgICAgIGNlcnRpZmljYXRlOiBpbmZvQ2VydGlmaWNhdGUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgaW5mb1JlY29yZCA9IG5ldyByb3V0ZTUzLkFSZWNvcmQodGhpcywgJ2luZm9SZWNvcmQnLCB7XG4gICAgICByZWNvcmROYW1lOiBzcHlkZXJJbmZvUmVjb3JkTmFtZSxcbiAgICAgIHRhcmdldDogcm91dGU1My5SZWNvcmRUYXJnZXQuZnJvbUFsaWFzKG5ldyByb3V0ZTUzVGFyZ2V0cy5BcGlHYXRld2F5KGluZm9BcGkpKSxcbiAgICAgIHpvbmU6IHByb3BzLnpvbmUsXG4gICAgfSk7XG5cbiAgICBuZXcgY29yZS5DZm5PdXRwdXQodGhpcywgJ0luZm9VcmwnLCB7XG4gICAgICB2YWx1ZTogaW5mb1JlY29yZC5kb21haW5OYW1lLFxuICAgIH0pO1xuICB9XG59XG4iXX0=