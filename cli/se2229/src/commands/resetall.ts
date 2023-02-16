import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import * as https from 'https';

axios.defaults.httpsAgent = new https.Agent();

export default class resetall extends Command {
  static description = 'reset data';

  static flags = {
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(resetall);
     
      const response = await axios.post('http://localhost:9103/intelliq_api/admin/resetall');
      data = response.data;
      
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}