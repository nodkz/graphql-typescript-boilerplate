import ts from 'typescript';
import { Extra } from './temp-types-based-on-js-source';
declare const _default: (ast: ts.SourceFile, extra: Extra, shouldProvideParserServices: boolean) => {
    estree: any;
    astMaps: {
        esTreeNodeToTSNodeMap: WeakMap<object, any>;
        tsNodeToESTreeNodeMap: WeakMap<object, any>;
    } | undefined;
};
export default _default;
