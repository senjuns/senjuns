import 'source-map-support/register';
import * as core from '@aws-cdk/core';
export interface StageStackProps extends core.StackProps {
    stage: string;
    enableLambdaAlarms?: boolean;
    userPoolId?: string;
}
export declare class Stage {
    /**
       * A stage which is a collection of stacks.
       *
       */
    constructor(scope: core.Construct, props: StageStackProps);
}
