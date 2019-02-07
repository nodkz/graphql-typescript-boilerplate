'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./types');

require('graphql/language/ast');

function getDefLocationForNode(node) {
  if (node && node.loc) {
    // NOTE: type.node is undefined for graphql core types (String|Boolean ...)
    var loc = node.loc;

    var defLocation = {
      start: {
        line: loc.startToken.line,
        column: loc.startToken.column
      },
      end: {
        line: loc.endToken.line,
        column: loc.endToken.column + (loc.endToken.end - loc.endToken.start)
      },
      path: loc.source.name
    };
    // console.timeEnd('getDef');
    return defLocation;
  }
  return null;
}

exports.default = getDefLocationForNode;