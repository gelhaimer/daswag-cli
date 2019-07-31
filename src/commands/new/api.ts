import {GeneratorBase} from '../../generator-base';

export class Api extends GeneratorBase {
  public static description = 'Generate a new API based service';

  public static args = [];

  public static flags = {
    applicationType: Api.FLAG_APPLICATION_TYPE,
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
    skipGit: Api.FLAG_SKIP_GIT,
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
      applicationType: options.applicationType,
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
      skipGit: options.skipGit,
      trace: options.trace,
    });
  }
}
