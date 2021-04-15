export interface IInputs {
    props: IProperties;
    project: {
        component: string;
        access: string;
        projectName: string;
    };
    appName: string;
    args: string;
    path: any;
}
export interface ICredentials {
    AccountID: string;
    AccessKeyID: string;
    AccessKeySecret: string;
    SecurityToken?: string;
}
export interface IProperties {
    region: string;
    projectName: string;
    stackName: string;
    cloudPlatform: string;
    workDir?: string;
    runtime?: string;
}
