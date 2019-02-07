import { Types, DocumentFile } from 'graphql-codegen-core';
import { GraphQLSchema, DocumentNode } from 'graphql';
export declare const loadSchema: (schemaDef: Types.Schema, config: Types.Config) => Promise<DocumentNode | GraphQLSchema>;
export declare const loadDocuments: (documentDef: Types.OperationDocument, config: Types.Config) => Promise<DocumentFile[]>;
