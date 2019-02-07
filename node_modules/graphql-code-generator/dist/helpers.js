"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isOutputConfigArray(type) {
    return Array.isArray(type);
}
exports.isOutputConfigArray = isOutputConfigArray;
function isConfiguredOutput(type) {
    return typeof type === 'object' && type['plugins'];
}
exports.isConfiguredOutput = isConfiguredOutput;
function normalizeOutputParam(config) {
    if (isOutputConfigArray(config)) {
        return {
            documents: [],
            schema: [],
            plugins: config
        };
    }
    else if (isConfiguredOutput(config)) {
        return config;
    }
    else {
        throw new Error("Invalid \"generates\" config!");
    }
}
exports.normalizeOutputParam = normalizeOutputParam;
function normalizeInstanceOrArray(type) {
    if (Array.isArray(type)) {
        return type;
    }
    else if (!type) {
        return [];
    }
    return [type];
}
exports.normalizeInstanceOrArray = normalizeInstanceOrArray;
function normalizeConfig(config) {
    var _a;
    if (typeof config === 'string') {
        return [(_a = {}, _a[config] = {}, _a)];
    }
    else if (Array.isArray(config)) {
        return config.map(function (plugin) {
            var _a;
            return (typeof plugin === 'string' ? (_a = {}, _a[plugin] = {}, _a) : plugin);
        });
    }
    else if (typeof config === 'object') {
        return Object.keys(config).reduce(function (prev, pluginName) {
            var _a;
            return prev.concat([(_a = {}, _a[pluginName] = config[pluginName], _a)]);
        }, []);
    }
    else {
        return [];
    }
}
exports.normalizeConfig = normalizeConfig;
//# sourceMappingURL=helpers.js.map