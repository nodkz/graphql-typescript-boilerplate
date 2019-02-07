'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefinitionAtPosition = undefined;

require('../../shared/types');

require('../../shared/GQLTypes');

var _getTokenAtPosition = require('../_shared/getTokenAtPosition');

var _getDefLocationForNode = require('../../shared/getDefLocationForNode');

var _getDefLocationForNode2 = _interopRequireDefault(_getDefLocationForNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefinitionAtPosition(schema, sourceText, position) {
  // console.log('getDef', sourceText, position);
  // console.time('getDef');
  // console.time('getTokenAtPosition');
  var token = (0, _getTokenAtPosition.getTokenAtPosition)(sourceText, position);
  // console.timeEnd('getTokenAtPosition');
  // console.log('token', token);
  if (!token) {
    return null;
  }

  var state = token.state;

  // console.log(state.kind, state.step);

  if (state.kind === 'NamedType' || state.kind === 'UnionDef' && state.step === 4 || // union Type = Type1<-----
  state.kind === 'UnionMember' && state.step === 1 || // union Type = Type1 | Type2<------
  state.kind === 'Implements' && state.step === 1) {
    var name = state.name;

    var type = schema.getType(name);
    if (type) {
      return (0, _getDefLocationForNode2.default)(type.node);
    }
  }
  return null;
}

exports.getDefinitionAtPosition = getDefinitionAtPosition;