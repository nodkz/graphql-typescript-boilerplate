"use strict";
/* global window */
Object.defineProperty(exports, "__esModule", { value: true });
var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
exports.isBrowser = isBrowser;
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
exports.isNode = isNode;
//# sourceMappingURL=is-browser.js.map