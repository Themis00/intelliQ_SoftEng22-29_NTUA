/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
const { Command, flags } = require('@oclif/core')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('config')
axios.defaults.httpsAgent = new https.Agent()

class questionnaire extends Command {
  async run() {
    try {
      const { flags } = this.parse(questionnaire)
      let status
      if (flags.format === 'csv') {
        status = await axios.get(`${config.BASE_URL}/questionnaire/${flags.questionnaire_id}?format=csv`)
      } else {
        status = await axios.get(`${config.BASE_URL}/questionnaire/${flags.questionnaire_id}`)
      }
      console.log(status.data)
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

questionnaire.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
  questionnaire_id: flags.string({
    required: true,
    description: 'choose the questionnaire whose question will be returned'
  }),
}

questionnaire.description = 'returns the questions of the given questionnaireID'

module.exports = questionnaire
