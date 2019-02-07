"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFieldNode(node) {
    return node['name'] !== undefined && node['selectionSet'] !== undefined && node['type'] !== undefined;
}
exports.isFieldNode = isFieldNode;
function isFragmentSpreadNode(node) {
    return node['fragmentName'] !== undefined;
}
exports.isFragmentSpreadNode = isFragmentSpreadNode;
function isInlineFragmentNode(node) {
    return node['selectionSet'] !== undefined && node['onType'] !== undefined;
}
exports.isInlineFragmentNode = isInlineFragmentNode;
// tslint:disable-next-line:variable-name
exports.EInputType = {
    SINGLE_FILE: 'SINGLE_FILE',
    MULTIPLE_FILES: 'MULTIPLE_FILES',
    PROJECT: 'PROJECT'
};
function isCustomProcessingFunction(config) {
    return typeof config === 'function';
}
exports.isCustomProcessingFunction = isCustomProcessingFunction;
function isGeneratorConfig(config) {
    return typeof config !== 'function' && !!config.inputType;
}
exports.isGeneratorConfig = isGeneratorConfig;
//# sourceMappingURL=types.js.map