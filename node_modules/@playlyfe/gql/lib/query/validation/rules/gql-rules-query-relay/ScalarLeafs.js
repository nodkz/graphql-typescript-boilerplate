'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requiredSubselectionMessage = exports.noSubselectionAllowedMessage = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.ScalarLeafs = ScalarLeafs;

var _ScalarLeafs = require('graphql/validation/rules/ScalarLeafs');

var _validation = require('graphql/validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// patched ScalarLeaf
exports.noSubselectionAllowedMessage = _ScalarLeafs.noSubselectionAllowedMessage;
exports.requiredSubselectionMessage = _ScalarLeafs.requiredSubselectionMessage;


function isRelayPatternDirective(node) {
  if (node.name.value !== 'relay') {
    return false;
  }
  return Boolean(node.arguments.find(function (argument) {
    return argument.name.value === 'pattern' && argument.value.value === true;
  }));
}

function isFragmentPattern(node) {
  return Boolean(node.directives.find(function (directive) {
    return isRelayPatternDirective(directive);
  }));
}

// relay
// 1) mutation { MutationName } // valid in relay
// 2) query { viewer } // valid in relay
function ignore(node, ancestors) {
  var ancestorsReveresed = ancestors.slice(0, ancestors.length).reverse();
  var found = ancestorsReveresed.find(function (_node) {
    return _node.kind === 'OperationDefinition' || _node.kind === 'FragmentDefinition' && isFragmentPattern(_node);
  });
  return Boolean(found);
}

function ScalarLeafs(context) {
  var origScalarLeafs = (0, _ScalarLeafs.ScalarLeafs)(context);
  return (0, _extends3.default)({}, origScalarLeafs, {
    Field: function Field() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var node = args[0],
          key = args[1],
          // eslint-disable-line
      parent = args[2],
          // eslint-disable-line
      path = args[3],
          // eslint-disable-line
      ancestors = args[4];

      var type = context.getType();
      if (type && !ignore(node, ancestors)) {
        origScalarLeafs.Field.apply(origScalarLeafs, args);
      }
    }
  });
}