import chalk from 'chalk';
import {Base} from './base';


export abstract class Prompt {

  public static PROVIDER_AWS_VALUE = 'AWS';
  public static IAC_CLOUDFORMATION_VALUE = 'cfn';
  public static IAC_TERRAFORM_VALUE = 'terraform';
  public static IAC_SERVERLESS_VALUE = 'sls';
  public static AUTH_AUTH0_VALUE = 'auth0';
  public static AUTH_COGNITO_VALUE = 'cognito';
  public static AUTH_OAUTH2_VALUE = 'oauth2';


  constructor(public generator: Base) {}

  public askForBaseName() {
    const defaultBaseName = this.generator.getDefaultBaseName();
    return {
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
    }
  }

  public askForCloudProviders() {
    return {
      choices: [{name: 'Amazone Web Services', value:'AWS'}],
      default: Prompt.PROVIDER_AWS_VALUE,
      message: 'On which cloud providers do you want to deploy your infrastructure?',
      name: 'provider',
      type: 'list',
    }
  }

  public askForInfraAsCode(provider: string) {
    return {
      choices: [{name: 'SAM (Serverless Application Model)', value:Prompt.IAC_CLOUDFORMATION_VALUE}, {name: 'Terraform', value:Prompt.IAC_TERRAFORM_VALUE}, {name: 'Serverless Framework', value:Prompt.IAC_SERVERLESS_VALUE}],
      default: Prompt.IAC_CLOUDFORMATION_VALUE,
      message: 'On which cloud providers do you want to deploy your infrastructure?',
      name: 'iac',
      type: 'list',
    }
  }

  public askForAuthentication() {
    return {
      choices: [{name: 'Auth0', value:Prompt.AUTH_AUTH0_VALUE}, {name: 'Cognito', value:Prompt.AUTH_COGNITO_VALUE}, {name: 'Basic OAuth2 provider', value:Prompt.AUTH_OAUTH2_VALUE}],
      default: Prompt.AUTH_AUTH0_VALUE,
      message: `Which ${chalk.yellow('*Language*')} would you like to ue for your API?`,
      name: 'language',
      type: 'list',
    }
  }

  public async askForBasicQuestions() {
    // Ask for base questions like name or provider
    const answersBase = await this.generator.prompt([
                                            this.askForBaseName(),
                                            this.askForCloudProviders()
                                          ]) as any;


    // Build IaC question based on provider value
    const answersIac = await this.generator.prompt([
                                           this.askForInfraAsCode(answersBase.provider)
                                         ]) as any;
    return {
      ... answersBase,
      ... answersIac
    }
  }
}
