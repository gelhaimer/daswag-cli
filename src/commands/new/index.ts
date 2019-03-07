import {flags} from '@oclif/command';
import * as inquirer from 'inquirer';

import {GeneratorBase} from '../../generator-base';
import Api = require('../../generators/api');
import App = require('../../generators/app');
import Client = require('../../generators/client');

export class New extends GeneratorBase {
  public static description = ' Creates a new workspace and an initial daSWAG app.';

  public static args = [
    {name: 'path', required: false, description: 'path to project, defaults to current directory'}
  ];

  public static flags = {
    auth: New.FLAG_AUTH,
    baseName: New.FLAG_BASE_NAME,
    db: New.FLAG_DB,
    force: New.FLAG_FORCE,
    framework: New.FLAG_FRAMEWORK,
    iac: New.FLAG_IAC,
    language: New.FLAG_LANGUAGE,
    monitoring: New.FLAG_MONITORING,
    packageManager: New.FLAG_PACKAGE_MANAGER,
    provider: New.FLAG_PROVIDER,
    skipChecks: New.FLAG_SKIP_CHECKS,
    trace: New.FLAG_TRACE,
    useSass: New.FLAG_USE_SASS,
  };

  public loggerName() {
    return 'new:project';
  }

  public async run() {
    const {flags: options, args} = this.parse(New)

    // Prompt question to choose which type of project user want to generate
    const responses: any = await inquirer.prompt([{
      choices: [{name: 'API only', value:Api.GENERATOR_TYPE}, {name: 'Client only', value:Client.GENERATOR_TYPE}, {name: 'Both (API + Client)', value:App.GENERATOR_TYPE}],
      message: 'What do you want to create',
      name: 'type',
      type: 'list'
    }]);

    // Validate all flags values
    this.validate(options);

    // Then launch the dedicated generator
    await super.generate(responses.type, {
      auth: options.auth,
      baseName: options.baseName,
      db: options.db,
      force: options.force,
      framework: options.framework,
      iac: options.iac,
      language: options.language,
      monitoring: options.monitoring,
      packageManager: options.packageManager,
      path: args.path,
      provider: options.provider,
      skipChecks: options.skipChecks,
      trace: options.trace,
      useSass: options.useSass,
    });
  }
}
