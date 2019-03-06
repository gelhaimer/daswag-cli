import {flags} from '@oclif/command';
import * as inquirer from 'inquirer';

import {GeneratorBase} from '../../generator-base';

export class New extends GeneratorBase {
  public static description = ' Creates a new workspace and an initial daSWAG app.';

  public static args = [
    {name: 'path', required: false, description: 'path to project, defaults to current directory'}
  ];

  public static flags = {
    force: flags.boolean({description: 'overwrite existing files'}),
    skipChecks: flags.boolean({description: 'skip tools and dependencies checks'})
  };

  public loggerName() {
    return 'new:project';
  }

  public async run() {
    const {flags: options, args} = this.parse(New)

    const responses: any = await inquirer.prompt([{
      choices: [{name: 'API only', value:'Api'}, {name: 'Client only', value:'Client'}, {name: 'Both (API + Client)', value:'App'}],
      message: 'What do you want to create',
      name: 'type',
      type: 'list'
    }]);


    await super.generate(responses.type, {
      force: options.force,
      path: args.path,
      skipChecks: options.skipChecks,
    });
  }
}
