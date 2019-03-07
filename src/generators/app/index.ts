import {Base} from '../base';
import {AppPrompts} from './prompts';

class App extends Base {

  public static GENERATOR_TYPE = 'app';

  private opts: {
    auth?: string,
    baseName?: string,
    iac?: string,
    provider?: string,
  };

  private readonly path: string;
  private readonly type: string;
  private readonly skipChecks: boolean;

  constructor(args: string | string[], options: any) {
    super(args, options);
    this.path = options.path;
    this.type = App.GENERATOR_TYPE;
    this.skipChecks = options.skipChecks;
    this.opts = {
      auth: options.auth,
      baseName: options.baseName,
      iac: options.iac,
      provider: options.provider,
    };
  }

  public loggerName(): string {
    return "generator:app";
  }

  public async initializing() {
    this.logger.debug('Initializing phase start');
    this.opts.baseName = this.config.get('baseName');
    this.opts.provider = this.config.get('provider');
    this.opts.iac = this.config.get('iac');
    this.opts.auth = this.config.get('auth');
  }

  public async prompting() {
    this.logger.debug('Prompting phase start');
    // Get App prompts
    if (!this.isProjectExist()) {
      const prompt = new AppPrompts(this);
      // Ask for base questions like name or provider
      const answersBase = await prompt.askForBasicQuestions();

      // Combine answers and current values
      this.opts = {
        ...this.opts,
        ...answersBase,
      };
    }
  }

  public async configuring() {
    this.logger.debug('Configuring phase start');
    // Combine with API generator
    this.composeWith(require.resolve('../api'), {
      ...this.opts,
      skipChecks: this.skipChecks,
      type: this.type,
    });
    // Combine with Client generator
    this.composeWith(require.resolve('../client'), {
      ...this.opts,
      skipChecks: this.skipChecks,
      type: this.type,
    });
  }

  public default() {
    this.logger.debug('Default phase start');
    // Save Configuration to yeoman file (.yo-rc.json)
    this.config.set('baseName', this.opts.baseName);
    this.config.set('provider', this.opts.provider);
    this.config.set('iac', this.opts.iac);
    this.config.set('auth', this.opts.auth);
    this.config.set('type', this.type);
  }

  public writing() {
    this.logger.debug('Writing phase start');
  }

  public install() {
    this.logger.debug('Installing phase start');
  }

  public end() {
    this.logger.debug('Ending phase start');
  }
}

export = App
