'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GQLConfigOptions = exports.QueryConfig = exports.ValidateConfig = exports.FileMatchConfig = exports.Globs = exports.QueryParser = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;
/* eslint-disable no-use-before-define */


var _findConfig = require('find-config');

var _findConfig2 = _interopRequireDefault(_findConfig);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _parseGlob = require('parse-glob');

var _parseGlob2 = _interopRequireDefault(_parseGlob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uniq2 = require('lodash/uniq');

var _uniq3 = _interopRequireDefault(_uniq2);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Options = _flowRuntime2.default.type('Options', _flowRuntime2.default.object(_flowRuntime2.default.property('cwd', _flowRuntime2.default.string(), true)));

var CONFIG_FILE_NAME = '.gqlconfig';

var QueryParser = exports.QueryParser = _flowRuntime2.default.type('QueryParser', _flowRuntime2.default.union(_flowRuntime2.default.string('QueryParser'), _flowRuntime2.default.tuple(_flowRuntime2.default.string('EmbeddedQueryParser'), _flowRuntime2.default.object(_flowRuntime2.default.property('startTag', _flowRuntime2.default.string()), _flowRuntime2.default.property('endTag', _flowRuntime2.default.string())))));

var Globs = exports.Globs = _flowRuntime2.default.type('Globs', _flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.array(_flowRuntime2.default.string())));

var FileMatchConfig = exports.FileMatchConfig = _flowRuntime2.default.type('FileMatchConfig', _flowRuntime2.default.union(Globs, _flowRuntime2.default.object(_flowRuntime2.default.property('include', Globs), _flowRuntime2.default.property('ignore', Globs, true))));

var ValidateConfig = exports.ValidateConfig = _flowRuntime2.default.type('ValidateConfig', _flowRuntime2.default.object(_flowRuntime2.default.property('extends', _flowRuntime2.default.string()), _flowRuntime2.default.property('rules', _flowRuntime2.default.object(_flowRuntime2.default.indexer('ruleName', _flowRuntime2.default.string(), _flowRuntime2.default.union(_flowRuntime2.default.string('off'), _flowRuntime2.default.string('warn'), _flowRuntime2.default.string('error')))), true)));

var QueryConfig = exports.QueryConfig = _flowRuntime2.default.type('QueryConfig', _flowRuntime2.default.object(_flowRuntime2.default.property('match', FileMatchConfig), _flowRuntime2.default.property('parser', QueryParser), _flowRuntime2.default.property('isRelay', _flowRuntime2.default.boolean(), true), _flowRuntime2.default.property('validate', ValidateConfig, true)));

var GQLConfigFile = _flowRuntime2.default.type('GQLConfigFile', _flowRuntime2.default.object(_flowRuntime2.default.property('schema', _flowRuntime2.default.object(_flowRuntime2.default.property('files', FileMatchConfig), _flowRuntime2.default.property('validate', ValidateConfig, true))), _flowRuntime2.default.property('query', _flowRuntime2.default.object(_flowRuntime2.default.property('files', _flowRuntime2.default.array(QueryConfig))), true)));

