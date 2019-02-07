'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toOffset;

require('./types');

var _splitLines = require('./splitLines');

var _splitLines2 = _interopRequireDefault(_splitLines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toOffset(sourceText, position) {
  var offset = 0;
  (0, _splitLines2.default)(sourceText).find(function (line, index) {
    if (position.line === index + 1) {
      offset += position.column;
      return true; // to break
    }
    offset += line.length + 1; // 1 for end of line
    return false;
  });
  return offset;
}