import {expect, test} from '@oclif/test';
import Utils from '../../src/utils/utils';
import sinon = require('sinon');

describe('doc', () => {
  let stub: any;
  beforeEach(() => {
    stub = sinon.stub(Utils, 'openBrowser');
  });
  afterEach(() => {
    stub.restore();
  });
  test
    .stdout()
    .command(['doc'])
    .it('runs doc', ctx => {
      expect(ctx.stdout).to.contain('You should specify a keyword, for instance, `daswag doc Generator`.');
    });
  test
    .stdout()
    .command(['doc', '-s', 'test'])
    .it('runs doc -s test', ctx => {
      expect(stub.called).to.be.true;
      expect(stub.getCall(0).args[0]).to.equal('https://www.google.com/search?q=site%3Adaswag.tech+test')
    });
  test
    .stdout()
    .command(['doc', 'test'])
    .it('runs doc test', ctx => {
      expect(stub.called).to.be.true;
      expect(stub.getCall(0).args[0]).to.equal('https://www.daswag.tech/api?query=test')
    });
});
