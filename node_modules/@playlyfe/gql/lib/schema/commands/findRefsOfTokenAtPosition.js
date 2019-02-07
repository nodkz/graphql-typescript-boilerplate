'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRefsOfTokenAtPosition = undefined;

var _getTokenAtPosition = require('../_shared/getTokenAtPosition');

require('../../shared/types');

require('../../shared/GQLTypes');

var _getDefLocationForNode = require('../../shared/getDefLocationForNode');

var _getDefLocationForNode2 = _interopRequireDefault(_getDefLocationForNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import printTokenState from '../../shared/printTokenState';

function findRefsOfTokenAtPosition(schema, sourceText, position) {
  // console.log('getDef', sourceText, position);
  // console.time('getDef');
  // console.time('getTokenAtPosition');
  var token = (0, _getTokenAtPosition.getTokenAtPosition)(sourceText, position);
  // console.timeEnd('getTokenAtPosition');
  // console.log('token', token);
  if (!token) {
    return [];
  }

  var state = token.state;


  if (state.kind.endsWith('Def') || state.kind === 'NamedType' || state.kind === 'UnionMember' && state.step === 1 || // union Type = Type1 | Type2<------
  state.kind === 'Implements' && state.step === 1) {
    var name = state.name;

    var type = schema.getType(name);
    if (type) {
      var locations = type.dependents.concat(type.node && type.node.name) // include definition also
      .map(_getDefLocationForNode2.default).filter(function (defLocation) {
        return Boolean(defLocation);
      });
      // 'any' Flow not able to detect we are filtering nul values
      return locations;
    }
  }
  return [];
}

exports.findRefsOfTokenAtPosition = findRefsOfTokenAtPosition;
exports.default = findRefsOfTokenAtPosition;