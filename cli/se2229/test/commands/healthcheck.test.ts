import {expect, test} from '@oclif/test'

describe('healthcheck', () => {
  test
  .stdout()
  .command(['healthcheck', '--format=json'])
  .it('returns question info and options for a valid question ID and questionnaire ID with JSON format', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['healthcheck', '--format=csv'])
  .it('returns question info and options for a valid question ID and questionnaire ID with CSV format', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })

  test
    .stderr()
    .command(['healthcheck', '--format=json'])
    .exit(1)
    .it('returns an error message ', (ctx) => {
      expect(ctx.stderr).to.contain('error message');
    });
})
