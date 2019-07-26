import chalk from 'chalk';
import {Base} from './base';

export abstract class Prompt {

  public static PROVIDER_AWS_VALUE = 'aws';
  public static IAC_SAM_VALUE = 'sam';
  public static IAC_TERRAFORM_VALUE = 'terraform';
  public static IAC_SERVERLESS_VALUE = 'sls';
  public static AUTH_COGNITO_VALUE = 'cognito';
  public static COGNITO_CUP_ONLY = 'cup';
  public static COGNITO_CIP_ONLY = 'cup';
  public static COGNITO_CUP_CIP = 'cup-cip';

  constructor(public generator: Base) {
  }

  public async askForBaseName(configValue: string | undefined) {
    const defaultBaseName = this.generator.getDefaultBaseName();
    return configValue === undefined ? this.generator.prompt([{
      default: defaultBaseName,
      message: 'What is the name of your application?',
      name: 'baseName',
      type: 'input',
      validate: (input: string) => {
        if (!/^([a-zA-Z0-9_-]*)$/.test(input)) {
          return 'Your base name cannot contain special characters or a blank space';
        }
        if (input === 'application') {
          return "Your base name cannot be named 'application' as this is a reserved name";
        }
        return true;
      }
    }]) : { provider : configValue };
  }

  public async askForCloudProviders(configValue: string | undefined) {
    return configValue === undefined ? this.generator.prompt([ {
      choices: [{name: 'Amazone Web Services', value: Prompt.PROVIDER_AWS_VALUE}],
      default: Prompt.PROVIDER_AWS_VALUE,
      message: 'Which Cloud Providers do you want to use?',
      name: 'provider',
      type: 'list',
    }]) : { provider : configValue };
  }

  public async askForInfraAsCode(configValue: string | undefined, provider: string) {
    return configValue === undefined ? this.generator.prompt([ {
      choices: [
        {name: 'AWS SAM (Serverless Application Model)', value: Prompt.IAC_SAM_VALUE},
        // {name: 'Terraform', value: Prompt.IAC_TERRAFORM_VALUE},
        // {name: 'Serverless Framework', value: Prompt.IAC_SERVERLESS_VALUE}
      ],
      default: Prompt.IAC_SAM_VALUE,
      message: 'Which InfraAsCode technologie do you want to use?',
      name: 'iac',
      type: 'list',
    }]) : { iac : configValue };
  }

  public async askForAuth(configValue: string | undefined, provider: string) {
    return configValue === undefined ? this.generator.prompt([ {
      choices: [
        {name: 'Based on AWS Cognito services', value:Prompt.AUTH_COGNITO_VALUE},
      ],
      default: Prompt.AUTH_COGNITO_VALUE,
      message: `Which ${chalk.yellow('*Authentication & Authorization*')} service would you like to use?`,
      name: 'auth',
      type: 'list',
    }]) : { auth : configValue };
  }

  public async askForCognitoIntegration(configValue: string | undefined, provider: string) {
    return configValue === undefined ? this.generator.prompt([ {
      choices: [
        {name: 'Use UserPool only (JWT)', value:Prompt.COGNITO_CUP_ONLY},
        {name: 'Use an IdentityPool only (IAM Authorization)', value:Prompt.COGNITO_CIP_ONLY},
        {name: 'Use an UserPool and an IdentityPool (IAM Authorization)', value:Prompt.COGNITO_CUP_CIP},
      ],
      default: Prompt.COGNITO_CUP_CIP,
      message: `Which ${chalk.yellow('*Integration*')} with AWS Cognito would you like to use?`,
      name: 'cognitoIntegration',
      type: 'list',
    }]) : { auth : configValue };
  }
}
