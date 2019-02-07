"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var fs_1 = require("fs");
var path_1 = require("path");
var cli_error_1 = require("./utils/cli-error");
var YAML = require("json-to-pretty-yaml");
var is_browser_1 = require("./utils/is-browser");
function collect(val, memo) {
    memo.push(val);
    return memo;
}
exports.initCLI = function (args) {
    var command = new commander_1.Command()
        .usage('gql-gen [options]')
        .option('-s, --schema <path>', 'Path to GraphQL schema: local JSON file, GraphQL endpoint, local file that exports GraphQLSchema/AST/JSON')
        .option('-cs, --clientSchema <path>', 'Path to GraphQL client schema: local JSON file, local file that exports GraphQLSchema/AST/JSON')
        .option('-h, --header [header]', 'Header to add to the introspection HTTP request when using --url/--schema with url', collect, [])
        .option('-t, --template <template-name>', 'Language/platform name templates, or a name of NPM modules that `export default` GqlGenConfig object')
        .option('-p, --project <project-path>', 'Project path(s) to scan for custom template files')
        .option('--config <json-file>', 'Codegen configuration file, defaults to: ./gql-gen.json')
        .option('-m, --skip-schema', 'Generates only client side documents, without server side schema types')
        .option('-c, --skip-documents', 'Generates only server side schema types, without client side documents')
        .option('-o, --out <path>', 'Output file(s) path', String, './')
        .option('-r, --require [require]', 'module to preload (option can be repeated)', collect, [])
        .option('-ow, --no-overwrite', 'Skip file writing if the output file(s) already exists in path')
        .option('-w, --watch', 'Watch for changes and execute generation automatically')
        .option('--silent', 'Does not print anything to the console')
        .option('-ms, --merge-schema <merge-logic>', 'Merge schemas with custom logic')
        .arguments('<options> [documents...]')
        .parse(args);
    return command;
};
exports.validateCliOptions = function (options) {
    var schema = options.schema;
    var template = options.template;
    var project = options.project;
    if (!schema && is_browser_1.isNode) {
        var _a = require('graphql-config'), getGraphQLProjectConfig = _a.getGraphQLProjectConfig, ConfigNotFoundError = _a.ConfigNotFoundError;
        try {
            var graphqlProjectConfig = getGraphQLProjectConfig(project);
            options.schema = graphqlProjectConfig.schemaPath;
        }
        catch (e) {
            if (e instanceof ConfigNotFoundError) {
                cli_error_1.cliError('Flag --schema is missing!');
            }
        }
    }
    if (!template && !project) {
        cli_error_1.cliError('Please specify language/platform, using --template flag!');
    }
};
function transformTemplatesToPlugins(options, templateSpecificConfig) {
    if (templateSpecificConfig === void 0) { templateSpecificConfig = {}; }
    if (options.template === 'ts' ||
        options.template === 'typescript' ||
        options.template === 'graphql-codegen-typescript-template') {
        return {
            config: templateSpecificConfig,
            plugins: [
                templateSpecificConfig.printTime ? 'time' : null,
                'typescript-common',
                options.skipDocuments ? null : 'typescript-client',
                options.skipSchema ? null : 'typescript-server'
            ].filter(function (s) { return s; })
        };
    }
    else if (options.template === 'typescript-resolvers' ||
        options.template === 'graphql-codegen-typescript-resolvers-template') {
        return {
            config: templateSpecificConfig,
            plugins: [templateSpecificConfig.printTime ? 'time' : null, 'typescript-common', 'typescript-resolvers'].filter(function (s) { return s; })
        };
    }
    else if (options.template === 'typescript-mongodb' ||
        options.template === 'graphql-codegen-typescript-mongodb-template') {
        return {
            config: templateSpecificConfig,
            plugins: [
                templateSpecificConfig.printTime ? 'time' : null,
                'typescript-common',
                'typescript-server',
                'typescript-mongodb'
            ].filter(function (s) { return s; })
        };
    }
    else if (options.template === 'apollo-angular' || options.template === 'graphql-codegen-apollo-angular-template') {
        return {
            config: templateSpecificConfig,
            plugins: [
                templateSpecificConfig.printTime ? 'time' : null,
                'typescript-common',
                'typescript-client',
                'typescript-apollo-angular'
            ].filter(function (s) { return s; })
        };
    }
    else if (options.template === 'react-apollo' ||
        options.template === 'graphql-codegen-typescript-react-apollo-template') {
        return {
            config: templateSpecificConfig,
            plugins: [
                templateSpecificConfig.printTime ? 'time' : null,
                'typescript-common',
                'typescript-client',
                'typescript-react-apollo'
            ].filter(function (s) { return s; })
        };
    }
    else if (options.template === 'introspection' || options.template === 'graphql-codegen-introspection-template') {
        return {
            config: templateSpecificConfig,
            plugins: ['introspection'].filter(function (s) { return s; })
        };
    }
    else if (options.template === 'graphql-files-typescript' ||
        options.template === 'graphql-codegen-graphql-files-typescript-modules') {
        return {
            config: templateSpecificConfig,
            plugins: ['typescript-graphql-files-modules'].filter(function (s) { return s; })
        };
    }
    return { plugins: [options.template].filter(function (a) { return a; }) };
}
function getConfigFromEnvVars() {
    return Object.keys(process.env)
        .filter(function (name) { return name.startsWith('CODEGEN_'); })
        .reduce(function (prev, name) {
        var cleanName = name
            .replace('CODEGEN_', '')
            .toLowerCase()
            .replace(/[-_]+/g, ' ')
            .replace(/[^\w\s]/g, '')
            .replace(/ (.)/g, function (res) { return res.toUpperCase(); })
            .replace(/ /g, '');
        var value = process.env[name];
        if (value === 'true') {
            value = true;
        }
        else if (value === 'false') {
            value = false;
        }
        prev[cleanName] = value;
        return prev;
    }, {});
}
function createConfigFromOldCli(options) {
    var _a, _b;
    exports.validateCliOptions(options);
    var rootConfig = {};
    var configPath = options.config ? options.config : fs_1.existsSync(path_1.join(process.cwd(), './gql-gen.json'));
    if (configPath && typeof configPath === 'string') {
        var rawObj = JSON.parse(fs_1.readFileSync(configPath, 'utf-8'));
        rootConfig = (rawObj || {}).generatorConfig || {};
    }
    var envVarsConfig = getConfigFromEnvVars();
    rootConfig = __assign({}, rootConfig, envVarsConfig);
    var schema = options.schema;
    if (options.header && Array.isArray(options.header) && options.header.length > 0) {
        schema = (_a = {},
            _a[options.schema] = {
                headers: options.header.reduce(function (prev, h) {
                    var _a;
                    var splitted = h.split(':').map(function (p) { return p.trim(); });
                    var name = splitted[0];
                    var value = splitted[1];
                    return __assign({}, prev, (_a = {}, _a[name] = value, _a));
                }, {})
            },
            _a);
    }
    var configObject = {
        schema: [schema, options.clientSchema].filter(function (s) { return s; }),
        documents: options.args || [],
        config: rootConfig,
        generates: (_b = {},
            _b[options.out] = transformTemplatesToPlugins(options, __assign({}, rootConfig, (options.templateConfig || {}))),
            _b),
        silent: options.silent,
        watch: options.watch,
        require: options.require
    };
    console['warn']("\n  Note: You are using the old API of graphql-code-generator. You can easily migrate by creating \"codegen.yml\" file in your project with the following content:\n  \n" + YAML.stringify(configObject) + "\n\n  Then, make sure that your script is executing just \"gql-gen\" (without any cli flags).\n  ");
    return configObject;
}
exports.createConfigFromOldCli = createConfigFromOldCli;
//# sourceMappingURL=old-cli-config.js.map