import { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { Variable } from '../types';
export declare function transformVariables(schema: GraphQLSchema, definitionNode: OperationDefinitionNode): Variable[];
