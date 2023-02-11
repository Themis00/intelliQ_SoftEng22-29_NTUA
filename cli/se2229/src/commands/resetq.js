const {Command, flags} = require('@oclif/core')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('config')
axios.defaults.httpsAgent = new https.Agent()

class resetq extends Command {
  async run() {
    try {
      const {flags} = this.parse(resetq)
      await axios.post(`${config.BASE_URL}/admin/resetq/${flags.questionnaire_id}`)
      console.log('Reset Successful')
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

resetq.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
  questionnaire_id: flags.string({
    required: true,
    description: 'choose the questionnaire to be reseted'
  }),
}

resetq.description = 'reset data'

module.exports = resetq