"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const axios_1 = tslib_1.__importDefault(require("axios"));
const fs_1 = require("fs");
const form_data_1 = tslib_1.__importDefault(require("form-data"));
const https = tslib_1.__importStar(require("https"));
axios_1.default.defaults.httpsAgent = new https.Agent();
class questionnaire_upd extends core_1.Command {
    async run() {
        let data; // type annotation to specify the type of the variable
        try {
            const { flags } = await this.parse(questionnaire_upd);
            const file = (0, fs_1.createReadStream)(flags.source);
            const formData = new form_data_1.default();
            formData.append('file', file);
            if (flags.format === 'csv') {
                const response = await axios_1.default.post('http://localhost:9103/intelliq_api/questionnaire_upd?format=csv', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                data = response.data;
            }
            else {
                const response = await axios_1.default.post('http://localhost:9103/intelliq_api/questionnaire_upd', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                data = response.data;
            }
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = questionnaire_upd;
questionnaire_upd.description = 'returns the answers of given questionnaireID and session';
questionnaire_upd.flags = {
    // flag with a value (-n, --name=VALUE)
    format: core_1.Flags.string({
        options: ['json', 'csv'],
        required: true,
        default: 'json',
    }),
    source: core_1.Flags.string({
        required: true,
        description: 'the file to upload to the server'
    })
};