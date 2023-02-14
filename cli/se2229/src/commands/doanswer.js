const { Command, flags } = require('@oclif/core')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('config')
axios.defaults.httpsAgent = new https.Agent()

class doanswer extends Command {
  async run() {
    try {
      const { flags } = this.parse(doanswer)
      await axios.post(`${config.BASE_URL}/doanswer/${flags.questionnaire_id}/${flags.question_id}/${flags.session}/${flags.option_id}`)
      console.log('Answer Submitted')
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

doanswer.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
  questionnaire_id: flags.string({
    required: true,
    description: 'choose the questionnaire whose answer will be submitted'
  }),
  question_id: flags.string({
    required: true,
    description: 'choose the question whose answer will be submitted'
  }),
  session: flags.string({
    required: true,
    description: '4 random symbol string that correspond to the answer'
  }),
  option_id: flags.string({
    required: true,
    description: 'the ID of the option selected for the answer'
    })
}

doanswer.description = 'Submit optionID'

module.exports = doanswer
