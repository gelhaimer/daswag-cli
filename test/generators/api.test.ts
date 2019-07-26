import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';
import {ApiPrompts} from '../../src/generators/api/api-prompts';
import {Prompt} from '../../src/generators/core/prompt';

describe('daswag:api', () => {
  context('generate an API', () => {
    describe('', () => {
      before(done => {
        helpers
          .run(path.join(__dirname, '../../src/generators/api'))
          .withOptions({
            skipChecks: false,
            type: 'api',

                       })
          .withPrompts({
                         baseName: 'daSWAG',
                         db: ApiPrompts.DB_DYNAMODB_VALUE,
                         iac: Prompt.IAC_SAM_VALUE,
                         language: ApiPrompts.LANGUAGE_PYTHON_VALUE,
                         monitoring: ApiPrompts.MONITORING_CLOUDWATCH_VALUE,
                         provider: Prompt.PROVIDER_AWS_VALUE,
                         trace: ApiPrompts.TRACE_XRAY_VALUE,
                       })
          .on('end', done);
      });
      it('creates expected files for given configuration', () => {
        assert.file(['.yo-rc.json']);
      });
    });
  });
});
