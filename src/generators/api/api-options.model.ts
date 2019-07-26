import {IOptions} from "../core/options.model";

export interface IApiOptions extends IOptions {
  baseNameApi: string,
  baseNameApiKebabCase: string,
  applicationType?: string,
  db?: string,
  language?: string,
  monitoring?: string,
  trace?: string;
}
