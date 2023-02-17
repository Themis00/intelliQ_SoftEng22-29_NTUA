import { Command } from '@oclif/core';
export default class questionnaireupd extends Command {
    static description: string;
    static flags: {
        format: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        source: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    run(): Promise<void>;
}
