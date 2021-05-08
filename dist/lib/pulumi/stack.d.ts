import * as pulumiAuto from '@pulumi/pulumi/x/automation';
import * as core from '@serverless-devs/core';
export default class PulumiStack {
    logger: core.ILogger;
    stack: pulumiAuto.Stack;
    readonly wsOpts: pulumiAuto.LocalWorkspaceOptions;
    readonly stackName: string;
    readonly localProgramArgs: pulumiAuto.LocalProgramArgs;
    constructor(stackName: string, localProgramArgs: pulumiAuto.LocalProgramArgs, wsOpts: pulumiAuto.LocalWorkspaceOptions);
    create(): Promise<void>;
    select(): Promise<void>;
    remove(): Promise<void>;
    list(): Promise<pulumiAuto.StackSummary | undefined>;
    setConfig(configName: string, configValue: any, isSecret?: boolean): Promise<void>;
    up(isDebug?: boolean): Promise<any>;
    destroy(isDebug?: boolean): Promise<any>;
}
