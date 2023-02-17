import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import * as https from 'https';

axios.defaults.httpsAgent = new https.Agent();

export default class session extends Command {
  static description = 'generates an new session, saves it in the database and returns it';

  static flags = {
    // flag with a value (-n, --name=VALUE)
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    })
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(session);
      if (flags.format === 'csv') {
        const response = await axios.get(`http://localhost:9103/intelliq_api/admin/session/?format=csv`);
        data = response.data;
      } else {
        const response = await axios.get(`http://localhost:9103/intelliq_api/admin/session/`);
        data = response.data;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}