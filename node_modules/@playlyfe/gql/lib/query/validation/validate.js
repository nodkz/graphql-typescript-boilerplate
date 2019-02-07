'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validate;

require('graphql/language/ast');

require('../../shared/GQLTypes');

require('../../config/GQLConfig');

require('../../shared/GQLError');

var _createValidate = require('../../shared/createValidate');

var _createValidate2 = _interopRequireDefault(_createValidate);

var _memoize2 = require('lodash/memoize');

var _memoize3 = _interopRequireDefault(_memoize2);

var _createRelaySchema = require('../_shared/createRelaySchema');

var _createRelaySchema2 = _interopRequireDefault(_createRelaySchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDefaultValidateConfig = (0, _memoize3.default)(function (isRelay) {
  return { extends: isRelay ? 'gql-rules-query-relay' : 'gql-rules-query' };
});


var _validate = (0, _createValidate2.default)({
  'gql-rules-query-relay': require('./rules/gql-rules-query-relay').default,
  'gql-rules-query': require('./rules/gql-rules-query').default
});

function validate(schema, ast, options) {
  return _validate(options.isRelay ? (0, _createRelaySchema2.default)(schema) : schema, ast, options.validate || getDefaultValidateConfig(options.isRelay));
}