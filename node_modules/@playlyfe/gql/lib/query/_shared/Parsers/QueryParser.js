'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _graphqlLanguageServiceParser = require('graphql-language-service-parser');

require('../../../shared/types');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Interpolation(style) {
  return {
    style: '', // NOTE: should be empty
    match: function match(token) {
      return token.value === '${';
    },
    update: function update(state) {
      state.interpolation = { count: 1, style: style }; // count is number of open curly braces
    }
  };
}


function eatInterpolation(stream, state) {
  var interpolation = state.interpolation;

  (0, _invariant2.default)(interpolation, 'missing interpolation field in state');
  stream.eatWhile(function (ch) {
    if (interpolation.count === 0) {
      state.interpolation = null;
      return false;
    }
    if (!ch) {
      return false;
    } // eol
    if (ch === '}') {
      interpolation.count -= 1;
    }
    if (ch === '{') {
      interpolation.count += 1;
    }
    return true;
  });
}

var parserOptions = {
  eatWhitespace: function eatWhitespace(stream) {
    return stream.eatWhile(function (ch) {
      return (0, _graphqlLanguageServiceParser.isIgnored)(ch) || ch === ';';
    });
  },
  lexRules: (0, _extends3.default)({
    JSInlineFragment: /^\$\{/
  }, _graphqlLanguageServiceParser.LexRules),

  parseRules: (0, _extends3.default)({}, _graphqlLanguageServiceParser.ParseRules, {

    // only query, mutation and fragment possible in Relay.QL
    Definition: function Definition(token) {
      switch (token.value) {
        case 'query':
          return 'Query';
        case 'mutation':
          return 'Mutation';
        case 'subscription':
          return 'Subscription';
        case 'fragment':
          return 'FragmentDefinition';
        case '${':
          return 'DocumentInterpolation';
        default:
          return null;
      }
    },
    Selection: function Selection(token, stream) {
      if (token.value === '${') {
        return 'JSInlineFragment';
      }
      return _graphqlLanguageServiceParser.ParseRules.Selection(token, stream);
    },


    JSInlineFragment: [Interpolation('js-frag')],
    DocumentInterpolation: [Interpolation('ws-2')]
  })
};

var QueryParser = function () {
  function QueryParser() {
    (0, _classCallCheck3.default)(this, QueryParser);

    this._parser = (0, _graphqlLanguageServiceParser.onlineParser)(parserOptions);
  }

  (0, _createClass3.default)(QueryParser, [{
    key: 'startState',
    value: function startState() {
      return this._parser.startState();
    }
  }, {
    key: 'token',
    value: function token(stream, state) {
      if (state.interpolation) {
        var _style = state.interpolation.style;
        // NOTE: eatInterpolation mutate both stream and state

        eatInterpolation(stream, state);
        stream._start -= 2; // to include '${' in token
        return _style;
      }

      return this._parser.token(stream, state);
    }
  }]);
  return QueryParser;
}();

exports.default = QueryParser;