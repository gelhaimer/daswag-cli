import {expect, test} from '@oclif/test';

describe('doc', () => {
  test
    .stdout()
    .command(['doc'])
    .it('runs doc', ctx => {
      expect(ctx.stdout).to.contain('You should specify a keyword, for instance, `daswag doc Generator`.');
    });
});
