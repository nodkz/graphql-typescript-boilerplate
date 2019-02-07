'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _definition = require('graphql/type/definition');

require('graphql/language/ast');

var _directives = require('graphql/type/directives');

var _find = require('graphql/jsutils/find');

var _find2 = _interopRequireDefault(_find);

var _invariant = require('graphql/jsutils/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _typeComparators = require('graphql/utilities/typeComparators');

var _GQLError = require('../../shared/GQLError');

var _PlaceholderTypes = require('./PlaceholderTypes');

var _getNamedTypeNode = require('./getNamedTypeNode');

var _getNamedTypeNode2 = _interopRequireDefault(_getNamedTypeNode);

var _GQLTypes = require('../../shared/GQLTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Note this is modified version of original GQLSchema
 *  1) Return Array<Errors> instead of throwing on first error.
 */

var _GQLSchema = function () {
  function _GQLSchema(config) {
    var _this = this;

    (0, _classCallCheck3.default)(this, _GQLSchema);
    this._typeMap = {};
    this._errors = [];

    this._queryType = config.query;
    this._mutationType = config.mutation;
    this._subscriptionType = config.subscription;
    this._directives = config.directives || _directives.specifiedDirectives;
    this._implementations = {};
    this._nodeMap = config.nodeMap;

    // Build type map now to detect any errors within this schema.
    var types = config.types || [];

    // create typeMap and implementations map
    types.forEach(function (type) {
      if (type) {
        _this._typeMap[type.name] = type;
      }
      // // NOTE: dont remove type.getFields()
      // // calling to resolve thunks which will add more errors
      // // also wrapping in try catch to suppress errors thrown inside getFields function
      // // errors thrown by getFields is already handle while creating schema from AST
      if (type.getFields) {
        try {
          // $FlowDisableNextLine
          type.getFields(); // resolve thunk
        } catch (e) {} // eslint-disable-line no-empty
      }

      if (type instanceof _GQLTypes.GQLObjectType) {
        (function () {
          var _type = type;
          type.getInterfaces().forEach(function (iface) {
            var impls = _this._implementations[iface.name];
            if (impls) {
              impls.push(_type);
            } else {
              _this._implementations[iface.name] = [_type];
            }
          });
        })();
      }
    });

    // validate GQLObjectType correctly implements interfaces
    (0, _keys2.default)(this._typeMap).forEach(function (typeName) {
      var type = _this._typeMap[typeName];
      if (type instanceof _GQLTypes.GQLObjectType) {
        type.getInterfaces().forEach(function (iface) {
          var _errors;

          (_errors = _this._errors).push.apply(_errors, (0, _toConsumableArray3.default)(assertObjectImplementsInterface(_this, type, iface)));
        });
      }
    });
  }

  (0, _createClass3.default)(_GQLSchema, [{
    key: 'getQueryType',
    value: function getQueryType() {
      return this._queryType;
    }
  }, {
    key: 'getMutationType',
    value: function getMutationType() {
      return this._mutationType;
    }
  }, {
    key: 'getSubscriptionType',
    value: function getSubscriptionType() {
      return this._subscriptionType;
    }
  }, {
    key: 'getTypeMap',
    value: function getTypeMap() {
      return this._typeMap;
    }
  }, {
    key: 'getType',
    value: function getType(name) {
      return this.getTypeMap()[name];
    }
  }, {
    key: 'getTypeNode',
    value: function getTypeNode(name) {
      return this._nodeMap[name];
    }
  }, {
    key: 'getTypeDependents',
    value: function getTypeDependents(name) {
      var type = this.getType(name);
      if (type) {
        return type.dependents || [];
      }
      return [];
    }
  }, {
    key: 'getPossibleTypes',
    value: function getPossibleTypes(abstractType) {
      if (abstractType instanceof _GQLTypes.GQLUnionType) {
        return abstractType.getTypes();
      }
      (0, _invariant2.default)(abstractType instanceof _GQLTypes.GQLInterfaceType);
      return this._implementations[abstractType.name];
    }
  }, {
    key: 'isPossibleType',
    value: function isPossibleType(abstractType, possibleType) {
      var possibleTypeMap = this._possibleTypeMap;
      if (!possibleTypeMap) {
        possibleTypeMap = (0, _create2.default)(null);
        this._possibleTypeMap = possibleTypeMap;
      }

      if (!possibleTypeMap[abstractType.name]) {
        var possibleTypes = this.getPossibleTypes(abstractType);
        (0, _invariant2.default)(Array.isArray(possibleTypes), 'Could not find possible implementing types for ' + abstractType.name + ' ' + 'in schema. Check that schema.types is defined and is an array of ' + 'all possible types in the schema.');
        possibleTypeMap[abstractType.name] = possibleTypes.reduce(function (map, type) {
          return map[type.name] = true, map;
        }, // eslint-disable-line
        (0, _create2.default)(null));
      }

      return Boolean(possibleTypeMap[abstractType.name][possibleType.name]);
    }
  }, {
    key: 'getDirectives',
    value: function getDirectives() {
      return this._directives;
    }
  }, {
    key: 'getDirective',
    value: function getDirective(name) {
      return (0, _find2.default)(this.getDirectives(), function (directive) {
        return directive.name === name;
      });
    }
  }]);
  return _GQLSchema;
}();

exports.default = _GQLSchema;


function assertObjectImplementsInterface(schema, object, iface) {
  if (iface === _PlaceholderTypes.PLACEHOLDER_TYPES.interfaceType) {
    return [];
  }

  var objectFieldMap = object.getFields();

  var ifaceFieldMap = iface.getFields();

  var missingFields = [];
  var errors = [];

  // Assert each interface field is implemented.
  (0, _keys2.default)(ifaceFieldMap).forEach(function (fieldName) {
    var objectField = objectFieldMap[fieldName];
    var ifaceField = ifaceFieldMap[fieldName];

    if (!objectField) {
      missingFields.push(ifaceField);
      return;
    }

    // Assert interface field type is satisfied by object field type, by being
    // a valid subtype. (covariant)
    if (!(0, _typeComparators.isTypeSubTypeOf)(schema, objectField.type, ifaceField.type)) {
      errors.push((0, _GQLError.newGQLError)(iface.name + '.' + fieldName + ' expects type "' + String(ifaceField.type) + '" ' + 'but ' + (object.name + '.' + fieldName + ' provides type "' + String(objectField.type) + '".'), [(0, _getNamedTypeNode2.default)(objectField.node.type)], _GQLError.SEVERITY.error));
    }

    // Assert each interface field arg is implemented.
    ifaceField.args.forEach(function (ifaceArg) {
      var argName = ifaceArg.name;
      var objectArg = (0, _find2.default)(objectField.args, function (arg) {
        return arg.name === argName;
      });

      // Assert interface field arg exists on object field.
      if (!objectArg) {
        errors.push((0, _GQLError.newGQLError)(iface.name + '.' + fieldName + ' expects argument "' + argName + '" but ' + (object.name + '.' + fieldName + ' does not provide it.'), [objectField.node], _GQLError.SEVERITY.error));
        return;
      }

      // Assert interface field arg type matches object field arg type.
      // (invariant)
      if (!(0, _typeComparators.isEqualType)(ifaceArg.type, objectArg.type)) {
        errors.push((0, _GQLError.newGQLError)(iface.name + '.' + fieldName + '(' + argName + ':) expects type ' + ('"' + String(ifaceArg.type) + '" but ') + (object.name + '.' + fieldName + '(' + argName + ':) provides type ') + ('"' + String(objectArg.type) + '".'), [(0, _getNamedTypeNode2.default)(objectArg.node.type)], _GQLError.SEVERITY.error));
      }
    });

    // Assert additional arguments must not be required.
    objectField.args.forEach(function (objectArg) {
      var argName = objectArg.name;
      var ifaceArg = (0, _find2.default)(ifaceField.args, function (arg) {
        return arg.name === argName;
      });
      if (!ifaceArg && objectArg.type instanceof _definition.GraphQLNonNull) {
        errors.push((0, _GQLError.newGQLError)(object.name + '.' + fieldName + '(' + argName + ':) is of required type ' + ('"' + String(objectArg.type) + '" but is not also provided by the ') + ('interface ' + iface.name + '.' + fieldName + '.'), [objectArg.node], _GQLError.SEVERITY.error));
      }
    });
  });

  if (missingFields.length > 0) {
    errors.push((0, _GQLError.newGQLError)('Missing interface fields [' + missingFields.map(function (field) {
      return field.name;
    }).join(', ') + ']', [object.node], _GQLError.SEVERITY.error));
  }

  return errors;
}