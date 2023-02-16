import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import { createReadStream } from 'fs';
import FormData from 'form-data';
import * as https from 'https';

axios.defaults.httpsAgent = new https.Agent();

export default class questionnaireupd extends Command {
  static description = 'add a new questionnaire';

  static flags = {
    // flag with a value (-n, --name=VALUE)
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
   
    source: Flags.string({
      required: true,
      description: 'the file to upload to the server'
    })
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(questionnaireupd);
      const file = createReadStream(flags.source);
      const formData = new FormData();
      formData.append('questionnaire', file);

      if (flags.format === 'csv') {
        const response = await axios.post('http://localhost:9103/intelliq_api/admin/questionnaire_upd?format=csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        });
        data = response.data;
      } else {        
        const response = await axios.post('http://localhost:9103/intelliq_api/admin/questionnaire_upd', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        });
        data = response.data;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}
