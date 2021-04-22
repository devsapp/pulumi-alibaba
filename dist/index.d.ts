import * as pulumiAuto from '@pulumi/pulumi/x/automation';
import * as core from '@serverless-devs/core';
import { IInputs, ICredentials } from './interface';
export default class PulumiComponent {
    logger: core.ILogger;
    constructor();
    report(componentName: string, command: string, accountID?: string, access?: string): Promise<void>;
    checkPulumiVersion(): Promise<void>;
    handlerInputs(inputs: IInputs): Promise<{
        credentials: ICredentials;
        workDir: string;
        runtime: pulumiAuto.ProjectRuntime;
        region: string;
        args: string;
        cloudPlatform: string;
        stackName: string;
        projectName: string;
        access: string;
    }>;
    loginPulumi(url?: string, isLocal?: boolean, isSilent?: boolean): Promise<void>;
    login(inputs: IInputs): Promise<void>;
    getStack(stackName: string, workDir: string, projectName?: string, runtime?: pulumiAuto.ProjectRuntime): Promise<pulumiAuto.Stack>;
    createStack(workDir: string, projectName: string, runtime: pulumiAuto.ProjectRuntime, stackName: string): Promise<pulumiAuto.Stack>;
    removeStack(workDir: string, stackName: string): Promise<void>;
    listStack(workDir: string, stackName: string): Promise<pulumiAuto.StackSummary>;
    stack(inputs: IInputs): Promise<void>;
    up(inputs: IInputs): Promise<any>;
    destroy(inputs: IInputs): Promise<any>;
    installPlugins(cloudPlatform: string, stackName: string, stack: pulumiAuto.Stack): Promise<void>;
    installPluginFromLocal(inputs: any): Promise<void>;
    installPluginFromUrl(inputs: any): Promise<void>;
    import(inputs: IInputs): Promise<void>;
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
