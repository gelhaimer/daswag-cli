import {createEnv} from 'yeoman-environment';
import CommandBase from './command-base';

export abstract class GeneratorBase extends CommandBase {


  protected async generate(type: string, generatorOptions: object = {}) {
    const env = createEnv();

    env.register(
      require.resolve(`./generators/${type}`),
      `daswag:${type}`,
    );

    await new Promise((resolve, reject) => {
      env.run(`daswag:${type}`, generatorOptions, (err: Error, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}
