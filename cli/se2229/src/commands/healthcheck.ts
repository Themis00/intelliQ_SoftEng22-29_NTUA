import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import * as https from 'https';

axios.defaults.httpsAgent = new https.Agent();

export default class Healthcheck extends Command {
  static description = 'tests live server for errors';

  static flags = {
    // flag with a value (-n, --name=VALUE)
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(Healthcheck);
      if (flags.format === 'csv') {
        const response = await axios.get('http://localhost:9103/intelliq_api/admin/healthcheck?format=csv');
        data = response.data;
      } else {
        const response = await axios.get('http://localhost:9103/intelliq_api/admin/healthcheck');
        data = response.data;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}