import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';
import {ApiFiles} from "../../src/generators/api/api-files";
import {IApiOptions} from "../../src/generators/api/api-options.model";
import {ApiPrompts} from '../../src/generators/api/api-prompts';
import {Base} from "../../src/generators/core/base";
import {Prompt} from '../../src/generators/core/prompt';
import TestUtils from "../utils/test-utils";

describe('daswag:api', () => {
  context('generate an API', () => {

    describe('with AWS, Cognito, Monolith, SAM, DynamoDB, CloudWatch, Python37, XRay parameters', () => {
      let generator: Base;
      const config : IApiOptions = {
        applicationType: ApiPrompts.TYPE_MONOLITH,
        auth: Prompt.AUTH_COGNITO_VALUE,
        baseName: 'BaseName',
        baseNameApi: 'BaseNameApi',
        baseNameApiKebabCase: 'base-name-api',
        cognitoIntegration: Prompt.COGNITO_CUP_CIP,
        db: ApiPrompts.DB_DYNAMODB_VALUE,
        iac: Prompt.IAC_SAM_VALUE,
        language: ApiPrompts.LANGUAGE_PYTHON37_VALUE,
        monitoring: ApiPrompts.MONITORING_CLOUDWATCH_VALUE,
        provider: Prompt.PROVIDER_AWS_VALUE,
        trace: ApiPrompts.TRACE_XRAY_VALUE,
      };
      it('creates expected files for given configuration', () => {
        return helpers
          .run(path.join(__dirname, '../../src/generators/api'))
          .withOptions({})
          .withPrompts(config)
          .on('ready',  (gen) => {
            // This is called right before `generator.run()` is called
            generator = gen;
          })
          .then((tempDir) => {
            const files = new ApiFiles(generator, config);
            assert.file( path.join(tempDir, path.join(config.baseNameApiKebabCase, '.yo-rc.json')));
            assert.jsonFileContent(path.join(tempDir, config.baseNameApiKebabCase, '.yo-rc.json'),{ "daswag-cli": config});
            TestUtils.assertFiles(config, tempDir, config.baseNameApiKebabCase, files.files());
          });
      });
    });
  });
});
