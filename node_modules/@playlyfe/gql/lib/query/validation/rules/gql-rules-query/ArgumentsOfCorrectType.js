'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badValueMessage = badValueMessage;
exports.ArgumentsOfCorrectType = ArgumentsOfCorrectType;

var _error = require('graphql/error');

var _isValidLiteralValue = require('graphql/utilities/isValidLiteralValue');

// patch original rule to remove value from error message
// in ide there is no need to show value.
function badValueMessage(argName, type, verboseErrors) {
  var message = verboseErrors ? '\n' + verboseErrors.join('\n') : '';
  return 'Argument "' + argName + '" has invalid value ' + message;
}

/**
 * Argument values of correct type
 *
 * A GraphQL document is only valid if all field argument literal values are
 * of the type expected by their position.
 */
function ArgumentsOfCorrectType(context) {
  return {
    Argument: function Argument(node) {
      var argDef = context.getArgument();
      if (argDef) {
        var errors = (0, _isValidLiteralValue.isValidLiteralValue)(argDef.type, node.value);
        if (errors && errors.length > 0) {
          context.reportError(new _error.GraphQLError(badValueMessage(node.name.value, argDef.type, errors), [node.value]));
        }
      }
      return false;
    }
  };
}