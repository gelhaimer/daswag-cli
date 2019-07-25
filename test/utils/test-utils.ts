import * as path from 'path';
import * as assert from 'yeoman-assert';
import {IOptions} from "../../src/generators/core/options.model";
import LoggerUtils from "../../src/utils/logger-utils";
import Utils from "../../src/utils/utils";

export default class TestUtils {

  public static logger = LoggerUtils.createLogger('TestUtils');

  public static assertFiles(config: IOptions, tempDir: string, destinationDir: string, files: any) {
    // Iterate over files
    for (let i = 0, blocks = Object.keys(files); i < blocks.length; i++) {
      for (let j = 0, blockTemplates = files[blocks[i]]; j < blockTemplates.length; j++) {
        const blockTemplate = blockTemplates[j];
        if (!blockTemplate.condition || blockTemplate.condition(config)) {
          blockTemplate.templates.forEach((templateObj: any) => {
            const filePath = path.join(tempDir, destinationDir, templateObj.replace('.ejs', ''));
            TestUtils.logger.info('Testing: ' + templateObj.replace('.ejs', ''));
            assert.file(filePath);
          });
        }
      }
    }
  }
}
