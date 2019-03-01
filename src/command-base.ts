import {Command} from '@oclif/command';
import {createLogger, format, transports} from 'winston';

const {timestamp, printf} = format;

const defaultLevel = process.env.LOG_LEVEL;
const loggingFormat = printf(({level, message, timestamp: time}) => {
  return `${time} ${level}: ${message}`;
});

export default abstract class CommandBase extends Command {
  public logger = this.createLogger();

  public abstract name: string;

  public async catch(err: any) {
    // handle any error from the command
    this.logger.error('An error occurred when executing command %s', this.name);
    this.logger.error(err);
  }

  // Create and configure default Logger
  private createLogger() {
    return createLogger({
      defaultMeta: {command: this.name},
      exitOnError: false,
      format: format.combine(
        format.timestamp({
                           format: 'YYYY-MM-DD HH:mm:ss',
                         }),
        format.errors({stack: true}),
        format.splat(),
        format.json(),
      ),
      level: defaultLevel,
      transports: [
        // - Write to all logs with level `info` and above to `combined.log`
        new transports.File({level: 'error', filename: 'error.log'}),
        // - Write all logs error (and above) to Console/terminal
        new transports.Console({
                                 format: format.combine(
                                   format.colorize(),
                                   timestamp(),
                                   loggingFormat,
                                 ),
                               }),
      ],
    });
  }
}
