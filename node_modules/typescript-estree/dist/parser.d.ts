import ts from 'typescript';
import { Program } from './estree/spec';
import { ESTreeComment, ESTreeToken, ParserOptions } from './temp-types-based-on-js-source';
declare type AST<T extends ParserOptions> = Program & (T['range'] extends true ? {
    range: [number, number];
} : {}) & (T['tokens'] extends true ? {
    tokens: ESTreeToken[];
} : {}) & (T['comment'] extends true ? {
    comments: ESTreeComment[];
} : {});
export { AST_NODE_TYPES } from './ast-node-types';
export { version };
declare const version: any;
export declare function parse<T extends ParserOptions = ParserOptions>(code: string, options?: T): AST<T>;
export declare function parseAndGenerateServices(code: string, options: ParserOptions): {
    ast: Program;
    services: {
        program: ts.Program | undefined;
        esTreeNodeToTSNodeMap: WeakMap<object, any> | undefined;
        tsNodeToESTreeNodeMap: WeakMap<object, any> | undefined;
    };
};
