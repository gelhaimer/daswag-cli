import chalk from 'chalk';
import {Prompt} from '../prompt';

export class ApiPrompts extends Prompt  {

  public static LANGUAGE_PYTHON_VALUE = 'python';
  public static LANGUAGE_NODEJS_VALUE = 'nodejs';

  public static MONITORING_ESPAGON_VALUE = 'espagon';
  public static MONITORING_CLOUDWATCH_VALUE = 'cloudwatch';
  public static MONITORING_DATADOG_VALUE = 'datadog';

  public static TRACE_XRAY_VALUE = 'xray';
  public static TRACE_ESPAGON_VALUE = 'espagon';
  public static TRACE_DATADOG_VALUE = 'datadog';

  public static DB_DYNAMODB_VALUE = 'dynamodb';
  public static DB_AURORA_VALUE = 'aurora';

  public static PACKAGE_MANAGER_NPM_VALUE = 'npm';
  public static PACKAGE_MANAGER_YARN_VALUE = 'yarn';


  public askForLanguage(provider: string) {
    return {
      choices: [
        {name: 'Python 3.x', value:ApiPrompts.LANGUAGE_PYTHON_VALUE},
        {name: 'NodeJS', value:ApiPrompts.LANGUAGE_NODEJS_VALUE}
        ],
      default: ApiPrompts.LANGUAGE_PYTHON_VALUE,
      message: `Which ${chalk.yellow('*Language*')} would you like to use for your API?`,
      name: 'language',
      type: 'list',
    }
  }

  public askForPackageManager(language: string) {
    return {
      choices: [
        {name: 'Yarn', value:ApiPrompts.PACKAGE_MANAGER_YARN_VALUE},
        {name: 'Npm', value:ApiPrompts.PACKAGE_MANAGER_NPM_VALUE}],
      default: ApiPrompts.PACKAGE_MANAGER_YARN_VALUE,
      message: `Which ${chalk.yellow('*Package Manager*')} would you like to use for your API?`,
      name: 'packageManager',
      type: 'list',
    }
  }

  public askForMonitoring(provider: string) {
    return {
      choices: [
        {name: 'Cloudwatch', value:ApiPrompts.MONITORING_CLOUDWATCH_VALUE},
        {name: 'DataDog', value:ApiPrompts.MONITORING_DATADOG_VALUE},
        {name: 'Espagon', value:ApiPrompts.MONITORING_ESPAGON_VALUE}],
      default: ApiPrompts.MONITORING_CLOUDWATCH_VALUE,
      message: `Which ${chalk.yellow('*Monitoring*')} solution would you like to use?`,
      name: 'monitoring',
      type: 'list',
    }
  }

  public askForTrace(provider: string) {
    return {
      choices: [
        {name: 'XRay', value:ApiPrompts.TRACE_XRAY_VALUE},
        {name: 'DataDog', value:ApiPrompts.TRACE_DATADOG_VALUE},
        {name: 'Espagon', value:ApiPrompts.TRACE_ESPAGON_VALUE}],
      default: ApiPrompts.TRACE_XRAY_VALUE,
      message: `Which ${chalk.yellow('*Trace*')} solution would you like to use?`,
      name: 'trace',
      type: 'list',
    }
  }

  public askForDB(provider: string) {
    return {
      choices: [
        {name: 'NoSQL - DynamoDB', value:ApiPrompts.DB_DYNAMODB_VALUE},
        {name: 'Relational - Aurora Serverless', value:ApiPrompts.DB_AURORA_VALUE}
        ],
      default: ApiPrompts.DB_DYNAMODB_VALUE,
      message: `Which ${chalk.yellow('*Database*')} would you like to use?`,
      name: 'db',
      type: 'list',
    }
  }
}
