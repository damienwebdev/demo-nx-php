import { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

export default async function echoExecutor(
  options: undefined,
  context: ExecutorContext
) {
  console.log('Running PHPUnit Executor...');
  try {
    const { stderr, stdout } = await promisify(exec)(`vendor/bin/phpunit ${context.workspace.projects[context.projectName].root}`);
    console.log(stdout);
    console.error(stderr);
    return { success: !stderr };
  } catch (e) {
    console.log(e.stdout);
    console.error(e.stderr);
    return { success: false };
  }
}
