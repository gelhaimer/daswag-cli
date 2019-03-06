import {Command} from '@oclif/command';
import LoggerUtils from './utils/logger-utils';

export default abstract class CommandBase extends Command {
  public logger = LoggerUtils.createLogger(this.loggerName());

  public abstract loggerName(): string;

  public async catch(err: any) {
    // handle any error from the command
    this.logger.error('An error occurred when executing command');
    this.logger.error(err);
  }

  public getUserHome() {
    return process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  }
}
