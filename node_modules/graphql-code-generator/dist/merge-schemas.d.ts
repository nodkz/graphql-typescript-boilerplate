import { GraphQLSchema, DocumentNode } from 'graphql';
export declare function mergeSchemas(schemas: Array<string | GraphQLSchema | DocumentNode>): DocumentNode;
export declare function buildSchema(node: DocumentNode): GraphQLSchema;
