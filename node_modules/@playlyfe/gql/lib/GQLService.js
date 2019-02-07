'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GQLService = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _schema = require('./schema');

var schema = _interopRequireWildcard(_schema);

var _query = require('./query');

var query = _interopRequireWildcard(_query);

var _GQLConfig = require('./config/GQLConfig');

var _GQLConfig2 = _interopRequireDefault(_GQLConfig);

var _debug = require('./shared/debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GQLService = exports.GQLService = function () {
  function GQLService(options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, GQLService);
    this._isInitialized = false;

    var _ref = options || {},
        onChange = _ref.onChange,
        onInit = _ref.onInit,
        enableDebug = _ref.debug,
        configOptions = (0, _objectWithoutProperties3.default)(_ref, ['onChange', 'onInit', 'debug']);

    if (enableDebug) {
      _debug2.default.enable();
    }
    this._config = new _GQLConfig2.default(configOptions);
    this._schemaBuilder = new schema.SchemaBuilder({
      config: this._config,
      watch: true,
      onChange: onChange,
      onInit: function (_onInit) {
        function onInit() {
          return _onInit.apply(this, arguments);
        }

        onInit.toString = function () {
          return _onInit.toString();
        };

        return onInit;
      }(function () {
        if (_this._config.getQuery()) {
          _this._queryManager = new query.QueryManager({
            config: _this._config,
            getSchema: function getSchema() {
              return _this._schemaBuilder.getSchema();
            },
            onInit: function (_onInit2) {
              function onInit() {
                return _onInit2.apply(this, arguments);
              }

              onInit.toString = function () {
                return _onInit2.toString();
              };

              return onInit;
            }(function () {
              _this._isInitialized = true;
              if (onInit) {
                onInit();
              }
            }),
            onChange: onChange
          });
        } else {
          _this._isInitialized = true;
          if (onInit) {
            onInit();
          }
        }
      })
    });
  }

  // list all file extensions defined in gqlconfig


  (0, _createClass3.default)(GQLService, [{
    key: 'getFileExtensions',
    value: function getFileExtensions() {
      return this._config.getFileExtensions();
    }
  }, {
    key: 'status',
    value: function status() {
      if (!this._isInitialized) {
        return [];
      }
      var schemaErrors = this._schemaBuilder.getSchemaErrors();
      var queryErrors = this._queryManager ? this._queryManager.getErrors() : [];
      return schemaErrors.concat(queryErrors.filter(function (err) {
        return Boolean(err);
      }));
    }
  }, {
    key: 'autocomplete',
    value: function autocomplete(params) {
      _debug2.default.log('\n[autocomplete]');_debug2.default.time('time');
      var sourceText = params.sourceText,
          sourcePath = params.sourcePath,
          position = params.position;

      if (!this._isInitialized) {
        return [];
      }

      // codemirror instance
      var results = [];
      _debug2.default.time('match');
      var match = this._config.match(sourcePath);
      _debug2.default.timeEnd('match');
      _debug2.default.log('FileType:', match && match.type);

      _debug2.default.time('autocomplete');
      if (match && match.type === 'schema') {
        results = schema.commands.getHintsAtPosition(this._schemaBuilder.getSchema(), sourceText, position);
      }

      if (match && match.type === 'query') {
        results = query.commands.getHintsAtPosition(this._schemaBuilder.getSchema(), sourceText, position, match.opts);
      }
      _debug2.default.timeEnd('autocomplete');
      _debug2.default.timeEnd('time');
      return results;
    }
  }, {
    key: 'getDef',
    value: function getDef(params) {
      _debug2.default.log('\n[getDef]');_debug2.default.time('time');
      var sourceText = params.sourceText,
          sourcePath = params.sourcePath,
          position = params.position;

      if (!this._isInitialized) {
        return undefined;
      }

      var defLocation = null;
      _debug2.default.time('match');
      var match = this._config.match(sourcePath);
      _debug2.default.timeEnd('match');
      _debug2.default.log('FileType:', match && match.type);

      _debug2.default.time('getDef');
      if (match && match.type === 'schema') {
        defLocation = schema.commands.getDefinitionAtPosition(this._schemaBuilder.getSchema(), sourceText, position);
      }

      if (match && match.type === 'query') {
        defLocation = query.commands.getDefinitionAtPosition(this._schemaBuilder.getSchema(), sourceText, position, match.opts.parser);
      }
      _debug2.default.timeEnd('getDef');
      _debug2.default.timeEnd('time');
      return defLocation;
    }
  }, {
    key: 'findRefs',
    value: function findRefs(params) {
      _debug2.default.log('\n[findRefs]');_debug2.default.time('time');
      var sourceText = params.sourceText,
          sourcePath = params.sourcePath,
          position = params.position;

      if (!this._isInitialized) {
        return [];
      }

      var refLocations = [];
      _debug2.default.time('match');
      var match = this._config.match(sourcePath);
      _debug2.default.timeEnd('match');
      _debug2.default.log('FileType:', match && match.type);

      _debug2.default.time('findRefs');
      if (match && match.type === 'schema') {
        refLocations = schema.commands.findRefsOfTokenAtPosition(this._schemaBuilder.getSchema(), sourceText, position);
      }
      _debug2.default.timeEnd('findRefs');

      _debug2.default.timeEnd('time');
      // @TODO query not implemented
      return refLocations;
    }
  }, {
    key: 'getInfo',
    value: function getInfo(params) {
      _debug2.default.log('\n[getInfo]');_debug2.default.time('time');
      var sourcePath = params.sourcePath,
          sourceText = params.sourceText,
          position = params.position;

      if (!this._isInitialized) {
        return undefined;
      }

      var info = null;
      _debug2.default.time('match');
      var match = this._config.match(sourcePath);
      _debug2.default.timeEnd('match');
      _debug2.default.log('FileType:', match && match.type);

      _debug2.default.time('getInfoAtToken');
      if (match && match.type === 'schema') {
        info = schema.commands.getInfoOfTokenAtPosition(this._schemaBuilder.getSchema(), sourceText, position);
      }

      if (match && match.type === 'query') {
        info = query.commands.getInfoOfTokenAtPosition(this._schemaBuilder.getSchema(), sourceText, position, match.opts);
      }
      _debug2.default.timeEnd('getInfoAtToken');

      _debug2.default.timeEnd('time');
      return info;
    }
  }]);
  return GQLService;
}();