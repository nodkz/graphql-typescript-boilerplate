"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debugging_1 = require("../debugging");
var get_directives_1 = require("../utils/get-directives");
function transformUnion(schema, union) {
    debugging_1.debugLog("[transformUnion] transformed union " + union.name);
    var directives = get_directives_1.getDirectives(schema, union);
    return {
        name: union.name,
        description: union.description || '',
        possibleTypes: union.getTypes().map(function (type) { return type.name; }),
        directives: directives,
        usesDirectives: Object.keys(directives).length > 0
    };
}
exports.transformUnion = transformUnion;
//# sourceMappingURL=transform-union.js.map