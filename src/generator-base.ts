import {flags} from '@oclif/command';
import {createEnv} from 'yeoman-environment';
import CommandBase from './command-base';

import chalk from "chalk";
import pjson = require('pjson');

export abstract class GeneratorBase extends CommandBase {

  public static FLAG_AUTH = flags.string({description: 'Authentication used to secure your client and API (auth0)'});
  public static FLAG_BASE_NAME = flags.string({description: 'Base name of your project'});
  public static FLAG_DB = flags.string({description: 'Database used to store your objects (dynamodb)'});
  public static FLAG_FORCE = flags.boolean({description: 'overwrite existing files'});
  public static FLAG_FRAMEWORK = flags.string({description: 'cloud provider used to deploy your project (aws)'});
  public static FLAG_IAC = flags.string({description: 'infra as code dependency (sam)'});
  public static FLAG_LANGUAGE = flags.string({description: 'Language used to develop your API (python)'});
  public static FLAG_MONITORING = flags.string({description: 'Monitoring solution for your API (cloudwatch)'});
  public static FLAG_PACKAGE_MANAGER = flags.string({description: 'Package manager used to build your project (npm|yarn)'});
  public static FLAG_PROVIDER = flags.string({description: 'cloud provider used to deploy your project (aws)'});
  public static FLAG_SKIP_CHECKS = flags.boolean({description: 'skip tools and dependencies checks'});
  public static FLAG_TRACE = flags.string({description: 'Trace solution for your API (xray)'});
  public static FLAG_SKIP_GIT = flags.boolean({description: 'skip git initialization'});


  protected init(): Promise<any> {
    this.printLogo();
    return super.init();
  }

  protected validate(options: object): boolean {
    return true;
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
