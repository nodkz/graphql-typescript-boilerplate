'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTokenAtPosition = undefined;

var _SchemaParser = require('./SchemaParser');

var _SchemaParser2 = _interopRequireDefault(_SchemaParser);

var _getTokenAtPosition2 = require('../../shared/getTokenAtPosition');

var _getTokenAtPosition3 = _interopRequireDefault(_getTokenAtPosition2);

require('../../shared/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTokenAtPosition = exports.getTokenAtPosition = function getTokenAtPosition(sourceText, position) {
  var parser = new _SchemaParser2.default();
  return (0, _getTokenAtPosition3.default)(parser, sourceText, position);
};
exports.default = getTokenAtPosition;