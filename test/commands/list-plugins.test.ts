import {expect, test} from '@oclif/test'

describe('list-plugins', () => {
  test
    .stdout()
    .command(['list-plugins'])
    .it('runs list-plugins', ctx => {
      expect(ctx.stdout).to.contain('Coming soon.')
    })
})
