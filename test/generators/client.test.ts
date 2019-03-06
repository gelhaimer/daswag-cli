import * as path from 'path';
import * as helpers from 'yeoman-test';
import {Prompt} from '../../src/generators/prompt';

describe('daswag:client', () => {
  context('generate a client', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../../src/generators/client'))
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
