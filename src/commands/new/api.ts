import {flags} from '@oclif/command';

import {GeneratorBase} from '../../generator-base';

export class Api extends GeneratorBase {
  public static description = '';

  public static args = [];

  public static flags = {
    force: flags.boolean({description: 'overwrite existing files'}),
    skipChecks: flags.boolean({description: 'skip tools and dependencies checks'})
  };

  public loggerName() {
    return 'new:api';
  }

  public async run() {
    const {flags: options, args} = this.parse(Api)

    await super.generate('Api', {
      force: options.force,
      path: args.path,
      skipChecks: options.skipChecks
    });
  }
}
