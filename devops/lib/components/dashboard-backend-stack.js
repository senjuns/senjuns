"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardBackendStack = void 0;
const core = require("@aws-cdk/core");
const ec2 = require("@aws-cdk/aws-ec2");
const aws_ecs_patterns_1 = require("@aws-cdk/aws-ecs-patterns");
const ecs = require("@aws-cdk/aws-ecs");
const aws_rds_1 = require("@aws-cdk/aws-rds");
const secretsmanager = require("@aws-cdk/aws-secretsmanager");
const cloudwatch = require("@aws-cdk/aws-cloudwatch");
const certificatemanager = require("@aws-cdk/aws-certificatemanager");
const cognito = require("@aws-cdk/aws-cognito");
const route53 = require("@aws-cdk/aws-route53");
const route53Targets = require("@aws-cdk/aws-route53-targets");
const subscriptions = require("@aws-cdk/aws-sns-subscriptions");
const sns = require("@aws-cdk/aws-sns");
const actions = require("@aws-cdk/aws-cloudwatch-actions");
const iam = require("@aws-cdk/aws-iam");
const lambda = require("@aws-cdk/aws-lambda");
const lambdajs = require("@aws-cdk/aws-lambda-nodejs");
const events = require("@aws-cdk/aws-events");
const targets = require("@aws-cdk/aws-events-targets");
const cr = require("@aws-cdk/custom-resources");
const logs = require("@aws-cdk/aws-logs");
const s3 = require("@aws-cdk/aws-s3");
/**
 * Hasura Stack for using ECS to run Hasura as a Container in Ec2.
 */
