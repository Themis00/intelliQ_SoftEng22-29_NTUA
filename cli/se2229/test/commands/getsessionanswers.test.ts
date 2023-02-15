import {expect, test} from '@oclif/test'

describe('getsessionanswers', () => {
  test
  .stdout()
  .command(['getsessionanswers'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['getsessionanswers', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
