import {expect, test} from '@oclif/test'

describe('doc', () => {
  test
    .stdout()
    .command(['doc'])
    .it('runs doc', ctx => {
      expect(ctx.stdout).to.contain('Coming soon.')
    })
})
