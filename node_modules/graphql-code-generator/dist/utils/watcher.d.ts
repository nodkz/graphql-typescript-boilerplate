import { FileOutput, Types } from 'graphql-codegen-core';
export declare const createWatcher: (config: Types.Config, onNext: (result: FileOutput[]) => Promise<FileOutput[]>) => Promise<{}>;
