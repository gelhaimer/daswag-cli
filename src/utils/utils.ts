import * as fs from 'fs';
import * as Path from 'path';
import {createLogger, format, transports} from 'winston';
import * as Generator from 'yeoman-generator';
import FileUtils from './file-utils';
import LoggerUtils from './logger-utils';

const {timestamp, printf} = format;

const defaultLevel = process.env.LOG_LEVEL;
const loggingFormat = printf(({level, message, timestamp: time}) => {
  return `${time} ${level}: ${message}`;
});

export default class Utils {

  public static logger = LoggerUtils.createLogger('Utils');

  public static getAllConfig(generator:Generator, force:boolean) {
    let configuration = generator && generator.config ? generator.config.getAll() || {} : {};
    if ((force || !configuration.baseName) && FileUtils.doesFileExist('.yo-rc.json')) {
      const yoRc = JSON.parse(fs.readFileSync('.yo-rc.json', { encoding: 'utf-8' }));
      configuration = yoRc.daswag;
      // merge the blueprint config if available
      if (configuration.blueprint) {
        configuration = { ...configuration, ...yoRc[configuration.blueprint] };
      }
    }
    if (!configuration.get || typeof configuration.get !== 'function') {
      configuration = {
        ...configuration,
        get: (key: string) => configuration[key],
        getAll: () => configuration,
        set: (key: string, value: any) => {
          configuration[key] = value;
        }
      };
    }
    return configuration;
  }

  public static getPythonExecutable() {
    return 'python3';
  }
}
