'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.generateFlowTypes = generateFlowTypes;

var _type = require('graphql/type');

var _CodeGenerator = require('apollo-codegen/lib/utilities/CodeGenerator');

var _CodeGenerator2 = _interopRequireDefault(_CodeGenerator);

var _codeGeneration = require('apollo-codegen/lib/flow/codeGeneration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TEMP
function generateFlowTypes(schema) {
  var generator = new _CodeGenerator2.default({});

  generator.printOnNewline('/* @flow */');
  generator.printOnNewline('//  This file was automatically generated and should not be edited.');

  var typeMap = schema.getTypeMap();
  (0, _keys2.default)(typeMap).forEach(function (name) {
    var type = typeMap[name];
    (0, _codeGeneration.typeDeclarationForGraphQLType)(generator, type);
  });

  return generator.output;
}
exports.default = generateFlowTypes;