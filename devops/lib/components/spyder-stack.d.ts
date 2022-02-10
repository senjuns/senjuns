import * as core from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as route53 from '@aws-cdk/aws-route53';
export interface SpyderStackProps extends core.StackProps {
    vpc: ec2.Vpc;
    stage: string;
    enableAlarms?: boolean;
    domainName: string;
    zone: route53.IHostedZone;
}
/**
 * Lambda CDK Stack
 */
export declare class SpyderStack extends core.Stack {
    /**
     * Creates a new Lambda Stack.
     *
     * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
     * @param id The construct ID of this stack.
     * @param props Stack properties including specific Lambda properties.
     */
    constructor(scope: core.Construct, id: string, props: SpyderStackProps);
}
