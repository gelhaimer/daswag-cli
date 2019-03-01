import {flags} from '@oclif/command';

import {GeneratorBase} from '../../generator-base';

export class Api extends GeneratorBase {
  public static description = '';

  public static args = [];

  public static flags = {};

  public name = 'new:api';

  public async run() {
    const {flags: options, args} = this.parse(Api)

    await super.generate('api', {
      force: options.force,
      path: args.path,
      type: 'api'
    });
  }
}
