'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var whileSafe = function whileSafe(params) {
  var maxIterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

  var iterationsCount = 0;
  while (params.condition()) {
    iterationsCount += 1;
    if (iterationsCount > maxIterations) {
      if (params.logOnInfiniteLoop) {
        console.log('================ infiniteLoop detected (start) ======================');
        // $FlowDisableNextLine
        params.logOnInfiniteLoop();
        console.log('================ infiniteLoop detected (end) ======================');
      }
      break;
    }
    params.call();
  }
};
exports.default = whileSafe;