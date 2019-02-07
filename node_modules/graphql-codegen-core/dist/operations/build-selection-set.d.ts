import { SelectionSetItem } from '../types';
import { GraphQLSchema, GraphQLType, SelectionSetNode } from 'graphql';
export declare function separateSelectionSet(selectionSet: SelectionSetItem[]): any;
export declare function buildSelectionSet(schema: GraphQLSchema, rootObject: GraphQLType, node: SelectionSetNode): SelectionSetItem[];
