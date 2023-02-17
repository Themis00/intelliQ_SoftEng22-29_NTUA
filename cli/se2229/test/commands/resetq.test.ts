import {expect, test} from '@oclif/test'

describe('resetq', () => {
  test
  .stdout()
  .command(['resetq', '--format=csv'])
  .it('reset questions', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })

  test
    .stderr()
    .command(['resetq', '--format=json'])
    .exit(1)
    .it('returns an error message', (ctx) => {
      expect(ctx.stderr).to.contain('error message');
    });
})