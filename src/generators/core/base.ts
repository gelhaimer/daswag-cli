import * as Path from 'path';
import * as Generator from 'yeoman-generator';
import LoggerUtils from '../../utils/logger-utils';

import * as filter from 'gulp-filter';
import * as prettier from 'prettier';
import through = require("through2");

export abstract class Base extends Generator {

  public logger = LoggerUtils.createLogger(this.loggerName());

  private prettierOptions = {
    arrowParens: 'avoid',
    jsxBracketSameLine: false,
    printWidth: 140,
    singleQuote: true,
    tabWidth: 2,
    useTabs: false,
  };

  public abstract loggerName() : string;

  /**
   * @returns default app name
   */
  public getDefaultBaseName() {
    return /^[a-zA-Z0-9_]+$/.test(Path.basename(process.cwd())) ? Path.basename(process.cwd()) : 'daswag';
  }

  /**
   * Register beautify as transform stream for beautifying files during generation
   */
  public registerPrettierTransform() {
    // Prettier is clever, it uses correct rules and correct parser according to file extension.
    const prettierFilter = filter(['{,**/}*.{md,json,ts,tsx,scss,css,yml}'], { restore: true });
    // this pipe will pass through (restore) anything that doesn't match typescriptFilter
    this.registerTransformStream([prettierFilter, this.prettier(this.prettierOptions), prettierFilter.restore]);
  }

  private prettier(defaultOptions: any) {
    const transform = (file: any, encoding: string, callback: any) => {
      if (file.state !== 'deleted') {
        const str = file.contents.toString('utf8');
        const data = prettier.format(str, defaultOptions);
        file.contents = Buffer.from(data);
      }
      callback(null, file);
    };
    return through.obj(transform);
  }

}
