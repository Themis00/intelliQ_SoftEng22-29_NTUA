import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import * as https from 'https';

axios.defaults.httpsAgent = new https.Agent();

export default class question extends Command {
  static description = 'returns an object that includes the question info and options of a specific question of a specific questionnaire';

  static flags = {
    // flag with a value (-n, --name=VALUE)
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
    questionnaire_id: Flags.string({
      required: true,
      description: 'choose the questionnaire whose question will be returned'
    }),
    question_id: Flags.string({
      required: true,
      description: 'choose the question to be returned'
     }),
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(question);
      if (flags.format === 'csv') {
        const response = await axios.get(`http://localhost:9103/intelliq_api/question/${flags.questionnaire_id}/${flags.question_id}?format=csv`);
        data = response.data;
      } else {
        const response = await axios.get(`http://localhost:9103/intelliq_api/question/${flags.questionnaire_id}/${flags.question_id}`);
        data = response.data;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}
