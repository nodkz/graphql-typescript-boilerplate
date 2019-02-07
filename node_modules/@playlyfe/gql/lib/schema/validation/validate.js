'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;

require('graphql/language/ast');

require('../../shared/GQLTypes');

var _createValidate = require('../../shared/createValidate');

var _createValidate2 = _interopRequireDefault(_createValidate);

require('../../shared/GQLError');

require('../../config/GQLConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _validate = (0, _createValidate2.default)({
  'gql-rules-schema': require('./rules/gql-rules-schema').default
});


var defaultValidateConfig = {
  extends: 'gql-rules-schema'
};

function validate(schema, ast, validateConfig) {
  return _validate(schema, ast, validateConfig || defaultValidateConfig);
}