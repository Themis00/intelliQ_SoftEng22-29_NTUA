/* eslint-disable node/no-missing-require */
/* eslint-disable no-negated-condition */
/* eslint-disable no-console */
const {Command, flags} = require('@oclif/core')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const fs = require('fs')
const config = require('config')
const FormData = require('form-data')
axios.defaults.httpsAgent = new https.Agent()

class questionnaire_upd extends Command {
    async run() {
      try {
        const form = new FormData()
        form.append('file', fs.createReadStream(flags.source))

        const {flags} = this.parse(questionnaire_upd)
        await axios.post(`${config.BASE_URL}/admin/questionnaire_upd`, form, {headers: form.getHeaders()})
        console.log('Database Updated')
      } catch (error) {
        console.error(chalk.red(error))
      }
    }
  }
  
  questionnaire_upd.flags = {
    format: flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
    source: flags.string({
        required: true,
        description: 'the file to upload to the server'+ chalk.reset('--source')
      })
  }
  
  questionnaire_upd.description = 'post a new questionnaire'
  
  module.exports = questionnaire_upd