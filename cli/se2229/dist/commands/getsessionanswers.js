"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const axios_1 = tslib_1.__importDefault(require("axios"));
const https = tslib_1.__importStar(require("https"));
axios_1.default.defaults.httpsAgent = new https.Agent();
class getsessionanswers extends core_1.Command {
    async run() {
        let data; // type annotation to specify the type of the variable
        try {
            const { flags } = await this.parse(getsessionanswers);
            if (flags.format === 'csv') {
                const response = await axios_1.default.get(`http://localhost:9103/intelliq_api/getsessionanswers/${flags.questionnaire_id}/${flags.session_id}?format=csv`);
                data = response.data;
            }
            else {
                const response = await axios_1.default.get(`http://localhost:9103/intelliq_api/getsessionanswers/${flags.questionnaire_id}/${flags.session_id}`);
                data = response.data;
            }
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = getsessionanswers;
getsessionanswers.description = 'returns the answers of given questionnaireID and sessionID';
getsessionanswers.flags = {
    // flag with a value (-n, --name=VALUE)
    format: core_1.Flags.string({
        options: ['json', 'csv'],
        required: true,
        default: 'json',
    }),
    questionnaire_id: core_1.Flags.string({
        required: true,
        description: 'choose the questionnaire whose answers will be returned'
    }),
    session_id: core_1.Flags.string({
        required: true,
        description: 'choose the session whose answers will be returned'
    }),
};
