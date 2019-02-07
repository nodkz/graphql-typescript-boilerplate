'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTokenAtPosition = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getTokenAtPosition2 = require('../../shared/getTokenAtPosition');

var _getTokenAtPosition3 = _interopRequireDefault(_getTokenAtPosition2);

require('../_shared/types');

require('../../shared/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import RelayQLParser from './shared/Parser';
function newParser(parserConfig) {
  var _parserConfig = typeof parserConfig === 'string' ? [parserConfig] : parserConfig;

  var _parserConfig2 = (0, _slicedToArray3.default)(_parserConfig, 2),
      name = _parserConfig2[0],
      opts = _parserConfig2[1];
  // $FlowDisableNextLine


  var Parser = require('./Parsers/' + name).default;
  return new Parser(opts);
}
var getTokenAtPosition = exports.getTokenAtPosition = function getTokenAtPosition(sourceText, position, parserConfig) {
  var parser = newParser(parserConfig);
  var token = (0, _getTokenAtPosition3.default)(parser, sourceText, position);
  return token;
};
exports.default = getTokenAtPosition;