'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.missingDirectiveArgMessage = exports.missingFieldArgMessage = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.ProvidedNonNullArguments = ProvidedNonNullArguments;

var _ProvidedNonNullArguments = require('graphql/validation/rules/ProvidedNonNullArguments');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.missingFieldArgMessage = _ProvidedNonNullArguments.missingFieldArgMessage;
exports.missingDirectiveArgMessage = _ProvidedNonNullArguments.missingDirectiveArgMessage;

/**
 * Provided required arguments
 *
 * A field or directive is only valid if all required (non-null) field arguments
 * have been provided.
 */

/**
 * NOTE: This is patched version of graphql ProvideNonNullArguments rule
 * disable check for mutation as relay manages input variables
 * using differenty syntax (getVariables function)
 * in relay `mutation { someMutation }` is valid
 * but in graphql  `mutation { someMutation(input: $input) { } }` is valid
 */

function ProvidedNonNullArguments(context) {
  var origProvidedNonNullArguments = (0, _ProvidedNonNullArguments.ProvidedNonNullArguments)(context);

  return (0, _extends3.default)({}, origProvidedNonNullArguments, {

    Field: {
      // Validate on leave to allow for deeper errors to appear first.
      leave: function leave(node) {
        // eslint-disable-line
        var parentType = context.getParentType();
        // Patch: ignore check for mutations
        if (parentType && parentType.name === 'Mutation') {
          return false;
        }
        origProvidedNonNullArguments.Field.leave(node);
      }
    }
  });
}