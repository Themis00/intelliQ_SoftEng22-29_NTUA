import {expect, test} from '@oclif/test'

describe('questionnaire', () => {
  test
  .stdout()
  .command(['questionnaire', '--format=json', '--questionnaire_id=QQ000'])
  .it('returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their attributes with JSON format', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['questionnaire', '--format=csv', '--questionnaire_id=QQ000'])
  .it('returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their attributes with CSV format', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })

  test
    .stderr()
    .command(['questionnaire', '--format=json', '--questionnaire_id=123'])
    .exit(1)
    .it('returns an error message for an invalid questionnaire ID', (ctx) => {
      expect(ctx.stderr).to.contain('invalid questionnaire ID error message');
    });
})
