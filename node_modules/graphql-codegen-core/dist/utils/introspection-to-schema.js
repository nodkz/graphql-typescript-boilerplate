"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.validateIntrospection = function (schema) {
    if (!schema.__schema) {
        throw new Error('Invalid schema provided!');
    }
};
function introspectionToGraphQLSchema(introspectionQuery) {
    exports.validateIntrospection(introspectionQuery);
    return graphql_1.buildClientSchema(introspectionQuery);
}
exports.introspectionToGraphQLSchema = introspectionToGraphQLSchema;
//# sourceMappingURL=introspection-to-schema.js.map