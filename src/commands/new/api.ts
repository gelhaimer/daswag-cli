import {GeneratorBase} from '../../generator-base';

export class Api extends GeneratorBase {
  public static description = '';

  public static args = [];

  public static flags = {
    auth: Api.FLAG_AUTH,
    baseName: Api.FLAG_BASE_NAME,
    db: Api.FLAG_DB,
    force: Api.FLAG_FORCE,
    iac: Api.FLAG_IAC,
    language: Api.FLAG_LANGUAGE,
    monitoring: Api.FLAG_MONITORING,
    packageManager: Api.FLAG_PACKAGE_MANAGER,
    provider: Api.FLAG_PROVIDER,
    skipChecks: Api.FLAG_SKIP_CHECKS,
    trace: Api.FLAG_TRACE,
  };

  public loggerName() {
    return 'new:api';
  }

  public async run() {
    const {flags: options, args} = this.parse(Api)

    // Validate all flags values
    this.validate(options);

    // Then launch the dedicated generator
    await super.generate('Api', {
      auth: options.auth,
      baseName: options.baseName,
      db: options.db,
      force: options.force,
      iac: options.iac,
      language: options.language,
      monitoring: options.monitoring,
      packageManager: options.packageManager,
      path: args.path,
      provider: options.provider,
      skipChecks: options.skipChecks,
      trace: options.trace,
    });
  }
}
