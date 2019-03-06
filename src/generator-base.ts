import {createEnv} from 'yeoman-environment';
import CommandBase from './command-base';

import chalk from "chalk";
import pjson = require('pjson');

export abstract class GeneratorBase extends CommandBase {
  protected init(): Promise<any> {
    this.printLogo();
    return super.init();
  }

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


  private printLogo() {
    this.log('\n');
    this.log(`${chalk.black('██████╗  █████╗ ')}${chalk.blueBright('███████╗██╗    ██╗ █████╗  ██████╗ ')}`);
    this.log(`${chalk.black('██╔══██╗██╔══██╗')}${chalk.blueBright('██╔════╝██║    ██║██╔══██╗██╔════╝ ')}`);
    this.log(`${chalk.black('██║  ██║███████║')}${chalk.blueBright('███████╗██║ █╗ ██║███████║██║  ███╗')}`);
    this.log(`${chalk.black('██║  ██║██╔══██║')}${chalk.blueBright('╚════██║██║███╗██║██╔══██║██║   ██║')}`);
    this.log(`${chalk.black('██████╔╝██║  ██║')}${chalk.blueBright('███████║╚███╔███╔╝██║  ██║╚██████╔╝')}`);
    this.log(`${chalk.black('╚═════╝ ╚═╝  ╚═╝')}${chalk.blueBright('╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝ ')}`);
    this.log(chalk.white.bold('           https://www.daswag.tech\n'));
    this.log(chalk.white('Welcome to daSWAG ') + chalk.yellow(`v${pjson.version}`));
    this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
    if (process.cwd() === this.getUserHome()) {
      this.log(chalk.red.bold('\n️⚠️  WARNING ⚠️  You are in your HOME folder!'));
      this.log(
        chalk.red('This can cause problems, you should always create a new directory and run the daswag command from here.')
      );
      this.log(chalk.white(`See the troubleshooting section at ${chalk.yellow('https://www.daswag.tech/documentation/installation/')}`));
    }
    this.log(
      chalk.blueBright(
        '_______________________________________________________________________________________________________________\n'
      )
    );
    this.log(
      chalk.white(`  Documentation for creating a Serverless application is at ${chalk.yellow('https://www.daswag.tech/documentation/installation/getting-started/')}`)
    );
    this.log(
      chalk.blueBright(
        '_______________________________________________________________________________________________________________\n'
      )
    );
  }
}
