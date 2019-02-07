'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _QueryParser = require('./QueryParser');

var _QueryParser2 = _interopRequireDefault(_QueryParser);

var _EmbeddedLanguageParser = require('../../../shared/EmbeddedLanguageParser');

var _EmbeddedLanguageParser2 = _interopRequireDefault(_EmbeddedLanguageParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmbeddedQueryParser = function (_EmbeddedLanguagePars) {
  (0, _inherits3.default)(EmbeddedQueryParser, _EmbeddedLanguagePars);

  function EmbeddedQueryParser(_ref) {
    var startTag = _ref.startTag,
        endTag = _ref.endTag;
    (0, _classCallCheck3.default)(this, EmbeddedQueryParser);
    return (0, _possibleConstructorReturn3.default)(this, (EmbeddedQueryParser.__proto__ || (0, _getPrototypeOf2.default)(EmbeddedQueryParser)).call(this, { Parser: _QueryParser2.default, startMatch: startTag, endMatch: endTag }));
  }

  return EmbeddedQueryParser;
}(_EmbeddedLanguageParser2.default);

exports.default = EmbeddedQueryParser;