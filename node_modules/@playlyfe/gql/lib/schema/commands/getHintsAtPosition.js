'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.getHintsAtPosition = getHintsAtPosition;

var _definition = require('graphql/type/definition');

var _getTokenAtPosition = require('./../_shared/getTokenAtPosition');

require('../../shared/types');

var _GQLTypes = require('../../shared/GQLTypes');

var _debug = require('../../shared/debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertTypeToHint(type) {
  return {
    text: type.name,
    type: _GQLTypes.typeName[type.constructor.name],
    description: type.description
  };
}


function isAlphabet(char) {
  return (/[A-Za-z]/.test(char)
  );
}

function getHintsForTokenState(schema, state, token) {
  if (!state) {
    return [];
  }

  var kind = state.kind,
      step = state.step;
  // console.log(kind, step);

  if (kind === 'Document' && step === 0) {
    return [{ text: 'type' }, { text: 'enum' }, { text: 'input' }];
  }

  /** ****************** type *******************/
  // type name {
  //    field: <---
  // }
  if (kind === 'FieldDef' && (step === 3 || // case field: <---- cursor here
  step === 4 && isAlphabet(token.prevChar) && token.style === 'punctuation') // field: Type!  when cursor on !
  ) {
      var _ret = function () {
        var typeMap = schema.getTypeMap();
        return {
          v: (0, _keys2.default)(typeMap).reduce(function (acc, key) {
            if ((0, _definition.isOutputType)(typeMap[key])) {
              acc.push(convertTypeToHint(typeMap[key]));
            }
            return acc;
          }, [])
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    }

  if (kind === 'ObjectTypeDef' && step === 2) {
    return [{
      text: 'implements',
      type: 'Implements'
    }, {
      text: '{'
    }];
  }

  if (kind === 'Implements' && step === 1) {
    var _ret2 = function () {
      // all interface types
      var typeMap = schema.getTypeMap();
      return {
        v: (0, _keys2.default)(typeMap).reduce(function (acc, key) {
          if (typeMap[key] instanceof _GQLTypes.GQLInterfaceType) {
            acc.push(convertTypeToHint(typeMap[key]));
          }
          return acc;
        }, [])
      };
    }();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
  }
  /** ****************** type *******************/

  /** ****************** input *******************/
  // type Type {
  //   fielName(inputKey: <---)
  // }
  // or
  // input type {
  //    first: <--
  // }
  if (kind === 'InputValueDef' && step === 2 || kind === 'InputValueDef' && step === 3 && isAlphabet(token.prevChar) && token.style === 'punctuation' || kind === 'FieldDef' && step === 2 && token.string === ')' // case name(first: ) // when cursor on closing bracket ')'
  ) {
      var _ret3 = function () {
        var typeMap = schema.getTypeMap();
        return {
          v: (0, _keys2.default)(typeMap).reduce(function (acc, key) {
            if ((0, _definition.isInputType)(typeMap[key])) {
              acc.push(convertTypeToHint(typeMap[key]));
            }
            return acc;
          }, [])
        };
      }();

      if ((typeof _ret3 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret3)) === "object") return _ret3.v;
    }

  /** ****************** input *******************/

  /** **************  List ****************/
  // type Type {
  //    field: []
  //    -------^
  // }
  // type Type {
  //    field(input: [])
  //    -------------^
  // }
  // input Type {
  //    field: []
  //    -------^
  // }

  if (kind === 'ListType' && (step === 1 || (step === 3 || step === 2) && isAlphabet(token.prevChar) && token.style === 'punctuation')) {
    var prevState = state.prevState; // { Kind: Type }

    return getHintsForTokenState(schema, prevState.prevState, token);
  }
  /** **************  List ****************/

  /** *************** Inside Named type ************/
  // field: Str!
  // ---------^
  if (kind === 'NamedType' && step === 0 || kind === 'NamedType' && step === 1 && isAlphabet(token.prevChar)) {
    return getHintsForTokenState(schema, state.prevState.prevState.prevState, token);
  }
  /** **********************************************
   /**************** Union ******************/
  // union Type =  <---
  // union Type = Type1 | <---
  // union Type = Type1 | Type2 <---
  if (kind === 'UnionDef' && step === 4 || // Union Name =  <--
  kind === 'UnionMember' && step === 1 // Union Nmae = Type1 | <---
  ) {
      var _ret4 = function () {
        // only GraphQLObjectType
        var typeMap = schema.getTypeMap();
        return {
          v: (0, _keys2.default)(typeMap).reduce(function (acc, key) {
            if (typeMap[key] instanceof _GQLTypes.GQLObjectType) {
              acc.push(convertTypeToHint(typeMap[key]));
            }
            return acc;
          }, [])
        };
      }();

      if ((typeof _ret4 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret4)) === "object") return _ret4.v;
    }

  /** ************** Union ******************/

  return [];
}

function getHintsAtPosition(schema, sourceText, _position) {
  var position = { line: _position.line, column: _position.column - 1 };
  _debug2.default.time('getTokenAtPosition');
  var token = (0, _getTokenAtPosition.getTokenAtPosition)(sourceText, position);
  _debug2.default.timeEnd('getTokenAtPosition');
  return getHintsForTokenState(schema, token.state, token);
}