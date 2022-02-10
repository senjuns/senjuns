import * as core from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as route53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
export interface LandingPageAppStackProps extends core.StackProps {
  stage: string;
}

/**
 * Dashboard CDK Stack for for hosting the ReactTS App in AWS S3
 */
export class LandingPageAppStack extends core.Stack {
  /**
   * Creates a new Dashboard Stack.
   *
   * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
   * @param id The construct ID of this stack.
   * @param props Stack properties including specific Dashboard properties.
   */
  constructor(scope: core.Construct, id: string, props: LandingPageAppStackProps) {
    super(scope, id, props);

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          exposedHeaders: ['ETag', 'x-amz-meta-custom-header', 'Authorization', 'Content-Type', 'Accept'],
        },
      ],
      removalPolicy: core.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    new core.CfnOutput(this, 'LandingPageBucketWebsiteUrl', {
      value: siteBucket.bucketWebsiteUrl,
    });

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');
    siteBucket.grantRead(cloudFrontOAI.grantPrincipal);

    const domainName = `${props.stage === 'prod' ? '' : props.stage + '.'}neatleaf.com`;
    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName });

    const certificate = new certificatemanager.DnsValidatedCertificate(this, 'certificate', {
      domainName: `${domainName}`,
      hostedZone: zone,
      region: 'us-east-1',
    });

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
      enableIpV6: false,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket,
            originAccessIdentity: cloudFrontOAI,
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          responseCode: 404,
          responsePagePath: '/index.html'
        }
      ],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: [domainName],
      }),
    });

    const LandingPageRecord = new route53.ARecord(this, 'landingPageRecord', {
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone,
    });

    new core.CfnOutput(this, 'WebsiteUrl', {
      value: LandingPageRecord.domainName,
    });

    new core.CfnOutput(this, 'LandingPageCloudfrontDomainName', {
      value: distribution.distributionDomainName,
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'BucketDeployment', {
      sources: [s3deploy.Source.asset('../landingpage/build')],
      distribution,
      destinationBucket: siteBucket,
    });

    const emailEnvironment = {
      SES_EMAIL_TO: "contact@neatleaf.com",
      SES_EMAIL_FROM: "contact@neatleaf.com",
      SES_REGION: this.region,
    }
    // Email for contact form backend.
    const emailLambda = new lambdajs.NodejsFunction(this, 'email', {
        runtime: lambda.Runtime.NODEJS_14_X,
        memorySize: 1024,
        timeout: cdk.Duration.seconds(3),
        environment: emailEnvironment
    });
    // 👇 Add permissions to the Lambda function to send emails.
    emailLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'ses:SendEmail',
          'ses:SendRawEmail',
          'ses:SendTemplatedEmail',
        ],
        resources: [
          `arn:aws:ses:${emailEnvironment.SES_REGION}:${
            cdk.Stack.of(this).account
          }:identity/${emailEnvironment.SES_EMAIL_FROM}`,
        ],
      }),
    );
    
    const spyderEmailRecordName = 'mail';
  
    const emailCertificate = new certificatemanager.DnsValidatedCertificate(this, 'emailCertificate', {
      domainName: `${spyderEmailRecordName}.${domainName}`,
      hostedZone: zone,
    });

    const emailApi = new apigateway.LambdaRestApi(this, 'emailApi', {
      handler: emailLambda,
      proxy: true,
      domainName: {
        domainName: `${spyderEmailRecordName}.${domainName}`,
        certificate: emailCertificate,
      },
    });
  
    const emailRecord = new route53.ARecord(this, 'emailRecord', {
      recordName: spyderEmailRecordName,
      target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(emailApi)),
      zone,
    });
  
    new core.CfnOutput(this, 'EmailUrl', {
      value: emailRecord.domainName,
    });
  }
}
