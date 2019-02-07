"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var resolvers = {
    Date: new graphql_1.GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize: function (value) {
            return new Date(value).toISOString().slice(0, 10);
        },
        parseValue: function (value) {
            return new Date(value);
        },
        parseLiteral: function (ast) {
            if (ast.kind === graphql_1.Kind.INT) {
                return new Date(ast.value);
            }
            return null;
        },
    }),
};
exports.default = resolvers;
//# sourceMappingURL=global.resolvers.js.map