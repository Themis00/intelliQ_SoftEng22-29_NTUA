import {expect, test} from '@oclif/test'

describe('getquestionanswers', () => {
  test
  .stdout()
  .command(['getquestionanswers', '--format=json', '--questionnaire_id=QQ000', '--question_id=Q01'])
  .it('returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire with JSON format', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['getquestionanswers', '--format=csv', '--questionnaire_id=QQ000', '--question_id=Q01'])
  .it('returns an object that includes all the answers (for all sessions) in a specific question of a specific questionnaire with CSV format', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })

  test
    .stderr()
    .command(['getquestionanswers', '--format=json', '--questionnaire_id=123', '--question_id=789'])
    .exit(1)
    .it('returns an error message for an invalid question ID', (ctx) => {
      expect(ctx.stderr).to.contain('invalid question ID error message');
    });
})
