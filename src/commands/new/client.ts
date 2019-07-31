import {GeneratorBase} from '../../generator-base';

export class Client extends GeneratorBase {
  public static description = 'Generate a new client interface';

  public static args = [
    {name: 'path', required: false, description: 'path to project, defaults to current directory'}
  ];

  public static flags = {
    auth: Client.FLAG_AUTH,
    baseName: Client.FLAG_BASE_NAME,
    force: Client.FLAG_FORCE,
    framework: Client.FLAG_FRAMEWORK,
    iac: Client.FLAG_IAC,
    packageManager: Client.FLAG_PACKAGE_MANAGER,
    provider: Client.FLAG_PROVIDER,
    skipChecks: Client.FLAG_SKIP_CHECKS,
    skipGit: Client.FLAG_SKIP_GIT,
  };

  public loggerName() {
    return 'new:client';
  }

  public async run() {
    const {flags: options, args} = this.parse(Client);

    // Validate all flags values
    this.validate(options);

    // Then launch the dedicated generator
    await super.generate('Client', {
      auth: options.auth,
      baseName: options.baseName,
      force: options.force,
      framework: options.framework,
      iac: options.iac,
      packageManager: options.packageManager,
      path: args.path,
      provider: options.provider,
      skipChecks: options.skipChecks,
      skipGit: options.skipGit,
    });
  }
}
