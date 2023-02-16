import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import * as https from 'https';

axios.defaults.httpsAgent = new https.Agent();

export default class resetq extends Command {
  static description = 'reset questions';

  static flags = {
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
    questionnaire_id: Flags.string({
      required: true,
      description: 'choose the questionnaire to be reseted'
    }),
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(resetq);
     
      const response = await axios.post(`http://localhost:9103/intelliq_api/admin/resetq/${flags.questionnaire_id}`);

      data = response.data;
      
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}