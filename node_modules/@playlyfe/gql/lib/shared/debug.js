'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var noop = function noop() {}; // eslint-disable-line no-empty-function
var debug = new Proxy(console, {
  _isEnabled: false,
  get: function get(target, key) {
    if (key === 'enable') {
      this._isEnabled = true;
      return noop;
    }
    return this._isEnabled ? target[key] : noop;
  }
});

exports.default = debug;