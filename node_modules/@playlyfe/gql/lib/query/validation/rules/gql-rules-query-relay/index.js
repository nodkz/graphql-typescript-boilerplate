'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _gqlRulesQuery = require('../gql-rules-query');

var _gqlRulesQuery2 = _interopRequireDefault(_gqlRulesQuery);

var _replaceRules = require('../_shared/replaceRules');

var _replaceRules2 = _interopRequireDefault(_replaceRules);

var _ProvidedNonNullArguments = require('./ProvidedNonNullArguments');

var _ScalarLeafs = require('./ScalarLeafs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// patched rules
exports.default = {
  rules: (0, _replaceRules2.default)(_gqlRulesQuery2.default.rules, [_ScalarLeafs.ScalarLeafs, _ProvidedNonNullArguments.ProvidedNonNullArguments]),

  config: (0, _extends3.default)({}, _gqlRulesQuery2.default.config, {
    // [no-need default values are defined using initialvariables relay]
    DefaultValuesOfCorrectType: 'off',
    // [No-need]
    KnownFragmentNames: 'off',
    // [No-need]
    LoneAnonymousOperation: 'off',
    // [no-need?]
    NoFragmentCycles: 'off',
    // [variables manage by relay no-need]
    NoUndefinedVariables: 'off',
    // [no need in relay unused fragments are like unused javascript variables]
    NoUnusedFragments: 'off',
    // [variables manage by relay]
    NoUnusedVariables: 'off',
    // [no-need: relay generates fragment names so they are unique]
    UniqueFragmentNames: 'off',
    // [no-need managed by relay]
    UniqueOperationNames: 'off',
    // [no-need relay generates variables which are always unique]
    UniqueVariablesName: 'off',
    // [managed by relay]
    VariablesAreInputTypes: 'off',
    // [managed by relay]
    VariablesInAllowedPosition: 'off'
  })
};