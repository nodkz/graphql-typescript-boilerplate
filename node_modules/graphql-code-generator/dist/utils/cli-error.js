"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_browser_1 = require("./is-browser");
function cliError(err, exitOnError) {
    if (exitOnError === void 0) { exitOnError = true; }
    var msg;
    if (err instanceof Error) {
        msg = err.message || err.toString();
    }
    else if (typeof err === 'string') {
        msg = err;
    }
    else {
        msg = JSON.stringify(err);
    }
    console['error'](msg);
    if (exitOnError && is_browser_1.isNode) {
        process.exit(1);
        return;
    }
    else if (exitOnError && is_browser_1.isBrowser) {
        throw err;
    }
    return;
}
exports.cliError = cliError;
//# sourceMappingURL=cli-error.js.map