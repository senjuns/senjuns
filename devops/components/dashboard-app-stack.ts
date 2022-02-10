import * as core from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as route53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets';
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export interface DashboardAppStackProps extends core.StackProps {
  stage: string;
}

/**
 * Dashboard CDK Stack for for hosting the ReactTS App in AWS S3
 */
export class DashboardAppStack extends core.Stack {
  /**
   * Creates a new Dashboard Stack.
   *
   * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
   * @param id The construct ID of this stack.
   * @param props Stack properties including specific Dashboard properties.
   */
  constructor(scope: core.Construct, id: string, props: DashboardAppStackProps) {
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

    new core.CfnOutput(this, 'DashboardBucketWebsiteUrl', {
      value: siteBucket.bucketWebsiteUrl,
    });

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');
    siteBucket.grantRead(cloudFrontOAI.grantPrincipal);

    const domainName = `${props.stage === 'prod' ? '' : props.stage + '.'}neatleaf.com`;
    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName });

    const certificate = new certificatemanager.DnsValidatedCertificate(this, 'certificate', {
      domainName: `dashboard.${domainName}`,
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
        aliases: ['dashboard.' + domainName],
      }),
    });

    const dashboardRecord = new route53.ARecord(this, 'dashboardRecord', {
      recordName: 'dashboard',
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone,
    });

    new core.CfnOutput(this, 'WebsiteUrl', {
      value: dashboardRecord.domainName,
    });

    new core.CfnOutput(this, 'DashboardCloudfrontDomainName', {
      value: distribution.distributionDomainName,
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'BucketDeployment', {
      sources: [s3deploy.Source.asset('../dashboard/build')],
      distribution,
      destinationBucket: siteBucket,
      memoryLimit: 10240,
    });
  }
}
