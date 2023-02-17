import {expect, test} from '@oclif/test'

describe('questionnaireupd', () => {
  test
  .stdout()
  .command(['questionnaireupd', '--format=json', '--source=file.json'])
  .it('add a new questionnaire with JSON format', ctx => {
    expect(ctx.stdout).to.contain({ status: 'Success' })
  })

  test
    .stderr()
    .command(['questionnaireupd', '--format=json', '--questionnaire_id=123'])
    .exit(1)
    .it('returns an error message for an invalid questionnaire', (ctx) => {
      expect(ctx.stderr).to.contain('invalid questionnaire error message');
    });
})
