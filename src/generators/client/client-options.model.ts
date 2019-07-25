import {IOptions} from "../core/options.model";

export interface IClientOptions extends IOptions {
  baseNameClient: string,
  baseNameClientKebabCase: string,
  framework?: string;
  packageManager?: string;
}
