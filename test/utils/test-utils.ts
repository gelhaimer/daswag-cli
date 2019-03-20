import * as path from 'path';
import * as assert from 'yeoman-assert';
import LoggerUtils from "../../src/utils/logger-utils";
import Utils from "../../src/utils/utils";

export default class TestUtils {

  public static logger = LoggerUtils.createLogger('TestUtils');

  public static assertFile(baseName: string, type: string, files: string | string[]) {
    if(typeof files !== 'string') {
      files.forEach((file: string) => {
        assert.file(path.join(Utils.convertKebabCase(baseName) + '-' + type, file));
      });
    } else {
      assert.file(path.join(Utils.convertKebabCase(baseName) + '-' + type, files));
    }
  }
}
