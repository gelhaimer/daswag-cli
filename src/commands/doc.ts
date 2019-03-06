import {flags} from '@oclif/command';

import opn = require('opn');
import CommandBase from '../command-base';

export class Doc extends CommandBase {
  public static description = 'Opens the official daSWAG documentation (daswag.tech/documentation) in a browser, and searches for a given keyword.';

  public static args = [{name: 'keyword'}];

  public static flags = {
    search: flags.boolean({char: 's', description: 'Search on Google'}),
  };

  public loggerName() {
    return 'doc';
  }

  public async run() {
    const {flags: options, args} = this.parse(Doc);
    if (!args.keyword) {
      this.logger.error('You should specify a keyword, for instance, `daswag doc Generator`.');
      return 0;
    }
    let searchUrl = `https://www.daswag.tech/api?query=${args.keyword}`;
    if (options.search) {
      searchUrl = `https://www.google.com/search?q=site%3Adaswag.tech+${args.keyword}`;
    }
    await this.openBrowser(searchUrl);
  }

  public async openBrowser(searchUrl: string) {
    return opn(searchUrl, {
      wait: false,
    });
  }
}
