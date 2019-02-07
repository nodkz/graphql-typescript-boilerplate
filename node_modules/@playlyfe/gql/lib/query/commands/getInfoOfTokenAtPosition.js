'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfoOfTokenAtPosition = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

require('../../shared/types');

var _GQLTypes = require('../../shared/GQLTypes');

var _getTypeInfo = require('../_shared/getTypeInfo');

var _getTypeInfo2 = _interopRequireDefault(_getTypeInfo);

require('../../config/GQLConfig');

var _getTokenAtPosition = require('../_shared/getTokenAtPosition');

var _createRelaySchema = require('../_shared/createRelaySchema');

var _createRelaySchema2 = _interopRequireDefault(_createRelaySchema);

var _debug = require('../../shared/debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getInfoOfTokenAtPosition( // eslint-disable-line complexity
_schema, sourceText, position, config) {
  // console.log('getDef', sourceText, position);
  _debug2.default.time('getTokenAtPosition');
  var token = (0, _getTokenAtPosition.getTokenAtPosition)(sourceText, position, config.parser);
  _debug2.default.timeEnd('getTokenAtPosition');

  if (!token) {
    return null;
  }

  var state = token.state;
  var kind = state.kind,
      step = state.step;

  var schema = config.isRelay ? (0, _createRelaySchema2.default)(_schema) : _schema;
  var typeInfo = (0, _getTypeInfo2.default)(schema, state);

  // console.log(kind, step, typeInfo, 'state\n\n', state);

  if (kind === 'NamedType' && step === 0 || kind === 'TypeCondition' && step === 1 || // fragment on TypeName <----
  kind === 'Mutation' && step === 0 || // ----> mutation { }
  kind === 'Subscription' && step === 0 || // ----> subscription {  }
  kind === 'Query' && step === 0 // ----> query xyz { xyz }
  ) {
      if (typeInfo.type) {
        var type = (0, _GQLTypes.getNamedType)(typeInfo.type);
        if (type) {
          return { contents: [type.print()] };
        }
      }
      return null;
    }

  if (kind === 'Field' || kind === 'AliasedField') {
    var _ret = function () {
      if (!typeInfo.fieldDef) {
        return {
          v: null
        };
      }
      var fieldDef = typeInfo.fieldDef;

      var contents = [];

      contents.push(fieldDef.print());

      if (typeInfo.parentType && (typeInfo.parentType.name === 'Mutation' || typeInfo.parentType.name === 'Subscription')) {
        // include input args type
        fieldDef.args.forEach(function (arg) {
          var argType = (0, _GQLTypes.getNamedType)(arg.type);
          if (argType) {
            contents.push(argType.print());
          }
        });
      }

      // include type full definition
      var type = (0, _GQLTypes.getNamedType)(fieldDef.type);
      if (type) {
        contents.push(type.print());
      }

      return {
        v: { contents: contents }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
  }

  if (kind === 'Argument') {
    var argDef = typeInfo.argDef;

    if (argDef) {
      var contents = [];
      contents.push(argDef.print());
      var _type = (0, _GQLTypes.getNamedType)(argDef.type);
      if (_type) {
        contents.push(_type.print());
      }

      return { contents: contents };
    }
  }

  if (kind === 'ObjectField') {
    if (typeInfo.objectFieldDefs) {
      var objectField = typeInfo.objectFieldDef;
      var _contents = [];
      if (objectField) {
        _contents.push(objectField.print());
        var _type2 = (0, _GQLTypes.getNamedType)(objectField.type);
        if (_type2) {
          _contents.push(_type2.print());
        }
      }
      return { contents: _contents };
    }
  }

  if (kind === 'Directive' && step === 1) {
    if (typeInfo.directiveDef) {
      return {
        contents: [typeInfo.directiveDef.print()]
      };
    }
  }

  return null;
}
exports.getInfoOfTokenAtPosition = getInfoOfTokenAtPosition;