import {expect, test} from '@oclif/test'

describe('resetall', () => {
  test
  .stdout()
  .command(['resetall', '--format=csv'])
  .it('reset data', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })

  test
    .stderr()
    .command(['resetall', '--format=json'])
    .exit(1)
    .it('returns an error message', (ctx) => {
      expect(ctx.stderr).to.contain('error message');
    });
})