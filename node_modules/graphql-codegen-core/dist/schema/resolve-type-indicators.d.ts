import { GraphQLNamedType } from 'graphql';
export interface NamedTypeIndicators {
    isType: boolean;
    isScalar: boolean;
    isInterface: boolean;
    isUnion: boolean;
    isInputType: boolean;
    isEnum: boolean;
}
export declare function resolveTypeIndicators(namedType: GraphQLNamedType): NamedTypeIndicators;
