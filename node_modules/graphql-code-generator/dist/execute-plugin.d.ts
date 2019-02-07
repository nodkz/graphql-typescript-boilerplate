import { Types, DocumentFile, CodegenPlugin } from 'graphql-codegen-core';
import { DocumentNode } from 'graphql';
export interface ExecutePluginOptions {
    name: string;
    config: Types.PluginConfig;
    schema: DocumentNode;
    documents: DocumentFile[];
    outputFilename: string;
    allPlugins: Types.ConfiguredPlugin[];
}
export declare function getPluginByName(name: string, pluginLoader: Types.PluginLoaderFn): Promise<CodegenPlugin>;
export declare function executePlugin(options: ExecutePluginOptions, pluginPackage: CodegenPlugin): Promise<string>;
