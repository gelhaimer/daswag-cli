import chalk from 'chalk';
import { StringUtils } from 'turbocommons-ts';
import CheckUtils from '../../utils/check-utils';
import Utils from "../../utils/utils";
import App = require('../app');
import {ClientPrompts} from '../client/client-prompts';
import {Base} from '../core/base';
import {ApiFiles} from "./api-files";
import {IApiOptions} from "./api-options.model";
import {ApiPrompts} from './api-prompts';
import * as path from "path";

class Api extends Base {

  public static GENERATOR_TYPE = 'api';

  private opts: IApiOptions;

  private readonly type: string;
  private readonly skipChecks: boolean;
  private readonly skipGit: boolean;

  constructor(args: string | string[], options: any) {
    super(args, options);
    this.type = options.type || Api.GENERATOR_TYPE;
    this.skipChecks = options.skipChecks;
    this.skipGit = options.skipGit;
    this.opts = {
      applicationType: options.applicationType,
      auth: options.auth,
      baseName: options.baseName,
      baseNameApi: this.formatName(options.baseName),
      baseNameApiKebabCase: Utils.convertKebabCase(this.formatName(options.baseName)),
      cognitoIntegration: options.cognitoIntegration,
      db: options.db,
      iac: options.iac,
      language: options.language,
      monitoring: options.monitoring,
      provider: options.provider,
      trace: options.trace,
    };
  }

  public loggerName(): string {
    return "generator:api";
  }

  public async initializing() {
    this.logger.debug('Initializing phase start');
    // Override parameters from configuration file
    // Common parts
    this.opts.auth = this.config.get('auth');
    this.opts.baseName = this.config.get('baseName');
    this.opts.cognitoIntegration = this.config.get('cognitoIntegration');
    this.opts.iac = this.config.get('iac');
    this.opts.provider = this.config.get('provider');

    // API specific
    this.opts.applicationType = this.config.get('applicationType');
    this.opts.baseNameApi = this.config.get('baseNameApi');
    this.opts.baseNameApiKebabCase = this.config.get('baseNameApiKebabCase');
    this.opts.language = this.config.get('language');
    this.opts.monitoring = this.config.get('monitoring');
    this.opts.trace = this.config.get('trace');
    this.opts.db = this.config.get('db');
  }

  public async prompting() {
    this.logger.debug('Prompting phase start');
    // Get Api prompts
    const prompt = new ApiPrompts(this);

    // Get default options when APP generator otherwise prompt questions
    let answerBaseName = await prompt.askForBaseName(this.opts.baseName) as any;
    if(answerBaseName && answerBaseName.baseName) {
      answerBaseName = {
        baseName: StringUtils.formatCase(answerBaseName.baseName, StringUtils.FORMAT_UPPER_CAMEL_CASE),
        baseNameApi: this.formatName(answerBaseName.baseName),
        baseNameApiKebabCase: Utils.convertKebabCase(this.formatName(answerBaseName.baseName)),
      }
    }
    const answerProvider = await prompt.askForCloudProviders(this.opts.provider) as any;
    const answerIac = await prompt.askForInfraAsCode(this.opts.iac, answerProvider.provider) as any;
    const answerAuth = await prompt.askForAuth(this.opts.auth, answerProvider.provider) as any;
    const answerCognitoIntegration = await prompt.askForCognitoIntegration(this.opts.cognitoIntegration, answerAuth.auth) as any;

    // Prompt application type
    const answerApplicationType = await prompt.askForApplicationType(this.opts.applicationType) as any;

    // Prompt language question
    const answerLanguage = await prompt.askForLanguage(this.opts.language, answerProvider.provider) as any;

    // Prompt other questions
    const answerDb = await prompt.askForDB(this.opts.db, answerProvider.provider) as any;
    const answerMonitoring = await prompt.askForMonitoring(this.opts.monitoring, answerProvider.provider) as any;
    const answerTrace = await prompt.askForTrace(this.opts.trace, answerProvider.provider) as any;

    // Combine answers to options
    this.opts = {
      ...answerProvider,
      ...answerBaseName,
      ...answerApplicationType,
      ...answerIac,
      ...answerAuth,
      ...answerCognitoIntegration,
      ...answerLanguage,
      ...answerDb,
      ...answerMonitoring,
      ...answerTrace,
    };
  }