exports.GQLConfigOptions = Options;
var GQLConfig = (_dec = _flowRuntime2.default.annotate(_flowRuntime2.default.class('GQLConfig', _flowRuntime2.default.property('_path', _flowRuntime2.default.string()), _flowRuntime2.default.property('_configObj', GQLConfigFile), _flowRuntime2.default.property('_dir', _flowRuntime2.default.string()), _flowRuntime2.default.method('constructor', _flowRuntime2.default.param('options', _flowRuntime2.default.nullable(Options))), _flowRuntime2.default.method('getDir'), _flowRuntime2.default.method('getPath'), _flowRuntime2.default.method('getFileExtensions', _flowRuntime2.default.return(_flowRuntime2.default.array(_flowRuntime2.default.string()))), _flowRuntime2.default.method('getSchema'), _flowRuntime2.default.method('getQuery'), _flowRuntime2.default.method('match', _flowRuntime2.default.param('filePath', _flowRuntime2.default.string()), _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.object(_flowRuntime2.default.property('type', _flowRuntime2.default.union(_flowRuntime2.default.string('query'), _flowRuntime2.default.string('schema'))), _flowRuntime2.default.property('opts', _flowRuntime2.default.object()))))), _flowRuntime2.default.method('_readConfig', _flowRuntime2.default.param('filePath', _flowRuntime2.default.string())))), _dec2 = _flowRuntime2.default.decorate(_flowRuntime2.default.string()), _dec3 = _flowRuntime2.default.decorate(GQLConfigFile), _dec4 = _flowRuntime2.default.decorate(_flowRuntime2.default.string()), _dec(_class = (_class2 = function () {
  function GQLConfig(options) {
    (0, _classCallCheck3.default)(this, GQLConfig);

    _initDefineProp(this, '_path', _descriptor, this);

    _initDefineProp(this, '_configObj', _descriptor2, this);

    _initDefineProp(this, '_dir', _descriptor3, this);

    var _optionsType = _flowRuntime2.default.nullable(Options);

    _flowRuntime2.default.param('options', _optionsType).assert(options);

    var result = _findConfig2.default.obj(CONFIG_FILE_NAME, options);
    if (!result) {
      // throw error .gqlConfig not found
      throw new Error('Could not find a ' + CONFIG_FILE_NAME + ' file. Create a ' + CONFIG_FILE_NAME + ' file in project root directory.');
    }

    this._dir = result.dir;
    this._path = result.path;
    this._configObj = this._readConfig(result.path);
  }

  (0, _createClass3.default)(GQLConfig, [{
    key: 'getDir',
    value: function getDir() {
      return this._dir;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      return this._path;
    }
  }, {
    key: 'getFileExtensions',
    value: function getFileExtensions() {
      var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.array(_flowRuntime2.default.string()));

      var _configObj = this._configObj,
          schema = _configObj.schema,
          query = _configObj.query;

      var extensions = [];

      // schema
      extensions.push.apply(extensions, (0, _toConsumableArray3.default)(extractExtensions(schema.files)));

      // query
      if (query) {
        query.files.forEach(function (_ref) {
          var match = _ref.match;

          extensions.push.apply(extensions, (0, _toConsumableArray3.default)(extractExtensions(match)));
        });
      }

      return _returnType.assert((0, _uniq3.default)(extensions));
    }
  }, {
    key: 'getSchema',
    value: function getSchema() {
      return this._configObj.schema;
    }
  }, {
    key: 'getQuery',
    value: function getQuery() {
      return this._configObj.query;
    }
  }, {
    key: 'match',
    value: function match(filePath) {
      var _filePathType = _flowRuntime2.default.string();

      var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.object(_flowRuntime2.default.property('type', _flowRuntime2.default.union(_flowRuntime2.default.string('query'), _flowRuntime2.default.string('schema'))), _flowRuntime2.default.property('opts', _flowRuntime2.default.object()))));

      _flowRuntime2.default.param('filePath', _filePathType).assert(filePath);

      var _configObj2 = this._configObj,
          schema = _configObj2.schema,
          query = _configObj2.query;

      var filePathRelative = _path2.default.relative(this.getDir(), filePath);

      // test schema
      if (matcher(filePathRelative, schema.files)) {
        return _returnType2.assert({ type: 'schema', opts: {} });
      }

      // test query
      if (!query) {
        return _returnType2.assert(null);
      }

      var files = query.files;

      var opts = files.find(function (_ref2) {
        var match = _ref2.match;
        return matcher(filePathRelative, match);
      });
      if (opts) {
        return _returnType2.assert({ type: 'query', opts: opts });
      }

      return _returnType2.assert(null);
    }
  }, {
    key: '_readConfig',
    value: function _readConfig(filePath) {
      var _filePathType2 = _flowRuntime2.default.string();

      _flowRuntime2.default.param('filePath', _filePathType2).assert(filePath);

      // eslint-disable-line class-methods-use-this
      var fileData = _fs2.default.readFileSync(filePath, 'utf8');
      try {
        return GQLConfigFile.assert(_json2.default.parse(fileData)); // using flow-runtime it will be validated also
      } catch (err) {
        throw new Error('\nError parsing ' + CONFIG_FILE_NAME + '. \n\n' + err.message);
      }
    }
  }]);
  return GQLConfig;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, '_path', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, '_configObj', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, '_dir', [_dec4], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);


