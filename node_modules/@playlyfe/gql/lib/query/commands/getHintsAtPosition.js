'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHintsAtPosition = undefined;

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = getHintsAtPosition;

require('../../shared/types');

var _GQLTypes = require('../../shared/GQLTypes');

require('../../config/GQLConfig');

var _getTokenAtPosition = require('../_shared/getTokenAtPosition');

var _getTokenAtPosition2 = _interopRequireDefault(_getTokenAtPosition);

var _autocompleteUtils = require('graphql-language-service-interface/dist/autocompleteUtils');

var _type = require('graphql/type');

var _getTypeInfo = require('../_shared/getTypeInfo');

var _getTypeInfo2 = _interopRequireDefault(_getTypeInfo);

var _createRelaySchema = require('../_shared/createRelaySchema');

var _createRelaySchema2 = _interopRequireDefault(_createRelaySchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
function getHintsAtPosition( // eslint-disable-line complexity
_schema, sourceText, _position, config) {
  var position = { line: _position.line, column: _position.column - 1 };
  var token = (0, _getTokenAtPosition2.default)(sourceText, position, config.parser);
  // ignore if inside comment
  if (token.style === 'comment') {
    return [];
  }

  var schema = config.isRelay ? (0, _createRelaySchema2.default)(_schema) : _schema;
  var typeInfo = (0, _getTypeInfo2.default)(schema, token.state);

  var state = token.state;
  var kind = state.kind,
      step = state.step;

  // console.log(typeInfo);
  // console.log(token);
  // console.log(kind, step);

  // Definition kinds

  if (kind === 'Document') {
    return [{ text: 'query' }, { text: 'mutation' }, { text: 'subscription' }, { text: 'fragment' }, { text: '{' }];
  }

  if (kind === 'Mutation' || kind === 'Subscription' || kind === 'Query') {
    var type = typeInfo.type;

    return [{
      text: token.string,
      type: type ? type.toString() : '',
      description: type ? type.description : ''
    }];
  }

  if (kind === 'FragmentDefinition') {
    return [{
      text: 'fragment'
    }];
  }

  // Argument names
  // console.log(kind, step, position);

  // Field names
  if (kind === 'SelectionSet' || kind === 'Field' || kind === 'AliasedField') {
    if (typeInfo.parentType) {
      var fields = typeInfo.parentType.getFields
      // $FlowDisableNextLine
      ? (0, _autocompleteUtils.objectValues)(typeInfo.parentType.getFields()) : [];
      if ((0, _type.isAbstractType)(typeInfo.parentType)) {
        fields.push(_GQLTypes.TypeNameMetaFieldDef);
      }
      if (typeInfo.parentType === schema.getQueryType()) {
        fields.push(_GQLTypes.SchemaMetaFieldDef, _GQLTypes.TypeMetaFieldDef);
      }
      return fields.map(function (field) {
        return {
          text: field.name,
          type: field.type.toString(),
          description: field.description
        };
      });
    }
  }

  if (kind === 'Arguments' || kind === 'Argument' && step === 0) {
    var argDefs = typeInfo.argDefs;

    if (argDefs) {
      return argDefs.map(function (argDef) {
        return {
          text: argDef.name,
          type: argDef.type.toString(),
          description: argDef.description
        };
      });
    }
  }

  // Input Object fields
  if (kind === 'ObjectValue' || kind === 'ObjectField' && step === 0) {
    if (typeInfo.objectFieldDefs) {
      var objectFields = (0, _autocompleteUtils.objectValues)(typeInfo.objectFieldDefs);
      return objectFields.map(function (field) {
        return {
          text: field.name,
          type: field.type.toString(),
          description: field.description
        };
      });
    }
  }

  // Input values: Enum and Boolean
  if (kind === 'EnumValue' || kind === 'ListValue' && step === 1 || kind === 'ObjectField' && step === 2 || kind === 'Argument' && step === 2) {
    var _ret = function () {
      var namedInputType = (0, _GQLTypes.getNamedType)(typeInfo.inputType);
      if (namedInputType instanceof _GQLTypes.GQLEnumType) {
        var valueMap = namedInputType.getValues();
        var values = (0, _autocompleteUtils.objectValues)(valueMap);
        return {
          v: values.map(function (value) {
            return {
              text: value.name,
              type: namedInputType.toString(),
              description: value.description
            };
          })
        };
      } else if (namedInputType === _type.GraphQLBoolean) {
        return {
          v: [{ text: 'true', type: _type.GraphQLBoolean, description: 'Not false.' }, { text: 'false', type: _type.GraphQLBoolean, description: 'Not true.' }]
        };
      }
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
  }

  // Fragment type conditions
  if (kind === 'TypeCondition' && step === 1 || kind === 'NamedType' && state.prevState.kind === 'TypeCondition') {
    var possibleTypes = null;
    if (typeInfo.parentType) {
      if ((0, _type.isAbstractType)(typeInfo.parentType)) {
        (function () {
          // Collect both the possible Object types as well as the interfaces
          // they implement.
          var possibleObjTypes = schema.getPossibleTypes(typeInfo.parentType);
          var possibleIfaceMap = (0, _create2.default)(null);
          possibleObjTypes.forEach(function (type) {
            type.getInterfaces().forEach(function (iface) {
              possibleIfaceMap[iface.name] = iface;
            });
          });
          possibleTypes = possibleObjTypes.concat((0, _autocompleteUtils.objectValues)(possibleIfaceMap));
        })();
      } else {
        // The parent type is a non-abstract Object type, so the only possible
        // type that can be used is that same type.
        possibleTypes = [typeInfo.parentType];
      }
    } else {
      var typeMap = schema.getTypeMap();
      possibleTypes = (0, _autocompleteUtils.objectValues)(typeMap).filter(_type.isCompositeType);
    }
    return possibleTypes.map(function (type) {
      return {
        text: type.name,
        type: _GQLTypes.typeName[type.constructor.name],
        description: type.description
      };
    });
  }

  // Fragment spread names
  // if (kind === 'FragmentSpread' && step === 1) {
  //   const typeMap = schema.getTypeMap();
  //   const defState = getDefinitionState(token.state);
  //   // const fragments = getFragmentDefinitions(sourceText);

  //   // Filter down to only the fragments which may exist here.
  //   const relevantFrags = fragments.filter(frag =>
  //     // Only include fragments with known types.
  //     typeMap[frag.typeCondition.name.value] &&
  //     // Only include fragments which are not cyclic.
  //     !(defState &&
  //       defState.kind === 'FragmentDefinition' &&
  //       defState.name === frag.name.value) &&
  //     // Only include fragments which could possibly be spread here.
  //     doTypesOverlap(
  //       schema,
  //       typeInfo.parentType,
  //       typeMap[frag.typeCondition.name.value],
  //     ),
  //   );

  //   return relevantFrags.map(frag => ({
  //     text: frag.name.value,
  //     type: typeMap[frag.typeCondition.name.value],
  //     description:
  //       `fragment ${frag.name.value} on ${frag.typeCondition.name.value}`,
  //   }));
  // }

  // Variable definition types
  if (kind === 'VariableDefinition' && step === 2 || kind === 'ListType' && step === 1 || kind === 'NamedType' && (state.prevState.kind === 'VariableDefinition' || state.prevState.kind === 'ListType')) {
    var inputTypeMap = schema.getTypeMap();
    var inputTypes = (0, _autocompleteUtils.objectValues)(inputTypeMap).filter(_type.isInputType);
    return inputTypes.map(function (type) {
      return {
        text: type.name,
        description: type.description
      };
    });
  }

  // Directive names
  if (kind === 'Directive') {
    var directives = schema.getDirectives().filter(function (directive) {
      return canUseDirective(state.prevState.kind, directive);
    });
    return directives.map(function (directive) {
      return {
        text: directive.name,
        description: directive.description
      };
    });
  }

  return [];
}

function canUseDirective(kind, directive) {
  var locations = directive.locations;

  switch (kind) {
    case 'Query':
      return locations.indexOf('QUERY') !== -1;
    case 'Mutation':
      return locations.indexOf('MUTATION') !== -1;
    case 'Subscription':
      return locations.indexOf('SUBSCRIPTION') !== -1;
    case 'Field':
    case 'AliasedField':
      return locations.indexOf('FIELD') !== -1;
    case 'FragmentDefinition':
      return locations.indexOf('FRAGMENT_DEFINITION') !== -1;
    case 'FragmentSpread':
      return locations.indexOf('FRAGMENT_SPREAD') !== -1;
    case 'InlineFragment':
      return locations.indexOf('INLINE_FRAGMENT') !== -1;
    default:
      break;
  }
  return false;
}

exports.getHintsAtPosition = getHintsAtPosition;