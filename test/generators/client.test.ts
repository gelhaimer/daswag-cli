import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';
import {ClientFiles} from "../../src/generators/client/client-files";
import {IClientOptions} from "../../src/generators/client/client-options.model";
import {ClientPrompts} from '../../src/generators/client/client-prompts';
import {Base} from "../../src/generators/core/base";
import {Prompt} from '../../src/generators/core/prompt';
import TestUtils from "../utils/test-utils";

describe('daswag:client', () => {
  context('generate a client', () => {
    describe('with AWS, Angular and SAM parameters', () => {
      let generator: Base;
      const config : IClientOptions = {
        baseName: 'BaseName',
        baseNameClient: 'BaseNameClient',
        baseNameClientKebabCase: 'base-name-client',
        framework: ClientPrompts.FRAMEWORK_ANGULAR_VALUE,
        iac: Prompt.IAC_SAM_VALUE,
        packageManager: ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
        provider: Prompt.PROVIDER_AWS_VALUE,
      };
      it('creates expected files for given configuration', () => {
        return helpers
          .run(path.join(__dirname, '../../src/generators/client'))
          .withOptions({})
          .withPrompts(config)
          .on('ready',  (gen) => {
            // This is called right before `generator.run()` is called
            generator = gen;
          })
          .then((tempDir) => {
            const files = new ClientFiles(generator, config);
            assert.file( path.join(tempDir, path.join(config.baseNameClientKebabCase, '.yo-rc.json')));
            assert.jsonFileContent(path.join(tempDir, config.baseNameClientKebabCase, '.yo-rc.json'),{ "daswag-cli": config});
            TestUtils.assertFiles(config, tempDir, config.baseNameClientKebabCase, files.files());
          });
      });
    });
  });
});


