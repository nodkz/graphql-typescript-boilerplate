import { GraphQLEnumType, GraphQLSchema } from 'graphql';
import { Enum } from '../types';
export declare function transformGraphQLEnum(schema: GraphQLSchema, graphqlEnum: GraphQLEnumType): Enum;
