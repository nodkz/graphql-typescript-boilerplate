'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.NoUnusedTypeDefinition = NoUnusedTypeDefinition;

var _error = require('graphql/error');

var _GQLTypes = require('../../../../shared/GQLTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoUnusedTypeDefinition(context) {
  var usedTypes = {};

  return {
    Document: {
      enter: function enter() {
        usedTypes = {
          Mutation: true,
          Query: true,
          String: true,
          Int: true,
          Float: true,
          ID: true,
          Boolean: true
        };
      },
      leave: function leave() {
        var schema = context.getSchema();
        var types = schema.getTypeMap();
        var unusedTypes = (0, _keys2.default)(types).filter(function (typeName) {
          var type = types[typeName];
          if (type instanceof _GQLTypes.GQLObjectType && type.getInterfaces().length > 0) {
            // ignore object types which implements interfaces
            // as it is possible there is no direct reference of type
            // but there is reference of interface it implements
            // (e.g interface Node and all types which implements Node)
            return false;
          }
          return !usedTypes[typeName];
        });
        unusedTypes.forEach(function (typeName) {
          context.reportError(new _error.GraphQLError('Unused type definition \'' + typeName + '\'', [schema.getTypeNode(typeName)]));
        });
      }
    },

    NamedType: function NamedType(node) {
      usedTypes[node.name.value] = true; // visited
    }
  };
}