import chalk from 'chalk';
import {Prompt} from '../prompt';

export class ClientPrompts extends Prompt  {

  public static FRAMEWORK_ANGULAR_VALUE = 'angular';

  public static PACKAGE_MANAGER_YARN_VALUE = 'yarn';
  public static PACKAGE_MANAGER_NPM_VALUE = 'npm';

  public askForFramework() {
    return {
      choices: [{name: 'Angular', value:ClientPrompts.FRAMEWORK_ANGULAR_VALUE}],
      default: ClientPrompts.FRAMEWORK_ANGULAR_VALUE,
      message: `Which ${chalk.yellow('*Framework*')} would you like to use for your client?`,
      name: 'framework',
      type: 'list',
    }
  }

  public askForPreprocessor() {
    return {
      default: true,
      message: `Would you like to enable ${chalk.yellow('*SASS*')} stylesheet preprocessor?`,
      name: 'useSass',
      type: 'confirm',
    }
  }

  public askForPackageManager() {
    return {
      choices: [
        {name: 'Yarn', value:ClientPrompts.PACKAGE_MANAGER_YARN_VALUE},
        {name: 'Npm', value:ClientPrompts.PACKAGE_MANAGER_NPM_VALUE}],
      default: ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
      message: `Which ${chalk.yellow('*Package Manager*')} would you like to use for your client?`,
      name: 'packageManager',
      type: 'list',
    }
  }

}