function extractExtensions(match) {
  var _matchType = FileMatchConfig;

  var _returnType3 = _flowRuntime2.default.return(_flowRuntime2.default.array(_flowRuntime2.default.string()));

  _flowRuntime2.default.param('match', _matchType).assert(match);

  if (typeof match === 'string') {
    return _returnType3.assert([getExtFromGlob(match)]);
  }

  if (Array.isArray(match)) {
    return _returnType3.assert(match.map(getExtFromGlob));
  }

  // object { match, exclude }
  return _returnType3.assert(extractExtensions(match.include));
}

_flowRuntime2.default.annotate(extractExtensions, _flowRuntime2.default.function(_flowRuntime2.default.param('match', FileMatchConfig), _flowRuntime2.default.return(_flowRuntime2.default.array(_flowRuntime2.default.string()))));

function getExtFromGlob(glob) {
  var _globType = _flowRuntime2.default.string();

  var _returnType4 = _flowRuntime2.default.return(_flowRuntime2.default.string());

  _flowRuntime2.default.param('glob', _globType).assert(glob);

  return _returnType4.assert((0, _parseGlob2.default)(glob).path.ext); // without dot
}

_flowRuntime2.default.annotate(getExtFromGlob, _flowRuntime2.default.function(_flowRuntime2.default.param('glob', _flowRuntime2.default.string()), _flowRuntime2.default.return(_flowRuntime2.default.string())));

function matchGlob(filePath, globs) {
  var _globsType = Globs;

  var _returnType5 = _flowRuntime2.default.return(_flowRuntime2.default.boolean());

  _flowRuntime2.default.param('globs', _globsType).assert(globs);

  if (typeof globs === 'string') {
    return _returnType5.assert((0, _minimatch2.default)(filePath, globs));
  }

  // matches any
  return _returnType5.assert(Boolean(globs.find(function (glob) {
    return (0, _minimatch2.default)(filePath, glob);
  })));
}

_flowRuntime2.default.annotate(matchGlob, _flowRuntime2.default.function(_flowRuntime2.default.param('filePath', _flowRuntime2.default.any()), _flowRuntime2.default.param('globs', Globs), _flowRuntime2.default.return(_flowRuntime2.default.boolean())));

function matcher(filePath, match) {
  var _matchType2 = FileMatchConfig;

  var _returnType6 = _flowRuntime2.default.return(_flowRuntime2.default.boolean());

  _flowRuntime2.default.param('match', _matchType2).assert(match);

  if (typeof match === 'string' || Array.isArray(match)) {
    return _returnType6.assert(matchGlob(filePath, match));
  }

  var _match = matchGlob(filePath, match.include);
  if (!_match) {
    return _returnType6.assert(false);
  }

  var _matchesIgnore = match.ignore ? matchGlob(filePath, match.ignore) : false;

  return _returnType6.assert(_match && !_matchesIgnore);
}

_flowRuntime2.default.annotate(matcher, _flowRuntime2.default.function(_flowRuntime2.default.param('filePath', _flowRuntime2.default.any()), _flowRuntime2.default.param('match', FileMatchConfig), _flowRuntime2.default.return(_flowRuntime2.default.boolean())));

exports.default = GQLConfig;