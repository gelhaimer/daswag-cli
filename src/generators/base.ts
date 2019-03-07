import * as Path from 'path';
import * as Generator from 'yeoman-generator';
import LoggerUtils from '../utils/logger-utils';

export abstract class Base extends Generator {

  public logger = LoggerUtils.createLogger(this.loggerName());

  public abstract loggerName() : string;

  /**
   * @returns default app name
   */
  public getDefaultBaseName() {
    return /^[a-zA-Z0-9_]+$/.test(Path.basename(process.cwd())) ? Path.basename(process.cwd()) : 'daswag';
  }

  /**
   * Is the current project already generated or not
   * @param provider Name of the Cloud provider
   * @param baseName Name of the project
   */
  public isProjectExist(): boolean {
    return this.config.get('provider') !== undefined && this.config.get('baseName') !== undefined;
  }

}
