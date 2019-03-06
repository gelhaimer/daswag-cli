import * as path from 'path';
import * as helpers from 'yeoman-test';
import {Prompt} from '../../src/generators/prompt';

describe('daswag:app', () => {
  context('generate project with a client and an API', () => {
    const dummyApi: helpers.Dependency = [helpers.createDummyGenerator(), 'daswag:api'];
    const dummyClient: helpers.Dependency = [helpers.createDummyGenerator(), 'daswag:client'];
    before(done => {
      helpers
        .run(path.join(__dirname, '../../src/generators/app'))
        .withOptions({})
        .withPrompts({
          baseName: 'daSWAG',
          iac: Prompt.IAC_CLOUDFORMATION_VALUE,
          provider: Prompt.PROVIDER_AWS_VALUE
        })
        .withGenerators([dummyApi, dummyClient])
        .on('end', done);
    });

  });
});
