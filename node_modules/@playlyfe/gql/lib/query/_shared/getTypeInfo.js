'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTypeInfo;

require('../../shared/types');

var _autocompleteUtils = require('graphql-language-service-interface/dist/autocompleteUtils');

var _type = require('graphql/type');

var _GQLTypes = require('../../shared/GQLTypes');

// Utility for collecting rich type information given any token's state
// from the graphql-mode parser.

/* eslint-disable no-use-before-define, no-nested-ternary */
function getTypeInfo(schema, tokenState) {
  var info = {
    type: null,
    parentType: null,
    inputType: null,
    directiveDef: null,
    fieldDef: null,
    argDef: null,
    argDefs: null,
    objectFieldDefs: null,
    objectFieldDef: null
  };

  (0, _autocompleteUtils.forEachState)(tokenState, function (state) {
    // eslint-disable-line complexity
    switch (state.kind) {
      case 'Query':
      case 'ShortQuery':
        info.type = schema.getQueryType();
        break;
      case 'Mutation':
        info.type = schema.getMutationType();
        break;
      case 'Subscription':
        info.type = schema.getSubscriptionType();
        break;
      case 'InlineFragment':
      case 'FragmentDefinition':
        if (state.type) {
          info.type = schema.getType(state.type);
        }
        break;
      case 'Field':
      case 'AliasedField':
        info.fieldDef = info.type && state.name && info.parentType ? getFieldDef(schema, info.parentType, state.name) : null;
        info.type = info.fieldDef && info.fieldDef.type;
        break;
      case 'SelectionSet':
        info.parentType = (0, _GQLTypes.getNamedType)(info.type);
        break;
      case 'Directive':
        info.directiveDef = state.name && schema.getDirective(state.name);
        break;
      case 'Arguments':
        info.argDefs = state.prevState.kind === 'Field' ? info.fieldDef && info.fieldDef.args : state.prevState.kind === 'Directive' ? info.directiveDef && info.directiveDef.args : state.prevState.kind === 'AliasedField' ? state.prevState.name && getFieldDef(schema, info.parentType, state.prevState.name).args : null;
        break;
      case 'Argument':
        info.argDef = null;
        if (info.argDefs) {
          for (var i = 0; i < info.argDefs.length; i += 1) {
            if (info.argDefs[i].name === state.name) {
              info.argDef = info.argDefs[i];
              break;
            }
          }
        }
        info.inputType = info.argDef && info.argDef.type;
        break;
      case 'ListValue':
        {
          var nullableType = (0, _type.getNullableType)(info.inputType);
          info.inputType = nullableType instanceof _type.GraphQLList ? nullableType.ofType : null;
          break;
        }
      case 'ObjectValue':
        {
          var objectType = (0, _GQLTypes.getNamedType)(info.inputType);
          info.objectFieldDefs = objectType instanceof _GQLTypes.GQLInputObjectType ? objectType.getFields() : null;
          break;
        }
      case 'ObjectField':
        {
          info.objectFieldDef = state.name && info.objectFieldDefs ? info.objectFieldDefs[state.name] : null;
          info.inputType = info.objectFieldDef && info.objectFieldDef.type;
          break;
        }
      default:
        break;
    }
  });

  return info;
}

// Finds all fragment definition ASTs in a source.
// function getFragmentDefinitions(sourceText) {
//   const fragmentDefs = [];
//   runParser(sourceText, {
//     eatWhitespace: stream => stream.eatWhile(isIgnored),
//     LexRules,
//     ParseRules,
//   }, (stream, state) => {
//     if (state.kind === 'FragmentDefinition' && state.name && state.type) {
//       fragmentDefs.push({
//         kind: 'FragmentDefinition',
//         name: {
//           kind: 'Name',
//           value: state.name,
//         },
//         typeCondition: {
//           kind: 'NamedType',
//           name: {
//             kind: 'Name',
//             value: state.type,
//           },
//         },
//       });
//     }
//   });

//   return fragmentDefs;
// }

// Utility for returning the state representing the Definition this token state
// is within, if any.
// function getDefinitionState(tokenState) {
//   let definitionState;

//   forEachState(tokenState, (state) => {
//     switch (state.kind) {
//       case 'Query':
//       case 'ShortQuery':
//       case 'Mutation':
//       case 'Subscription':
//       case 'FragmentDefinition':
//         definitionState = state;
//         break;
//     }
//   });

//   return definitionState;
// }

// Gets the field definition given a type and field name
function getFieldDef(schema, type, fieldName) {
  if (fieldName === _GQLTypes.SchemaMetaFieldDef.name && schema.getQueryType() === type) {
    return _GQLTypes.SchemaMetaFieldDef;
  }
  if (fieldName === _GQLTypes.TypeMetaFieldDef.name && schema.getQueryType() === type) {
    return _GQLTypes.TypeMetaFieldDef;
  }
  if (fieldName === _GQLTypes.TypeNameMetaFieldDef.name && (0, _type.isCompositeType)(type)) {
    return _GQLTypes.TypeNameMetaFieldDef;
  }
  if (type.getFields) {
    // $FlowDisableNextLine
    return type.getFields()[fieldName];
  }
  return null;
}