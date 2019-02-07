'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _graphqlLanguageServiceParser = require('graphql-language-service-parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchemaParser = function () {
  function SchemaParser() {
    (0, _classCallCheck3.default)(this, SchemaParser);

    this._parser = (0, _graphqlLanguageServiceParser.onlineParser)({
      eatWhitespace: function eatWhitespace(stream) {
        return stream.eatWhile(_graphqlLanguageServiceParser.isIgnored);
      },
      lexRules: _graphqlLanguageServiceParser.LexRules,
      parseRules: _graphqlLanguageServiceParser.ParseRules
    });
  }

  (0, _createClass3.default)(SchemaParser, [{
    key: 'startState',
    value: function startState() {
      return this._parser.startState();
    }
  }, {
    key: 'token',
    value: function token(stream, state) {
      return this._parser.token(stream, state);
    }
  }]);
  return SchemaParser;
}();

exports.default = SchemaParser;