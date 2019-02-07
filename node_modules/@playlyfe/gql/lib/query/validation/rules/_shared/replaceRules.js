"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var replaceRules = function replaceRules(allRules, rulesToReplace) {
  var map = rulesToReplace.reduce(function (acc, rule) {
    acc[rule.name] = rule;
    return acc;
  }, {});

  return allRules.map(function (rule) {
    return map[rule.name] || rule;
  });
};
exports.default = replaceRules;