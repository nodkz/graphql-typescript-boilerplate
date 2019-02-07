'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEVERITY = undefined;
exports.toGQLError = toGQLError;
exports.newGQLError = newGQLError;

var _error = require('graphql/error');

require('./types');

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEVERITY = exports.SEVERITY = (0, _keymirror2.default)({
  error: null,
  warn: null
});


function patchLocation(_ref, source) {
  var line = _ref.line,
      column = _ref.column;

  return {
    line: line,
    column: column,
    path: source.name
  };
}

function cleanMessage(message) {
  var matches = /Syntax Error .+ \(\d+:\d+\) (.+)/.exec(message);
  if (matches) {
    return 'Syntax Error: ' + matches[1];
  }
  return message;
}

// NOTE: patched error locations to add file path
function patchLocationsUsingNodes(locations, nodes) {
  var errorNodes = nodes.filter(function (node) {
    return node.loc;
  });
  if (locations) {
    return locations.reduce(function (acc, location, index) {
      var errorNode = errorNodes[index];
      if (errorNode.loc) {
        acc.push(patchLocation(location, errorNode.loc.source));
      }
      return acc;
    }, []);
  }
  return [];
}

function patchLocationsUsingSource(locations, source) {
  return locations.map(function (_ref2) {
    var line = _ref2.line,
        column = _ref2.column;
    return patchLocation({ line: line, column: column }, source);
  });
}

function patchLocations(error) {
  var locations = null;
  if (error.nodes && error.nodes.length > 0) {
    // NOTE: here nodes can be in differenct files
    locations = patchLocationsUsingNodes(error.locations, error.nodes);
  } else if (error.source && error.locations) {
    // lexer errors doesnt contains node
    locations = patchLocationsUsingSource(error.locations, error.source);
  }
  return locations;
}

function toGQLError(error, severity) {
  return {
    message: cleanMessage(error.message),
    locations: patchLocations(error),
    severity: severity
  };
}

function newGQLError(message, nodes, severity) {
  var error = new _error.GraphQLError(message, nodes);
  return toGQLError(error, severity);
}