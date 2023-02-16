import { Command } from '@oclif/core';
export default class doanswer extends Command {
    static description: string;
    static flags: {
        format: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        questionnaire_id: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        question_id: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        session_id: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        option_id: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    run(): Promise<void>;
}
