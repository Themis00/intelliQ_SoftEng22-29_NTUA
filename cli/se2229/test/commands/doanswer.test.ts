import {expect, test} from '@oclif/test'

describe('doanswer', () => {
  test
  .stdout()
  .command(['doanswer', '--format=json', '--questionnaire_id=QQ000', '--session_id=1111', '--question_id=Q01', '--option_id=P00TXT'])
  .it('Insert answer in the database with JSON format', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['doanswer', '--format=csv', '--questionnaire_id=QQ000', '--session_id=1111', '--question_id=Q01', '--option_id=P00TXT'])
  .it('Insert answer in the database with CSV format', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })

  test
    .stderr()
    .command(['doanswer', '--format=json', '--questionnaire_id=123', '--session_id=1111', '--question_id=Q01', '--option_id=P00TXT'])
    .exit(1)
    .it('returns an error message', (ctx) => {
      expect(ctx.stderr).to.contain('error message');
    });
})