'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultilineCharacterStream = function () {
  function MultilineCharacterStream(sourceText) {
    (0, _classCallCheck3.default)(this, MultilineCharacterStream);
    this._start = 0;
    this._pos = 0;

    this._sourceText = sourceText;
  }

  (0, _createClass3.default)(MultilineCharacterStream, [{
    key: 'getStartOfToken',
    value: function getStartOfToken() {
      return this._start;
    }
  }, {
    key: 'getCurrentPosition',
    value: function getCurrentPosition() {
      return this._pos;
    }
  }, {
    key: 'getRemainingText',
    value: function getRemainingText() {
      return this._sourceText.substring(this._pos);
    }
  }, {
    key: '_testNextCharacter',
    value: function _testNextCharacter(pattern) {
      var character = this._sourceText.charAt(this._pos);
      if (typeof pattern === 'string') {
        return character === pattern;
      }
      return pattern.test ? pattern.test(character) : pattern(character);
    }
  }, {
    key: 'eol',
    value: function eol() {
      var char = this.peek();
      // console.log('eol', char);
      return !char || char === '\n';
    }
  }, {
    key: 'sol',
    value: function sol() {
      var prevChar = this._sourceText.charAt(this._pos - 1);
      // console.log('sol', prevChar);
      return !prevChar || prevChar === '\n';
    }
  }, {
    key: 'peek',
    value: function peek() {
      return this._sourceText.charAt(this._pos) ? this._sourceText.charAt(this._pos) : null;
    }
  }, {
    key: 'next',
    value: function next() {
      var char = this._sourceText.charAt(this._pos);
      this._pos += 1;
      return char;
    }
  }, {
    key: 'eat',
    value: function eat(pattern) {
      var isMatched = this._testNextCharacter(pattern);
      if (isMatched) {
        this._start = this._pos;
        this._pos += 1;
        return this._sourceText.charAt(this._pos - 1);
      }
      return undefined;
    }
  }, {
    key: 'eatWhile',
    value: function eatWhile(match) {
      var isMatched = this._testNextCharacter(match);
      var didEat = false;

      // If a match, treat the total upcoming matches as one token
      if (isMatched) {
        didEat = isMatched;
        this._start = this._pos;
      }

      while (isMatched) {
        this._pos += 1;
        isMatched = this._testNextCharacter(match);
        didEat = true;
      }

      return didEat;
    }
  }, {
    key: 'eatSpace',
    value: function eatSpace() {
      return this.eatWhile(/[\s\u00a0]/);
    }
  }, {
    key: 'skipToEnd',
    value: function skipToEnd() {
      this._pos = this._sourceText.length;
    }
  }, {
    key: 'skipTo',
    value: function skipTo(position) {
      this._pos = position;
    }
  }, {
    key: 'match',
    value: function match(pattern) {
      var consume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var caseFold = arguments[2];

      var token = null;
      var match = null;

      switch (typeof pattern === 'undefined' ? 'undefined' : (0, _typeof3.default)(pattern)) {
        case 'string':
          {
            var regex = new RegExp(pattern, caseFold ? 'i' : '');
            match = regex.test(this._sourceText.substr(this._pos, pattern.length));
            token = pattern;
            break;
          }
        case 'object': // RegExp
        case 'function':
          {
            match = this._sourceText.slice(this._pos).match(pattern);
            token = match && match[0];
            break;
          }
        default:
          console.error('invalid type');
          break;
      }

      if (match && (typeof pattern === 'string' || match.index === 0)) {
        if (consume) {
          this._start = this._pos;
          this._pos += token.length;
        }
        return match;
      }

      // No match available.
      return false;
    }
  }, {
    key: 'backUp',
    value: function backUp(num) {
      this._pos -= num;
    }
  }, {
    key: 'column',
    value: function column() {
      return this._pos;
    }
  }, {
    key: 'indentation',
    value: function indentation() {
      var match = this._sourceText.match(/\s*/);
      var indent = 0;
      if (match && match.index === 0) {
        var _match = (0, _slicedToArray3.default)(match, 1),
            whitespaces = _match[0];

        var pos = 0;
        while (whitespaces.length > pos) {
          if (whitespaces.charCodeAt(pos) === 9) {
            indent += 2;
          } else {
            indent += 1;
          }
          pos += 1;
        }
      }

      return indent;
    }
  }, {
    key: 'current',
    value: function current() {
      return this._sourceText.slice(this._start, this._pos);
    }
  }]);
  return MultilineCharacterStream;
}();

exports.default = MultilineCharacterStream;