  public async configuring() {
    this.logger.debug('Configuring phase start');
    if (!this.skipChecks) {
      this.log(chalk.blueBright('\nWe are now checking your environment:'));

      // Checking all needed dependencies to be able to launch projet
      this.log(`${chalk.blueBright('Checking Git: ')} ${CheckUtils.checkGit() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      if ((!this.type || this.type !== App.GENERATOR_TYPE)) {
        if (this.opts.iac === ClientPrompts.IAC_SAM_VALUE) {
          this.log(`${chalk.blueBright('Checking AWS SAM: ')} ${CheckUtils.checkAWS() && CheckUtils.checkSAM() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
        } else if (this.opts.iac === ClientPrompts.IAC_TERRAFORM_VALUE) {
          this.log(`${chalk.blueBright('Checking Terraform: ')} ${CheckUtils.checkTerraform() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
        } else if (this.opts.iac === ClientPrompts.IAC_SERVERLESS_VALUE) {
          this.log(`${chalk.blueBright('Checking Serverless framework: ')} ${CheckUtils.checkServerless() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
        }
      }
      if (this.opts.language === ApiPrompts.LANGUAGE_PYTHON37_VALUE) {
        this.log(`${chalk.blueBright('Checking Python & Pip: ')} ${CheckUtils.checkPython() && CheckUtils.checkPip() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      }
    }
  }

  public default() {
    this.logger.debug('Default phase start');
    this.destinationRoot(path.join(this.destinationRoot(), '/' + this.opts.baseNameApiKebabCase));
    // Save Configuration to yeoman file (.yo-rc.json)
    this.config.set('baseName', this.opts.baseName);
    this.config.set('baseNameApi', this.opts.baseNameApi);
    this.config.set('baseNameApiKebabCase', this.opts.baseNameApiKebabCase);
    this.config.set('provider', this.opts.provider);
    this.config.set('iac', this.opts.iac);
    this.config.set('auth', this.opts.auth);
    this.config.set('applicationType', this.opts.applicationType);
    this.config.set('cognitoIntegration', this.opts.cognitoIntegration);
    this.config.set('language', this.opts.language);
    this.config.set('monitoring', this.opts.monitoring);
    this.config.set('trace', this.opts.trace);
    this.config.set('db', this.opts.db);
    this.config.save();
  }

  public writing() {
    this.logger.debug('Writing phase start');
    // Copy files
    new ApiFiles(this, this.opts).writeFiles();
  }

  public install() {
    this.logger.debug('Installing phase start');
    let logMsg = '';
    try {
      logMsg = `To bootstrap your application and install your dependencies, run: ${chalk.blueBright.bold(`make bootstrap`)}`;
      //this.spawnCommandSync('make', ['bootstrap']);
    } catch (e) {
      this.logger.error('Install of dependencies failed!');
      this.logger.error(e);
      this.log(logMsg);
    }
  }

  public end() {
    this.logger.debug('Ending phase start');
    this.log(chalk.green.bold('\nAPI generated successfully.\n'));
    const logMsg = `Build & Deploy your application with:\n ${chalk.blueBright.bold(`make release`)}\n`;
    this.log(chalk.green(logMsg));
  }

  private formatName(baseName: string) {
    if(baseName === 'undefined' || !baseName) {
      return '';
    }
    const name = StringUtils.formatCase(baseName, StringUtils.FORMAT_UPPER_CAMEL_CASE);
    return name + (name.endsWith('Api') ? '' : 'Api');
  }
}

export = Api
