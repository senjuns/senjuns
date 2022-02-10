import * as core from '@aws-cdk/core';
export interface DashboardAppStackProps extends core.StackProps {
    stage: string;
}
/**
 * Dashboard CDK Stack for for hosting the ReactTS App in AWS S3
 */
export declare class DashboardAppStack extends core.Stack {
    /**
     * Creates a new Dashboard Stack.
     *
     * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
     * @param id The construct ID of this stack.
     * @param props Stack properties including specific Dashboard properties.
     */
    constructor(scope: core.Construct, id: string, props: DashboardAppStackProps);
}
