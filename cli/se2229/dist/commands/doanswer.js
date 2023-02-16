"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const axios_1 = tslib_1.__importDefault(require("axios"));
const https = tslib_1.__importStar(require("https"));
axios_1.default.defaults.httpsAgent = new https.Agent();
class doanswer extends core_1.Command {
    async run() {
        let data; // type annotation to specify the type of the variable
        try {
            const { flags } = await this.parse(doanswer);
            const response = await axios_1.default.post(`http://localhost:9103/intelliq_api/doanswer/${flags.questionnaire_id}/${flags.question_id}/${flags.session_id}/${flags.option_id}`);
            data = response.data;
            console.log('Answer Submitted');
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = doanswer;
doanswer.description = 'Insert answer in the database';
doanswer.flags = {
    format: core_1.Flags.string({
        options: ['json', 'csv'],
        required: true,
        default: 'json',
    }),
    questionnaire_id: core_1.Flags.string({
        required: true,
        description: 'choose the questionnaire whose answer will be returned'
    }),
    question_id: core_1.Flags.string({
        required: true,
        description: 'choose the question whose answer will be returned'
    }),
    session_id: core_1.Flags.string({
        required: true,
        description: '4 random symbol string that correspond to the session'
    }),
    option_id: core_1.Flags.string({
        required: true,
        description: 'the ID of the option selected for the answer'
    })
};
