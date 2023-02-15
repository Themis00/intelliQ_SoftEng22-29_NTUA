import {expect, test} from '@oclif/test'

describe('getquestionanswers', () => {
  test
  .stdout()
  .command(['getquestionanswers'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['getquestionanswers', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
