import { GraphQLSchema, GraphQLUnionType } from 'graphql';
import { Union } from '../types';
export declare function transformUnion(schema: GraphQLSchema, union: GraphQLUnionType): Union;
