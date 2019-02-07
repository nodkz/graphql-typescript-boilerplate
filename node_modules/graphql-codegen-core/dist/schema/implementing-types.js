"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
function getImplementingTypes(interfaceName, schema) {
    var allTypesMap = schema.getTypeMap();
    var result = [];
    for (var _i = 0, _a = Object.values(allTypesMap); _i < _a.length; _i++) {
        var graphqlType = _a[_i];
        if (graphqlType instanceof graphql_1.GraphQLObjectType) {
            var allInterfaces = graphqlType.getInterfaces();
            if (allInterfaces.find(function (int) { return int.name === interfaceName; })) {
                result.push(graphqlType.name);
            }
        }
    }
    return result;
}
exports.getImplementingTypes = getImplementingTypes;
//# sourceMappingURL=implementing-types.js.map