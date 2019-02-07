'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = createRelaySchema;

var _GQLTypes = require('../../shared/GQLTypes');

var _type = require('graphql/type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var relayDirective = new _GQLTypes.GQLDirective(null, {
  name: 'relay',
  description: 'The @relay directive.',
  args: {
    isConnectionWithoutNodeID: {
      description: 'Marks a connection field as containing nodes without `id` fields. This is used to silence the warning when diffing connections.',
      type: _type.GraphQLBoolean
    },
    isStaticFragment: {
      description: 'Marks a fragment as static. A static fragment will share the same identity regardless of how many times the expression is evaluated.',
      type: _type.GraphQLBoolean
    },
    pattern: {
      description: 'Marks a fragment as intended for pattern matching (as opposed to fetching).',
      type: _type.GraphQLBoolean
    },
    plural: {
      description: 'Marks a fragment as being backed by a GraphQLList',
      type: _type.GraphQLBoolean
    },
    variables: {
      description: 'Selectively pass variables down into a fragment.',
      type: new _type.GraphQLList(_type.GraphQLString)
    }
  },
  locations: [_type.DirectiveLocation.FIELD, _type.DirectiveLocation.FRAGMENT_DEFINITION]
});

// patch graphql schema to add relay support
function createRelaySchema(schema) {
  return new Proxy(schema, {
    get: function get(target, key) {
      if (key === '_directives') {
        return [].concat((0, _toConsumableArray3.default)(target[key]), [relayDirective]);
      }
      // $FlowDisableNextLine
      return target[key];
    }
  });
}