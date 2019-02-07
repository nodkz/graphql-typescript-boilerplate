'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitLines;
exports.joinLines = joinLines;
function splitLines(text) {
  return text.split(/\r?\n|\r/);
}

function joinLines(lines) {
  return lines.join('\n');
}