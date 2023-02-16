"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const axios_1 = tslib_1.__importDefault(require("axios"));
const https = tslib_1.__importStar(require("https"));
axios_1.default.defaults.httpsAgent = new https.Agent();
class resetq extends core_1.Command {
    async run() {
        let data; // type annotation to specify the type of the variable
        try {
            const { flags } = await this.parse(resetq);
            const response = await axios_1.default.post(`http://localhost:9103/intelliq_api/admin/resetq/${flags.questionnaire_id}`);
            data = response.data;
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = resetq;
resetq.description = 'reset questions';
resetq.flags = {
    format: core_1.Flags.string({
        options: ['json', 'csv'],
        required: true,
        default: 'json',
    }),
    questionnaire_id: core_1.Flags.string({
        required: true,
        description: 'choose the questionnaire to be reseted'
    }),
};
