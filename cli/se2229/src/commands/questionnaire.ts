import { Command, Flags } from '@oclif/core';
import * as https from 'https';
import axios from 'axios';

axios.defaults.httpsAgent = new https.Agent();

export default class questionnaire extends Command {
  static description = 'returns an object that includes the questionnaireTitle, and the questions of the questionnaire with all their attributes';

  static flags = {
    // flag with a value (-n, --name=VALUE)
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
    questionnaire_id: Flags.string({
      required: true,
      description: 'choose the questionnaire whose questions will be returned'
    }),
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(questionnaire);
      if (flags.format === 'csv') {
        const response = await axios.get(`http://localhost:9103/intelliq_api/questionnaire/${flags.questionnaire_id}?format=csv`);
        data = response.data;
      } else {
        const response = await axios.get(`http://localhost:9103/intelliq_api/questionnaire/${flags.questionnaire_id}/`);
        data = response.data;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}
