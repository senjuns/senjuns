import * as core from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticWebsite } from './construcs/static-website';

export class LandingPageStack extends core.Stack {
  constructor(scope: Construct, id: string, props: core.StackProps = {}) {
    super(scope, id, props);

    const landingPage = new StaticWebsite(this, 'landingPage', {
      build: '../landingpage/build',
      domainName: 'senjun-teams.com',
      recordName: '',
      alternativeRecordName: 'www',
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

    new core.CfnOutput(this, 'AlternativeWebsiteCloudfrontDomainName', {
      value: landingPage.alternativeRecordDomainName || '',
    });
  }
}

export class DashboardAppStack extends core.Stack {
  constructor(scope: Construct, id: string, props: core.StackProps = {}) {
    super(scope, id, props);

    const dashboard = new StaticWebsite(this, 'dashboard', {
      build: '../dashboard/build',
      recordName: 'dashboard',
      domainName: 'senjun-teams.com',
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
