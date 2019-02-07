'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = createValidate;

require('graphql/language/ast');

require('./GQLTypes');

require('../config/GQLConfig');

var _GQLError = require('./GQLError');

require('./types');

var _validate = require('graphql/validation/validate');

var _TypeInfo = require('graphql/utilities/TypeInfo');

var _visitor = require('graphql/language/visitor');

var _memoize2 = require('lodash/memoize');

var _memoize3 = _interopRequireDefault(_memoize2);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createValidate(availableRulesPackage) {
  var genRulesFromConfig = (0, _memoize3.default)(function (validateConfig) {
    var base = availableRulesPackage[validateConfig.extends];
    (0, _invariant2.default)(base, 'unknown validate extends \'' + validateConfig.extends + '\' available [' + (0, _keys2.default)(availableRulesPackage).join(',') + ']');
    var config = (0, _extends3.default)({}, base.config, validateConfig.rules);

    // remove all 'off' rules
    var rules = base.rules.filter(function (rule) {
      return config[rule.name] !== 'off';
    });

    return { config: config, rules: rules };
  });

  var makeRuleContext = function makeRuleContext(context, rule, config) {
    return new Proxy(context, {
      get: function get(target, key) {
        if (key === 'reportError') {
          return function (error) {
            error.message = error.message + ' (' + rule.name + ')';
            // $FlowDisableNextLine
            target[key]((0, _GQLError.toGQLError)(error, config[rule.name]));
          };
        }
        // $FlowDisableNextLine
        return target[key];
      }
    });
  };

  var validate = function validate(schema, ast, validateConfig) {
    var _genRulesFromConfig = genRulesFromConfig(validateConfig),
        rules = _genRulesFromConfig.rules,
        config = _genRulesFromConfig.config;

    var _schema = schema;
    var typeInfo = new _TypeInfo.TypeInfo(_schema);
    var context = new _validate.ValidationContext(_schema, ast, typeInfo);
    var visitors = rules.map(function (rule) {
      return rule(makeRuleContext(context, rule, config));
    });
    (0, _visitor.visit)(ast, (0, _visitor.visitWithTypeInfo)(typeInfo, (0, _visitor.visitInParallel)(visitors)));
    return context.getErrors();
  };

  return validate;
}