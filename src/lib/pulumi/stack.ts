import * as pulumiAuto from '@pulumi/pulumi/x/automation';
import * as core from '@serverless-devs/core';
import { processPulumiErr } from '../error';

export default class PulumiStack {
  @core.HLogger('PULUMI-ALIBABA') logger: core.ILogger;

  stack: pulumiAuto.Stack;
  readonly wsOpts: pulumiAuto.LocalWorkspaceOptions;
  readonly stackName: string;
  readonly localProgramArgs: pulumiAuto.LocalProgramArgs;

  constructor(stackName: string, localProgramArgs: pulumiAuto.LocalProgramArgs, wsOpts: pulumiAuto.LocalWorkspaceOptions) {
    this.stackName = stackName;
    this.wsOpts = wsOpts;
    this.localProgramArgs = localProgramArgs;
  }

  async create(): Promise<void> {
    this.stack = await pulumiAuto.LocalWorkspace.createOrSelectStack(this.localProgramArgs, this.wsOpts);
  }

  async select(): Promise<void> {
    this.stack = await pulumiAuto.LocalWorkspace.selectStack(this.localProgramArgs, this.wsOpts);
  }

  async remove(): Promise<void> {
    if (!this.stack) { await this.select(); }
    if (!this.stack) {
      this.logger.error(`Stack: ${this.stackName} not exist, please create it first!`);
      return;
    }

    await this.stack.workspace.removeStack(this.stackName);
  }

  async list(): Promise<pulumiAuto.StackSummary | undefined> {
    if (!this.stack) { await this.select(); }
    if (!this.stack) {
      this.logger.error(`Stack: ${this.stackName} not exist, please create it first!`);
      return;
    }

    return await this.stack.workspace.stack();
  }

  async setConfig(configName: string, configValue: any, isSecret?: boolean): Promise<void> {
    await this.create();
    await this.stack.setConfig(configName, { value: configValue, secret: isSecret });
  }

  async up(target: string[], targetDependents?: boolean, isDebug?: boolean): Promise<any> {
    await this.create();
    let res: any;
    try {
      if (isDebug) {
        await this.stack.refresh({ onOutput: console.info });
        res = await this.stack.up({ onOutput: console.info, target, targetDependents });
      } else {
        const refreshVm = core.spinner(`refreshing stack ${this.stackName}...`);
        try {
          await this.stack.refresh();
          refreshVm.succeed(`refresh stack ${this.stackName} complete.`);
        } catch (e) {
          refreshVm.fail(`refresh stack ${this.stackName} error`);
          throw new Error(e?.message);
        }
        const upVm = core.spinner(`updating stack ${this.stackName}...`);
        try {
          res = await this.stack.up({ target, targetDependents });
          upVm.succeed(`stack ${this.stackName} updated!`);
        } catch (e) {
          upVm.fail(`update stack ${this.stackName} error`);
          throw new Error(e?.message);
        }
      }
    } catch (e) {
      if (await processPulumiErr(e?.message, this.localProgramArgs.workDir, this.wsOpts.envVars)) {
        // retry
        this.logger.info('error: ');
      }
      throw e;
    }

    // const his = await stack.history();
    // const output = await stack.outputs();

    return {
      stdout: res?.stdout,
      stderr: res?.stderr,
    };
  }

  async destroy(options?: any): Promise<any> {
    const { isDebug, target, targetDependents } = options;
    this.logger.debug(`destroy target: ${target}, targetDependents is : ${targetDependents}`);
    await this.create();
    let res: any;
    try {
      if (isDebug) {
        res = await this.stack.destroy({ onOutput: console.info, target, targetDependents });
      } else {
        const destroyVm = core.spinner('destroying stack...');
        try {
          res = await this.stack.destroy({ target, targetDependents });
          destroyVm.succeed('destroyed!');
        } catch (e) {
          destroyVm.fail('error');
          throw new Error(e?.message);
        }
      }
    } catch (e) {
      if (!await processPulumiErr(e?.message, this.localProgramArgs.workDir, this.wsOpts.envVars)) {
        throw e;
      }
    }

    // const his = await stack.history();
    // const output = await stack.outputs();

    return {
      stdout: res?.stdout,
      stderr: res?.stderr,
    };
  }
}
