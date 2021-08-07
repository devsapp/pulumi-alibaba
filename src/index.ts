import * as pulumiAuto from '@pulumi/pulumi/x/automation';
import * as path from 'path';
import * as os from 'os';
import * as fse from 'fs-extra';
import commandExists from 'command-exists';
import * as shell from 'shelljs';
import * as core from '@serverless-devs/core';
import * as util from 'util';
import { getLatestVersionOfPackage } from './lib/utils/npm-pkg';
import * as _ from 'lodash';
import semver from 'semver';
import { IInputs, ICredentials, IProperties } from './interface';
import PulumiStack from './lib/pulumi/stack';
import StdoutFormatter from './lib/stdout-formatter';

const { runPulumiCmd } = require('@pulumi/pulumi/x/automation/cmd');

const DEFAULT = {
  region: 'cn-hangzhou',
  workDir: '.',
  runtime: 'nodejs',
  pulumiHome: path.join(os.homedir(), '.pulumi'),
};

const SUPPORTED_CLOUD_PLATFORMS = ['alicloud'];
const SUPPORTED_RUNTIME = ['nodejs', 'go', 'python', 'dotnet'];
const PULUMI_INSTALL_FILE_PATH = path.join(__dirname, 'lib/utils/pulumi/install.js');
const MIN_PULUMI_VERSION = 'v2.21.0';

export default class PulumiComponent {
  @core.HLogger('PULUMI-ALIBABA') logger: core.ILogger;
  constructor() {
    if (fse.pathExistsSync(DEFAULT.pulumiHome) && commandExists.sync('pulumi')) {
      // pulumi cli exists
      this.pulumiDir = path.dirname(DEFAULT.pulumiHome);
      this.pulumiHome = DEFAULT.pulumiHome;
      this.pulumiAlreadyExists = true;
    } else {
      this.pulumiDir = os.homedir();
      this.pulumiHome = path.join(this.pulumiDir, '.pulumi');
      this.pulumiBin = path.join(this.pulumiHome, 'bin');
      this.pulumiPath = path.join(this.pulumiBin, 'pulumi');

      if (!fse.pathExistsSync(this.pulumiPath)) {
        shell.exec(`node ${PULUMI_INSTALL_FILE_PATH}`);
      }
      this.pulumiAlreadyExists = false;
    }

    this.pulumiConfigPassphrase = 'password';
    this.logger.debug(`Reminder pulumi: PULUMI_CONFIG_PASSPHRASE is ${this.pulumiConfigPassphrase}`);

    if (!this.pulumiAlreadyExists) {
      process.env.PATH = `${process.env.PATH }:${this.pulumiBin}`;
    }

    this.pulumiEnvs = Object.assign({}, process.env, {
      PULUMI_CONFIG_PASSPHRASE: this.pulumiConfigPassphrase,
      PULUMI_SKIP_UPDATE_CHECK: 1,
      PULUMI_ENABLE_LEGACY_PLUGIN_SEARCH: 1,
      PULUMI_SKIP_CONFIRMATIONS: 1,
      PULUMI_HOME: this.pulumiHome,
    });
  }

