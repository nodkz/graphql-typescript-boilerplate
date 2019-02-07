'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLACEHOLDER_TYPES = undefined;

var _GQLTypes = require('../../shared/GQLTypes');

var genUnknownScalarType = function genUnknownScalarType(name) {
  return new _GQLTypes.GQLScalarType(null, {
    name: name,
    description: 'Unknown scalar type \'' + name + '\'',
    serialize: function serialize() {
      return null;
    },
    parseValue: function parseValue() {
      return false;
    },
    parseLiteral: function parseLiteral() {
      return false;
    }
  });
};

// will be used to provide definition for unknown types

var PLACEHOLDER_TYPES = exports.PLACEHOLDER_TYPES = {
  scalarType: genUnknownScalarType,
  inputType: genUnknownScalarType,
  outputType: genUnknownScalarType,
  objectType: function objectType(name) {
    return new _GQLTypes.GQLObjectType(null, {
      name: name,
      description: 'unknown type \'' + name + '\'',
      fields: {
        name: { type: genUnknownScalarType('unknown') }
      },
      interfaces: function interfaces() {
        return null;
      }
    });
  },
  interfaceType: function interfaceType(name) {
    return new _GQLTypes.GQLInterfaceType(null, {
      name: name,
      description: 'unknown interface type \'' + name + '\'',
      fields: {
        unknown: { type: genUnknownScalarType('unknown') }
      },
      resolveType: function resolveType() {} });
  }
};