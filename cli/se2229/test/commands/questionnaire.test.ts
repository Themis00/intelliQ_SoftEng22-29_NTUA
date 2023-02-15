import {expect, test} from '@oclif/test'

describe('questionnaire', () => {
  test
  .stdout()
  .command(['questionnaire'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['questionnaire', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
