'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _specifiedRules = require('graphql/validation/specifiedRules');

var _replaceRules = require('../_shared/replaceRules');

var _replaceRules2 = _interopRequireDefault(_replaceRules);

var _ArgumentsOfCorrectType = require('./ArgumentsOfCorrectType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  rules: (0, _replaceRules2.default)(_specifiedRules.specifiedRules, [_ArgumentsOfCorrectType.ArgumentsOfCorrectType]),
  config: _specifiedRules.specifiedRules.reduce(function (acc, rule) {
    acc[rule.name] = 'error';
    return acc;
  }, {})
};

// modified rules