'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./types');

function printTokenState(state) {
  if (!state) {
    return '';
  }
  return '{ kind: ' + state.kind + ', step: ' + state.step + ' } ' + printTokenState(state.prevState);
}
exports.default = printTokenState;