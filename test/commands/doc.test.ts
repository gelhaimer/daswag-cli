import {expect, test} from '@oclif/test'
import {mock, verify, when} from 'ts-mockito';
import opn = require('opn');

describe('doc', () => {
  test
    .stdout()
    .command(['doc'])
    .it('runs doc', ctx => {
      expect(ctx.stdout).to.contain('You should specify a keyword, for instance, `daswag doc Generator`.');
    });
});
