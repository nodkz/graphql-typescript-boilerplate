'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefinitionAtPosition = undefined;

require('../../shared/types');

var _getTokenAtPosition = require('../_shared/getTokenAtPosition');

var _getDefLocationForNode = require('../../shared/getDefLocationForNode');

var _getDefLocationForNode2 = _interopRequireDefault(_getDefLocationForNode);

var _getTypeInfo = require('../_shared/getTypeInfo');

var _getTypeInfo2 = _interopRequireDefault(_getTypeInfo);

require('../_shared/types');

var _GQLTypes = require('../../shared/GQLTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefinitionAtPosition(schema, sourceText, position, parserConfig) {
  // console.log('getDef', sourceText, position);
  // console.time('getDef');
  // console.time('getTokenAtPosition');
  var token = (0, _getTokenAtPosition.getTokenAtPosition)(sourceText, position, parserConfig);
  // console.timeEnd('getTokenAtPosition');
  // console.log('token', token);
  if (!token) {
    return undefined;
  }

  var state = token.state;
  // console.time('typeInfo');

  var typeInfo = (0, _getTypeInfo2.default)(schema, state);
  // console.timeEnd('typeInfo');
  // console.log(state, printTokenState(state));

  // console.log(state.kind, state.step, typeInfo);

  if (state.kind === 'NamedType' && state.step === 0 || state.kind === 'TypeCondition' && state.step === 1 || // fragment on TypeName <----
  state.kind === 'Mutation' && state.step === 0 || // ----> mutation { }
  state.kind === 'Subscription' && state.step === 0 || // ----> subscription { }
  state.kind === 'Query' && state.step === 0 // ----> query xyz { xyz }
  ) {
      if (typeInfo.type) {
        var type = (0, _GQLTypes.getNamedType)(typeInfo.type);
        if (type) {
          return (0, _getDefLocationForNode2.default)(type.node);
        }
      }
      return null;
    }

  if (state.kind === 'Field' || state.kind === 'AliasedField') {
    // const node = typeInfo.fieldDef.node;
    if (typeInfo.fieldDef) {
      return (0, _getDefLocationForNode2.default)(typeInfo.fieldDef.node);
    }
    return null;
  }

  if (state.kind === 'Argument') {
    var argDef = typeInfo.argDef;

    if (argDef) {
      return (0, _getDefLocationForNode2.default)(argDef.node);
    }
  }

  if (state.kind === 'ObjectField') {
    var objectField = typeInfo.objectFieldDef;
    if (objectField) {
      return (0, _getDefLocationForNode2.default)(objectField.node);
    }
    return null;
  }

  if (state.kind === 'Directive' && state.step === 1) {
    var directiveDef = typeInfo.directiveDef;

    if (directiveDef) {
      return (0, _getDefLocationForNode2.default)(directiveDef.node);
    }
  }

  return null;
}
// import printTokenState from '../shared/printTokenState';
exports.getDefinitionAtPosition = getDefinitionAtPosition;
exports.default = getDefinitionAtPosition;