import { GraphQLScalarType, GraphQLSchema } from 'graphql';
import { Scalar } from '../types';
export declare function transformScalar(schema: GraphQLSchema, scalar: GraphQLScalarType): Scalar;