  async report(componentName: string, command: string, accountID?: string, access?: string): Promise<void> {
    let uid: string = accountID;
    if (!accountID && access) {
      const credentials: ICredentials = await core.getCredential(access);
      uid = credentials.AccountID;
    }

    try {
      core.reportComponent(componentName, {
        command,
        uid,
      });
    } catch (e) {
      this.logger.warn(`Component ${componentName} report error: ${e.message}`);
    }
  }
  async checkPulumiVersion() {
    const curPulumiVersion = (await runPulumiCmd(['version'], process.cwd(), this.pulumiEnvs)).stdout;
    if (semver.lt(curPulumiVersion, MIN_PULUMI_VERSION)) {
      throw new Error(`Your pulumi version: ${curPulumiVersion} is less than ${MIN_PULUMI_VERSION}, please update it. More info refer to https://www.pulumi.com/docs/get-started/install/`);
    }
  }
  // 解析入参
  async handlerInputs(inputs: IInputs) {
    const prop: IProperties = inputs?.props;
    const access = inputs?.project?.access;
    const args = inputs?.args;

    const credentials: ICredentials = await core.getCredential(access);
    const workDir = prop?.workDir || DEFAULT.workDir;
    // @ts-ignore
    const runtime: pulumiAuto.ProjectRuntime = prop?.runtime || DEFAULT.runtime;
    const region = prop?.region || DEFAULT.region;
    const cloudPlatform = prop?.cloudPlatform;
    const stackName = prop?.stackName;
    const projectName = prop?.projectName;

    if (!cloudPlatform || (SUPPORTED_CLOUD_PLATFORMS.indexOf(cloudPlatform) < 0)) {
      throw new Error(`${cloudPlatform} not supported now, supported cloud platform includes ${SUPPORTED_CLOUD_PLATFORMS}`);
    }

    if (SUPPORTED_RUNTIME.indexOf(runtime) < 0) {
      throw new Error(`\n${runtime} not supported now, supported runtime includes [${SUPPORTED_RUNTIME}]`);
    }
    const wsOpts: pulumiAuto.LocalWorkspaceOptions = {
      workDir,
      pulumiHome: this.pulumiHome,
      envVars: this.pulumiEnvs,
      projectSettings: {
        name: projectName,
        runtime,
      },
    };

    const localProgramArgs: pulumiAuto.LocalProgramArgs = {
      stackName,
      workDir,
    };
    const pulumiStack = new PulumiStack(stackName, localProgramArgs, wsOpts);

    return {
      credentials,
      workDir,
      runtime,
      region,
      args,
      cloudPlatform,
      stackName,
      projectName,
      access,
      pulumiStack,
    };
  }

  async loginPulumi(url?: string, isLocal?: boolean, isSilent?: boolean): Promise<void> {
    if (isLocal) {
      await runPulumiCmd(['login', `file://${this.pulumiDir}`], process.cwd(), this.pulumiEnvs, isSilent ? undefined : console.info);
    } else {
      await runPulumiCmd(['login', url], process.cwd(), this.pulumiEnvs, isSilent ? undefined : console.info);
    }
  }


