const {Command, flags} = require('@oclif/core')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('config')
axios.defaults.httpsAgent = new https.Agent()

class resetall extends Command {
  async run() {
    try {
      const {flags} = this.parse(resetall
    )
      await axios.post(`${config.BASE_URL}/admin/resetall`)
      console.log('Reset Successful')
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

resetall.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
}

resetall.description = 'reset data'

module.exports = resetall