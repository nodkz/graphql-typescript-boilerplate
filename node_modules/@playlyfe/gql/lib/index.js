'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.GQLService = undefined;

var _GQLService = require('./GQLService');

Object.defineProperty(exports, 'GQLService', {
  enumerable: true,
  get: function get() {
    return _GQLService.GQLService;
  }
});

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = _package2.default.version;
exports.version = version;