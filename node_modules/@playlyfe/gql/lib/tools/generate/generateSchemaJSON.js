'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(schema) {
    var prettify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _graphql.graphql)(schema, _graphql.introspectionQuery);

          case 2:
            response = _context.sent;
            return _context.abrupt('return', prettify ? (0, _stringify2.default)(response, null, 2) : (0, _stringify2.default)(response));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function generateSchemaJSON(_x) {
    return _ref.apply(this, arguments);
  }

  return generateSchemaJSON;
}();