import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import * as https from 'https';

axios.defaults.httpsAgent = new https.Agent();

export default class getsessionanswers extends Command {
  static description = 'returns the answers of given questionnaireID and session';

  static flags = {
    // flag with a value (-n, --name=VALUE)
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
    questionnaire_id: Flags.string({
      required: true,
      description: 'choose the questionnaire whose getsessionanswers will be returned'
    }),
    session_id: Flags.string({
      required: true,
      description: 'choose the session whose answers will be returned'
    }),
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(getsessionanswers);
      if (flags.format === 'csv') {
        const response = await axios.get(`http://localhost:9103/intelliq_api/getsessionanswers/${flags.questionnaire_id}/${flags.session_id}?format=csv`);
        data = response.data;
      } else {
        const response = await axios.get(`http://localhost:9103/intelliq_api/getsessionanswers/${flags.questionnaire_id}/${flags.session_id}`);
        data = response.data;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}
