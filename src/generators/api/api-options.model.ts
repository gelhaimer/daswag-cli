import {IOptions} from "../core/options.model";

export interface IApiOptions extends IOptions {
  baseNameApi: string,
  baseNameApiKebabCase: string,
  db?: string,
  language?: string,
  packageManager?: string;
  monitoring?: string,
  trace?: string;
}
