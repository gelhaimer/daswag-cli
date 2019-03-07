import chalk from 'chalk';
import CheckUtils from '../../utils/check-utils';
import App = require('../app');
import {Base} from '../base';
import {ClientPrompts} from '../client/prompts';
import {ApiPrompts} from './prompts';

class Api extends Base {

  public static GENERATOR_TYPE = 'api';

  private opts: {
    auth?: string,
    baseName?: string,
    db?: string,
    iac?: string,
    language?: string,
    monitoring?: string,
    packageManager?: string,
    provider?: string,
    trace?: string
  };

  private readonly type: string;
  private readonly skipChecks: boolean;

  constructor(args: string | string[], options: any) {
    super(args, options);
    this.type = options.type || Api.GENERATOR_TYPE;
    this.skipChecks = options.skipChecks;
    this.opts = {
      auth: options.auth,
      baseName: options.baseName,
      db: options.db,
      iac: options.iac,
      language: options.language,
      monitoring: options.monitoring,
      packageManager: options.packageManager,
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
    // Only if project exist
    if (this.isProjectExist()) {
      this.opts.baseName = this.config.get('baseName');
      this.opts.provider = this.config.get('provider');
      this.opts.iac = this.config.get('iac');
      this.opts.language = this.config.get('language');
      this.opts.monitoring = this.config.get('monitoring');
      this.opts.trace = this.config.get('trace');
      this.opts.db = this.config.get('db');
      this.opts.packageManager = this.config.get('packageManager');
    }
  }

  public async prompting() {
    this.logger.debug('Prompting phase start');
    // Get Api prompts
    const prompt = new ApiPrompts(this);

    // Get default options when APP generator otherwise prompt questions
    const answerBaseName = await prompt.askForBaseName(this.opts.baseName) as any;
    const answerProvider = await prompt.askForCloudProviders(this.opts.provider) as any;
    const answerIac = await prompt.askForInfraAsCode(this.opts.iac, answerProvider.provider);
    const answerAuth = await prompt.askForAuthentication(this.opts.auth, answerProvider.provider);

    // Prompt language question
    const answersLanguage = await prompt.askForLanguage(this.opts.language, answerProvider.provider);
    const answerPackageManager = await prompt.askForPackageManager(this.opts.packageManager, answersLanguage.language);

    // Prompt other questions
    const answerDb = await prompt.askForDB(this.opts.db, answerProvider.provider);
    const answerMonitoring = await prompt.askForMonitoring(this.opts.monitoring, answerProvider.provider);
    const answserTrace = await prompt.askForTrace(this.opts.trace, answerProvider.provider);

    // Combine answers to options
    this.opts = {
      ...answerProvider,
      ...answerBaseName,
      ...answerIac,
      ...answerAuth,
      ...answersLanguage,
      ...answerPackageManager,
      ...answerDb,
      ...answerMonitoring,
      ...answserTrace,
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
      if (this.opts.language === ApiPrompts.LANGUAGE_PYTHON_VALUE) {
        this.log(`${chalk.blueBright('Checking Python & Pip: ')} ${CheckUtils.checkPython() && CheckUtils.checkPip() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      } else if (this.opts.language === ApiPrompts.LANGUAGE_NODEJS_VALUE && this.opts.packageManager === ApiPrompts.PACKAGE_MANAGER_NPM_VALUE) {
        this.log(`${chalk.blueBright('Checking NPM: ')} ${CheckUtils.checkNpm() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      } else if (this.opts.language === ApiPrompts.LANGUAGE_NODEJS_VALUE && this.opts.packageManager === ApiPrompts.PACKAGE_MANAGER_YARN_VALUE) {
        this.log(`${chalk.blueBright('Checking Yarn: ')} ${CheckUtils.checkYarn() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      }
    }
  }

  public default() {
    this.logger.debug('Default phase start');
    // Save Configuration to yeoman file (.yo-rc.json)
    if (!this.type || this.type !== App.GENERATOR_TYPE) {
      this.config.set('baseName', this.opts.baseName);
      this.config.set('provider', this.opts.provider);
      this.config.set('iac', this.opts.iac);
      this.config.set('auth', this.opts.auth);
    }
    this.config.set('packageManager', this.opts.packageManager);
    this.config.set('language', this.opts.language);
    this.config.set('monitoring', this.opts.monitoring);
    this.config.set('trace', this.opts.trace);
    this.config.set('db', this.opts.db);
    this.config.save();
  }

  public writing() {
    this.logger.debug('Writing phase start');
  }

  public install() {
    this.logger.debug('Installing phase start');
    let logMsg = '';
    try {
      // Get executable
      let executable: string | undefined;
      switch (this.opts.language) {
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
          this.logger.error('Choosen language does not have any referenced executable. You will have to install it manually.');
      }
    } catch (e) {
      this.logger.error('Install of dependencies failed!');
      this.logger.error(e);
      this.log(logMsg);
    }
  }

  public end() {
    this.logger.debug('Ending phase start');
    // this.log(chalk.green.bold('\nAPI generated successfully.\n'));
  }
}

export = Api
