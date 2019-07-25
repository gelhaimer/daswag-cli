import chalk from 'chalk';
import {Base} from './base';

export abstract class Prompt {

  public static PROVIDER_AWS_VALUE = 'aws';
  public static IAC_SAM_VALUE = 'sam';
  public static IAC_TERRAFORM_VALUE = 'terraform';
  public static IAC_SERVERLESS_VALUE = 'sls';
  public static AUTH_AUTH0_VALUE = 'auth0';
  public static AUTH_COGNITO_VALUE = 'cognito';
  public static AUTH_OAUTH2_VALUE = 'oauth2';

  constructor(public generator: Base) {
  }

  public async askForBaseName(configValue: string | undefined) {
    const defaultBaseName = this.generator.getDefaultBaseName();
    return configValue === undefined ? this.generator.prompt([{
      default: defaultBaseName,
      message: 'What is the base name of your application?',
      name: 'baseName',
      type: 'input',
      validate: (input: string) => {
        if (!/^([a-zA-Z0-9_]*)$/.test(input)) {
          return 'Your base name cannot contain special characters or a blank space';
        }
        if (input === 'application') {
          return "Your base name cannot be named 'application' as this is a reserved name";
        }
        return true;
      }
    }]) : {};
  }

  public async askForCloudProviders(configValue: string | undefined) {
    return configValue === undefined ? this.generator.prompt([ {
      choices: [{name: 'Amazone Web Services', value: 'AWS'}],
      default: Prompt.PROVIDER_AWS_VALUE,
      message: 'On which cloud providers do you want to deploy your infrastructure?',
      name: 'provider',
      type: 'list',
    }]) : { provider : configValue };
  }

  public async askForInfraAsCode(configValue: string | undefined, provider: string) {
    return configValue === undefined ? this.generator.prompt([ {
      choices: [
        {name: 'Cloudformation / SAM (Serverless Application Model)', value: Prompt.IAC_SAM_VALUE},
        // {name: 'Terraform', value: Prompt.IAC_TERRAFORM_VALUE},
        // {name: 'Serverless Framework', value: Prompt.IAC_SERVERLESS_VALUE}
      ],
      default: Prompt.IAC_SAM_VALUE,
      message: 'Which InfraAsCode do you want to use?',
      name: 'iac',
      type: 'list',
    }]) : { iac : configValue };
  }

  public async askForAuthentication(configValue: string | undefined, provider: string) {
    return configValue === undefined ? this.generator.prompt([ {
      choices: [
        {name: 'Auth0', value: Prompt.AUTH_AUTH0_VALUE},
        // {name: 'Cognito', value:Prompt.AUTH_COGNITO_VALUE},
        // {name: 'Basic OAuth2 provider', value:Prompt.AUTH_OAUTH2_VALUE}
      ],
      default: Prompt.AUTH_AUTH0_VALUE,
      message: `Which ${chalk.yellow('*Authentication*')} would you like to use?`,
      name: 'auth',
      type: 'list',
    }]) : { auth : configValue };
  }
}
