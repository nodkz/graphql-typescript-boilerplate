import { FileOutput, DocumentFile, Types } from 'graphql-codegen-core';
import { DocumentNode } from 'graphql';
export interface GenerateOutputOptions {
    filename: string;
    plugins: Types.ConfiguredPlugin[];
    schema: DocumentNode;
    documents: DocumentFile[];
    pluginLoader: Types.PluginLoaderFn;
    inheritedConfig: {
        [key: string]: any;
    };
}
export declare function executeCodegen(config: Types.Config): Promise<FileOutput[]>;
export declare function generateOutput(options: GenerateOutputOptions): Promise<FileOutput>;
