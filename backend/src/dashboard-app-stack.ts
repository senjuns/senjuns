import * as core from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticWebsite } from './construcs/static-website';

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
