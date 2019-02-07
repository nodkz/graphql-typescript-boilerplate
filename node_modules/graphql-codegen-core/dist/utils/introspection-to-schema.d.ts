import { GraphQLSchema, IntrospectionQuery } from 'graphql';
export declare const validateIntrospection: (schema: IntrospectionQuery) => void;
export declare function introspectionToGraphQLSchema(introspectionQuery: IntrospectionQuery): GraphQLSchema;
