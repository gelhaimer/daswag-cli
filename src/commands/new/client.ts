import {flags} from '@oclif/command';
import * as inquirer from 'inquirer';

import {GeneratorBase} from '../../generator-base';

export class Client extends GeneratorBase {
  public static description = '';

  public static args = [
    {name: 'path', required: false, description: 'path to project, defaults to current directory'}
  ];

  public static flags = {
    force: flags.boolean({description: 'overwrite existing files'}),
    skipChecks: flags.boolean({description: 'skip tools and dependencies checks'})
  };

  public loggerName() {
    return 'new:client';
  }

  public async run() {
    const {flags: options, args} = this.parse(Client)

    await super.generate('Client', {
      force: options.force,
      path: args.path,
      skipChecks: options.skipChecks
    });
  }
}
