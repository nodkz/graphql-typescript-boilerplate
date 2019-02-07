import { CLIOptions } from './old-cli-config';
import { Types } from 'graphql-codegen-core';
export declare type YamlCliFlags = {
    config: string;
    watch: boolean;
} & Partial<CLIOptions>;
export declare function createConfig(argv?: string[]): Types.Config | never;
