import 'source-map-support/register';
import * as core from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as route53 from '@aws-cdk/aws-route53';
export interface CommonStackProps extends core.StackProps {
    stage: string;
}
/**
 * Common Stack for deploying AWS Services into.
 */
export declare class CommonStack extends core.Stack {
    vpc: ec2.Vpc;
    domainName: string;
    zone: route53.IHostedZone;
    /**
       * Creates a new VPC Stack.
       *
       * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
       * @param id The construct ID of this stack.
       * @param props Stack properties including specific VPC properties.
       */
    constructor(scope: core.Construct, id: string, props: CommonStackProps);
}
