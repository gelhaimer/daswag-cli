import {Base} from "../core/base";
import File from '../core/file';
import {IClientOptions} from './client-options.model';
import Utils from "../../utils/utils";

export class ClientFiles extends File  {

  private static CLIENT_TEMPLATE_PATH = '../../../templates/client';

  constructor(generator: Base, options: IClientOptions) {
    super(generator, options, ClientFiles.CLIENT_TEMPLATE_PATH);
  }

  public files(): object {
    return {
      common: [
        {
          templates: [
            '.editorconfig',
            '.gitignore',
          ]
        }
      ]
    };
  }

  public destinationName(): string {
    return Utils.convertKebabCase(this.options.baseName + '-client');
  }

}
