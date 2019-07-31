import chalk from 'chalk';
import {StringUtils} from "turbocommons-ts";
import CheckUtils from '../../utils/check-utils';
import Utils from "../../utils/utils";
import App = require('../app');
import {Base} from '../core/base';
import {ClientFiles} from "./client-files";
import {IClientOptions} from "./client-options.model";
import {ClientPrompts} from './client-prompts';
import * as path from "path";

class Client extends Base {

  public static GENERATOR_TYPE = 'client';

  private opts: IClientOptions;
  private readonly type: string;
  private readonly skipChecks: boolean;
  private readonly skipGit: boolean;

  constructor(args: string | string[], options: any) {
    super(args, options);
    this.type = options.type || Client.GENERATOR_TYPE;
    this.skipChecks = options.skipChecks;
    this.skipGit = options.skipGit;
    this.opts = {
      auth: options.auth,
      baseName: options.baseName,
      baseNameClient: this.formatName(options.baseName),
      baseNameClientKebabCase: Utils.convertKebabCase(this.formatName(options.baseName)),
      framework: options.framework,
      iac: options.iac,
      packageManager:options.packageManager,
      provider: options.provider,
    };
  }

  public loggerName(): string {
    return "generator:client";
  }

  public async initializing() {
    this.logger.debug('Initializing phase start');
    // Load from configuration file
    this.opts.baseName = this.config.get('baseName');
    this.opts.baseNameClient = this.config.get('baseNameClient');
    this.opts.baseNameClientKebabCase = this.config.get('baseNameClientKebabCase');
    this.opts.provider = this.config.get('provider');
    this.opts.iac = this.config.get('iac');
    this.opts.auth = this.config.get('auth');
    this.opts.framework = this.config.get('framework');
    this.opts.packageManager = this.config.get('packageManager');
  }

  public async prompting() {
    this.logger.debug('Prompting phase start');
    // Get App prompts
    const prompt = new ClientPrompts(this);
    let answerBaseName = await prompt.askForBaseName(this.opts.baseName) as any;
    if(answerBaseName && answerBaseName.baseName) {
      answerBaseName = {
        baseName: StringUtils.formatCase(answerBaseName.baseName, StringUtils.FORMAT_UPPER_CAMEL_CASE),
        baseNameClient: this.formatName(answerBaseName.baseName),
        baseNameClientKebabCase: Utils.convertKebabCase(this.formatName(answerBaseName.baseName)),
      }
    }
    const answerProvider = await prompt.askForCloudProviders(this.opts.provider) as any;
    const answerIac = await prompt.askForInfraAsCode(this.opts.iac, answerProvider.provider) as any;
    const answerAuth = await prompt.askForAuth(this.opts.auth, answerProvider.provider) as any;
    const answerCognitoIntegration = await prompt.askForCognitoIntegration(this.opts.cognitoIntegration, answerAuth.auth) as any;

    const answerFramework = await prompt.askForFramework(this.opts.framework) as any;
    const answerPackageManager = await prompt.askForPackageManager(this.opts.packageManager) as any;

    // Combine answers
    this.opts = {
      ...answerBaseName,
      ...answerProvider,
      ...answerIac,
      ...answerAuth,
      ...answerCognitoIntegration,
      ...answerFramework,
      ...answerPackageManager,
    };
  }

  public async configuring() {
    this.logger.debug('Configuring phase start');
    if (!this.skipChecks) {
      this.log(chalk.blueBright('\nWe are now checking your environment:'));
      // Checking Git
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
      if (this.opts.packageManager === ClientPrompts.PACKAGE_MANAGER_NPM_VALUE) {
        this.log(`${chalk.blueBright('Checking NPM: ')} ${CheckUtils.checkNpm() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      } else if (this.opts.packageManager === ClientPrompts.PACKAGE_MANAGER_YARN_VALUE) {
        this.log(`${chalk.blueBright('Checking Yarn: ')} ${CheckUtils.checkYarn() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      }
    }
  }

  public default() {
    this.logger.debug('Default phase start');
    this.destinationRoot(path.join(this.destinationRoot(), '/' + this.opts.baseNameClientKebabCase));
    // Save Configuration to yeoman file (.yo-rc.json)
    this.config.set('type', this.type);
    this.config.set('baseName', this.opts.baseName);
    this.config.set('baseNameClient', this.opts.baseNameClient);
    this.config.set('baseNameClientKebabCase', this.opts.baseNameClientKebabCase);
    this.config.set('provider', this.opts.provider);
    this.config.set('iac', this.opts.iac);
    this.config.set('auth', this.opts.auth);
    this.config.set('framework', this.opts.framework);
    this.config.set('packageManager', this.opts.packageManager);
    this.config.save();
  }

  public writing() {
    this.logger.debug('Writing phase start');
    // Copy files
    new ClientFiles(this, this.opts).writeFiles();
  }

  public install() {
    this.logger.debug('Installing phase start');
    const logMsg = `To install your dependencies manually, run: ${chalk.blueBright.bold(`${this.opts.packageManager} install`)}`;

    try {
      // Configure install configuration
      const installConfig = {
        bower: false,
        npm: this.opts.packageManager !== ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
        yarn: this.opts.packageManager === ClientPrompts.PACKAGE_MANAGER_YARN_VALUE
      };
      // Launch install depending on configuration
      this.installDependencies(installConfig);
    } catch (e) {
      this.logger.error('Install of dependencies failed!');
      this.logger.error(e);
      this.log(logMsg);
    }
  }

  public end() {
    this.logger.debug('Ending phase start');
    // this.log(chalk.green.bold('\nClient application generated successfully.\n'));
    const logMsg = `Start your server with:\n ${chalk.blueBright.bold(`${this.opts.packageManager} start`)}\n`;
    this.log(chalk.green(logMsg));
  }

  private formatName(baseName: string) {
    if(baseName === 'undefined' || !baseName) {
      return '';
    }
    const name = StringUtils.formatCase(baseName, StringUtils.FORMAT_UPPER_CAMEL_CASE);
    return name + (name.endsWith('Client') ? '' : 'Client');
  }
}

export = Client
