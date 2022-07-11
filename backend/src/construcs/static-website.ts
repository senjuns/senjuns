import * as core from 'aws-cdk-lib';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as constructs from 'constructs';

const DEFAULT_RUNTIME_CONFIG_FILENAME = 'runtime-config.json';

/**
 * Dynamic configuration which gets resolved only during deployment.
 *
 * @example
 *
 * Will store a JSON file called runtime-config.json in the root of the StaticWebsite S3 bucket containing any
 * and all resolved values.
 * const runtimeConfig = {jsonPayload: {bucketArn: s3Bucket.bucketArn}};
 * new StaticWebsite(scope, 'StaticWebsite', {websiteContentPath: 'path/to/website', runtimeConfig});
 */
export interface RuntimeOptions {
  /**
   * File name to store runtime configuration (jsonPayload).
   *
   * Must follow pattern: '*.json'
   *
   * @default "runtime-config.json"
   */
  jsonFileName?: string;

  /**
   * Arbitrary JSON payload containing runtime values to deploy. Typically this contains resourceArns, etc which
   * are only known at deploy time.
   *
   * @example { userPoolId: some.userPool.userPoolId, someResourceArn: some.resource.Arn }
   */
  jsonPayload: any;
}

export interface StaticWebsiteProps {
  /**
   * e.g. dashboard . if '' than root
   */
  recordName: string;

  /**
   * e.g. senjuns.com
   */
  domainName: string;

  /**
   * e.g. www.senjuns.com
   */
  alternativeRecordName?: string;

  /**
   * build folder for static website
   * e.g. '../landingpage/build'
   */
  build: string;

  /**
   * Dynamic configuration which gets resolved only during deployment.
   */
  runtimeOptions?: RuntimeOptions;
}

export class StaticWebsite extends constructs.Construct {
  recordDomainName: string;
  bucketWebsiteUrl: string;
  distributionDomainName: string;
  alternativeRecordDomainName: string | undefined;

  constructor(
    scope: constructs.Construct,
    id: string,
    props: StaticWebsiteProps,
  ) {
    super(scope, id);

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          exposedHeaders: [
            'ETag',
            'x-amz-meta-custom-header',
            'Authorization',
            'Content-Type',
            'Accept',
          ],
        },
      ],
      removalPolicy: core.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.bucketWebsiteUrl = siteBucket.bucketWebsiteUrl;

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');
    siteBucket.grantRead(cloudFrontOAI.grantPrincipal);

    const hostedZone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: props.domainName,
    });

    const certificate = new certificatemanager.DnsValidatedCertificate(
      this,
      'certificate',
      {
        domainName: `${props.recordName === '' ? '' : props.recordName + '.'}${
          props.domainName
        }`,
        subjectAlternativeNames: props.alternativeRecordName
          ? [`${props.alternativeRecordName}.${props.domainName}`]
          : undefined,
        hostedZone,
        region: 'us-east-1',
      },
    );

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'Distribution',
      {
        enableIpV6: false,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: siteBucket,
              originAccessIdentity: cloudFrontOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 404,
            responsePagePath: '/index.html',
          },
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: props.alternativeRecordName
              ? [
                `${props.recordName === '' ? '' : props.recordName + '.'}${
                  props.domainName
                }`,
                `${props.alternativeRecordName}.${props.domainName}`,
              ]
              : [
                `${props.recordName === '' ? '' : props.recordName + '.'}${
                  props.domainName
                }`,
              ],
          },
        ),
      },
    );
    distribution.applyRemovalPolicy(core.RemovalPolicy.DESTROY);

    const record = new route53.ARecord(this, 'record', {
      recordName: props.recordName === '' ? undefined : props.recordName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      ),
      deleteExisting: true,
      zone: hostedZone,
    });

    const alternativeRecord = props.alternativeRecordName
      ? new route53.ARecord(this, 'alternativeRecord', {
        recordName: props.alternativeRecordName,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(distribution),
        ),
        deleteExisting: true,
        zone: hostedZone,
      })
      : undefined;

    this.recordDomainName = record.domainName;
    this.alternativeRecordDomainName = alternativeRecord?.domainName;
    this.distributionDomainName = distribution.distributionDomainName;

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'BucketDeployment', {
      sources: [
        s3deploy.Source.asset(props.build),
        ...(props.runtimeOptions
          ? [
            s3deploy.Source.jsonData(
              props.runtimeOptions?.jsonFileName ||
                  DEFAULT_RUNTIME_CONFIG_FILENAME,
              props.runtimeOptions?.jsonPayload,
            ),
          ]
          : []),
      ],
      distribution,
      destinationBucket: siteBucket,
    });
  }
}
