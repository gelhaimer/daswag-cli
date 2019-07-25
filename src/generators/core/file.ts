import * as path from "path";
import {Base} from "./base";
import {IOptions} from "./options.model";

export default abstract class File {

  public static MAIN_SRC_DIR = 'src/';

  constructor(public generator: Base, public options: IOptions, public templatePath: string) {
  }

  public writeFiles() {
    const startTime = new Date();
    const files = this.files();

    // Iterate over files
    for (let i = 0, blocks = Object.keys(files); i < blocks.length; i++) {
      for (let j = 0, blockTemplates = files[blocks[i]]; j < blockTemplates.length; j++) {
        const blockTemplate = blockTemplates[j];
        if (!blockTemplate.condition || blockTemplate.condition(this.options)) {
          this.generator.sourceRoot(path.join(__dirname, this.templatePath, blockTemplate.path ? blockTemplate.path : ''));
          blockTemplate.templates.forEach((templateObj: any) => {
            this.generator.fs.copyTpl(
              this.generator.templatePath(templateObj),
              this.generator.destinationPath(templateObj.replace('.ejs', '')),
              this.options
            );
          });

        }
      }
    }

    const endTime = new Date();
    this.generator.logger.debug(`Time taken to write files: ${endTime.getTime() - startTime.getTime()}ms`);
  }

  public abstract files(): any;

}
