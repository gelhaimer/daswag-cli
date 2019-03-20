import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';
import {IClientOptions} from "../../src/generators/client/client-options.model";
import {ClientPrompts} from '../../src/generators/client/client-prompts';
import {Prompt} from '../../src/generators/core/prompt';
import TestUtils from "../utils/test-utils";
import {Base} from "../../src/generators/core/base";

describe('daswag:client', () => {
  context('generate a client', () => {
    describe('with AWS, Angular and SAM parameters', () => {
      let generator: Base;
      const config : IClientOptions = {
        baseName: 'baseName',
        framework: ClientPrompts.FRAMEWORK_ANGULAR_VALUE,
        iac: Prompt.IAC_SAM_VALUE,
        packageManager: ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
        provider: Prompt.PROVIDER_AWS_VALUE,
        useSass: true,
      };
      it('creates expected files for given configuration', () => {
        return helpers
          .run(path.join(__dirname, '../../src/generators/client'))
          .withOptions({})
          .withPrompts(config)
          .on('ready', function (gen) {
            // This is called right before `generator.run()` is called
            generator = gen;
          })
          .then((dir) => {
            assert.file( path.join(dir, '.yo-rc.json'));
            assert.jsonFileContent(path.join(dir, '.yo-rc.json'),{ "daswag-cli": config});
          });
      });
    });

    describe('with AWS, Angular and Terraform parameters', () => {
      let generator: Base;
      const config : IClientOptions = {
        baseName: 'baseName',
        framework: ClientPrompts.FRAMEWORK_ANGULAR_VALUE,
        iac: Prompt.IAC_TERRAFORM_VALUE,
        packageManager: ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
        provider: Prompt.PROVIDER_AWS_VALUE,
        useSass: true,
      };
      it('creates expected files for given configuration', () => {
        return helpers
          .run(path.join(__dirname, '../../src/generators/client'))
          .withOptions({})
          .withPrompts(config)
          .on('ready', function (gen) {
            // This is called right before `generator.run()` is called
            generator = gen;
          })
          .then((dir) => {
            console.log(generator);
            assert.file( path.join(dir, '.yo-rc.json'));
            assert.jsonFileContent(path.join(dir, '.yo-rc.json'), { "daswag-cli": config});
          });
      });
    });

    describe('with AWS, Angular and Serverless parameters', () => {
      const config : IClientOptions = {
        baseName: 'baseName',
        framework: ClientPrompts.FRAMEWORK_ANGULAR_VALUE,
        iac: Prompt.IAC_SERVERLESS_VALUE,
        packageManager: ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
        provider: Prompt.PROVIDER_AWS_VALUE,
        useSass: true,
      };
      it('creates expected files for given configuration', () => {
        helpers
          .run(path.join(__dirname, '../../src/generators/client'))
          .withOptions({})
          .withPrompts(config)
          .then((dir) => {
            assert.file( '.yo-rc.json');
            assert.jsonFileContent('.yo-rc.json',config);
          });
      });
    });
  });
});


