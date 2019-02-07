import { GraphQLDirective, GraphQLSchema } from 'graphql';
import { Directive } from '../types';
export declare function transformDirectives(schema: GraphQLSchema, directives: ReadonlyArray<GraphQLDirective>): Directive[];
