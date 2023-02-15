import {expect, test} from '@oclif/test'

describe('questionnaire_upd', () => {
  test
  .stdout()
  .command(['questionnaire_upd'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['questionnaire_upd', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
