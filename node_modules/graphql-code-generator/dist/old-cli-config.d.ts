import { Types } from 'graphql-codegen-core';
export interface CLIOptions {
    schema?: string;
    clientSchema?: string;
    args?: string[];
    template?: string;
    project?: string;
    out?: string;
    header?: string[];
    skipSchema?: any;
    skipDocuments?: any;
    config?: string;
    require?: string[];
    overwrite?: boolean;
    watch?: boolean;
    silent?: boolean;
    mergeSchema?: string;
    exitOnError?: boolean;
    templateConfig?: {
        [key: string]: any;
    };
}
export declare const initCLI: (args: any) => CLIOptions;
export declare const validateCliOptions: (options: CLIOptions) => void;
export declare function createConfigFromOldCli(options: CLIOptions): Types.Config;
