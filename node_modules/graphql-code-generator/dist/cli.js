#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generate_and_save_1 = require("./generate-and-save");
var init_1 = require("./init");
var cli_error_1 = require("./utils/cli-error");
var config_1 = require("./config");
var _a = process.argv, cmd = _a[2];
switch (cmd) {
    case 'init':
        init_1.init()
            .then(function () {
            process.exit(0);
        })
            .catch(cli_error_1.cliError);
        break;
    default:
        generate_and_save_1.generate(config_1.createConfig())
            .then(function () {
            process.exit(0);
        })
            .catch(cli_error_1.cliError);
}
//# sourceMappingURL=cli.js.map