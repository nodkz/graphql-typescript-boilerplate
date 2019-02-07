"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var graphql_tools_1 = require("graphql-tools");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var graphql_1 = require("./__generated__/graphql");
var context_1 = require("./context");
exports.prepareContext = context_1.prepareContext;
var resolvers = merge_graphql_schemas_1.mergeResolvers(merge_graphql_schemas_1.fileLoader(path_1.join(__dirname, './**/*.resolvers.*')));
var schema = graphql_tools_1.makeExecutableSchema({ typeDefs: graphql_1.typeDefs, resolvers: resolvers });
exports.schema = schema;
//# sourceMappingURL=index.js.map