  async login(inputs: IInputs): Promise<void> {
    const { args, credentials } = await this.handlerInputs(inputs);
    await this.report('pulumi', 'login', credentials.AccountID);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['s', 'silent', 'local'] });
    this.logger.debug(`parsedArgs: ${JSON.stringify(parsedArgs)}`);
    const nonOptionsArgs = parsedArgs.data?._;

    const isSilent = parsedArgs.data?.s || parsedArgs.data?.silent;
    const isLocal = parsedArgs.data?.local;
    if (_.isEmpty(nonOptionsArgs) && !isLocal) {
      this.logger.error('error: expects argument.');
      // help info
      return;
    }
    if (nonOptionsArgs.length > 1) {
      this.logger.error(`error: unexpected argument: ${nonOptionsArgs[1]}`);
      // help info
      return;
    }
    const loginUrl = nonOptionsArgs[0];

    await this.loginPulumi(loginUrl, isLocal, isSilent);
  }

  async getStack(stackName: string, workDir: string, projectName?: string, runtime?: pulumiAuto.ProjectRuntime): Promise<pulumiAuto.Stack> {
    const LocalProgramArgs: pulumiAuto.LocalProgramArgs = {
      stackName,
      workDir,
    };
    const wsOpts: pulumiAuto.LocalWorkspaceOptions = {
      workDir,
      pulumiHome: this.pulumiHome,
      envVars: this.pulumiEnvs,
    };

    if (projectName && runtime) {
      wsOpts.projectSettings = {
        name: projectName,
        runtime,
      };
    }
    const stack = await pulumiAuto.LocalWorkspace.selectStack(LocalProgramArgs, wsOpts);
    return stack;
  }


  async stack(inputs: IInputs): Promise<void> {
    const {
      credentials,
      region,
      args,
      stackName,
      projectName,
      cloudPlatform,
      pulumiStack } = await this.handlerInputs(inputs);

    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['s', 'silent'] });
    this.logger.debug(`parsedArgs: ${JSON.stringify(parsedArgs)}`);
    const nonOptionsArgs = parsedArgs.data?._;

    if (_.isEmpty(nonOptionsArgs)) {
      this.logger.error(' error: expects argument.');
      // help info
      return;
    }
    if (nonOptionsArgs.length > 1) {
      this.logger.error(` error: unexpected argument: ${nonOptionsArgs[1]}`);
      // help info
      return;
    }
    const subCmd: string = nonOptionsArgs[0];

    if (!await fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))) {
      await this.loginPulumi(undefined, true);
    }
    await StdoutFormatter.initStdout();

    switch (subCmd) {
      case 'init': {
        await this.report('pulumi', 'stack init', credentials.AccountID);
        this.logger.debug('Initializing stack...');
        await pulumiStack.create();
        this.logger.debug(`Stack ${stackName} of project ${projectName} initialized.`);
        if (cloudPlatform === 'alicloud') {
          await pulumiStack.setConfig('alicloud:secretKey', credentials.AccessKeySecret, true);
          await pulumiStack.setConfig('alicloud:accessKey', credentials.AccessKeyID, true);
          await pulumiStack.setConfig('alicloud:region', region, false);
        }
        break;
      }
      case 'rm': {
        await this.report('pulumi', 'stack rm', credentials.AccountID);
        this.logger.info(StdoutFormatter.stdoutFormatter?.remove('pulumi stack', `${stackName} of project ${projectName}`));
        this.logger.debug('Removing stack...');
        await pulumiStack.remove();
        this.logger.debug(`Stack ${stackName} of project ${projectName} removed.`);
        break;
      }
      case 'ls': {
        await this.report('pulumi', 'stack ls', credentials.AccountID);
        const curStack: pulumiAuto.StackSummary = await pulumiStack.list();
        if (curStack) {
          this.logger.info(`Summary of stack ${stackName} is: `);
          this.logger.log(util.inspect(curStack, true, null, true), 'green');
        } else {
          this.logger.info(`Summary of stack ${stackName} is undefined.`);
        }

        break;
      }
      default: {
        this.logger.info(`Sorry, stack ${subCmd} is not supported for pulumi component`);
      }
    }
  }

  async up(inputs: IInputs): Promise<any> {
    await this.checkPulumiVersion();
    const {
      credentials,
      cloudPlatform,
      region,
      pulumiStack } = await this.handlerInputs(inputs);

    await this.report('pulumi', 'up', credentials.AccountID);
    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, { boolean: ['s', 'silent', 'local'] });
    this.logger.debug(`parsedArgs: ${JSON.stringify(parsedArgs)}`);
    const argsData = parsedArgs?.data || {};
    const nonOptionsArgs = argsData?._;


    const isSilent = argsData?.s || argsData?.silent;
    const isDebug = argsData?.debug || process.env?.temp_params?.includes('--debug');
    const target: any = argsData?.t || argsData?.target;
    const targetArr: string[] = typeof (target) === 'string' ? [target] : target;
    const targetDependents: boolean = argsData['target-dependents'];

    !_.isEmpty(target) && this.logger.info(`Using target: ${target}`);

    if (!_.isEmpty(nonOptionsArgs)) {
      this.logger.error(`error: unexpect argument ${nonOptionsArgs}`);
      // help info
      return;
    }
    if (!await fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))) {
      await this.loginPulumi(undefined, true, isSilent);
    }
    await pulumiStack.create();
    if (cloudPlatform === 'alicloud') {
      await pulumiStack.setConfig('alicloud:secretKey', credentials.AccessKeySecret, true);
      await pulumiStack.setConfig('alicloud:accessKey', credentials.AccessKeyID, true);
      await pulumiStack.setConfig('alicloud:region', region, false);
    }
    return await pulumiStack.up(targetArr, targetDependents, isDebug);
    // await runPulumiCmd(['import', 'alicloud:fc/service:Service' , 'import-test', 'python37-demo', '--yes', '--protect=false', `--stack ${stackName}`], process.cwd(), { PULUMI_HOME: this.pulumiHome, PULUMI_CONFIG_PASSPHRASE: this.pulumiConfigPassphrase }, console.info);
  }

  async destroy(inputs: IInputs): Promise<any> {
    await this.checkPulumiVersion();
    const {
      credentials,
      args,
      pulumiStack } = await this.handlerInputs(inputs);

    await this.report('pulumi', 'destroy', credentials.AccountID);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['s', 'silent', 'local', 'target-dependents'] });
    this.logger.debug(`parsedArgs: ${JSON.stringify(parsedArgs)}`);

    const nonOptionsArgs: any = parsedArgs.data?._;
    const argsData: any = parsedArgs.data || {};
    const isDebug = argsData?.debug || process.env?.temp_params?.includes('--debug');
    if (!_.isEmpty(nonOptionsArgs)) {
      this.logger.error(`error: unexpect argument ${nonOptionsArgs}`);
      // help info
      return;
    }
    const target: any = argsData?.t || argsData?.target;
    const targetArr: string[] = typeof (target) === 'string' ? [target] : target;
    const targetDependents: boolean = argsData['target-dependents'];
    const isSilent: boolean = argsData?.s || argsData?.silent;

    if (!await fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))) {
      await this.loginPulumi(undefined, true, isSilent);
    }

    return await pulumiStack.destroy({ isDebug, target: targetArr, targetDependents });
  }


  async installPlugins(cloudPlatform: string, stackName: string, stack: pulumiAuto.Stack): Promise<void> {
    const pkgName = `@pulumi/${cloudPlatform}`;
    const version = `v${getLatestVersionOfPackage(pkgName)}`;
    this.logger.info(`wating for plugin ${cloudPlatform}:${version} to be installed`);
    await stack.workspace.installPlugin(cloudPlatform, version);
  }

  async installPluginFromLocal(inputs): Promise<void> {
    // 传入源路径
    const args = inputs?.Args || inputs?.args;
    const srcPath = path.resolve(args);
    const pulumiPluginPath = path.join(this.pulumiHome, 'plugins');
    this.logger.debug(`Install plugin from ${srcPath} to ${pulumiPluginPath}`);
    await fse.copy(srcPath, pulumiPluginPath, { overwrite: false, recursive: true });
  }

  async installPluginFromUrl(inputs): Promise<void> {
    // 传入 url
    const url = inputs?.props?.url;
    const version = inputs?.props?.version;
    const pulumiPluginPath = path.join(this.pulumiHome, 'plugins');
    const pluginLockfilePath = path.join(pulumiPluginPath, `resource-alicloud-${version}.lock`);
    const pluginDirPath = path.join(pulumiPluginPath, `resource-alicloud-${version}`);
    if (!await fse.pathExists(pluginLockfilePath) || !await fse.pathExists(pluginDirPath)) {
      this.logger.debug(`Install plugin from ${url} to ${pulumiPluginPath}`);
      await core.downloadRequest(url, pulumiPluginPath, { extract: true });
    }
  }

  async import(inputs: IInputs): Promise<void> {
    const {
      credentials,
      args,
      workDir,
      cloudPlatform,
      region } = await this.handlerInputs(inputs);
    await this.report('pulumi', 'import', credentials.AccountID);
    const isDebug: boolean = process.env?.temp_params?.includes('--debug');
    if (cloudPlatform === 'alicloud') {
      await runPulumiCmd(['config', 'set', 'alicloud:secretKey', credentials.AccessKeySecret, '--secret'], workDir, this.pulumiEnvs, isDebug ? console.info : undefined);
      await runPulumiCmd(['config', 'set', 'alicloud:accessKey', credentials.AccessKeyID, '--secret'], workDir, this.pulumiEnvs, isDebug ? console.info : undefined);
      await runPulumiCmd(['config', 'set', 'alicloud:region', region], workDir, this.pulumiEnvs, isDebug ? console.info : undefined);
    }
    const argsArr: string[] = ['import', ...args.trim().split(/\s+/)];
    // reuse pulumi import
    if (isDebug) {
      await runPulumiCmd(argsArr, workDir, this.pulumiEnvs, console.info);
    } else {
      const importVm = core.spinner(`importing ${argsArr[1]}: ${argsArr[3]} into stack...`);
      try {
        await runPulumiCmd(argsArr, workDir, this.pulumiEnvs);
        importVm.succeed(`${argsArr[1]}: ${argsArr[3]} is imported!`);
      } catch (e) {
        importVm.fail(`\nimport ${argsArr[1]}: ${argsArr[3]} error`);
        throw new Error(e?.message);
      }
    }
  }

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
