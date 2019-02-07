'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

exports.buildASTSchema = buildASTSchema;
exports.getDescription = getDescription;

var _find = require('graphql/jsutils/find');

var _find2 = _interopRequireDefault(_find);

var _invariant = require('graphql/jsutils/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _keyValMap = require('graphql/jsutils/keyValMap');

var _keyValMap2 = _interopRequireDefault(_keyValMap);

var _valueFromAST = require('graphql/utilities/valueFromAST');

var _lexer = require('graphql/language/lexer');

var _values = require('graphql/execution/values');

var _kinds = require('graphql/language/kinds');

require('graphql/language/ast');

var _GQLSchema = require('./GQLSchema');

var _GQLSchema2 = _interopRequireDefault(_GQLSchema);

var _getNamedTypeNode = require('./getNamedTypeNode');

var _getNamedTypeNode2 = _interopRequireDefault(_getNamedTypeNode);

var _GQLTypes = require('../../shared/GQLTypes');

var _definition = require('graphql/type/definition');

require('graphql/type/directives');

var _GQLError = require('../../shared/GQLError');

var _PlaceholderTypes = require('./PlaceholderTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {
//   __Schema,
//   __Directive,
//   __DirectiveLocation,
//   __Type,
//   __Field,
//   __InputValue,
//   __EnumValue,
//   __TypeKind,
// } from 'graphql/type/introspection';

function buildWrappedType(innerType, inputTypeAST) {
  if (inputTypeAST.kind === _kinds.LIST_TYPE) {
    return new _definition.GraphQLList(buildWrappedType(innerType, inputTypeAST.type));
  }
  if (inputTypeAST.kind === _kinds.NON_NULL_TYPE) {
    var wrappedType = buildWrappedType(innerType, inputTypeAST.type);
    (0, _invariant2.default)(!(wrappedType instanceof _definition.GraphQLNonNull), 'No nesting nonnull.');
    return new _definition.GraphQLNonNull(wrappedType);
  }
  return innerType;
}
/* eslint-disable no-use-before-define */
/**
 * NOTE: patched version
 */
function buildASTSchema( // eslint-disable-line complexity
ast) {
  var schemaDef = null;
  var errors = [];
  var typeDefs = [];
  var nodeMap = (0, _create2.default)(null);
  var nodeMapWithAllReferences = (0, _create2.default)(null);
  var directiveDefs = [];

  for (var i = 0; i < ast.definitions.length; i += 1) {
    var d = ast.definitions[i];
    switch (d.kind) {
      case _kinds.SCHEMA_DEFINITION:
        if (schemaDef) {
          errors.push((0, _GQLError.newGQLError)('Must provide only one schema definition.', [schemaDef, d], _GQLError.SEVERITY.error));
        }
        schemaDef = d;
        break;
      case _kinds.SCALAR_TYPE_DEFINITION:
      case _kinds.OBJECT_TYPE_DEFINITION:
      case _kinds.INTERFACE_TYPE_DEFINITION:
      case _kinds.ENUM_TYPE_DEFINITION:
      case _kinds.UNION_TYPE_DEFINITION:
      case _kinds.INPUT_OBJECT_TYPE_DEFINITION:
        {
          var _name = d.name.value;
          if (!nodeMap[_name]) {
            typeDefs.push(d);
            nodeMap[_name] = d;
          }
          //  storing all reference to detect multiple defintition with same name
          if (!nodeMapWithAllReferences[_name]) {
            nodeMapWithAllReferences[_name] = [];
          }
          nodeMapWithAllReferences[_name].push(d);
          break;
        }
      case _kinds.DIRECTIVE_DEFINITION:
        directiveDefs.push(d);
        break;
      default:
    }
  }

  // error for multi same name typeDef
  (0, _keys2.default)(nodeMapWithAllReferences).forEach(function (name) {
    if (nodeMapWithAllReferences[name].length > 1) {
      errors.push((0, _GQLError.newGQLError)('Schema must contain unique named types but contains multiple types named "' + name + '".', nodeMapWithAllReferences[name].map(function (typeDefAST) {
        return typeDefAST.name;
      }), _GQLError.SEVERITY.error));
    }
  });

  var queryTypeName = null;
  var mutationTypeName = null;
  var subscriptionTypeName = null;

  if (schemaDef) {
    schemaDef.operationTypes.forEach(function (operationType) {
      var typeName = operationType.type.name.value;
      if (operationType.operation === 'query') {
        queryTypeName = typeName;
      } else if (operationType.operation === 'mutation') {
        mutationTypeName = typeName;
      } else if (operationType.operation === 'subscription') {
        subscriptionTypeName = typeName;
      }
    });
  } else {
    if (nodeMap.Query) {
      queryTypeName = 'Query';
    }
    if (nodeMap.Mutation) {
      mutationTypeName = 'Mutation';
    }
    if (nodeMap.Subscription) {
      subscriptionTypeName = 'Subscription';
    }
  }

  if (!queryTypeName) {
    errors.push((0, _GQLError.newGQLError)('Must provide schema definition with query type or a type named Query.', null, _GQLError.SEVERITY.error));
  }

  var innerTypeMap = {
    String: _GQLTypes.GQLString,
    Int: _GQLTypes.GQLInt,
    Float: _GQLTypes.GQLFloat,
    Boolean: _GQLTypes.GQLBoolean,
    ID: _GQLTypes.GQLID
  };

  var types = typeDefs.map(function (def) {
    return typeDefNamed(def.name.value, def);
  }).filter(Boolean);

  // Adding default types
  types.push(innerTypeMap.String, innerTypeMap.Int, innerTypeMap.Float, innerTypeMap.Boolean, innerTypeMap.ID);

  // directives
  var directives = directiveDefs.map(getDirective);

  // If specified directives were not explicitly declared, add them.
  if (!directives.some(function (directive) {
    return directive.name === 'skip';
  })) {
    directives.push(_GQLTypes.GQLSkipDirective);
  }

  if (!directives.some(function (directive) {
    return directive.name === 'include';
  })) {
    directives.push(_GQLTypes.GQLIncludeDirective);
  }

  if (!directives.some(function (directive) {
    return directive.name === 'deprecated';
  })) {
    directives.push(_GQLTypes.GQLDeprecatedDirective);
  }

  var schema = new _GQLSchema2.default({
    query: queryTypeName ? getObjectType(nodeMap[queryTypeName]) : null,
    mutation: mutationTypeName ? getObjectType(nodeMap[mutationTypeName]) : null,
    subscription: subscriptionTypeName ? getObjectType(nodeMap[subscriptionTypeName]) : null,
    types: types,
    directives: directives,
    nodeMap: nodeMap
  });

  return { schema: schema, errors: [].concat(errors, (0, _toConsumableArray3.default)(schema._errors)) };

  function getDirective(directiveNode) {
    return new _GQLTypes.GQLDirective(directiveNode, {
      name: directiveNode.name.value,
      description: getDescription(directiveNode),
      locations: directiveNode.locations.map(function (node) {
        return node.value;
      }),
      args: directiveNode.arguments && makeInputValues(directiveNode.arguments)
    });
  }

  function getObjectType(typeNode) {
    var type = typeDefNamed(typeNode.name.value, typeNode);

    if (!(type instanceof _definition.GraphQLObjectType)) {
      errors.push((0, _GQLError.newGQLError)('AST must provide object type.', [typeNode], _GQLError.SEVERITY.error));
    }

    return type;
  }

  function typeDefNamed(typeName, node) {
    if (innerTypeMap[typeName]) {
      if (innerTypeMap[typeName].dependents) {
        innerTypeMap[typeName].dependents.push(node);
      }
      return innerTypeMap[typeName];
    }

    if (!nodeMap[typeName]) {
      // NOT found
      errors.push((0, _GQLError.newGQLError)('Type "' + typeName + '" not found.', [node], _GQLError.SEVERITY.error));
      return null;
    }

    var innerTypeDef = makeSchemaDef(nodeMap[typeName]);
    innerTypeDef.node = nodeMap[typeName]; // add location info
    innerTypeMap[typeName] = innerTypeDef;
    return innerTypeDef;
  }

  // function isProducedAlready(typeNode: TypeNode) {
  //   return Boolean(innerTypeMap[getNamedTypeNode(typeNode).name.value]);
  // }

  function produceType(typeNode, defaultValue) {
    var namedTypeNode = (0, _getNamedTypeNode2.default)(typeNode);
    var typeName = namedTypeNode.name.value;
    var typeDef = typeDefNamed(typeName, namedTypeNode) || defaultValue(typeName);
    return buildWrappedType(typeDef, typeNode);
  }

  function produceInputType(typeNode) {
    var type = produceType(typeNode, _PlaceholderTypes.PLACEHOLDER_TYPES.inputType);
    if (!(0, _definition.isInputType)(type)) {
      errors.push((0, _GQLError.newGQLError)('Expected Input type.', [(0, _getNamedTypeNode2.default)(typeNode)], _GQLError.SEVERITY.error));
    }
    return type;
  }

  function produceOutputType(typeNode) {
    var type = produceType(typeNode, _PlaceholderTypes.PLACEHOLDER_TYPES.outputType);
    if (!(0, _definition.isOutputType)(type)) {
      errors.push((0, _GQLError.newGQLError)('Expected Output type.', [(0, _getNamedTypeNode2.default)(typeNode)], _GQLError.SEVERITY.error));
    }
    return type;
  }

  function produceObjectType(typeNode) {
    var type = produceType(typeNode, _PlaceholderTypes.PLACEHOLDER_TYPES.objectType);
    if (!(type instanceof _definition.GraphQLObjectType)) {
      errors.push((0, _GQLError.newGQLError)('Expected Object type.', [(0, _getNamedTypeNode2.default)(typeNode)], _GQLError.SEVERITY.error));
    }
    return type;
  }

  function produceInterfaceType(typeNode) {
    var type = produceType(typeNode, _PlaceholderTypes.PLACEHOLDER_TYPES.interfaceType);
    if (!(type instanceof _definition.GraphQLInterfaceType)) {
      errors.push((0, _GQLError.newGQLError)('Expected Interface type.', [(0, _getNamedTypeNode2.default)(typeNode)], _GQLError.SEVERITY.error));
    }
    return type;
  }

  function makeSchemaDef(def) {
    if (!def) {
      throw new Error('def must be defined');
    }
    switch (def.kind) {
      case _kinds.OBJECT_TYPE_DEFINITION:
        return makeTypeDef(def);
      case _kinds.INTERFACE_TYPE_DEFINITION:
        return makeInterfaceDef(def);
      case _kinds.ENUM_TYPE_DEFINITION:
        return makeEnumDef(def);
      case _kinds.UNION_TYPE_DEFINITION:
        return makeUnionDef(def);
      case _kinds.SCALAR_TYPE_DEFINITION:
        return makeScalarDef(def);
      case _kinds.INPUT_OBJECT_TYPE_DEFINITION:
        return makeInputObjectDef(def);
      default:
        throw new Error('Type kind "' + def.kind + '" not supported.');
    }
  }

  function makeTypeDef(def) {
    var typeName = def.name.value;
    return new _GQLTypes.GQLObjectType(def, {
      name: typeName,
      description: getDescription(def),
      fields: function fields() {
        return makeFieldDefMap(def);
      },
      interfaces: function interfaces() {
        return makeImplementedInterfaces(def);
      }
    });
  }

  function makeFieldDefMap(def) {
    return (0, _keyValMap2.default)(def.fields, function (field) {
      return field.name.value;
    }, function (field) {
      return {
        type: produceOutputType(field.type),
        node: field,
        description: getDescription(field),
        args: makeInputValues(field.arguments),
        deprecationReason: getDeprecationReason(field.directives)
      };
    });
  }

  function makeImplementedInterfaces(def) {
    return def.interfaces && def.interfaces.map(function (iface) {
      return produceInterfaceType(iface);
    });
  }

  function makeInputValues(values) {
    return (0, _keyValMap2.default)(values, function (value) {
      return value.name.value;
    }, function (value) {
      var type = produceInputType(value.type);
      return {
        type: type,
        node: value,
        description: getDescription(value),
        defaultValue: (0, _valueFromAST.valueFromAST)(value.defaultValue, type)
      };
    });
  }

  function makeInterfaceDef(def) {
    var typeName = def.name.value;
    return new _GQLTypes.GQLInterfaceType(def, {
      name: typeName,
      description: getDescription(def),
      fields: function fields() {
        return makeFieldDefMap(def);
      },
      resolveType: cannotExecuteSchema
    });
  }

  function makeEnumDef(def) {
    var enumType = new _GQLTypes.GQLEnumType(def, {
      name: def.name.value,
      description: getDescription(def),
      values: (0, _keyValMap2.default)(def.values, function (enumValue) {
        return enumValue.name.value;
      }, function (enumValue) {
        return {
          description: getDescription(enumValue),
          deprecationReason: getDeprecationReason(enumValue.directives),
          node: enumValue
        };
      })
    });

    return enumType;
  }

  function makeUnionDef(def) {
    return new _GQLTypes.GQLUnionType(def, {
      name: def.name.value,
      description: getDescription(def),
      types: def.types.map(function (t) {
        return produceObjectType(t);
      }),
      resolveType: cannotExecuteSchema
    });
  }

  function makeScalarDef(def) {
    return new _GQLTypes.GQLScalarType(def, {
      name: def.name.value,
      description: getDescription(def),
      serialize: function serialize() {
        return null;
      },
      // Note: validation calls the parse functions to determine if a
      // literal value is correct. Returning null would cause use of custom
      // scalars to always fail validation. Returning false causes them to
      // always pass validation.
      parseValue: function parseValue() {
        return false;
      },
      parseLiteral: function parseLiteral() {
        return false;
      }
    });
  }

  function makeInputObjectDef(def) {
    return new _GQLTypes.GQLInputObjectType(def, {
      name: def.name.value,
      description: getDescription(def),
      fields: function fields() {
        return makeInputValues(def.fields);
      }
    });
  }
}

function getDeprecationReason(directives) {
  var deprecatedAST = directives && (0, _find2.default)(directives, function (directive) {
    return directive.name.value === _GQLTypes.GQLDeprecatedDirective.name;
  });
  if (!deprecatedAST) {
    return null;
  }

  var _getArgumentValues = (0, _values.getArgumentValues)(_GQLTypes.GQLDeprecatedDirective, deprecatedAST),
      reason = _getArgumentValues.reason;

  return reason;
}

/**
 * Given an ast node, returns its string description based on a contiguous
 * block full-line of comments preceding it.
 */
function getDescription(node) {
  var loc = node.loc;

  if (!loc) {
    return null;
  }
  var comments = [];
  var minSpaces = null;
  var token = loc.startToken.prev;
  while (token && token.kind === _lexer.TokenKind.COMMENT && token.next && token.prev && token.line + 1 === token.next.line && token.line !== token.prev.line) {
    var value = String(token.value);
    var spaces = leadingSpaces(value);
    if (minSpaces === null || spaces < minSpaces) {
      minSpaces = spaces;
    }
    comments.push(value);
    token = token.prev;
  }
  return comments.reverse().map(function (comment) {
    return comment.slice(minSpaces);
  }).join('\n');
}

// Count the number of spaces on the starting side of a string.
function leadingSpaces(str) {
  var i = 0;
  for (; i < str.length; i += 1) {
    if (str[i] !== ' ') {
      break;
    }
  }
  return i;
}

function cannotExecuteSchema() {
  throw new Error('Generated Schema cannot use Interface or Union types for execution.');
}