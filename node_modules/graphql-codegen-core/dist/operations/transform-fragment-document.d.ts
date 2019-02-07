import { FragmentDefinitionNode, GraphQLSchema } from 'graphql';
import { Fragment } from '../types';
export declare function transformFragment(schema: GraphQLSchema, fragment: FragmentDefinitionNode, overrideName?: string | null): Fragment;
