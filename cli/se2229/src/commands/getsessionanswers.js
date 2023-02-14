const { Command, flags } = require('@oclif/core')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('config')
axios.defaults.httpsAgent = new https.Agent()

class getsessionanswers extends Command {
  async run() {
    try {
      const { flags } = this.parse(question)
      let status
      if (flags.format === 'csv') {
        status = await axios.get(`${config.BASE_URL}/getsessionanswers/${flags.questionnaire_id}/${flags.session}?format=csv`)
      } else {
        status = await axios.get(`${config.BASE_URL}/getsessionanswers/${flags.questionnaire_id}/${flags.session}`)
      }
      console.log(status.data)
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

getsessionanswers.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
  questionnaire_id: flags.string({
    required: true,
    description: 'choose the questionnaire whose answers will be returned'
  }),
  session: flags.string({
    required: true,
    description: 'choose the session whose answers will be returned'
  }),
}

getsessionanswers.description = 'returns the answers of given questionnaireID and session'

module.exports = getsessionanswers
