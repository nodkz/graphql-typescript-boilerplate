'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTokenAtPosition;

require('./types');

var _invariant = require('graphql/jsutils/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _whileSafe = require('./whileSafe');

var _whileSafe2 = _interopRequireDefault(_whileSafe);

var _printTokenState = require('./printTokenState');

var _printTokenState2 = _interopRequireDefault(_printTokenState);

var _MultilineCharacterStream = require('./MultilineCharacterStream');

var _MultilineCharacterStream2 = _interopRequireDefault(_MultilineCharacterStream);

var _toOffset = require('./toOffset');

var _toOffset2 = _interopRequireDefault(_toOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-loop-func */
function getTokenAtPosition(parser, _sourceText, position) {
  var sourceText = _sourceText ? _sourceText : ' ';
  var state = parser.startState();
  var offset = (0, _toOffset2.default)(sourceText, position);
  var stream = new _MultilineCharacterStream2.default(sourceText);

  var style = '';

  if (offset === 0) {
    // for first character
    style = parser.token(stream, state);
  } else {
    (0, _whileSafe2.default)({
      condition: function condition() {
        return stream.getCurrentPosition() < offset;
      },
      call: function call() {
        style = parser.token(stream, state);
        // if (style === 'js-frag') {
        // console.log(
        //   `position: ${stream.getCurrentPosition()}`,
        //   `start: ${stream.getStartOfToken()}`,
        //   `style: [${style}] token: [${stream.current()}] \n`,
        //   // 'state: ', state, '\n', printTokenState(state),
        // );
        // }
      },
      logOnInfiniteLoop: function logOnInfiniteLoop() {
        console.log('style: [' + style + '] token: [' + stream.current() + '] \n', 'state: ', state, '\n', (0, _printTokenState2.default)(state));
      }
    }, sourceText.length);
  }

  (0, _invariant2.default)(style, 'expected style should have some value');
  (0, _invariant2.default)(stream, 'expected stream should have some value');

  var pos = Math.min(stream.getCurrentPosition(), offset - 1);

  return {
    start: stream.getStartOfToken(),
    end: stream.getCurrentPosition(),
    string: stream.current(),
    prevChar: stream._sourceText.charAt(pos - 1),
    state: state,
    style: style
  };
}