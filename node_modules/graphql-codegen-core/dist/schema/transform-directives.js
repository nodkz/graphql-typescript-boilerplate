"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var resolve_arguments_1 = require("./resolve-arguments");
function transformDirectives(schema, directives) {
    return directives.map(function (directive) {
        var args = resolve_arguments_1.resolveArguments(schema, directive.args);
        var locations = directive.locations || [];
        return {
            name: directive.name,
            description: directive.description || '',
            hasArguments: args.length > 0,
            arguments: args,
            locations: locations,
            onFragmentSpread: locations.includes(graphql_1.DirectiveLocation.FRAGMENT_SPREAD),
            onInlineFragment: locations.includes(graphql_1.DirectiveLocation.INLINE_FRAGMENT),
            onQuery: locations.includes(graphql_1.DirectiveLocation.QUERY),
            onMutation: locations.includes(graphql_1.DirectiveLocation.MUTATION),
            onSubscription: locations.includes(graphql_1.DirectiveLocation.SUBSCRIPTION),
            onFragment: locations.includes(graphql_1.DirectiveLocation.FRAGMENT_SPREAD),
            onField: locations.includes(graphql_1.DirectiveLocation.FIELD),
            onSchema: locations.includes(graphql_1.DirectiveLocation.SCHEMA),
            onScalar: locations.includes(graphql_1.DirectiveLocation.SCALAR),
            onFieldDefinition: locations.includes(graphql_1.DirectiveLocation.FIELD_DEFINITION),
            onEnum: locations.includes(graphql_1.DirectiveLocation.ENUM),
            onEnumValue: locations.includes(graphql_1.DirectiveLocation.ENUM_VALUE),
            onObject: locations.includes(graphql_1.DirectiveLocation.OBJECT),
            onInputObject: locations.includes(graphql_1.DirectiveLocation.INPUT_OBJECT),
            onInputField: locations.includes(graphql_1.DirectiveLocation.INPUT_FIELD_DEFINITION),
            onArgument: locations.includes(graphql_1.DirectiveLocation.ARGUMENT_DEFINITION),
            onInterface: locations.includes(graphql_1.DirectiveLocation.INTERFACE),
            onUnion: locations.includes(graphql_1.DirectiveLocation.UNION)
        };
    });
}
exports.transformDirectives = transformDirectives;
//# sourceMappingURL=transform-directives.js.map