'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryManager = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _class, _temp, _initialiseProps;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _source = require('graphql/language/source');

var _GQLError = require('../shared/GQLError');

var _validate = require('./validation/validate');

var _validate2 = _interopRequireDefault(_validate);

var _parseQuery2 = require('./_shared/parseQuery');

var _parseQuery3 = _interopRequireDefault(_parseQuery2);

var _GQLConfig = require('../config/GQLConfig');

var _GQLConfig2 = _interopRequireDefault(_GQLConfig);

var _watch = require('../shared/watch');

var _watch2 = _interopRequireDefault(_watch);

require('../shared/types');

require('../shared/GQLTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryManager = exports.QueryManager = (_temp = _class = function () {
  function QueryManager(options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, QueryManager);

    _initialiseProps.call(this);

    var config = options.config,
        onChange = options.onChange,
        onInit = options.onInit;


    this._config = config;
    this._getSchema = options.getSchema;

    // watch schema files and rebuild schema
    var queryConfig = config.getQuery();

    if (!queryConfig) {
      return;
    }

    queryConfig.files.map(function (fileConfig, index) {
      return (0, _watch2.default)({
        rootPath: config.getDir(),
        files: fileConfig.match,
        name: 'gqlQueryFiles-' + index,
        onChange: function (_onChange) {
          function onChange(_x) {
            return _onChange.apply(this, arguments);
          }

          onChange.toString = function () {
            return _onChange.toString();
          };

          return onChange;
        }(function (files) {
          _this._updateFiles(files, fileConfig);
          // console.log('init done');
          if (!_this._initialized) {
            _this._initialized = true;
            if (onInit) {
              onInit();
            }
          }
          if (onChange) {
            onChange();
          }
        })
      });
    });
  }

  (0, _createClass3.default)(QueryManager, [{
    key: 'getErrors',
    value: function getErrors() {
      return this._errors;
    }

    // private methods

  }, {
    key: '_updateFiles',
    value: function _updateFiles(files, config) {
      var _this2 = this;

      if (files.length === 0) {
        return;
      }

      // console.time('updating files');
      files.forEach(function (_ref) {
        var name = _ref.name,
            exists = _ref.exists;

        // console.log(name, exists);
        var absPath = _path2.default.join(_this2._config.getDir(), name);
        if (exists) {
          // console.time('parseFile');
          _this2._parsedFilesMap.set(absPath, _this2._parseFile(absPath, config));
          // console.timeEnd('parseFile');
        } else {
          _this2._parsedFilesMap.delete(absPath);
        }
      });
      // console.timeEnd('updating files');

      this._errors = this._findErrors();
    }
  }]);
  return QueryManager;
}(), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._errors = [];
  this._parsedFilesMap = new _map2.default();
  this._initialized = false;

  this._findErrors = function () {
    var schema = _this3._getSchema();
    var errors = [];
    _this3._parsedFilesMap.forEach(function (parsedFile) {
      if (parsedFile.isEmpty) {
        return;
      }

      if (parsedFile.error) {
        errors.push(parsedFile.error);
      } else {
        var validationErrors = (0, _validate2.default)(schema, parsedFile.ast, parsedFile.config);
        if (validationErrors) {
          errors.push.apply(errors, (0, _toConsumableArray3.default)(validationErrors));
        }
      }
    });
    return errors;
  };

  this._parseFile = function (absPath, config) {
    var content = _fs2.default.readFileSync(absPath, 'utf8');
    var source = new _source.Source(content, absPath);
    try {
      var _parseQuery = (0, _parseQuery3.default)(source, config),
          ast = _parseQuery.ast,
          isEmpty = _parseQuery.isEmpty;

      return {
        ast: ast,
        error: null,
        isEmpty: isEmpty,
        config: config
      };
    } catch (err) {
      return {
        error: (0, _GQLError.toGQLError)(err, _GQLError.SEVERITY.error),
        ast: null,
        config: config
      };
    }
  };
}, _temp);