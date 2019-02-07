"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var old_cli_config_1 = require("./old-cli-config");
var fs_1 = require("fs");
var path_1 = require("path");
var errors_1 = require("./errors");
var yml_1 = require("./yml");
var commander_1 = require("commander");
function getCustomConfigPath(cliFlags) {
    var configFile = cliFlags.config;
    if (configFile) {
        var configPath = path_1.resolve(process.cwd(), configFile);
        if (!fs_1.existsSync(configPath)) {
            throw new errors_1.DetailedError("Config " + configPath + " does not exist", "\n        Config " + configPath + " does not exist.\n\n          $ gql-gen --config " + configPath + "\n\n        Please make sure the --config points to a correct file.\n      ");
        }
        return configPath;
    }
    return null;
}
function loadAndParseConfig(filepath) {
    var ext = filepath.substr(filepath.lastIndexOf('.') + 1);
    switch (ext) {
        case 'yml':
            return yml_1.parseConfigFile(fs_1.readFileSync(filepath, 'utf-8'));
        case 'json':
            return JSON.parse(fs_1.readFileSync(filepath, 'utf-8'));
        case 'js':
            return require(path_1.resolve(process.cwd(), filepath));
        default:
            throw new errors_1.DetailedError("Extension '" + ext + "' is not supported", "\n        Config " + filepath + " couldn't be parsed. Extension '" + ext + "' is not supported.\n      ");
    }
}
function createConfig(argv) {
    if (argv === void 0) { argv = process.argv; }
    var cliFlags = new commander_1.Command()
        .usage('gql-gen [options]')
        .allowUnknownOption(true)
        .option('-c, --config <path>', 'Path to GraphQL codegen YAML config file, defaults to "codegen.yml" on the current directory')
        .option('-w, --watch', 'Watch for changes and execute generation automatically')
        .option('-o, --overwrite', 'Overwrites existing files')
        .parse(argv);
    var isUsingOldApi = cliFlags.rawArgs.includes('--template') ||
        cliFlags.rawArgs.includes('-t') ||
        cliFlags.rawArgs.includes('--schema') ||
        cliFlags.rawArgs.includes('--s');
    if (isUsingOldApi) {
        return old_cli_config_1.createConfigFromOldCli(old_cli_config_1.initCLI(argv));
    }
    else {
        var customConfigPath = getCustomConfigPath(cliFlags);
        var locations = [path_1.join(process.cwd(), './codegen.yml'), path_1.join(process.cwd(), './codegen.json')];
        if (customConfigPath) {
            locations.unshift(customConfigPath);
        }
        var filepath = locations.find(fs_1.existsSync);
        if (!filepath) {
            throw new errors_1.DetailedError("Unable to find Codegen config file!", "\n        Please make sure that you have a configuration file under the current directory! \n      ");
        }
        var parsedConfigFile = loadAndParseConfig(filepath);
        if (cliFlags.watch === true) {
            parsedConfigFile.watch = cliFlags.watch;
        }
        if (cliFlags.overwrite === true) {
            parsedConfigFile.overwrite = cliFlags.overwrite;
        }
        return parsedConfigFile;
    }
}
exports.createConfig = createConfig;
//# sourceMappingURL=config.js.map