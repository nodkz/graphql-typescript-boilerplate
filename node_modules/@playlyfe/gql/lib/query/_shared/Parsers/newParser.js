'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = newParser;

require('../../../config/GQLConfig');

require('../../../shared/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Parsers
var availableParsers = {
  EmbeddedQueryParser: require('./EmbeddedQueryParser').default,
  QueryParser: require('./QueryParser').default
};

function newParser(parser) {
  var _parserConfig = typeof parser === 'string' ? [parser] : parser;

  var _parserConfig2 = (0, _slicedToArray3.default)(_parserConfig, 2),
      name = _parserConfig2[0],
      opts = _parserConfig2[1];

  var Parser = availableParsers[name];
  return new Parser(opts);
}