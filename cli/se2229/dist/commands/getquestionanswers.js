"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const axios_1 = require("axios");
class getquestionanswers extends core_1.Command {
    async run() {
        let data; // type annotation to specify the type of the variable
        try {
            const { flags } = await this.parse(getquestionanswers);
            if (flags.format === 'csv') {
                const response = await axios_1.default.get(`http://localhost:9103/intelliq_api/getquestionanswers/${flags.questionnaire_id}/${flags.question_id}?format=csv`);
                data = response.data;
            }
            else {
                const response = await axios_1.default.get(`http://localhost:9103/intelliq_api/getquestionanswers/${flags.questionnaire_id}/${flags.question_id}`);
                data = response.data;
            }
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = getquestionanswers;
getquestionanswers.description = 'returns the answers of all sessions of the given questionID';
getquestionanswers.flags = {
    // flag with a value (-n, --name=VALUE)
    format: core_1.Flags.string({
        options: ['json', 'csv'],
        required: true,
        default: 'json',
    }),
    questionnaire_id: core_1.Flags.string({
        required: true,
        description: 'choose the questionnaire whose getquestionanswers will be returned'
    }),
    question_id: core_1.Flags.string({
        required: true,
        description: 'choose the getquestionanswers to be returned'
    }),
};
