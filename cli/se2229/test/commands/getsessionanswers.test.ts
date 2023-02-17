import {expect, test} from '@oclif/test'

describe('getquestionanswers', () => {
  test
  .stdout()
  .command(['getquestionanswers', '--format=json', '--questionnaire_id=QQ000', '--session_id=1111'])
  .it('returns the answers of given questionnaireID and sessionID with JSON format', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['getquestionanswers', '--format=csv', '--questionnaire_id=QQ000', '--session_id=1111'])
  .it('returns the answers of given questionnaireID and sessionID with CSV format', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })

  test
    .stderr()
    .command(['getquestionanswers', '--format=json', '--questionnaire_id=123', '--session_id=1111'])
    .exit(1)
    .it('returns an error message for an invalid questionnaire ID', (ctx) => {
      expect(ctx.stderr).to.contain('invalid questionnaire ID error message');
    });
})