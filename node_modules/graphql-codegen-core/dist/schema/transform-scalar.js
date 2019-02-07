"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debugging_1 = require("../debugging");
var get_directives_1 = require("../utils/get-directives");
function transformScalar(schema, scalar) {
    debugging_1.debugLog("[transformInterface] transformed custom scalar " + scalar.name);
    var directives = get_directives_1.getDirectives(schema, scalar);
    return {
        name: scalar.name,
        description: scalar.description || '',
        directives: directives,
        usesDirectives: Object.keys(directives).length > 0
    };
}
exports.transformScalar = transformScalar;
//# sourceMappingURL=transform-scalar.js.map