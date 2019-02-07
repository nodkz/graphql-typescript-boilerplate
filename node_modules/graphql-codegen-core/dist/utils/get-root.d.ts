import { GraphQLObjectType, GraphQLSchema, OperationDefinitionNode } from 'graphql';
export declare const getRoot: (schema: GraphQLSchema, operation: OperationDefinitionNode) => void | GraphQLObjectType;
