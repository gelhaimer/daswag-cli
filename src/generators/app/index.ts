import {Base} from '../base';
import {AppPrompts} from './prompts';

class Index extends Base {

  private opts: {
    baseName?: string,
    iac?: string,
    provider?: string
  };

  private path: string;

  constructor(args: string | string[], options: any) {
    super(args, options);
    this.path = options.path;
    this.opts = {};
  }

  public loggerName(): string {
    return "generator:app";
  }

  public async initializing() {
    this.logger.debug('Initializing phase start');
    this.opts.baseName = this.config.get('baseName');
    this.opts.provider = this.config.get('provider');
    this.opts.iac = this.config.get('iac');
  }

  public async prompting() {
    this.logger.debug('Prompting phase start');
    // Get App prompts
    if (!this.isProjectExist(this.opts.provider, this.opts.baseName)) {
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
      type: 'app'
    });
    // Combine with Client generator
    this.composeWith(require.resolve('../client'), {
      ...this.opts,
      type: 'app'
    });
  }

  public default() {
    this.logger.debug('Default phase start');
    // Save Configuration to yeoman file (.yo-rc.json)
    this.config.set('baseName', this.opts.baseName);
    this.config.set('provider', this.opts.provider);
    this.config.set('iac', this.opts.iac);
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

export = Index
