import * as pulumiAuto from '@pulumi/pulumi/x/automation';
import * as core from '@serverless-devs/core';
export default class PulumiComponent {
    logger: core.ILogger;
    constructor();
    checkPulumiVersion(): Promise<void>;
    handlerInputs(inputs: any): Promise<{
        credentials: any;
        workDir: any;
        runtime: pulumiAuto.ProjectRuntime;
        region: any;
        args: any;
        cloudPlatform: any;
        stackName: any;
        projectName: any;
    }>;
    loginPulumi(url?: string, isLocal?: boolean, isSilent?: boolean): Promise<void>;
    login(inputs: any): Promise<void>;
    getStack(stackName: string, workDir: string, projectName?: string, runtime?: pulumiAuto.ProjectRuntime): Promise<pulumiAuto.Stack>;
    createStack(workDir: string, projectName: string, runtime: pulumiAuto.ProjectRuntime, stackName: string): Promise<pulumiAuto.Stack>;
    removeStack(workDir: string, stackName: string): Promise<void>;
    listStack(workDir: string, stackName: string): Promise<pulumiAuto.StackSummary>;
    stack(inputs: any): Promise<void>;
    up(inputs: any): Promise<any>;
    destroy(inputs: any): Promise<any>;
    installPlugins(cloudPlatform: string, stackName: string, stack: pulumiAuto.Stack): Promise<void>;
    installPluginFromLocal(inputs: any): Promise<void>;
    readonly pulumiAlreadyExists: boolean;
    readonly pulumiDir: string;
    readonly pulumiHome: string;
    readonly pulumiBin: string;
    readonly pulumiPath: string;
    readonly pulumiConfigPassphrase: string;
    readonly pulumiEnvs: {
        [key: string]: any;
    };
}
