'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNamedTypeNode;

var _kinds = require('graphql/language/kinds');

require('graphql/language/ast');

function getNamedTypeNode(typeNode) {
  var namedType = typeNode;
  while (namedType.kind === _kinds.LIST_TYPE || namedType.kind === _kinds.NON_NULL_TYPE) {
    namedType = namedType.type;
  }
  return namedType;
}