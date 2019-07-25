import chalk from 'chalk';
import {Prompt} from '../core/prompt';

export class ApiPrompts extends Prompt  {

  public static LANGUAGE_PYTHON_VALUE = 'python';

  public static MONITORING_CLOUDWATCH_VALUE = 'cloudwatch';

  public static TRACE_XRAY_VALUE = 'xray';

  public static DB_DYNAMODB_VALUE = 'dynamodb';

  public static PACKAGE_MANAGER_NPM_VALUE = 'npm';
  public static PACKAGE_MANAGER_YARN_VALUE = 'yarn';


  public askForLanguage(configValue: string | undefined, provider: string) {
    return configValue === undefined ? this.generator.prompt([{
      choices: [
        {name: 'Python 3.7', value:ApiPrompts.LANGUAGE_PYTHON_VALUE},
        // {name: 'NodeJS', value:ApiPrompts.LANGUAGE_NODEJS_VALUE}
      ],
      default: ApiPrompts.LANGUAGE_PYTHON_VALUE,
      message: `Which ${chalk.yellow('*Language*')} would you like to use for your API?`,
      name: 'language',
      type: 'list',
    }]) : { language : configValue };
  }

  public askForPackageManager(configValue: string | undefined, language: string) {
    return configValue === undefined ? this.generator.prompt([{
      choices: [
        {name: 'Yarn', value:ApiPrompts.PACKAGE_MANAGER_YARN_VALUE},
        {name: 'Npm', value:ApiPrompts.PACKAGE_MANAGER_NPM_VALUE}],
      default: ApiPrompts.PACKAGE_MANAGER_YARN_VALUE,
      message: `Which ${chalk.yellow('*Package Manager*')} would you like to use for your API?`,
      name: 'packageManager',
      type: 'list',
    }]) : { packageManager : configValue };
  }

  public askForMonitoring(configValue: string | undefined, provider: string) {
    return configValue === undefined ? this.generator.prompt([{
      choices: [
        {name: 'Cloudwatch', value:ApiPrompts.MONITORING_CLOUDWATCH_VALUE},
      ],
      default: ApiPrompts.MONITORING_CLOUDWATCH_VALUE,
      message: `Which ${chalk.yellow('*Monitoring*')} solution would you like to use?`,
      name: 'monitoring',
      type: 'list',
    }]) : { monitoring : configValue };
  }

  public askForTrace(configValue: string | undefined, provider: string) {
    return configValue === undefined ? this.generator.prompt([ {
      choices: [
        {name: 'XRay', value:ApiPrompts.TRACE_XRAY_VALUE},
      ],
      default: ApiPrompts.TRACE_XRAY_VALUE,
      message: `Which ${chalk.yellow('*Trace*')} solution would you like to use?`,
      name: 'trace',
      type: 'list',
    }]) : { trace : configValue };
  }

  public askForDB(configValue: string | undefined, provider: string) {
    return configValue === undefined ? this.generator.prompt([ {
      choices: [
        {name: 'NoSQL - DynamoDB', value:ApiPrompts.DB_DYNAMODB_VALUE},
      ],
      default: ApiPrompts.DB_DYNAMODB_VALUE,
      message: `Which ${chalk.yellow('*Database*')} would you like to use?`,
      name: 'db',
      type: 'list',
    }]) : { db : configValue };
  }
}
