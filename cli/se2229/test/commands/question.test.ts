import {expect, test} from '@oclif/test'

describe('question', () => {
  test
  .stdout()
  .command(['question', '--format=json', '--questionnaire_id=QQ000', '--question_id=Q01'])
  .it('returns question info and options for a valid question ID and questionnaire ID with JSON format', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['question', '--format=csv', '--questionnaire_id=QQ000', '--question_id=Q01'])
  .it('returns question info and options for a valid question ID and questionnaire ID with CSV format', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })

  test
    .stderr()
    .command(['question', '--format=json', '--questionnaire_id=123', '--question_id=789'])
    .exit(1)
    .it('returns an error message for an invalid question ID', (ctx) => {
      expect(ctx.stderr).to.contain('invalid question ID error message');
    });
})
