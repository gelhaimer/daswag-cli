import * as path from 'path';
import * as helpers from 'yeoman-test';
import {Prompt} from '../../src/generators/prompt';

describe('daswag:api', () => {
  context('generate an API', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../../src/generators/api'))
        .withOptions({})
        .withPrompts({
          baseName: 'daSWAG',
          iac: Prompt.IAC_CLOUDFORMATION_VALUE,
          provider: Prompt.PROVIDER_AWS_VALUE
        })
        .on('end', done)
    });
    it('creates expected files for given configuration', () => {
      // TODO
    });
  });
});
