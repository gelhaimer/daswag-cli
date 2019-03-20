import opn = require('opn');
import LoggerUtils from './logger-utils';

export default class Utils {

  public static logger = LoggerUtils.createLogger('Utils');

  public static async openBrowser(searchUrl: string) {
    return opn(searchUrl, {
      wait: false,
    });
  }

  public static convertKebabCase(value: string) {
    return value.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
  }
}
