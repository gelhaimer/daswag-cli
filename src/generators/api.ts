import chalk from 'chalk';
import CheckUtils from '../utils/check-utils';
import {ApiPrompts} from './api/prompts';
import {Base} from './base';
import {ClientPrompts} from './client/prompts';

class Api extends Base {

  private opts: {
    baseName?: string,
    provider?: string,
    iac?: string,
    language?: string,
    packageManager?: string,
    db?: string,
    monitoring?: string,
    trace?: string
  };

  private readonly type: string;
  private readonly skipChecks: boolean;

  constructor(args: string | string[], options: any) {
    super(args, options);
    this.type = options.type;
    this.skipChecks = options.skipChecks;
    this.opts = {
      baseName: options.baseName || this.config.get('baseName'),
      iac: options.iac || this.config.get('iac'),
      provider: options.provider || this.config.get('provider')
    }
  }

  public loggerName(): string {
    return "generator:api";
  }

  public async initializing() {
    this.logger.debug('Initializing phase start');
    // Load from configuration file
    this.opts.baseName = this.config.get('baseName');
    this.opts.provider = this.config.get('provider');
    this.opts.iac = this.config.get('iac');
    this.opts.language = this.config.get('language');
    this.opts.monitoring = this.config.get('monitoring');
    this.opts.trace = this.config.get('trace');
    this.opts.db = this.config.get('db');
    this.opts.packageManager = this.config.get('packageManager');
  }

  public async prompting() {
    this.logger.debug('Prompting phase start');
    // Get Api prompts
    if(!this.isProjectExist(this.opts.provider, this.opts.baseName)) {
      const prompt = new ApiPrompts(this);

      const answersBase = this.type && this.type === 'app' ? {
        baseName: this.opts.baseName,
        iac: this.opts.iac,
        provider: this.opts.provider,
      } : await prompt.askForBasicQuestions();

      const answersLanguage = await this.prompt([
                                             prompt.askForLanguage(answersBase.provider),
                                             prompt.askForDB(answersBase.provider),
                                             prompt.askForMonitoring(answersBase.provider),
                                             prompt.askForTrace(answersBase.provider)
                                           ]) as any;

      let answerPackageManager = {};

      if (answersLanguage.language === ApiPrompts.LANGUAGE_NODEJS_VALUE) {
        answerPackageManager =  await this.prompt([
                                                     prompt.askForPackageManager(answersLanguage.language)
                                                   ]) as any;
      }

      const answersApi = await this.prompt([
                                                  prompt.askForDB(answersBase.provider),
                                                  prompt.askForMonitoring(answersBase.provider),
                                                  prompt.askForTrace(answersBase.provider)
                                                ]) as any;

      // Combine answers to options
      this.opts = {
        ...answersBase,
        ...answersLanguage,
        ...answerPackageManager,
        ...answersApi,
      };
    }
  }

  public async configuring() {
    this.logger.debug('Configuring phase start');
    if(!this.skipChecks) {
      this.log(chalk.blueBright('\nWe are now checking your environment:'));
      // Checking Git
      this.log(`${chalk.blueBright('Checking Git: ')} ${CheckUtils.checkGit() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      if ((!this.type || this.type !== 'app')) {
        if (this.opts.iac === ClientPrompts.IAC_CLOUDFORMATION_VALUE) {
          this.log(`${chalk.blueBright('Checking AWS SAM: ')} ${CheckUtils.checkAWS() && CheckUtils.checkSAM() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
        } else if (this.opts.iac === ClientPrompts.IAC_TERRAFORM_VALUE) {
          this.log(`${chalk.blueBright('Checking Terraform: ')} ${CheckUtils.checkTerraform() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
        } else if (this.opts.iac === ClientPrompts.IAC_SERVERLESS_VALUE) {
          this.log(`${chalk.blueBright('Checking Serverless framework: ')} ${CheckUtils.checkServerless() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
        }
      }
      if(this.opts.language === ApiPrompts.LANGUAGE_PYTHON_VALUE) {
        this.log(`${chalk.blueBright('\nChecking Python & Pip: ')} ${CheckUtils.checkPython() && CheckUtils.checkPip() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      } else if(this.opts.language === ApiPrompts.LANGUAGE_NODEJS_VALUE && this.opts.packageManager === ApiPrompts.PACKAGE_MANAGER_NPM_VALUE) {
        this.log(`${chalk.blueBright('\nChecking NPM: ')} ${CheckUtils.checkNpm() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      } else if(this.opts.language === ApiPrompts.LANGUAGE_NODEJS_VALUE && this.opts.packageManager === ApiPrompts.PACKAGE_MANAGER_YARN_VALUE) {
        this.log(`${chalk.blueBright('\nChecking Yarn: ')} ${CheckUtils.checkYarn() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      }
    }
  }

  public default() {
    this.logger.debug('Default phase start')
    // Save Configuration to yeoman file (.yo-rc.json)
    if(!this.type || this.type !== 'app') {
      this.config.set('baseName', this.opts.baseName);
      this.config.set('provider', this.opts.provider);
      this.config.set('iac', this.opts.iac);
    }
    this.config.set('language', this.opts.language);
    this.config.set('monitoring', this.opts.monitoring);
    this.config.set('trace', this.opts.trace);
    this.config.set('db', this.opts.db);
    this.config.save()
  }


  public writing() {
    this.logger.debug('Writing phase start');
  }

  public install() {
    this.logger.debug('Installing phase start');
    let logMsg = '';
    try {
      // Get executable
      let executable : string | undefined;
      switch(this.opts.language) {
        case ApiPrompts.LANGUAGE_NODEJS_VALUE:
          executable = this.opts.packageManager;
          logMsg = `To install your dependencies manually, run: ${chalk.blueBright.bold(`${this.opts.packageManager} install`)}`;
          // Configure install configuration
          const installConfig = {
            bower: false,
            npm: this.opts.packageManager !== ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
            yarn: this.opts.packageManager === ClientPrompts.PACKAGE_MANAGER_YARN_VALUE
          };
          // Launch install depending on configuration
          this.installDependencies(installConfig);
          break;

        case ApiPrompts.LANGUAGE_PYTHON_VALUE:
          logMsg = `To install your dependencies manually, run: ${chalk.blueBright.bold(`make install`)}`;
          this.spawnCommandSync('make', ['install']);
          break;

        default:
          this.logger.error('Choosen language does not have any referenced executable. You will have to install it manually.')
      }
    } catch (e) {
      this.logger.error('Install of dependencies failed!');
      this.logger.error(e);
      this.log(logMsg);
    }
  }

  public end() {
    this.logger.debug('Ending phase start')
    // this.log(chalk.green.bold('\nAPI generated successfully.\n'));
  }
}

export = Api
