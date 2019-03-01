import {flags} from '@oclif/command';
import * as inquirer from 'inquirer';

import {GeneratorBase} from '../../generator-base';

export class New extends GeneratorBase {
  public static description = ' Creates a new workspace and an initial daSWAG app.';

  public static args = [
    {name: 'path', required: false, description: 'path to project, defaults to current directory'}
  ];

  public static flags = {
    force: flags.boolean({description: 'overwrite existing files'})
  };

  public name = 'new:project';

  public async run() {
    const {flags: options, args} = this.parse(New)

    const responses: any = await inquirer.prompt([{
      choices: [{name: 'API only', value:'api'}, {name: 'Client only', value:'client'}, {name: 'Both (API + Client)', value:'app'}],
      message: 'What do you want to generate',
      name: 'type',
      type: 'list'
    }]);


    await super.generate(responses.type, {
      force: options.force,
      path: args.path,
      type: responses.type
    });
  }
}
