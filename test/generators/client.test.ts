import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';
import {ClientPrompts} from '../../src/generators/client/prompts';
import {Prompt} from '../../src/generators/prompt';

describe('daswag:client', () => {
  context('generate a client', () => {

    describe('with AWS, Angular and SAM parameters', () => {
      const config = {
        baseName: 'daSWAG',
        framework: ClientPrompts.FRAMEWORK_ANGULAR_VALUE,
        iac: Prompt.IAC_SAM_VALUE,
        packageManager: ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
        provider: Prompt.PROVIDER_AWS_VALUE,
        useSass: true,
      };
      before(done => {
        helpers
          .run(path.join(__dirname, '../../src/generators/client'))
          .withOptions({})
          .withPrompts(config)
          .on('end', done);
      });
      it('creates expected files for given configuration', () => {
        assert.file(['.yo-rc.json']);
      });
    });

    describe('with AWS, Angular and Terraform parameters', () => {
      const config = {
        baseName: 'daSWAG',
        framework: ClientPrompts.FRAMEWORK_ANGULAR_VALUE,
        iac: Prompt.IAC_TERRAFORM_VALUE,
        packageManager: ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
        provider: Prompt.PROVIDER_AWS_VALUE,
        useSass: true,
      };
      before(done => {
        helpers
          .run(path.join(__dirname, '../../src/generators/client'))
          .withOptions({})
          .withPrompts(config)
          .on('end', done);
      });
      it('creates expected files for given configuration', () => {
        assert.file(['.yo-rc.json']);
      });
    });

    describe('with AWS, Angular and Serverless parameters', () => {
      const config = {
        baseName: 'daSWAG',
        framework: ClientPrompts.FRAMEWORK_ANGULAR_VALUE,
        iac: Prompt.IAC_SERVERLESS_VALUE,
        packageManager: ClientPrompts.PACKAGE_MANAGER_YARN_VALUE,
        provider: Prompt.PROVIDER_AWS_VALUE,
        useSass: true,
      };
      before(done => {
        helpers
          .run(path.join(__dirname, '../../src/generators/client'))
          .withOptions({})
          .withPrompts(config)
          .on('end', done);
      });
      it('creates expected files for given configuration', () => {
        assert.file(['.yo-rc.json']);
      });
      it('update project configuration', () => {
        // assert.jsonFileContent('.yo-rc.json', config);
      });
    });
  });
});
