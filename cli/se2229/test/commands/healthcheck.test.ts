import {expect, test} from '@oclif/test'

describe('healthcheck', () => {
  test
  .stdout()
  .command(['healthcheck'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['healthcheck', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
