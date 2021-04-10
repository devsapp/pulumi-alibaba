export interface IInputs {
    props: IProperties;
    credentials: ICredentials;
    appName: string;
    args: string;
    path: any;
}
export interface ICredentials {
    Alias: string;
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
