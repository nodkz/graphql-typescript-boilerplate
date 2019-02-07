'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toQueryDocument = toQueryDocument;
exports.default = parserQuery;

var _newParser = require('./Parsers/newParser');

var _newParser2 = _interopRequireDefault(_newParser);

var _source = require('graphql/language/source');

require('graphql/language/ast');

var _parser = require('graphql/language/parser');

var _whileSafe = require('../../shared/whileSafe');

var _whileSafe2 = _interopRequireDefault(_whileSafe);

var _debug = require('../../shared/debug');

var _debug2 = _interopRequireDefault(_debug);

var _MultilineCharacterStream = require('../../shared/MultilineCharacterStream');

var _MultilineCharacterStream2 = _interopRequireDefault(_MultilineCharacterStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IRREGULAR_WHITESPACE = '\f\x0B\x85\xA0\uFEFF\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u202F\u205F\u3000';

var whiteSpaceString = function whiteSpaceString(text) {
  return text.replace(new RegExp('[\\S' + IRREGULAR_WHITESPACE + ']', 'g'), ' ');
};

function placeholderFragment(text) {
  var fragmentName = 'F'; // dummy frag name
  var str = text.replace(/[^\s]/g, ',');
  var fragmentStr = '...' + fragmentName;
  if (/^.{2}\n/.test(str)) {
    // ${
    //    fragment
    //  }
    return str.replace(/^.{2}/, fragmentStr);
  }
  return str.replace(new RegExp('^.{' + fragmentStr.length + '}'), fragmentStr);
}

function toQueryDocument(source, config) {
  _debug2.default.time('toQueryDocument');
  var parser = (0, _newParser2.default)(config.parser);
  var state = parser.startState();

  var stream = new _MultilineCharacterStream2.default(source.body);
  var queryDocument = '';

  (0, _whileSafe2.default)({
    condition: function condition() {
      return stream.getCurrentPosition() < source.body.length;
    },
    call: function call() {
      var style = parser.token(stream, state);
      // console.log('current', `[${stream.current()}]`, style);
      if ( // add fragment name is missing
      config.isRelay && state.kind === 'TypeCondition' && state.prevState.kind === 'FragmentDefinition' && stream.current() === 'on' && !state.prevState.name) {
        queryDocument += '_ on';
        return;
      }

      if (style === 'ws-2') {
        queryDocument += whiteSpaceString(stream.current());
        return;
      }

      if (style === 'js-frag') {
        queryDocument += placeholderFragment(stream.current());
        return;
      }

      if (style) {
        queryDocument += stream.current();
      }
    }
  }, source.body.length);
  _debug2.default.timeEnd('toQueryDocument');
  // console.log(queryDocument);
  return queryDocument;
}

function parserQuery(source, config) {
  var queryDocument = toQueryDocument(source, config);
  // console.log(queryDocument);

  if (!queryDocument.trim()) {
    return {
      ast: null,
      isEmpty: true,
      queryDocument: queryDocument
    };
  }

  var ast = (0, _parser.parse)(new _source.Source(queryDocument, source.name));
  return {
    ast: ast,
    isEmpty: false,
    document: queryDocument
  };
}