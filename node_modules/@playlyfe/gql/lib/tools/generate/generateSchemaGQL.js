'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateSchemaGQL;

var _graphql = require('graphql');

function generateSchemaGQL(schema) {
  return (0, _graphql.printSchema)(schema);
}