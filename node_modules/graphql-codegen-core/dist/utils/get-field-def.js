"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
function getFieldDef(parentType, fieldAST) {
    var name = fieldAST.name.value;
    if (name === '__typename') {
        return null;
    }
    if (parentType instanceof graphql_1.GraphQLObjectType || parentType instanceof graphql_1.GraphQLInterfaceType) {
        return parentType.getFields()[name];
    }
    return null;
}
exports.getFieldDef = getFieldDef;
//# sourceMappingURL=get-field-def.js.map