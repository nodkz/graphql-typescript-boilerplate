'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddedLanguageParser = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmbeddedLanguageParser = function () {
  function EmbeddedLanguageParser(opts) {
    var _this = this;

    (0, _classCallCheck3.default)(this, EmbeddedLanguageParser);
    this._languageParser = null;

    this._resetToStartState = function (state) {
      // clear state [without loosing reference]
      (0, _keys2.default)(state).forEach(function (key) {
        delete state[key];
      });

      (0, _assign2.default)(state, _this.startState());
    };

    this.startState = function () {
      return { rule: [] };
    };

    this._opts = opts;

    this._startRegex = new RegExp(opts.startMatch);
    this._endRegex = new RegExp('^' + opts.endMatch);
  } // note language parser is set only when inside

  (0, _createClass3.default)(EmbeddedLanguageParser, [{
    key: 'token',
    value: function token(stream, state) {
      var Parser = this._opts.Parser;

      // match

      if (!this._languageParser) {
        // console.log(this._startRegex);
        var match = stream._sourceText.substring(stream.getCurrentPosition()).match(this._startRegex);
        if (!match) {
          //
          stream._start = stream._pos; // exclude previous token
          stream.skipToEnd();
          return 'ws-2';
        }

        if (match) {
          // push language parser
          // console.log('push', stream._sourceText.substring(stream.getCurrentPosition()));
          stream.skipTo(stream.getCurrentPosition() + match.index + match[0].length);
          // console.log('[start] push lanaguage parser', {
          //   peek: `[${stream.peek()}]`,
          //   remaining: stream._sourceText.substring(stream.getCurrentPosition()),
          // });
          this._languageParser = new Parser();
          (0, _assign2.default)(state, this._languageParser.startState());
          return 'ws-2';
        }
      }

      // if language parser set
      if (this._languageParser) {
        // console.log(`peek [${stream.peek()}]`);
        if (stream.match(this._endRegex)) {
          // pop language parser
          // console.log('pop');
          this._languageParser = null;
          this._resetToStartState(state, this.startState());
          return 'ws-2';
        }
        // use language parser to parse
        // $FlowIssue
        return this._languageParser.token(stream, state);
      }

      return null;
    }
  }]);
  return EmbeddedLanguageParser;
}();
/* global Class */


exports.default = EmbeddedLanguageParser;
exports.EmbeddedLanguageParser = EmbeddedLanguageParser;