import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import * as https from 'https';

axios.defaults.httpsAgent = new https.Agent();

export default class doanswer extends Command {
  static description = 'Insert answer in the database';

  static flags = {
    format: Flags.string({
      options: ['json', 'csv'],
      required: true,
      default: 'json',
    }),
    questionnaire_id: Flags.string({
      required: true,
      description: 'choose the questionnaire whose answer will be returned'
    }),
    question_id: Flags.string({
      required: true,
      description: 'choose the question whose answer will be returned'
     }),
    session_id: Flags.string({
      required: true,
      description: '4 random symbol string that correspond to the session'
    }),
    option_id: Flags.string({
      required: true,
      description: 'the ID of the option selected for the answer'
      })
  };

  public async run(): Promise<void> {
    let data: any; // type annotation to specify the type of the variable

    try {
      const { flags } = await this.parse(doanswer);
     
      const response = await axios.post(`http://localhost:9103/intelliq_api/doanswer/${flags.questionnaire_id}/${flags.question_id}/${flags.session_id}/${flags.option_id}`);
      data = response.data;
      
      console.log('Answer Submitted');
    } catch (error) {
      console.error(error);
    }
  }
}