import { Types } from 'graphql-codegen-core';
export declare function isOutputConfigArray(type: any): type is Types.OutputConfig[];
export declare function isConfiguredOutput(type: any): type is Types.ConfiguredOutput;
export declare function normalizeOutputParam(config: Types.OutputConfig | Types.ConfiguredOutput): Types.ConfiguredOutput;
export declare function normalizeInstanceOrArray<T>(type: T | T[]): T[];
export declare function normalizeConfig(config: Types.OutputConfig): Types.ConfiguredPlugin[];
