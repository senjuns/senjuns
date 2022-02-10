import * as core from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as route53 from '@aws-cdk/aws-route53';
export interface DashboardBackendStackProps extends core.StackProps {
    stage: string;
    /**
     * VPC where the cluster will be deployed into
     */
    vpc: ec2.Vpc;
    userPoolId?: string;
    /**
     * If you want to use an RDS rather than providing an external DB
     */
    useRdsDb?: boolean;
    domainName: string;
    zone: route53.IHostedZone;
}
/**
 * Hasura Stack for using ECS to run Hasura as a Container in Ec2.
 */
export declare class DashboardBackendStack extends core.Stack {
    /**
     * Creates a new Hasura Stack.
     *
     * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
     * @param id The construct ID of this stack.
     * @param props Stack properties including specific Hasura properties.
     */
    constructor(scope: core.Construct, id: string, props: DashboardBackendStackProps);
}