class DashboardBackendStack extends core.Stack {
    /**
     * Creates a new Hasura Stack.
     *
     * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
     * @param id The construct ID of this stack.
     * @param props Stack properties including specific Hasura properties.
     */
    constructor(scope, id, props) {
        var _a;
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
        }
        else {
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
            };
            claimsLambda.addPermission('InvokePreTokenGenerationHandlerPermission', invokeCognitoTriggerPermission);
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
        const userPoolClient = new cognito.UserPoolClient(this, 'userPoolClient', {
            userPool: userPool,
            generateSecret: true,
            preventUserExistenceErrors: true,
        });
        new core.CfnOutput(this, 'UserPoolClientId', {
            value: userPoolClient.userPoolClientId,
        });
        const identityPool = new cognito.CfnIdentityPool(this, 'DashboardIdentityPool', {
            cognitoIdentityProviders: [
                {
                    clientId: userPoolClient.userPoolClientId,
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
            description: 'Default role for authenticated users',
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
            roleMappings: {
                mapping: {
                    type: 'Token',
                    ambiguousRoleResolution: 'AuthenticatedRole',
                    identityProvider: `cognito-idp.${core.Stack.of(this).region}.amazonaws.com/${userPool.userPoolId}:${userPoolClient.userPoolClientId}`,
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
        topic.addSubscription(new subscriptions.EmailSubscription('cloud-notifications@neatleaf.com'));
        alarm.addAlarmAction(new actions.SnsAction(topic));
        if (props.useRdsDb) {
            const vpc = new ec2.Vpc(this, 'vpc', {
                maxAzs: 2,
                subnetConfiguration: [{
                        name: 'public',
                        subnetType: ec2.SubnetType.PUBLIC,
                    }],
            });
            const hasuraDatabase = new aws_rds_1.DatabaseInstance(this, 'HasuraDatabase', {
                engine: aws_rds_1.DatabaseInstanceEngine.postgres({
                    version: aws_rds_1.PostgresEngineVersion.VER_13_3,
                }),
                instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
                credentials: aws_rds_1.Credentials.fromGeneratedSecret('tsdbadmin'),
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
            const hasuraUserSecret = new aws_rds_1.DatabaseSecret(this, 'HasuraDatabaseUser', {
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
                value: hasuraDatabase.secret.secretArn,
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
exports.DashboardBackendStack = DashboardBackendStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLWJhY2tlbmQtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Rhc2hib2FyZC1iYWNrZW5kLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMsZ0VBQThFO0FBQzlFLHdDQUF3QztBQUN4Qyw4Q0FBZ0k7QUFDaEksOERBQThEO0FBQzlELHNEQUFzRDtBQUN0RCxzRUFBc0U7QUFDdEUsZ0RBQWdEO0FBQ2hELGdEQUFnRDtBQUNoRCwrREFBK0Q7QUFDL0QsZ0VBQWdFO0FBQ2hFLHdDQUF3QztBQUN4QywyREFBMkQ7QUFDM0Qsd0NBQXdDO0FBQ3hDLDhDQUE4QztBQUM5Qyx1REFBdUQ7QUFDdkQsOENBQThDO0FBQzlDLHVEQUF1RDtBQUN2RCxnREFBZ0Q7QUFDaEQsMENBQTBDO0FBQzFDLHNDQUFzQztBQXVCdEM7O0dBRUc7QUFDSCxNQUFhLHFCQUFzQixTQUFRLElBQUksQ0FBQyxLQUFLO0lBQ25EOzs7Ozs7T0FNRztJQUNILFlBQVksS0FBcUIsRUFBRSxFQUFVLEVBQUUsS0FBaUM7O1FBQzlFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzdELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7UUFlM0IsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEgsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDckIsUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxtQkFBbUIsRUFBRTtnQkFDdkUsZ0JBQWdCLEVBQUU7b0JBQ2hCLGVBQWUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBQztpQkFDMUU7Z0JBQ0QsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtnQkFDeEMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsY0FBYyxFQUFFO29CQUNkLFNBQVMsRUFBRSxDQUFDO29CQUNaLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLGFBQWEsRUFBRSxJQUFJO29CQUNuQixjQUFjLEVBQUUsSUFBSTtpQkFDckI7Z0JBQ0QsaUJBQWlCLEVBQUUsSUFBSTtnQkFDdkIsVUFBVSxFQUFFO29CQUNWLEtBQUssRUFBRSxJQUFJO2lCQUNaO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixVQUFVLEVBQUU7d0JBQ1YsT0FBTyxFQUFFLElBQUk7d0JBQ2IsUUFBUSxFQUFFLElBQUk7cUJBQ2Y7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULE9BQU8sRUFBRSxJQUFJO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3FCQUNmO29CQUNELEtBQUssRUFBRTt3QkFDTCxPQUFPLEVBQUUsSUFBSTt3QkFDYixRQUFRLEVBQUUsSUFBSTtxQkFDZjtvQkFDRCxXQUFXLEVBQUU7d0JBQ1gsT0FBTyxFQUFFLElBQUk7d0JBQ2IsUUFBUSxFQUFFLElBQUk7cUJBQ2Y7aUJBQ0Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxrQkFBa0IsRUFBRSxZQUFZO2lCQUNqQzthQUNGLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQy9DLFlBQVksRUFBRSx3QkFBd0I7Z0JBQ3RDLFFBQVEsRUFBRTtvQkFDUixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ25CLE9BQU8sRUFBRSxnQ0FBZ0M7b0JBQ3pDLE1BQU0sRUFBRSxnQkFBZ0I7b0JBQ3hCLFVBQVUsRUFBRTt3QkFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7d0JBQy9CLFlBQVksRUFBRTs0QkFDWixrQkFBa0IsRUFBRSxZQUFZLENBQUMsV0FBVzt5QkFDN0M7cUJBQ0Y7b0JBQ0Qsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2lCQUNsRTtnQkFDRCxNQUFNLEVBQUUsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDeEcsQ0FBQyxDQUFDO1lBRUgsTUFBTSw4QkFBOEIsR0FBRztnQkFDckMsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDO2dCQUNoRSxTQUFTLEVBQUUsUUFBUSxDQUFDLFdBQVc7YUFDaEMsQ0FBQTtZQUNELFlBQVksQ0FBQyxhQUFhLENBQUMsMkNBQTJDLEVBQUUsOEJBQThCLENBQUMsQ0FBQTtTQUN4RztRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3JDLEtBQUssRUFBRSxRQUFRLENBQUMsVUFBVTtTQUMzQixDQUFDLENBQUM7UUFFSCxNQUFNLGlCQUFpQixHQUFHLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDOUUsUUFBUSxFQUFFLFFBQVE7WUFDbEIsY0FBYyxFQUFFLEtBQUs7WUFDckIsMEJBQTBCLEVBQUUsSUFBSTtZQUNoQyxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFO29CQUNMLHNCQUFzQixFQUFFLEtBQUs7b0JBQzdCLGlCQUFpQixFQUFFLElBQUk7aUJBQ3hCO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQzlDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxnQkFBZ0I7U0FDMUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxjQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN4RSxRQUFRLEVBQUUsUUFBUTtZQUNsQixjQUFjLEVBQUUsSUFBSTtZQUNwQiwwQkFBMEIsRUFBRSxJQUFJO1NBQ2pDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDM0MsS0FBSyxFQUFFLGNBQWMsQ0FBQyxnQkFBZ0I7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRTtZQUM5RSx3QkFBd0IsRUFBRTtnQkFDeEI7b0JBQ0UsUUFBUSxFQUFFLGNBQWMsQ0FBQyxnQkFBZ0I7b0JBQ3pDLFlBQVksRUFBRSxlQUFlLElBQUksQ0FBQyxNQUFNLGtCQUFrQixRQUFRLENBQUMsVUFBVSxFQUFFO2lCQUNoRjthQUNGO1lBQ0QsOEJBQThCLEVBQUUsSUFBSTtTQUNyQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3pDLEtBQUssRUFBRSxZQUFZLENBQUMsR0FBRztTQUN4QixDQUFDLENBQUM7UUFFSCxNQUFNLG1CQUFtQixHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDcEUsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsa0JBQWtCLENBQ25DLGdDQUFnQyxFQUNoQztnQkFDRSxZQUFZLEVBQUU7b0JBQ1osb0NBQW9DLEVBQUUsWUFBWSxDQUFDLEdBQUc7aUJBQ3ZEO2dCQUNELHdCQUF3QixFQUFFO29CQUN4QixvQ0FBb0MsRUFBRSxpQkFBaUI7aUJBQ3hEO2FBQ0YsRUFDRCwrQkFBK0IsQ0FDaEM7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsR0FBRyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FDeEMsMENBQTBDLENBQzNDO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDaEUsV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsa0JBQWtCLENBQ25DLGdDQUFnQyxFQUNoQztnQkFDRSxjQUFjLEVBQUU7b0JBQ2Qsb0NBQW9DLEVBQUUsWUFBWSxDQUFDLEdBQUc7aUJBQ3ZEO2dCQUNELHdCQUF3QixFQUFFO29CQUN4QixvQ0FBb0MsRUFBRSxlQUFlO2lCQUN0RDthQUNGLEVBQ0QsK0JBQStCLENBQ2hDO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQ3hDLDBDQUEwQyxDQUMzQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUMvQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsT0FBTztTQUNqQyxDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzlELGNBQWMsRUFBRSxZQUFZLENBQUMsR0FBRztZQUNoQyxLQUFLLEVBQUU7Z0JBQ0wsZUFBZSxFQUFFLG1CQUFtQixDQUFDLE9BQU87Z0JBQzVDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxPQUFPO2FBQ3pDO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYix1QkFBdUIsRUFBRSxtQkFBbUI7b0JBQzVDLGdCQUFnQixFQUFFLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxrQkFBa0IsUUFBUSxDQUFDLFVBQVUsSUFBSSxjQUFjLENBQUMsZ0JBQWdCLEVBQUU7aUJBQ3RJO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCwrQkFBK0I7UUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFakUsTUFBTSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDckUsV0FBVyxFQUFFO2dCQUNYLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO2dCQUN4QyxxQkFBcUIsRUFBRSxRQUFRLENBQUMsVUFBVTthQUMzQztTQUNGLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxlQUFlLENBQzFCLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUN0QixTQUFTLEVBQUU7Z0JBQ1QsZ0JBQWdCLENBQUMsU0FBUztnQkFDMUIsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLElBQUk7YUFDbEM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYztnQkFDZCxxQkFBcUI7YUFDdEI7U0FDRixDQUFDLENBQ0gsQ0FBQztRQUVGLFlBQVksQ0FBQyxlQUFlLENBQzFCLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUN0QixTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxDQUFDLFdBQVc7YUFDckI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsdUJBQXVCO2dCQUN2Qix3QkFBd0I7Z0JBQ3hCLDhCQUE4QjthQUMvQjtTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVsSSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUNqRCxTQUFTLEVBQUU7Z0JBQ1QsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sMkJBQTJCO2FBQ3ZFO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHFCQUFxQjtnQkFDckIsc0JBQXNCO2dCQUN0Qix5QkFBeUI7Z0JBQ3pCLG1CQUFtQjthQUNwQjtTQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDNUIsV0FBVyxFQUFFLHdFQUF3RTtZQUNyRixPQUFPLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkQsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsb0JBQW9CO1NBQ2pGLENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2pELGNBQWMsRUFBRSxZQUFZO1lBQzVCLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVU7WUFDM0MsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQztTQUNsRyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQzlDLFlBQVksRUFBRSxRQUFRLENBQUMsWUFBWTtZQUNuQyxVQUFVLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7YUFDbkI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztRQUVqRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLCtCQUErQixFQUFFO1lBQ3hELEtBQUssRUFBRSwwQkFBMEIsQ0FBQyxTQUFTO1NBQzVDLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLGNBQWM7UUFDZCx3RkFBd0Y7UUFDeEYsK0NBQStDO1FBQy9DLHFEQUFxRDtRQUNyRCx1RUFBdUU7UUFDdkUsc0JBQXNCO1FBQ3RCLDJFQUEyRTtRQUMzRSxzREFBc0Q7UUFDdEQsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0QixPQUFPO1FBQ1AsUUFBUTtRQUNSLHFEQUFxRDtRQUNyRCxNQUFNO1FBRU4scUZBQXFGO1FBQ3JGLE9BQU8sQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUU7WUFDekMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQy9FLFdBQVcsRUFBRSxDQUFDO1lBQ2QsV0FBVyxFQUFFLENBQUM7U0FDZixDQUFDLENBQUM7UUFFSCxNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQztRQUV0QyxNQUFNLFdBQVcsR0FBRyxJQUFJLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDdEYsVUFBVSxFQUFFLEdBQUcsVUFBVSxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDL0MsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJO1NBQ3ZCLENBQUMsQ0FBQztRQUVILHdEQUF3RDtRQUN4RCxNQUFNLGFBQWEsR0FBRyxJQUFJLG9EQUFpQyxDQUFDLElBQUksRUFBRSxtQ0FBbUMsRUFBRTtZQUNyRyxPQUFPO1lBQ1AsV0FBVztZQUNYLG9CQUFvQixFQUFFLEdBQUc7WUFDekIsWUFBWSxFQUFFLENBQUM7WUFDZixnQkFBZ0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLDhCQUE4QixDQUFDO2dCQUN0RSxhQUFhLEVBQUUsSUFBSTtnQkFDbkIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFdBQVcsRUFBRTtvQkFDWCw2QkFBNkIsRUFBRSxNQUFNO29CQUNyQyw2QkFBNkIsRUFBRSxLQUFLO29CQUNwQyx3QkFBd0IsRUFBRSxPQUFPO29CQUNqQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUN4QyxJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsK0NBQStDLE1BQUEsUUFBUSxDQUFDLFVBQVUsbUNBQUksRUFBRSx3QkFBd0I7d0JBQ3pHLGFBQWEsRUFBRSxrQkFBa0I7cUJBQ2xDLENBQUM7aUJBQ0g7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLDJCQUEyQixFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztvQkFDaEosMkJBQTJCLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQztpQkFDdkY7YUFDRjtZQUNELGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDN0QsVUFBVTtZQUNWLE1BQU0sRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekcsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1NBQ2pCLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3BDLEtBQUssRUFBRSxZQUFZLENBQUMsVUFBVTtTQUMvQixDQUFDLENBQUM7UUFFSCxhQUFhLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDO1lBQzdDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsZ0JBQWdCLEVBQUUsS0FBSztTQUN4QixDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN0RCxNQUFNLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRTtZQUMxRCxrQkFBa0IsRUFBRSxVQUFVLENBQUMsa0JBQWtCLENBQUMsK0JBQStCO1lBQ2pGLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTO1lBQ3ZELFNBQVMsRUFBRSxDQUFDO1lBQ1osaUJBQWlCLEVBQUUsQ0FBQztTQUNyQixDQUFDLENBQUM7UUFDSCxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDdEQsS0FBSyxDQUFDLGVBQWUsQ0FDbkIsSUFBSSxhQUFhLENBQUMsaUJBQWlCLENBQUMsa0NBQWtDLENBQUMsQ0FDeEUsQ0FBQTtRQUNELEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFbkQsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO2dCQUNuQyxNQUFNLEVBQUUsQ0FBQztnQkFDVCxtQkFBbUIsRUFBRSxDQUFDO3dCQUNwQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO3FCQUNsQyxDQUFDO2FBQ0gsQ0FBQyxDQUFDO1lBRUgsTUFBTSxjQUFjLEdBQUcsSUFBSSwwQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQ2xFLE1BQU0sRUFBRSxnQ0FBc0IsQ0FBQyxRQUFRLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSwrQkFBcUIsQ0FBQyxRQUFRO2lCQUN4QyxDQUFDO2dCQUNGLFlBQVksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDdkYsV0FBVyxFQUFFLHFCQUFXLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDO2dCQUN6RCxnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixnQkFBZ0IsRUFBRSxFQUFFO2dCQUNwQixtQkFBbUIsRUFBRSxHQUFHO2dCQUN4QixHQUFHO2dCQUNILFVBQVUsRUFBRTtvQkFDVixVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO2lCQUNsQztnQkFDRCxrQkFBa0IsRUFBRSxLQUFLO2dCQUN6QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPO2FBQzFDLENBQUMsQ0FBQztZQUVILE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQztZQUVoQyxNQUFNLGdCQUFnQixHQUFHLElBQUksd0JBQWMsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7Z0JBQ3RFLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixZQUFZLEVBQUUsY0FBYyxDQUFDLE1BQU07YUFDcEMsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsZ0RBQWdEO1lBRXpGLCtEQUErRDtZQUMvRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLDZCQUE2QixFQUFFO2dCQUN0RCxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsU0FBUzthQUNsQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLCtCQUErQixFQUFFO2dCQUN4RCxvRUFBb0U7Z0JBQ3BFLEtBQUssRUFBRSxjQUFjLENBQUMsTUFBTyxDQUFDLFNBQVM7YUFDeEMsQ0FBQyxDQUFDO1lBRUgsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZFLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUc7Z0JBQzFCLG9CQUFvQixFQUFFLGVBQWU7Z0JBQ3JDLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE1BQU0sRUFBRSxJQUFJO2FBQ2IsQ0FBQyxDQUFDLENBQUM7U0FDTDtJQUNILENBQUM7Q0FDRjtBQXBhRCxzREFvYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JlIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgZWMyIGZyb20gJ0Bhd3MtY2RrL2F3cy1lYzInO1xuaW1wb3J0IHsgQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRFYzJTZXJ2aWNlIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWVjcy1wYXR0ZXJucyc7XG5pbXBvcnQgKiBhcyBlY3MgZnJvbSAnQGF3cy1jZGsvYXdzLWVjcyc7XG5pbXBvcnQgeyBDcmVkZW50aWFscywgRGF0YWJhc2VJbnN0YW5jZSwgRGF0YWJhc2VJbnN0YW5jZUVuZ2luZSwgRGF0YWJhc2VTZWNyZXQsIFBvc3RncmVzRW5naW5lVmVyc2lvbiB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1yZHMnO1xuaW1wb3J0ICogYXMgc2VjcmV0c21hbmFnZXIgZnJvbSAnQGF3cy1jZGsvYXdzLXNlY3JldHNtYW5hZ2VyJztcbmltcG9ydCAqIGFzIGNsb3Vkd2F0Y2ggZnJvbSAnQGF3cy1jZGsvYXdzLWNsb3Vkd2F0Y2gnO1xuaW1wb3J0ICogYXMgY2VydGlmaWNhdGVtYW5hZ2VyIGZyb20gJ0Bhd3MtY2RrL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXInO1xuaW1wb3J0ICogYXMgY29nbml0byBmcm9tICdAYXdzLWNkay9hd3MtY29nbml0byc7XG5pbXBvcnQgKiBhcyByb3V0ZTUzIGZyb20gJ0Bhd3MtY2RrL2F3cy1yb3V0ZTUzJztcbmltcG9ydCAqIGFzIHJvdXRlNTNUYXJnZXRzIGZyb20gJ0Bhd3MtY2RrL2F3cy1yb3V0ZTUzLXRhcmdldHMnO1xuaW1wb3J0ICogYXMgc3Vic2NyaXB0aW9ucyBmcm9tICdAYXdzLWNkay9hd3Mtc25zLXN1YnNjcmlwdGlvbnMnO1xuaW1wb3J0ICogYXMgc25zIGZyb20gJ0Bhd3MtY2RrL2F3cy1zbnMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdAYXdzLWNkay9hd3MtY2xvdWR3YXRjaC1hY3Rpb25zJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdAYXdzLWNkay9hd3MtaWFtJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGxhbWJkYWpzIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEtbm9kZWpzJztcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICdAYXdzLWNkay9hd3MtZXZlbnRzJztcbmltcG9ydCAqIGFzIHRhcmdldHMgZnJvbSAnQGF3cy1jZGsvYXdzLWV2ZW50cy10YXJnZXRzJztcbmltcG9ydCAqIGFzIGNyIGZyb20gJ0Bhd3MtY2RrL2N1c3RvbS1yZXNvdXJjZXMnO1xuaW1wb3J0ICogYXMgbG9ncyBmcm9tICdAYXdzLWNkay9hd3MtbG9ncyc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZEJhY2tlbmRTdGFja1Byb3BzIGV4dGVuZHMgY29yZS5TdGFja1Byb3BzIHtcbiAgc3RhZ2U6IHN0cmluZztcblxuICAvKipcbiAgICogVlBDIHdoZXJlIHRoZSBjbHVzdGVyIHdpbGwgYmUgZGVwbG95ZWQgaW50b1xuICAgKi9cbiAgdnBjOiBlYzIuVnBjLFxuXG4gIHVzZXJQb29sSWQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIHlvdSB3YW50IHRvIHVzZSBhbiBSRFMgcmF0aGVyIHRoYW4gcHJvdmlkaW5nIGFuIGV4dGVybmFsIERCXG4gICAqL1xuICB1c2VSZHNEYj86IGJvb2xlYW4sXG5cbiAgZG9tYWluTmFtZTogc3RyaW5nO1xuXG4gIHpvbmU6IHJvdXRlNTMuSUhvc3RlZFpvbmU7XG5cbn1cblxuLyoqXG4gKiBIYXN1cmEgU3RhY2sgZm9yIHVzaW5nIEVDUyB0byBydW4gSGFzdXJhIGFzIGEgQ29udGFpbmVyIGluIEVjMi5cbiAqL1xuZXhwb3J0IGNsYXNzIERhc2hib2FyZEJhY2tlbmRTdGFjayBleHRlbmRzIGNvcmUuU3RhY2sge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBIYXN1cmEgU3RhY2suXG4gICAqXG4gICAqIEBwYXJhbSBzY29wZSBQYXJlbnQgb2YgdGhpcyBzdGFjaywgdXN1YWxseSBhbiBgQXBwYCBvciBhIGBTdGFnZWAsIGJ1dCBjb3VsZCBiZSBhbnkgY29uc3RydWN0LlxuICAgKiBAcGFyYW0gaWQgVGhlIGNvbnN0cnVjdCBJRCBvZiB0aGlzIHN0YWNrLlxuICAgKiBAcGFyYW0gcHJvcHMgU3RhY2sgcHJvcGVydGllcyBpbmNsdWRpbmcgc3BlY2lmaWMgSGFzdXJhIHByb3BlcnRpZXMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzY29wZTogY29yZS5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBEYXNoYm9hcmRCYWNrZW5kU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgY2xhaW1zTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnY2xhaW1zTGFtYmRhJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tSW5saW5lKGBcbiAgICAgIGV4cG9ydHMuaGFuZGxlciA9IChldmVudCwgY29udGV4dCwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgZXZlbnQucmVzcG9uc2UgPSB7XG4gICAgICAgICAgICBcImNsYWltc092ZXJyaWRlRGV0YWlsc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGFpbXNUb0FkZE9yT3ZlcnJpZGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXNcIjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ4LWhhc3VyYS11c2VyLWlkXCI6IGV2ZW50LnJlcXVlc3QudXNlckF0dHJpYnV0ZXMuc3ViLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGVcIjogXCJhZG1pblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gc29tZSBjdXN0b20gbG9naWMgdG8gZGVjaWRlIGFsbG93ZWQgcm9sZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieC1oYXN1cmEtYWxsb3dlZC1yb2xlc1wiOiBbXCJhZG1pblwiXSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sobnVsbCwgZXZlbnQpXG4gICAgICB9YClcbiAgICB9KTtcblxuICAgIGxldCB1c2VyUG9vbCA9IGNvZ25pdG8uVXNlclBvb2wuZnJvbVVzZXJQb29sSWQodGhpcywgYCR7cHJvcHMuc3RhZ2V9RGFzaGJvYXJkVXNlclBvb2xgLCBwcm9wcy51c2VyUG9vbElkIHx8ICcnKTtcbiAgICBpZiAoIXByb3BzLnVzZXJQb29sSWQpIHtcbiAgICAgIHVzZXJQb29sID0gbmV3IGNvZ25pdG8uVXNlclBvb2wodGhpcywgYCR7cHJvcHMuc3RhZ2V9RGFzaGJvYXJkVXNlclBvb2xgLCB7XG4gICAgICAgIGN1c3RvbUF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBvcmdhbml6YXRpb25faWQ6IG5ldyBjb2duaXRvLk51bWJlckF0dHJpYnV0ZSh7IG1pbjogMCwgbWF4OiAyMDAwMDAwMDAwIH0pLFxuICAgICAgICB9LFxuICAgICAgICByZW1vdmFsUG9saWN5OiBjb3JlLlJlbW92YWxQb2xpY3kuUkVUQUlOLFxuICAgICAgICBzaWduSW5DYXNlU2Vuc2l0aXZlOiBmYWxzZSxcbiAgICAgICAgcGFzc3dvcmRQb2xpY3k6IHtcbiAgICAgICAgICBtaW5MZW5ndGg6IDgsXG4gICAgICAgICAgcmVxdWlyZUxvd2VyY2FzZTogdHJ1ZSxcbiAgICAgICAgICByZXF1aXJlVXBwZXJjYXNlOiB0cnVlLFxuICAgICAgICAgIHJlcXVpcmVEaWdpdHM6IHRydWUsXG4gICAgICAgICAgcmVxdWlyZVN5bWJvbHM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHNlbGZTaWduVXBFbmFibGVkOiB0cnVlLFxuICAgICAgICBhdXRvVmVyaWZ5OiB7XG4gICAgICAgICAgZW1haWw6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHN0YW5kYXJkQXR0cmlidXRlczoge1xuICAgICAgICAgIGZhbWlseU5hbWU6IHtcbiAgICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdpdmVuTmFtZToge1xuICAgICAgICAgICAgbXV0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBob25lTnVtYmVyOiB7XG4gICAgICAgICAgICBtdXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc2lnbkluQWxpYXNlczoge1xuICAgICAgICAgIHVzZXJuYW1lOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBsYW1iZGFUcmlnZ2Vyczoge1xuICAgICAgICAgIHByZVRva2VuR2VuZXJhdGlvbjogY2xhaW1zTGFtYmRhLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBjci5Bd3NDdXN0b21SZXNvdXJjZSh0aGlzLCBcIlVwZGF0ZVVzZXJQb29sXCIsIHtcbiAgICAgICAgcmVzb3VyY2VUeXBlOiBcIkN1c3RvbTo6VXBkYXRlVXNlclBvb2xcIixcbiAgICAgICAgb25DcmVhdGU6IHtcbiAgICAgICAgICByZWdpb246IHRoaXMucmVnaW9uLFxuICAgICAgICAgIHNlcnZpY2U6IFwiQ29nbml0b0lkZW50aXR5U2VydmljZVByb3ZpZGVyXCIsXG4gICAgICAgICAgYWN0aW9uOiBcInVwZGF0ZVVzZXJQb29sXCIsXG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgVXNlclBvb2xJZDogdXNlclBvb2wudXNlclBvb2xJZCxcbiAgICAgICAgICAgIExhbWJkYUNvbmZpZzoge1xuICAgICAgICAgICAgICBQcmVUb2tlbkdlbmVyYXRpb246IGNsYWltc0xhbWJkYS5mdW5jdGlvbkFybixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwaHlzaWNhbFJlc291cmNlSWQ6IGNyLlBoeXNpY2FsUmVzb3VyY2VJZC5vZih1c2VyUG9vbC51c2VyUG9vbElkKSxcbiAgICAgICAgfSxcbiAgICAgICAgcG9saWN5OiBjci5Bd3NDdXN0b21SZXNvdXJjZVBvbGljeS5mcm9tU2RrQ2FsbHMoeyByZXNvdXJjZXM6IGNyLkF3c0N1c3RvbVJlc291cmNlUG9saWN5LkFOWV9SRVNPVVJDRSB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpbnZva2VDb2duaXRvVHJpZ2dlclBlcm1pc3Npb24gPSB7XG4gICAgICAgIHByaW5jaXBhbDogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdjb2duaXRvLWlkcC5hbWF6b25hd3MuY29tJyksXG4gICAgICAgIHNvdXJjZUFybjogdXNlclBvb2wudXNlclBvb2xBcm5cbiAgICAgIH1cbiAgICAgIGNsYWltc0xhbWJkYS5hZGRQZXJtaXNzaW9uKCdJbnZva2VQcmVUb2tlbkdlbmVyYXRpb25IYW5kbGVyUGVybWlzc2lvbicsIGludm9rZUNvZ25pdG9UcmlnZ2VyUGVybWlzc2lvbilcbiAgICB9XG5cbiAgICBuZXcgY29yZS5DZm5PdXRwdXQodGhpcywgJ1VzZXJQb29sSWQnLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2wudXNlclBvb2xJZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IHVzZXJQb29sV2ViQ2xpZW50ID0gbmV3IGNvZ25pdG8uVXNlclBvb2xDbGllbnQodGhpcywgJ3VzZXJQb29sV2ViQ2xpZW50Jywge1xuICAgICAgdXNlclBvb2w6IHVzZXJQb29sLFxuICAgICAgZ2VuZXJhdGVTZWNyZXQ6IGZhbHNlLFxuICAgICAgcHJldmVudFVzZXJFeGlzdGVuY2VFcnJvcnM6IHRydWUsXG4gICAgICBvQXV0aDoge1xuICAgICAgICBmbG93czoge1xuICAgICAgICAgIGF1dGhvcml6YXRpb25Db2RlR3JhbnQ6IGZhbHNlLFxuICAgICAgICAgIGltcGxpY2l0Q29kZUdyYW50OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmV3IGNvcmUuQ2ZuT3V0cHV0KHRoaXMsICdVc2VyUG9vbFdlYkNsaWVudElkJywge1xuICAgICAgdmFsdWU6IHVzZXJQb29sV2ViQ2xpZW50LnVzZXJQb29sQ2xpZW50SWQsXG4gICAgfSk7XG5cbiAgICBjb25zdCB1c2VyUG9vbENsaWVudCA9IG5ldyBjb2duaXRvLlVzZXJQb29sQ2xpZW50KHRoaXMsICd1c2VyUG9vbENsaWVudCcsIHtcbiAgICAgIHVzZXJQb29sOiB1c2VyUG9vbCxcbiAgICAgIGdlbmVyYXRlU2VjcmV0OiB0cnVlLFxuICAgICAgcHJldmVudFVzZXJFeGlzdGVuY2VFcnJvcnM6IHRydWUsXG4gICAgfSk7XG5cbiAgICBuZXcgY29yZS5DZm5PdXRwdXQodGhpcywgJ1VzZXJQb29sQ2xpZW50SWQnLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGlkZW50aXR5UG9vbCA9IG5ldyBjb2duaXRvLkNmbklkZW50aXR5UG9vbCh0aGlzLCAnRGFzaGJvYXJkSWRlbnRpdHlQb29sJywge1xuICAgICAgY29nbml0b0lkZW50aXR5UHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBjbGllbnRJZDogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICAgICAgICBwcm92aWRlck5hbWU6IGBjb2duaXRvLWlkcC4ke3RoaXMucmVnaW9ufS5hbWF6b25hd3MuY29tLyR7dXNlclBvb2wudXNlclBvb2xJZH1gLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGFsbG93VW5hdXRoZW50aWNhdGVkSWRlbnRpdGllczogdHJ1ZSxcbiAgICB9KTtcblxuICAgIG5ldyBjb3JlLkNmbk91dHB1dCh0aGlzLCAnaWRlbnRpdHlQb29sSWQnLCB7XG4gICAgICB2YWx1ZTogaWRlbnRpdHlQb29sLnJlZixcbiAgICB9KTtcblxuICAgIGNvbnN0IHVuYXV0aGVudGljYXRlZFJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ3VuYXV0aGVudGljYXRlZFJvbGUnLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJ1VuYXV0aGVudGljYXRlZCByb2xlIGZvciB1c2VycycsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uRmVkZXJhdGVkUHJpbmNpcGFsKFxuICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tJyxcbiAgICAgICAge1xuICAgICAgICAgIFN0cmluZ0VxdWFsczoge1xuICAgICAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphdWQnOiBpZGVudGl0eVBvb2wucmVmLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ0ZvckFueVZhbHVlOlN0cmluZ0xpa2UnOiB7XG4gICAgICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tOmFtcic6ICd1bmF1dGhlbnRpY2F0ZWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICdzdHM6QXNzdW1lUm9sZVdpdGhXZWJJZGVudGl0eScsXG4gICAgICApLFxuICAgICAgbWFuYWdlZFBvbGljaWVzOiBbXG4gICAgICAgIGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZShcbiAgICAgICAgICAnc2VydmljZS1yb2xlL0FXU0xhbWJkYUJhc2ljRXhlY3V0aW9uUm9sZScsXG4gICAgICAgICksXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYXV0aGVudGljYXRlZFJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ2F1dGhlbnRpY2F0ZWRSb2xlJywge1xuICAgICAgZGVzY3JpcHRpb246ICdEZWZhdWx0IHJvbGUgZm9yIGF1dGhlbnRpY2F0ZWQgdXNlcnMnLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLkZlZGVyYXRlZFByaW5jaXBhbChcbiAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbScsXG4gICAgICAgIHtcbiAgICAgICAgICAnU3RyaW5nRXF1YWxzJzoge1xuICAgICAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphdWQnOiBpZGVudGl0eVBvb2wucmVmLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ0ZvckFueVZhbHVlOlN0cmluZ0xpa2UnOiB7XG4gICAgICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tOmFtcic6ICdhdXRoZW50aWNhdGVkJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICAnc3RzOkFzc3VtZVJvbGVXaXRoV2ViSWRlbnRpdHknLFxuICAgICAgKSxcbiAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4gICAgICAgICAgJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnLFxuICAgICAgICApLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIG5ldyBjb3JlLkNmbk91dHB1dCh0aGlzLCAnQXV0aGVudGljYXRlZFJvbGVBcm4nLCB7XG4gICAgICB2YWx1ZTogYXV0aGVudGljYXRlZFJvbGUucm9sZUFybixcbiAgICB9KTtcblxuICAgIG5ldyBjb2duaXRvLkNmbklkZW50aXR5UG9vbFJvbGVBdHRhY2htZW50KHRoaXMsICdpZGVudGl0eVJvbGUnLCB7XG4gICAgICBpZGVudGl0eVBvb2xJZDogaWRlbnRpdHlQb29sLnJlZixcbiAgICAgIHJvbGVzOiB7XG4gICAgICAgIHVuYXV0aGVudGljYXRlZDogdW5hdXRoZW50aWNhdGVkUm9sZS5yb2xlQXJuLFxuICAgICAgICBhdXRoZW50aWNhdGVkOiBhdXRoZW50aWNhdGVkUm9sZS5yb2xlQXJuLFxuICAgICAgfSxcbiAgICAgIHJvbGVNYXBwaW5nczoge1xuICAgICAgICBtYXBwaW5nOiB7XG4gICAgICAgICAgdHlwZTogJ1Rva2VuJyxcbiAgICAgICAgICBhbWJpZ3VvdXNSb2xlUmVzb2x1dGlvbjogJ0F1dGhlbnRpY2F0ZWRSb2xlJyxcbiAgICAgICAgICBpZGVudGl0eVByb3ZpZGVyOiBgY29nbml0by1pZHAuJHtjb3JlLlN0YWNrLm9mKHRoaXMpLnJlZ2lvbn0uYW1hem9uYXdzLmNvbS8ke3VzZXJQb29sLnVzZXJQb29sSWR9OiR7dXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZH1gLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIENvbmZpZ3VyZSB0aGUgYmFja3VwIGxhbWJkYS5cbiAgICBjb25zdCB1c2VyQmFja3VwQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAndXNlckJhY2t1cEJ1Y2tldCcpO1xuXG4gICAgY29uc3QgYmFja3VwTGFtYmRhID0gbmV3IGxhbWJkYWpzLk5vZGVqc0Z1bmN0aW9uKHRoaXMsICdiYWNrdXBMYW1iZGEnLCB7XG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBCVUNLRVRfTkFNRTogdXNlckJhY2t1cEJ1Y2tldC5idWNrZXROYW1lLFxuICAgICAgICBEQVNIQk9BUkRfVVNFUlBPT0xfSUQ6IHVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgYmFja3VwTGFtYmRhLmFkZFRvUm9sZVBvbGljeShcbiAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgICAgdXNlckJhY2t1cEJ1Y2tldC5idWNrZXRBcm4sXG4gICAgICAgICAgdXNlckJhY2t1cEJ1Y2tldC5idWNrZXRBcm4gKyAnLyonLFxuICAgICAgICBdLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgXCJzMzpQdXRPYmplY3RcIixcbiAgICAgICAgICBcInMzOlB1dE9iamVjdFRhZ2dpbmdcIlxuICAgICAgICBdXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBiYWNrdXBMYW1iZGEuYWRkVG9Sb2xlUG9saWN5KFxuICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgICB1c2VyUG9vbC51c2VyUG9vbEFybixcbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICdjb2duaXRvLWlkcDpMaXN0VXNlcnMnLFxuICAgICAgICAgICdjb2duaXRvLWlkcDpMaXN0R3JvdXBzJyxcbiAgICAgICAgICAnY29nbml0by1pZHA6TGlzdFVzZXJzSW5Hcm91cCcsXG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IHVzZXJJbXBvcnRSb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICd1c2VySW1wb3J0Um9sZScsIHsgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2NvZ25pdG8taWRwLmFtYXpvbmF3cy5jb20nKSB9KTtcblxuICAgIHVzZXJJbXBvcnRSb2xlLmFkZFRvUG9saWN5KG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOmF3czpsb2dzOiR7dGhpcy5yZWdpb259OiR7dGhpcy5hY2NvdW50fTpsb2ctZ3JvdXA6L2F3cy9jb2duaXRvLypgLFxuICAgICAgXSxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgXCJsb2dzOkNyZWF0ZUxvZ0dyb3VwXCIsXG4gICAgICAgIFwibG9nczpDcmVhdGVMb2dTdHJlYW1cIixcbiAgICAgICAgXCJsb2dzOkRlc2NyaWJlTG9nU3RyZWFtc1wiLFxuICAgICAgICBcImxvZ3M6UHV0TG9nRXZlbnRzXCJcbiAgICAgIF0sXG4gICAgfSkpO1xuXG4gICAgbmV3IGV2ZW50cy5SdWxlKHRoaXMsICdSdWxlJywge1xuICAgICAgZGVzY3JpcHRpb246ICdBIHNjaGVkdWxlIGZvciB0aGUgTGFtYmRhIGZ1bmN0aW9uIHRoYXQgdHJpZ2dlcnMgUHJvd2xlciBpbiBDb2RlQnVpbGQuJyxcbiAgICAgIHRhcmdldHM6IFtuZXcgdGFyZ2V0cy5MYW1iZGFGdW5jdGlvbihiYWNrdXBMYW1iZGEpXSxcbiAgICAgIHNjaGVkdWxlOiBldmVudHMuU2NoZWR1bGUuZXhwcmVzc2lvbignY3JvbigwIDIyICogKiA/ICopJyksIC8vIGV2ZXJ5IGRheSBhdCAxMHBtXG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBjci5Qcm92aWRlcih0aGlzLCAncHJvdmlkZXInLCB7XG4gICAgICBvbkV2ZW50SGFuZGxlcjogYmFja3VwTGFtYmRhLFxuICAgICAgbG9nUmV0ZW50aW9uOiBsb2dzLlJldGVudGlvbkRheXMuVEhSRUVfREFZUyxcbiAgICAgIHJvbGU6IG5ldyBpYW0uUm9sZSh0aGlzLCAncm9sZScsIHsgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2xhbWJkYS5hbWF6b25hd3MuY29tJykgfSksXG4gICAgfSk7XG5cbiAgICBuZXcgY29yZS5DdXN0b21SZXNvdXJjZSh0aGlzLCAnY3VzdG9tUmVzb3VyY2UnLCB7XG4gICAgICBzZXJ2aWNlVG9rZW46IHByb3ZpZGVyLnNlcnZpY2VUb2tlbixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgVVBEQVRFOiBEYXRlLm5vdygpLFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgaGFzdXJhRGFzaGJvYXJkQWRtaW5TZWNyZXQgPSBuZXcgc2VjcmV0c21hbmFnZXIuU2VjcmV0KHRoaXMsICdIYXN1cmFEYXNoYm9hcmRBZG1pblNlY3JldCcpO1xuXG4gICAgbmV3IGNvcmUuQ2ZuT3V0cHV0KHRoaXMsICdIYXN1cmFEYXNoYm9hcmRBZG1pblNlY3JldEFybicsIHtcbiAgICAgIHZhbHVlOiBoYXN1cmFEYXNoYm9hcmRBZG1pblNlY3JldC5zZWNyZXRBcm4sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjbHVzdGVyID0gbmV3IGVjcy5DbHVzdGVyKHRoaXMsICdFY3NDbHVzdGVyJywgeyB2cGM6IHByb3BzLnZwYyB9KTtcbiAgICAvLyBub3Qgd29ya2luZ1xuICAgIC8vIGNsdXN0ZXIuYWRkQXNnQ2FwYWNpdHlQcm92aWRlcihuZXcgQXNnQ2FwYWNpdHlQcm92aWRlcih0aGlzLCAnQXNnQ2FwYWNpdHlQcm92aWRlcicsIHtcbiAgICAvLyAgIGVuYWJsZU1hbmFnZWRUZXJtaW5hdGlvblByb3RlY3Rpb246IGZhbHNlLFxuICAgIC8vICAgbWFjaGluZUltYWdlVHlwZTogTWFjaGluZUltYWdlVHlwZS5CT1RUTEVST0NLRVQsXG4gICAgLy8gICBhdXRvU2NhbGluZ0dyb3VwOiBuZXcgQXV0b1NjYWxpbmdHcm91cCh0aGlzLCAnQXV0b1NjYWxpbmdHcm91cCcsIHtcbiAgICAvLyAgICAgdnBjOiBwcm9wcy52cGMsXG4gICAgLy8gICAgIGluc3RhbmNlVHlwZTogSW5zdGFuY2VUeXBlLm9mKEluc3RhbmNlQ2xhc3MuVDIsIEluc3RhbmNlU2l6ZS5TTUFMTCksXG4gICAgLy8gICAgIG1hY2hpbmVJbWFnZTogRWNzT3B0aW1pemVkSW1hZ2UuYW1hem9uTGludXgyKCksXG4gICAgLy8gICAgIG1pbkNhcGFjaXR5OiAxLFxuICAgIC8vICAgICBtYXhDYXBhY2l0eTogMyxcbiAgICAvLyAgIH0pXG4gICAgLy8gfSksIHtcbiAgICAvLyAgIG1hY2hpbmVJbWFnZVR5cGU6IE1hY2hpbmVJbWFnZVR5cGUuQk9UVExFUk9DS0VULFxuICAgIC8vIH0pO1xuXG4gICAgLy8gSSBjb3VsZG4ndCBnZXQgYWRkQXNnQ2FwYWNpdHlQcm92aWRlciB0byB3b3JrIHNvIHdlIHN0aWxsIHdpbGwgcmVseSBvbiBhZGRDYXBhY2l0eVxuICAgIGNsdXN0ZXIuYWRkQ2FwYWNpdHkoJ0FzZ0NhcGFjaXR5UHJvdmlkZXInLCB7XG4gICAgICBpbnN0YW5jZVR5cGU6IGVjMi5JbnN0YW5jZVR5cGUub2YoZWMyLkluc3RhbmNlQ2xhc3MuVDIsIGVjMi5JbnN0YW5jZVNpemUuTUlDUk8pLFxuICAgICAgbWluQ2FwYWNpdHk6IDEsXG4gICAgICBtYXhDYXBhY2l0eTogMyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlY29yZE5hbWUgPSAnZGFzaGJvYXJkLWhhc3VyYSc7XG5cbiAgICBjb25zdCBjZXJ0aWZpY2F0ZSA9IG5ldyBjZXJ0aWZpY2F0ZW1hbmFnZXIuRG5zVmFsaWRhdGVkQ2VydGlmaWNhdGUodGhpcywgJ0NlcnRpZmljYXRlJywge1xuICAgICAgZG9tYWluTmFtZTogYCR7cmVjb3JkTmFtZX0uJHtwcm9wcy5kb21haW5OYW1lfWAsXG4gICAgICBob3N0ZWRab25lOiBwcm9wcy56b25lLFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGEgbG9hZC1iYWxhbmNlZCBFYzIgc2VydmljZSBhbmQgbWFrZSBpdCBwdWJsaWNcbiAgICBjb25zdCBhbGJFYzJTZXJ2aWNlID0gbmV3IEFwcGxpY2F0aW9uTG9hZEJhbGFuY2VkRWMyU2VydmljZSh0aGlzLCAnQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRFYzJTZXJ2aWNlJywge1xuICAgICAgY2x1c3RlcixcbiAgICAgIGNlcnRpZmljYXRlLFxuICAgICAgbWVtb3J5UmVzZXJ2YXRpb25NaUI6IDQwMCxcbiAgICAgIGRlc2lyZWRDb3VudDogMSxcbiAgICAgIHRhc2tJbWFnZU9wdGlvbnM6IHtcbiAgICAgICAgaW1hZ2U6IGVjcy5Db250YWluZXJJbWFnZS5mcm9tUmVnaXN0cnkoJ2hhc3VyYS9ncmFwaHFsLWVuZ2luZTp2Mi4xLjEnKSxcbiAgICAgICAgY29udGFpbmVyUG9ydDogODA4MCxcbiAgICAgICAgZW5hYmxlTG9nZ2luZzogdHJ1ZSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICBIQVNVUkFfR1JBUEhRTF9FTkFCTEVfQ09OU09MRTogJ3RydWUnLFxuICAgICAgICAgIEhBU1VSQV9HUkFQSFFMX1BHX0NPTk5FQ1RJT05TOiAnMTAwJyxcbiAgICAgICAgICBIQVNVUkFfR1JBUEhRTF9MT0dfTEVWRUw6ICdkZWJ1ZycsXG4gICAgICAgICAgSEFTVVJBX0dSQVBIUUxfSldUX1NFQ1JFVDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdHlwZTogJ1JTMjU2JyxcbiAgICAgICAgICAgIGp3a191cmw6IGBodHRwczovL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tLyR7dXNlclBvb2wudXNlclBvb2xJZCA/PyAnJ30vLndlbGwta25vd24vandrcy5qc29uYCxcbiAgICAgICAgICAgIGNsYWltc19mb3JtYXQ6ICdzdHJpbmdpZmllZF9qc29uJyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VjcmV0czoge1xuICAgICAgICAgIEhBU1VSQV9HUkFQSFFMX0RBVEFCQVNFX1VSTDogZWNzLlNlY3JldC5mcm9tU2VjcmV0c01hbmFnZXIoc2VjcmV0c21hbmFnZXIuU2VjcmV0LmZyb21TZWNyZXROYW1lVjIodGhpcywgJ2RiVXJsU2VjcmV0QXJuJywgJ0RCQ29ubmVjdGlvblN0cmluZycpKSxcbiAgICAgICAgICBIQVNVUkFfR1JBUEhRTF9BRE1JTl9TRUNSRVQ6IGVjcy5TZWNyZXQuZnJvbVNlY3JldHNNYW5hZ2VyKGhhc3VyYURhc2hib2FyZEFkbWluU2VjcmV0KSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBwdWJsaWNMb2FkQmFsYW5jZXI6IHRydWUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBoYXN1cmFSZWNvcmQgPSBuZXcgcm91dGU1My5BUmVjb3JkKHRoaXMsICdoYXN1cmFSZWNvcmQnLCB7XG4gICAgICByZWNvcmROYW1lLFxuICAgICAgdGFyZ2V0OiByb3V0ZTUzLlJlY29yZFRhcmdldC5mcm9tQWxpYXMobmV3IHJvdXRlNTNUYXJnZXRzLkxvYWRCYWxhbmNlclRhcmdldChhbGJFYzJTZXJ2aWNlLmxvYWRCYWxhbmNlcikpLFxuICAgICAgem9uZTogcHJvcHMuem9uZSxcbiAgICB9KTtcblxuICAgIG5ldyBjb3JlLkNmbk91dHB1dCh0aGlzLCAnSGFzdXJhVXJsJywge1xuICAgICAgdmFsdWU6IGhhc3VyYVJlY29yZC5kb21haW5OYW1lLFxuICAgIH0pO1xuXG4gICAgYWxiRWMyU2VydmljZS50YXJnZXRHcm91cC5jb25maWd1cmVIZWFsdGhDaGVjayh7XG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgcGF0aDogJy9oZWFsdGh6JyxcbiAgICAgIGhlYWx0aHlIdHRwQ29kZXM6ICcyMDAnLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYWxhcm0gPSBuZXcgY2xvdWR3YXRjaC5BbGFybSh0aGlzLCAnaGFzdXJhQWxhcm0nLCB7XG4gICAgICBtZXRyaWM6IGFsYkVjMlNlcnZpY2UudGFyZ2V0R3JvdXAubWV0cmljSGVhbHRoeUhvc3RDb3VudCgpLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOiBjbG91ZHdhdGNoLkNvbXBhcmlzb25PcGVyYXRvci5MRVNTX1RIQU5fT1JfRVFVQUxfVE9fVEhSRVNIT0xELFxuICAgICAgdHJlYXRNaXNzaW5nRGF0YTogY2xvdWR3YXRjaC5UcmVhdE1pc3NpbmdEYXRhLkJSRUFDSElORyxcbiAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIGV2YWx1YXRpb25QZXJpb2RzOiAxLFxuICAgIH0pO1xuICAgIGNvbnN0IHRvcGljID0gbmV3IHNucy5Ub3BpYyh0aGlzLCAnaGFzdXJhQWxhcm1Ub3BpYycpO1xuICAgIHRvcGljLmFkZFN1YnNjcmlwdGlvbihcbiAgICAgIG5ldyBzdWJzY3JpcHRpb25zLkVtYWlsU3Vic2NyaXB0aW9uKCdjbG91ZC1ub3RpZmljYXRpb25zQG5lYXRsZWFmLmNvbScpLFxuICAgIClcbiAgICBhbGFybS5hZGRBbGFybUFjdGlvbihuZXcgYWN0aW9ucy5TbnNBY3Rpb24odG9waWMpKTtcblxuICAgIGlmIChwcm9wcy51c2VSZHNEYikge1xuICAgICAgY29uc3QgdnBjID0gbmV3IGVjMi5WcGModGhpcywgJ3ZwYycsIHtcbiAgICAgICAgbWF4QXpzOiAyLFxuICAgICAgICBzdWJuZXRDb25maWd1cmF0aW9uOiBbe1xuICAgICAgICAgIG5hbWU6ICdwdWJsaWMnLFxuICAgICAgICAgIHN1Ym5ldFR5cGU6IGVjMi5TdWJuZXRUeXBlLlBVQkxJQyxcbiAgICAgICAgfV0sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaGFzdXJhRGF0YWJhc2UgPSBuZXcgRGF0YWJhc2VJbnN0YW5jZSh0aGlzLCAnSGFzdXJhRGF0YWJhc2UnLCB7XG4gICAgICAgIGVuZ2luZTogRGF0YWJhc2VJbnN0YW5jZUVuZ2luZS5wb3N0Z3Jlcyh7XG4gICAgICAgICAgdmVyc2lvbjogUG9zdGdyZXNFbmdpbmVWZXJzaW9uLlZFUl8xM18zLFxuICAgICAgICB9KSxcbiAgICAgICAgaW5zdGFuY2VUeXBlOiBlYzIuSW5zdGFuY2VUeXBlLm9mKGVjMi5JbnN0YW5jZUNsYXNzLkJVUlNUQUJMRTMsIGVjMi5JbnN0YW5jZVNpemUuTUlDUk8pLFxuICAgICAgICBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMuZnJvbUdlbmVyYXRlZFNlY3JldCgndHNkYmFkbWluJyksXG4gICAgICAgIHN0b3JhZ2VFbmNyeXB0ZWQ6IHRydWUsXG4gICAgICAgIGFsbG9jYXRlZFN0b3JhZ2U6IDIwLFxuICAgICAgICBtYXhBbGxvY2F0ZWRTdG9yYWdlOiAxMDAsXG4gICAgICAgIHZwYyxcbiAgICAgICAgdnBjU3VibmV0czoge1xuICAgICAgICAgIHN1Ym5ldFR5cGU6IGVjMi5TdWJuZXRUeXBlLlBVQkxJQyxcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRpb25Qcm90ZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgcmVtb3ZhbFBvbGljeTogY29yZS5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaGFzdXJhVXNlcm5hbWUgPSAnaGFzdXJhJztcblxuICAgICAgY29uc3QgaGFzdXJhVXNlclNlY3JldCA9IG5ldyBEYXRhYmFzZVNlY3JldCh0aGlzLCAnSGFzdXJhRGF0YWJhc2VVc2VyJywge1xuICAgICAgICB1c2VybmFtZTogaGFzdXJhVXNlcm5hbWUsXG4gICAgICAgIG1hc3RlclNlY3JldDogaGFzdXJhRGF0YWJhc2Uuc2VjcmV0LFxuICAgICAgfSk7XG4gICAgICBoYXN1cmFVc2VyU2VjcmV0LmF0dGFjaChoYXN1cmFEYXRhYmFzZSk7IC8vIEFkZHMgREIgY29ubmVjdGlvbnMgaW5mb3JtYXRpb24gaW4gdGhlIHNlY3JldFxuXG4gICAgICAvLyBPdXRwdXQgdGhlIEVuZHBvaW50IEFkZHJlc3Mgc28gaXQgY2FuIGJlIHVzZWQgaW4gcG9zdC1kZXBsb3lcbiAgICAgIG5ldyBjb3JlLkNmbk91dHB1dCh0aGlzLCAnSGFzdXJhRGF0YWJhc2VVc2VyU2VjcmV0QXJuJywge1xuICAgICAgICB2YWx1ZTogaGFzdXJhVXNlclNlY3JldC5zZWNyZXRBcm4sXG4gICAgICB9KTtcblxuICAgICAgbmV3IGNvcmUuQ2ZuT3V0cHV0KHRoaXMsICdIYXN1cmFEYXRhYmFzZU1hc3RlclNlY3JldEFybicsIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgdmFsdWU6IGhhc3VyYURhdGFiYXNlLnNlY3JldCEuc2VjcmV0QXJuLFxuICAgICAgfSk7XG5cbiAgICAgIGhhc3VyYURhdGFiYXNlLmNvbm5lY3Rpb25zLmFsbG93RnJvbShhbGJFYzJTZXJ2aWNlLnNlcnZpY2UsIG5ldyBlYzIuUG9ydCh7XG4gICAgICAgIHByb3RvY29sOiBlYzIuUHJvdG9jb2wuVENQLFxuICAgICAgICBzdHJpbmdSZXByZXNlbnRhdGlvbjogJ1Bvc3RncmVzIFBvcnQnLFxuICAgICAgICBmcm9tUG9ydDogNTQzMixcbiAgICAgICAgdG9Qb3J0OiA1NDMyLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfVxufVxuIl19