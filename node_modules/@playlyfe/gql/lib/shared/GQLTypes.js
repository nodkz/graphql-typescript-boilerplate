'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GQLInputObjectType = exports.GQLEnumType = exports.GQLUnionType = exports.GQLInterfaceType = exports.GQLObjectType = exports.GQLScalarType = exports.GQLDeprecatedDirective = exports.GQLSkipDirective = exports.GQLIncludeDirective = exports.GQLDirective = exports.TypeNameMetaFieldDef = exports.TypeMetaFieldDef = exports.SchemaMetaFieldDef = exports.GQLBoolean = exports.GQLFloat = exports.GQLString = exports.GQLID = exports.GQLInt = exports.typeName = undefined;

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.getNamedType = getNamedType;
exports.printDescription = printDescription;

var _type = require('graphql/type');

var _schemaPrinter = require('graphql/utilities/schemaPrinter');

var _keyBy2 = require('lodash/keyBy');

var _keyBy3 = _interopRequireDefault(_keyBy2);

require('graphql/language/ast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */

var typeName = exports.typeName = {
  GQLObjectType: 'Object',
  GQLInputObjectType: 'Input',
  GQLEnumType: 'Enum',

  GQLScalarType: 'Scalar',
  GraphQLScalarType: 'Scalar', // native scalar types

  GQLInterfaceType: 'Interface',
  GQLUnionType: 'Union'
};

function memoize(fn) {
  var result = null;
  // $FlowDisableNextLine
  return function () {
    if (result) {
      return result;
    }
    // $FlowDisableNextLine
    result = fn.apply(undefined, arguments);
    return result;
  };
}

function getNamedType(type) {
  return (0, _type.getNamedType)(type);
}

function printDescription(description) {
  return description ? '# ' + description : '';
}

function print(node, description, type) {
  var defn = '';
  if (node && node.loc && node.loc.source && node.loc.source.body) {
    defn = node.loc.source.body.substr(node.loc.start, node.loc.end - node.loc.start);
  }
  return [printDescription(description), type ? '(' + type + ') ' + defn : defn].filter(Boolean).join('\n');
}

function patchFields(fields) {
  return (0, _keys2.default)(fields).map(function (name) {
    var field = fields[name];
    field.print = memoize(function () {
      return print(field.node, field.description, 'field');
    });
    field.args = field.args.map(function (arg, index) {
      return (0, _extends3.default)({}, arg, {
        node: field.node.arguments[index],
        print: memoize(function () {
          return print(field.node.arguments[index], arg.description, 'argument');
        })
      });
    });
    return field;
  });
}

function patchInputFields(fields) {
  (0, _keys2.default)(fields).forEach(function (name) {
    var field = fields[name];
    field.print = memoize(function () {
      return print(field.node, field.description, 'field');
    });
  });
}

var GQLInt = exports.GQLInt = _type.GraphQLInt;
GQLInt.print = function () {
  return printDescription(_type.GraphQLInt.description);
};

var GQLID = exports.GQLID = _type.GraphQLID;
GQLID.print = function () {
  return printDescription(_type.GraphQLID.description);
};

var GQLString = exports.GQLString = _type.GraphQLString;
GQLString.print = function () {
  return printDescription(_type.GraphQLString.description);
};

var GQLFloat = exports.GQLFloat = _type.GraphQLFloat;
GQLFloat.print = function () {
  return printDescription(GQLFloat.description);
};

var GQLBoolean = exports.GQLBoolean = _type.GraphQLBoolean;
GQLBoolean.print = function () {
  return printDescription(GQLBoolean.description);
};

var _map = [_type.SchemaMetaFieldDef, _type.TypeMetaFieldDef, _type.TypeNameMetaFieldDef].map(function (field) {
  var type = getNamedType(field.type);
  type.print = memoize(function () {
    return (0, _schemaPrinter.printType)(type);
  });

  return (0, _extends3.default)({}, field, {
    print: memoize(function () {
      // HACK: graphql doesnt expose printField method
      // so creating fake type and printing it and extracting field string
      var printedType = (0, _schemaPrinter.printType)(new _type.GraphQLObjectType({
        name: 'Demo',
        fields: {
          FIELD_NAME: (0, _extends3.default)({}, field, {
            args: Array.isArray(field.args) ? (0, _keyBy3.default)(field.args, 'name') : field.args
          })
        }
      })).replace('FIELD_NAME', '(meta-field) ' + field.name);

      var lines = printedType.split('\n');
      return lines.slice(1, lines.length - 1) // remove first and last line which is type we need field only
      .map(function (line) {
        return line.trim();
      }).join('\n');
    })
  });
}),
    _map2 = (0, _slicedToArray3.default)(_map, 3),
    SchemaMetaFieldDef = _map2[0],
    TypeMetaFieldDef = _map2[1],
    TypeNameMetaFieldDef = _map2[2];

exports.SchemaMetaFieldDef = SchemaMetaFieldDef;
exports.TypeMetaFieldDef = TypeMetaFieldDef;
exports.TypeNameMetaFieldDef = TypeNameMetaFieldDef;


function printArg(arg) {
  var indentation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return ['' + indentation + printDescription(arg.description), '' + indentation + arg.name + ': ' + arg.type.toString()].filter(function (val) {
    return val && val.trim();
  }).join('\n');
}

function printArgs(args) {
  if (args.length === 0) {
    return '';
  }

  var argsStr = args.map(function (arg) {
    return printArg(arg, '  ');
  }).join('\n');

  return '(\n' + argsStr + '\n)';
}

var GQLDirective = exports.GQLDirective = function (_GraphQLDirective) {
  (0, _inherits3.default)(GQLDirective, _GraphQLDirective);

  function GQLDirective(node, config) {
    (0, _classCallCheck3.default)(this, GQLDirective);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GQLDirective.__proto__ || (0, _getPrototypeOf2.default)(GQLDirective)).call(this, config));

    _this.print = memoize(function () {
      if (_this.node) {
        return print(_this.node, _this.description);
      }
      return [printDescription(_this.description), 'directive @' + _this.name + printArgs(_this.args), '  on ' + _this.locations.join('\n   | ')].filter(function (val) {
        return val;
      }).join('\n');
    });

    _this.node = node;
    _this.args = _this.args.map(function (arg, index) {
      return (0, _extends3.default)({}, arg, {
        node: _this.node ? node.arguments[index] : null,
        print: memoize(function () {
          return printArg(arg);
        })
      });
    });
    return _this;
  }
  // $FlowDisableNextLine


  return GQLDirective;
}(_type.GraphQLDirective);

function reduceArgs(args) {
  return args.reduce(function (acc, arg) {
    acc[arg.name] = arg;
    return acc;
  }, {});
}

var GQLIncludeDirective = exports.GQLIncludeDirective = new GQLDirective(null, {
  name: _type.GraphQLIncludeDirective.name,
  description: _type.GraphQLIncludeDirective.description,
  locations: _type.GraphQLIncludeDirective.locations,
  args: reduceArgs(_type.GraphQLIncludeDirective.args)
});
var GQLSkipDirective = exports.GQLSkipDirective = new GQLDirective(null, {
  name: _type.GraphQLSkipDirective.name,
  description: _type.GraphQLSkipDirective.description,
  locations: _type.GraphQLSkipDirective.locations,
  args: reduceArgs(_type.GraphQLSkipDirective.args)
});
var GQLDeprecatedDirective = exports.GQLDeprecatedDirective = new GQLDirective(null, {
  name: _type.GraphQLDeprecatedDirective.name,
  description: _type.GraphQLDeprecatedDirective.description,
  locations: _type.GraphQLDeprecatedDirective.locations,
  args: reduceArgs(_type.GraphQLDeprecatedDirective.args)
});

var GQLScalarType = exports.GQLScalarType = function (_GraphQLScalarType) {
  (0, _inherits3.default)(GQLScalarType, _GraphQLScalarType);

  function GQLScalarType(node, config) {
    (0, _classCallCheck3.default)(this, GQLScalarType);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (GQLScalarType.__proto__ || (0, _getPrototypeOf2.default)(GQLScalarType)).call(this, config));

    _this2.dependents = [];
    _this2.print = memoize(function () {
      return print(_this2.node, _this2.description);
    });

    _this2.node = node;
    return _this2;
  }

  return GQLScalarType;
}(_type.GraphQLScalarType);

var GQLObjectType = exports.GQLObjectType = function (_GraphQLObjectType) {
  (0, _inherits3.default)(GQLObjectType, _GraphQLObjectType);

  function GQLObjectType(node, config) {
    (0, _classCallCheck3.default)(this, GQLObjectType);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (GQLObjectType.__proto__ || (0, _getPrototypeOf2.default)(GQLObjectType)).call(this, config));

    _this3.dependents = [];
    _this3.print = memoize(function () {
      return print(_this3.node, _this3.description);
    });

    _this3.node = node;
    return _this3;
  }

  (0, _createClass3.default)(GQLObjectType, [{
    key: 'getInterfaces',
    value: function getInterfaces() {
      return (0, _get3.default)(GQLObjectType.prototype.__proto__ || (0, _getPrototypeOf2.default)(GQLObjectType.prototype), 'getInterfaces', this).call(this);
    }
  }, {
    key: 'getFields',
    value: function getFields() {
      if (this._fields) {
        return this._fields;
      }
      var _fields = (0, _get3.default)(GQLObjectType.prototype.__proto__ || (0, _getPrototypeOf2.default)(GQLObjectType.prototype), 'getFields', this).call(this);
      patchFields(_fields);
      return _fields;
    }
  }]);
  return GQLObjectType;
}(_type.GraphQLObjectType);

var GQLInterfaceType = exports.GQLInterfaceType = function (_GraphQLInterfaceType) {
  (0, _inherits3.default)(GQLInterfaceType, _GraphQLInterfaceType);

  function GQLInterfaceType(node, config) {
    (0, _classCallCheck3.default)(this, GQLInterfaceType);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (GQLInterfaceType.__proto__ || (0, _getPrototypeOf2.default)(GQLInterfaceType)).call(this, config));

    _this4.dependents = [];
    _this4.print = memoize(function () {
      return print(_this4.node, _this4.description);
    });

    _this4.node = node;
    return _this4;
  }

  (0, _createClass3.default)(GQLInterfaceType, [{
    key: 'getFields',
    value: function getFields() {
      if (this._fields) {
        return this._fields;
      }
      var _fields = (0, _get3.default)(GQLInterfaceType.prototype.__proto__ || (0, _getPrototypeOf2.default)(GQLInterfaceType.prototype), 'getFields', this).call(this);
      patchFields(_fields);
      return _fields;
    }
  }]);
  return GQLInterfaceType;
}(_type.GraphQLInterfaceType);

var GQLUnionType = exports.GQLUnionType = function (_GraphQLUnionType) {
  (0, _inherits3.default)(GQLUnionType, _GraphQLUnionType);

  function GQLUnionType(node, config) {
    (0, _classCallCheck3.default)(this, GQLUnionType);

    var _this5 = (0, _possibleConstructorReturn3.default)(this, (GQLUnionType.__proto__ || (0, _getPrototypeOf2.default)(GQLUnionType)).call(this, config));

    _this5.dependents = [];
    _this5.print = memoize(function () {
      return print(_this5.node, _this5.description);
    });

    _this5.node = node;
    return _this5;
  }

  return GQLUnionType;
}(_type.GraphQLUnionType);

var GQLEnumType = exports.GQLEnumType = function (_GraphQLEnumType) {
  (0, _inherits3.default)(GQLEnumType, _GraphQLEnumType);

  function GQLEnumType(node, config) {
    (0, _classCallCheck3.default)(this, GQLEnumType);

    var _this6 = (0, _possibleConstructorReturn3.default)(this, (GQLEnumType.__proto__ || (0, _getPrototypeOf2.default)(GQLEnumType)).call(this, config));

    _this6.dependents = [];
    _this6.print = memoize(function () {
      return print(_this6.node, _this6.description);
    });

    _this6.node = node;
    return _this6;
  }

  return GQLEnumType;
}(_type.GraphQLEnumType);

var GQLInputObjectType = exports.GQLInputObjectType = function (_GraphQLInputObjectTy) {
  (0, _inherits3.default)(GQLInputObjectType, _GraphQLInputObjectTy);

  function GQLInputObjectType(node, config) {
    (0, _classCallCheck3.default)(this, GQLInputObjectType);

    var _this7 = (0, _possibleConstructorReturn3.default)(this, (GQLInputObjectType.__proto__ || (0, _getPrototypeOf2.default)(GQLInputObjectType)).call(this, config));

    _this7.dependents = [];
    _this7.print = memoize(function () {
      return print(_this7.node, _this7.description);
    });

    _this7.node = node;
    return _this7;
  }

  (0, _createClass3.default)(GQLInputObjectType, [{
    key: 'getFields',
    value: function getFields() {
      if (this._fields) {
        return this._fields;
      }
      var fields = (0, _get3.default)(GQLInputObjectType.prototype.__proto__ || (0, _getPrototypeOf2.default)(GQLInputObjectType.prototype), 'getFields', this).call(this);
      patchInputFields(fields);
      return fields;
    }
  }]);
  return GQLInputObjectType;
}(_type.GraphQLInputObjectType);