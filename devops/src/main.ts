import * as core from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticWebsite } from './construcs/static-website';
import * as route53 from 'aws-cdk-lib/aws-route53';

export class LandingPageStack extends core.Stack {
  constructor(scope: Construct, id: string, props: core.StackProps = {}) {
    super(scope, id, props);

    const landingPage = new StaticWebsite(this, 'landingPage', {
      build: '../landingpage/build',
      domainName: 'senjun-teams.com',
      zone: route53.HostedZone.fromLookup(this, 'Zone', { domainName: 'senjun-teams.com' }),
    });

    new core.CfnOutput(this, 'BucketWebsiteUrl', {
      value: landingPage.bucketWebsiteUrl,
    });

    new core.CfnOutput(this, 'CustomDomainWebsiteUrl', {
      value: landingPage.recordDomainName,
    });

    new core.CfnOutput(this, 'WebsiteCloudfrontDomainName', {
      value: landingPage.distributionDomainName,
    });
  }
}

export class DashboardAppStack extends core.Stack {
  constructor(scope: Construct, id: string, props: core.StackProps = {}) {
    super(scope, id, props);

    const landingPage = new StaticWebsite(this, 'landingPage', {
      build: '../dashboard/build',
      domainName: 'dashboard.senjun-teams.com',
      zone: route53.HostedZone.fromLookup(this, 'Zone', { domainName: 'senjun-teams.com' }),
    });

    new core.CfnOutput(this, 'BucketWebsiteUrl', {
      value: landingPage.bucketWebsiteUrl,
    });

    new core.CfnOutput(this, 'CustomDomainWebsiteUrl', {
      value: landingPage.recordDomainName,
    });

    new core.CfnOutput(this, 'WebsiteCloudfrontDomainName', {
      value: landingPage.distributionDomainName,
    });
  }
}

const devEnv = {
  account: '981237193288',
  region: 'eu-central-1',
};

const app = new core.App();

new LandingPageStack(app, 'prod-LandingPageStack', { env: devEnv });
new DashboardAppStack(app, 'prod-DashboardAppStack', { env: devEnv });

app.synth();