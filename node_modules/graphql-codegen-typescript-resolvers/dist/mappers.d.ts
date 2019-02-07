/// <reference types="handlebars" />
import { Field, Type } from 'graphql-codegen-core';
import { GraphQLNamedType } from 'graphql';
export interface ParentsMap {
    [key: string]: string;
}
export interface Mapper {
    isExternal: boolean;
    type: string;
    source?: string;
}
export declare function parseMapper(mapper: string): Mapper;
export declare function pickMapper(entity: string, map: ParentsMap, options: Handlebars.HelperOptions): Mapper | undefined;
export declare function useDefaultMapper(entity: Field | Type | GraphQLNamedType, options: Handlebars.HelperOptions): Mapper | undefined;
