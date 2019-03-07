import chalk from 'chalk';
import CheckUtils from '../../utils/check-utils';
import App = require('../app');
import {Base} from '../base';
import {ClientPrompts} from './prompts';

class Client extends Base {

  public static GENERATOR_TYPE = 'client';

  private opts: {
    auth?: string,
    baseName?: string,
    framework?: string,
    iac?: string,
    provider?: string,
    packageManager?: string
    useSass?: boolean,
  };

  private readonly type: string;
  private readonly skipChecks: boolean;

  constructor(args: string | string[], options: any) {
    super(args, options);
    this.type = options.type || Client.GENERATOR_TYPE;
    this.skipChecks = options.skipChecks;
    this.opts = {
      auth: options.auth,
      baseName: options.baseName,
      framework: options.framework,
      iac: options.iac,
      packageManager:options.packageManager,
      provider: options.provider,
      useSass: options.useSass
    };
  }

  public loggerName(): string {
    return "generator:client";
  }

  public async initializing() {
    this.logger.debug('Initializing phase start');
    // Load from configuration file
    this.opts.baseName = this.config.get('baseName');
    this.opts.provider = this.config.get('provider');
    this.opts.iac = this.config.get('iac');
    this.opts.auth = this.config.get('auth');
    this.opts.framework = this.config.get('framework');
    this.opts.useSass = this.config.get('useSass');
    this.opts.packageManager = this.config.get('packageManager');
  }

  public async prompting() {
    this.logger.debug('Prompting phase start');
    this.logger.info(JSON.stringify(this.opts));
    // Get App prompts
    const prompt = new ClientPrompts(this);

    const answerBaseName = await prompt.askForBaseName(this.opts.baseName) as any;
    const answerProvider = await prompt.askForCloudProviders(this.opts.provider) as any;
    const answerIac = await prompt.askForInfraAsCode(this.opts.iac, answerProvider.provider) as any;
    const answerAuth = await prompt.askForAuthentication(this.opts.auth, answerProvider.provider) as any;

    const answerFramework = await prompt.askForFramework(this.opts.auth) as any;
    const answerUseSass = await prompt.askForPreprocessor(this.opts.useSass) as any;
    const answerPackageManager = await prompt.askForPackageManager(this.opts.packageManager) as any;

    // Combine answers
    this.opts = {
      ...answerBaseName,
      ...answerProvider,
      ...answerIac,
      ...answerAuth,
      ...answerFramework,
      ...answerUseSass,
      ...answerPackageManager,
    };
    this.logger.info(JSON.stringify(this.opts));
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
        this.log(`${chalk.blueBright('\nChecking NPM: ')} ${CheckUtils.checkNpm() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      } else if (this.opts.packageManager === ClientPrompts.PACKAGE_MANAGER_YARN_VALUE) {
        this.log(`${chalk.blueBright('\nChecking Yarn: ')} ${CheckUtils.checkYarn() ? chalk.green.bold('OK') : chalk.red.bold('KO')}`);
      }
    }
  }

  public default() {
    this.logger.debug('Default phase start');
    // Save Configuration to yeoman file (.yo-rc.json)
    if (!this.type || this.type !== App.GENERATOR_TYPE) {
      this.config.set('type', this.type);
      this.config.set('baseName', this.opts.baseName);
      this.config.set('provider', this.opts.provider);
      this.config.set('iac', this.opts.iac);
      this.config.set('auth', this.opts.auth);
    }
    this.config.set('framework', this.opts.framework);
    this.config.set('useSass', this.opts.useSass);
    this.config.save();
  }

  public writing() {
    this.logger.debug('Writing phase start');
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
}

export = Client
