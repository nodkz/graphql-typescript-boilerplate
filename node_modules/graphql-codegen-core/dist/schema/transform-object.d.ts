import { GraphQLInputObjectType, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { Type } from '../types';
export declare function transformGraphQLObject(schema: GraphQLSchema, object: GraphQLObjectType | GraphQLInputObjectType): Type;
