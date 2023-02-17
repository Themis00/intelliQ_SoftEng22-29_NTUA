import {expect, test} from '@oclif/test'

describe('questionnaireupd', () => {
  test
  .stdout()
  .command(['questionnaireupd'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['questionnaireupd', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
