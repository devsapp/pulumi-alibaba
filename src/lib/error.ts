import { Logger, spinner } from '@serverless-devs/core';
import * as path from 'path';
import * as fse from 'fs-extra';

const { runPulumiCmd } = require('@pulumi/pulumi/x/automation/cmd');

const PENDING_ERR_INFO = 'with pending operations';

async function processPendingOperationsErr(workDir: string, pulumiEnvs?: any): Promise<boolean> {
  const stackJsonFileName = 'stack.json';
  const targetStackJsonFileName = 'stack_updated.json';
  const absWorkDir: string = path.resolve(workDir);
  const stackJsonFilePath = path.join(absWorkDir, stackJsonFileName);
  const targetStackJsonFilePath: string = path.join(absWorkDir, targetStackJsonFileName);

  const cmdRes = (await runPulumiCmd(['stack', 'export', '--file', stackJsonFilePath], workDir, pulumiEnvs)).stdout;

  if (!await fse.pathExists(stackJsonFilePath)) {
    Logger.debug('PULUMI-ALIBABA', `pulumi stack export res: ${cmdRes}`);
    return false;
  }
  const stackJsonContent: any = await fse.readJSON(stackJsonFilePath, { encoding: 'utf-8' });
  Logger.debug('PULUMI-ALIBABA', `current stack json content: ${stackJsonContent}`);
  delete stackJsonContent.deployment.pending_operations;

  await fse.writeJSON(targetStackJsonFilePath, stackJsonContent);

  await runPulumiCmd(['stack', 'import', '--file', targetStackJsonFilePath], workDir, pulumiEnvs);
}

export async function processPulumiErr(errMsg: string, workDir?: string, pulumiEnvs?: any): Promise<boolean> {
  if (errMsg.includes(PENDING_ERR_INFO)) {
    const solveVm = spinner('you have pending operations in your stack, processing it...');
    try {
      const isProcessed: boolean = await processPendingOperationsErr(workDir, pulumiEnvs);
      solveVm.succeed('process pending operations in your stack successfully!');
      return isProcessed;
    } catch (e) {
      Logger.debug('PULUMI-ALIBABA', `process error: ${e}`);
      return false;
    }
  }
  return false;
}
