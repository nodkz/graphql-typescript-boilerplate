import { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { Operation } from '../types';
export declare function transformOperation(schema: GraphQLSchema, operationNode: OperationDefinitionNode, overrideName?: string | null): Operation;
