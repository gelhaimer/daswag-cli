import {IOptions} from "../core/options.model";

export interface IClientOptions extends IOptions {
  framework?: string;
  packageManager?: string;
  useSass?: boolean;
}
