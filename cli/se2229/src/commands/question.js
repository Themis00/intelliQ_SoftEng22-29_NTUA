const { Command, flags } = require('@oclif/core')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('config')
axios.defaults.httpsAgent = new https.Agent()

class question extends Command {
  async run() {
    try {
      const { flags } = this.parse(question)
      let status
      if (flags.format === 'csv') {
        status = await axios.get(`${config.BASE_URL}/question/${flags.questionnaire_id}/${flags.question_id}?format=csv`)
      } else {
        status = await axios.get(`${config.BASE_URL}/question/${flags.questionnaire_id}/${flags.question_id}`)
      }
      console.log(status.data)
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

question.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
  questionnaire_id: flags.string({
    required: true,
    description: 'choose the questionnaire whose question will be returned'
  }),
  question_id: flags.string({
    required: true,
    description: 'choose the question to be returned'
   }),
}

question.description = 'returns the question of given questionID and questionnaireID'

module.exports = question
